#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для исправления неправильного размещения хука useTranslation
Исправляет паттерн:
  export default function Component({
    const { t } = useTranslation(); visible, onClose...
На:
  export default function Component({ visible, onClose...
    const { t } = useTranslation();
"""

import os
import re
from pathlib import Path

def fix_file(file_path):
    """Исправляет неправильное размещение хука useTranslation в одном файле"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Паттерн для поиска проблемы:
    # Функция начинается с "export default function Name({" или "export default function Name({"
    # Затем сразу идет "const { t } = useTranslation();" вместо параметров
    pattern = r'(export\s+default\s+function\s+\w+\s*\(\s*\{)\s*const\s*\{\s*t\s*\}\s*=\s*useTranslation\(\)\s*;\s*([^}]+\}\s*:\s*[^)]+\))\s*\{'

    def replacement(match):
        func_start = match.group(1)  # "export default function Name({"
        params = match.group(2)      # "visible, onClose }: { ... }"
        return f"{func_start} {params} {{\n  const {{ t }} = useTranslation();"

    content = re.sub(pattern, replacement, content)

    if content != original:
        # Создаем бэкап если еще не существует
        backup_path = str(file_path) + '.fix_backup'
        if not Path(backup_path).exists():
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write(original)

        # Сохраняем исправленный файл
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"✓ Исправлен: {file_path}")
        return True

    return False

def process_directory(directory):
    """Обрабатывает все .tsx файлы в директории"""
    count = 0

    for root, dirs, files in os.walk(directory):
        # Пропускаем node_modules
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')

        for file in files:
            if file.endswith('.tsx') and not file.endswith('.backup'):
                file_path = Path(root) / file
                if fix_file(file_path):
                    count += 1

    return count

def main():
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent

    print("Исправление неправильного размещения хука useTranslation...\n")

    # Обработка components
    components_dir = project_dir / 'components' / 'Screens'
    if components_dir.exists():
        print(f"Обработка {components_dir}...")
        count = process_directory(components_dir)
        print(f"Исправлено файлов: {count}\n")

    # Обработка pages
    pages_dir = project_dir / 'pages'
    if pages_dir.exists():
        print(f"Обработка {pages_dir}...")
        count = process_directory(pages_dir)
        print(f"Исправлено файлов: {count}\n")

    print("\n✓ Готово!")
    print("Бэкапы сохранены с расширением .fix_backup")

if __name__ == '__main__':
    main()
