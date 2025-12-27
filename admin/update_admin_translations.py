"""
Скрипт для обновления всех admin.py файлов с использованием TranslationAdmin
Запустить: python update_admin_translations.py
"""

import os
import re
from pathlib import Path

# Путь к cms директории
CMS_DIR = Path(__file__).parent / "cms"

def update_admin_file(file_path):
    """Обновляет admin.py файл для использования TranslationAdmin"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Проверяем, не обновлен ли уже файл
    if 'TranslationAdmin' in content or 'TranslationTabularInline' in content:
        print(f"  ✓ Уже обновлен: {file_path.relative_to(CMS_DIR.parent)}")
        return False
    
    # Добавляем импорты modeltranslation
    if 'from django.contrib import admin' in content:
        content = content.replace(
            'from django.contrib import admin',
            'from django.contrib import admin\nfrom modeltranslation.admin import TranslationAdmin, TranslationTabularInline, TranslationStackedInline'
        )
    
    # Заменяем admin.TabularInline на TranslationTabularInline
    content = re.sub(
        r'class (\w+)\(admin\.TabularInline\):',
        r'class \1(TranslationTabularInline):',
        content
    )
    
    # Заменяем admin.StackedInline на TranslationStackedInline
    content = re.sub(
        r'class (\w+)\(admin\.StackedInline\):',
        r'class \1(TranslationStackedInline):',
        content
    )
    
    # Заменяем admin.ModelAdmin на TranslationAdmin
    content = re.sub(
        r'class (\w+)\(admin\.ModelAdmin\):',
        r'class \1(TranslationAdmin):',
        content
    )
    
    # Если были изменения, сохраняем
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ Обновлен: {file_path.relative_to(CMS_DIR.parent)}")
        return True
    else:
        print(f"  - Нет изменений: {file_path.relative_to(CMS_DIR.parent)}")
        return False

def main():
    print("🚀 Начинаем обновление admin.py файлов...")
    print()
    
    updated_count = 0
    skipped_count = 0
    
    # Проходим по всем модулям в cms
    for module_dir in CMS_DIR.iterdir():
        if not module_dir.is_dir():
            continue
        
        admin_file = module_dir / "admin.py"
        
        if admin_file.exists():
            print(f"📝 Обрабатываем: {module_dir.name}")
            
            if update_admin_file(admin_file):
                updated_count += 1
            else:
                skipped_count += 1
    
    print()
    print("=" * 60)
    print(f"✅ Обновлено файлов: {updated_count}")
    print(f"⏭️  Пропущено (уже обновлены): {skipped_count}")
    print()
    print("🎉 Готово! Теперь в админке будут вкладки для языков.")
    print()
    print("📋 Как это выглядит:")
    print("   - При редактировании записи вверху будут вкладки: [Русский] [English]")
    print("   - Переключаясь между вкладками, вы увидите поля для каждого языка")
    print("   - Это намного удобнее, чем видеть все поля сразу!")
    print()

if __name__ == "__main__":
    main()
