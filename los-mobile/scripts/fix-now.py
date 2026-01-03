#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Финальный скрипт - исправляет хуки БЕЗ бэкапов
"""

import os
from pathlib import Path

def fix_file(file_path):
    """Исправляет неправильное размещение хука"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False

    original = content

    # Простая замена строки
    # ИЩУ: "export default function Name({\n  const { t } = useTranslation(); visible, onClose"
    # МЕНЯЮ НА: "export default function Name({ visible, onClose"

    lines = content.split('\n')
    modified = False

    for i in range(len(lines) - 1):
        line = lines[i]
        next_line = lines[i + 1] if i + 1 < len(lines) else ''

        # Если строка заканчивается на "({" И следующая содержит хук с параметрами после
        if line.rstrip().endswith('({'):
            next_stripped = next_line.strip()
            if next_stripped.startswith('const { t } = useTranslation();') and len(next_stripped) > 31:
                # Извлекаем параметры после хука
                params = next_stripped[31:].strip()  # 31 = len('const { t } = useTranslation();')

                # Заменяем текущую строку
                lines[i] = line[:-2] + '({ ' + params
                # Заменяем следующую строку
                lines[i + 1] = '  const { t } = useTranslation();'
                modified = True

                try:
                    rel_path = file_path.relative_to(Path.cwd())
                    print(f"✓ {rel_path}")
                except:
                    print(f"✓ {file_path}")

    if modified:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(lines))
            return True
        except:
            return False

    return False

def process_directory(directory):
    """Обрабатывает все .tsx файлы"""
    count = 0
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')

        for file in files:
            if file.endswith('.tsx'):
                file_path = Path(root) / file
                if fix_file(file_path):
                    count += 1

    return count

def main():
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent

    print("=" * 70)
    print("Исправление хуков useTranslation")
    print("=" * 70)
    print()

    total = 0

    for dirname in ['components/Screens', 'pages', 'app']:
        dir_path = project_dir / dirname
        if dir_path.exists():
            print(f"📁 {dirname}/")
            count = process_directory(dir_path)
            total += count
            print()

    print("=" * 70)
    print(f"✅ Исправлено файлов: {total}")
    print("=" * 70)

if __name__ == '__main__':
    main()
