#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для автоматической локализации React Native приложения
Заменяет все хардкод русские строки на вызовы функции t()

Использование:
    python scripts/localize.py                  # Применить изменения
    python scripts/localize.py --dry-run        # Предпросмотр без изменений
    python scripts/localize.py --restore        # Восстановить из бэкапов
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple

# Загрузка переводов
def load_translations() -> Dict[str, str]:
    """Загружает переводы из ru.json и создает карту русский текст -> ключ"""
    script_dir = Path(__file__).parent
    ru_path = script_dir.parent / 'i18n' / 'locales' / 'ru.json'

    if not ru_path.exists():
        print(f"❌ Файл переводов не найден: {ru_path}")
        return {}

    with open(ru_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)

    # Создаем плоскую карту переводов русский -> ключ
    flat_map = {}

    def flatten(obj, prefix=''):
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                flatten(value, full_key)
            else:
                flat_map[value] = full_key

    flatten(translations)
    return flat_map

# Экранирование спецсимволов для regex
def escape_regex(text):
    return re.escape(text)

# Проверка, есть ли уже импорт useTranslation
def has_translation_import(content):
    return bool(re.search(r"import.*useTranslation.*from.*['\"]@/i18n['\"]", content))

# Проверка, есть ли уже const { t } = useTranslation()
def has_translation_hook(content):
    return bool(re.search(r"const\s*\{\s*t\s*\}\s*=\s*useTranslation\(\)", content))

# Добавление импорта useTranslation
def add_translation_import(content):
    # Находим последний импорт
    imports = list(re.finditer(r"^import\s+.*?;", content, re.MULTILINE))

    if imports:
        last_import = imports[-1]
        insert_pos = last_import.end()

        new_content = (
            content[:insert_pos] +
            "\nimport { useTranslation } from '@/i18n';" +
            content[insert_pos:]
        )
        return new_content

    return content

# Добавление const { t } = useTranslation() в компонент
def add_translation_hook_to_component(content):
    # Ищем функциональный компонент (function или const с arrow function)
    patterns = [
        r"(export\s+default\s+function\s+\w+[^{]*\{)",
        r"(const\s+\w+\s*[:=]\s*\([^)]*\)\s*=>\s*\{)",
        r"(function\s+\w+[^{]*\{)"
    ]

    for pattern in patterns:
        match = re.search(pattern, content)
        if match:
            insert_pos = match.end()
            # Добавляем отступ
            indent = "\n  "
            new_content = (
                content[:insert_pos] +
                indent + "const { t } = useTranslation();" +
                content[insert_pos:]
            )
            return new_content

    return content

# Замена хардкод строк
def replace_hardcoded_strings(content: str, translation_map: Dict[str, str]) -> Tuple[str, List[Tuple[str, str]]]:
    """
    Заменяет хардкод русские строки на вызовы t()

    Возвращает: (измененный контент, список замен)
    """
    modified = content
    replacements = []
    replaced_positions = set()  # Отслеживаем уже замененные позиции

    # Сортируем по длине (от длинных к коротким) чтобы избежать частичных замен
    sorted_translations = sorted(translation_map.items(), key=lambda x: len(x[0]), reverse=True)

    for russian_text, translation_key in sorted_translations:
        escaped = escape_regex(russian_text)

        # Паттерн 1: JSX текст между тегами: <Text>Текст</Text> -> <Text>{t('key')}</Text>
        pattern1 = rf"(>)\s*{escaped}\s*(<)"
        for match in re.finditer(pattern1, modified):
            pos = match.start()
            if pos not in replaced_positions:
                modified = modified[:match.start(1)] + match.group(1) + f"{{t('{translation_key}')}}" + match.group(2) + modified[match.end(2):]
                replacements.append((russian_text, translation_key))
                replaced_positions.add(pos)
                break

        # Паттерн 2: Строка как значение пропса: title="Текст" -> title={t('key')}
        pattern2 = rf'''(\w+)=["']{escaped}["']'''
        for match in re.finditer(pattern2, modified):
            pos = match.start()
            if pos not in replaced_positions:
                prop_name = match.group(1)
                modified = modified[:match.start()] + f"{prop_name}={{t('{translation_key}')}}" + modified[match.end():]
                replacements.append((russian_text, translation_key))
                replaced_positions.add(pos)
                break

        # Паттерн 3: Строка в одинарных или двойных кавычках: 'Текст' или "Текст"
        pattern3 = rf'''(['"]){escaped}\1'''
        for match in re.finditer(pattern3, modified):
            pos = match.start()
            if pos not in replaced_positions:
                # Проверяем контекст - не внутри ли импорта или комментария
                line_start = modified.rfind('\n', 0, match.start()) + 1
                line = modified[line_start:match.end()]
                if not line.strip().startswith('import') and not line.strip().startswith('//'):
                    modified = modified[:match.start()] + f"t('{translation_key}')" + modified[match.end():]
                    replacements.append((russian_text, translation_key))
                    replaced_positions.add(pos)
                    break

    return modified, replacements

# Обработка одного файла
def process_file(file_path, translation_map, dry_run=False):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Заменяем строки
        modified, replacements = replace_hardcoded_strings(content, translation_map)

        if not replacements:
            return 0

        # Добавляем импорт если нужно
        if not has_translation_import(modified):
            modified = add_translation_import(modified)

        # Добавляем хук если нужно
        if not has_translation_hook(modified):
            modified = add_translation_hook_to_component(modified)

        if modified != original_content:
            if not dry_run:
                # Создаем бэкап
                backup_path = str(file_path) + '.backup'
                with open(backup_path, 'w', encoding='utf-8') as f:
                    f.write(original_content)

                # Сохраняем изменения
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(modified)

                print(f"✓ {file_path}")
                for rus, key in replacements:
                    print(f"  '{rus}' -> t('{key}')")
            else:
                print(f"[DRY RUN] {file_path}")
                for rus, key in replacements:
                    print(f"  '{rus}' -> t('{key}')")

            return len(replacements)

        return 0

    except Exception as e:
        print(f"✗ Ошибка при обработке {file_path}: {e}")
        return 0

# Обработка директории
def process_directory(directory, translation_map, dry_run=False):
    total_replacements = 0
    processed_files = 0

    for root, dirs, files in os.walk(directory):
        # Пропускаем node_modules
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')

        for file in files:
            if file.endswith('.tsx') and not file.endswith('.backup'):
                file_path = Path(root) / file
                replacements = process_file(file_path, translation_map, dry_run)
                if replacements > 0:
                    total_replacements += replacements
                    processed_files += 1

    return processed_files, total_replacements

# Главная функция
def main():
    import argparse

    parser = argparse.ArgumentParser(description='Автоматическая локализация React Native приложения')
    parser.add_argument('--dry-run', action='store_true', help='Показать что будет изменено без реальных изменений')
    parser.add_argument('--restore', action='store_true', help='Восстановить файлы из бэкапов')
    args = parser.parse_args()

    script_dir = Path(__file__).parent
    project_dir = script_dir.parent

    if args.restore:
        print("Восстановление файлов из бэкапов...")
        for root, dirs, files in os.walk(project_dir):
            for file in files:
                if file.endswith('.backup'):
                    backup_path = Path(root) / file
                    original_path = Path(root) / file[:-7]  # Remove .backup

                    with open(backup_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    with open(original_path, 'w', encoding='utf-8') as f:
                        f.write(content)

                    os.remove(backup_path)
                    print(f"✓ Восстановлен {original_path}")

        print("\nГотово!")
        return

    print("Загрузка переводов из ru.json...")
    translation_map = load_translations()
    print(f"Загружено {len(translation_map)} переводов\n")

    if args.dry_run:
        print("=== РЕЖИМ ПРЕДПРОСМОТРА (файлы не будут изменены) ===\n")

    # Обработка компонентов
    components_dir = project_dir / 'components' / 'Screens'
    if components_dir.exists():
        print(f"Обработка {components_dir}...")
        files, replacements = process_directory(components_dir, translation_map, args.dry_run)
        print(f"\nОбработано файлов: {files}, замен: {replacements}\n")

    # Обработка страниц
    pages_dir = project_dir / 'pages'
    if pages_dir.exists():
        print(f"Обработка {pages_dir}...")
        files, replacements = process_directory(pages_dir, translation_map, args.dry_run)
        print(f"\nОбработано файлов: {files}, замен: {replacements}\n")

    if not args.dry_run:
        print("\n✓ Готово!")
        print("Бэкапы сохранены с расширением .backup")
        print("Для восстановления используйте: python localize.py --restore")
    else:
        print("\nДля применения изменений запустите без --dry-run")

if __name__ == '__main__':
    main()
