#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Script to fix remaining hardcoded Russian text in TSX files"""

import os
import re
from pathlib import Path

# Base path
BASE_PATH = Path(r"C:\Users\HomePC\Documents\GitHub\LOS\my-next-app\src\pages\Cities")

def fix_labels(content):
    """Fix labels: Режим работы, Адрес, Контакты, Телефон, Информация"""
    # Fix partial replacements first
    content = content.replace("Р{t('common.workingHours')}:", "{t('common.workingHours')}:")
    content = content.replace("А{t('common.address')}:", "{t('common.address')}:")
    content = content.replace("К{t('common.contacts')}:", "{t('common.contacts')}:")
    
    # Fix remaining hardcoded labels
    content = content.replace("Режим работы:</span>", "{t('common.workingHours')}:</span>")
    content = content.replace("Адрес:</span>", "{t('common.address')}:</span>")
    content = content.replace("Контакты:</span>", "{t('common.contacts')}:</span>")
    content = content.replace("Телефон:</span>", "{t('common.phone')}:</span>")
    content = content.replace("Информация:</span>", "{t('categoryPages.description')}:</span>")
    
    return content

def fix_errors(content):
    """Fix error messages"""
    content = content.replace(
        "setError(e instanceof Error ? e.message : 'Ошибка загрузки данных');",
        "setError(e instanceof Error ? e.message : t('common.error'));"
    )
    return content

def fix_alt_texts(content):
    """Fix hardcoded alt texts in Cities files"""
    cities_alt = {
        'alt="Вид на город Гагра"': 'alt={t(\'cities.viewCity\')}',
        'alt="Вид на город Гал"': 'alt={t(\'cities.viewCity\')}',
        'alt="Вид на город Гудаута"': 'alt={t(\'cities.viewCity\')}',
        'alt="Вид на город Гулрыпш"': 'alt={t(\'cities.viewCity\')}',
        'alt="Вид на город Новый Афон"': 'alt={t(\'cities.viewCity\')}',
        'alt="Вид на город Очамчыра"': 'alt={t(\'cities.viewCity\')}',
        'alt="Вид на город Пицунда"': 'alt={t(\'cities.viewCity\')}',
        'alt="Вид на город Сухум"': 'alt={t(\'cities.viewCity\')}',
        'alt="Вид на город Ткуарчал"': 'alt={t(\'cities.viewCity\')}',
    }
    for old, new in cities_alt.items():
        content = content.replace(old, new)
    return content

def process_file(file_path):
    """Process a single TSX file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        content = fix_labels(content)
        content = fix_errors(content)
        content = fix_alt_texts(content)
        
        if content != original:
            with open(file_path, 'w', encoding='utf-8', newline='') as f:
                f.write(content)
            return True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
    return False

def main():
    fixed_count = 0
    
    # Process all TSX files in Cities folder
    for tsx_file in BASE_PATH.rglob("*.tsx"):
        if process_file(tsx_file):
            print(f"Fixed: {tsx_file.name}")
            fixed_count += 1
    
    print(f"\nTotal files fixed: {fixed_count}")

if __name__ == "__main__":
    main()
