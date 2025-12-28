#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Script to find remaining hardcoded Russian text in TSX files"""

import os
import re
from pathlib import Path
from collections import defaultdict

# Base path
BASE_PATH = Path(r"C:\Users\HomePC\Documents\GitHub\LOS\my-next-app\src")

# Patterns to ignore (technical strings, not UI-visible)
IGNORE_PATTERNS = [
    r"import.*from",
    r"//.*",
    r"/\*.*\*/",
    r"console\.",
    r"locale.*['`\"]ru['`\"]",
    r"['`\"]ru['`\"].*:",
    r"variable:",
    r"useTranslations",
    r"\.t\(",
    r"getApiUrl.*encodeURIComponent",
    r"cache.*['\"]no-store['\"]",
    r"style=\{",
    r"className=",
    r"href=",
    r"rel=",
    r"target=",
    r"type=",
    r"src=",
    r"layout=",
    r"objectFit=",
    r"alt=\{t\(",
]

def is_ignored_line(line):
    """Check if line should be ignored"""
    for pattern in IGNORE_PATTERNS:
        if re.search(pattern, line):
            return True
    return False

def find_cyrillic_strings(content, filename):
    """Find strings with Cyrillic characters"""
    results = []
    lines = content.split('\n')
    
    # Pattern 1: Strings in quotes with 3+ Cyrillic chars
    pattern1 = re.compile(r"['\"](.*?[А-Яа-яЁё].*?){3,}.*?['\"]")
    
    # Pattern 2: Direct Cyrillic text in JSX (between tags)
    pattern2 = re.compile(r">[^<]*[А-Яа-яЁё]{3,}[^<]*<")
    
    # Pattern 3: alt attributes with Cyrillic
    pattern3 = re.compile(r'alt=["\'].*[А-Яа-яЁё]+.*["\']')
    
    for i, line in enumerate(lines, 1):
        if is_ignored_line(line):
            continue
            
        # Check all patterns
        for pattern in [pattern1, pattern2, pattern3]:
            matches = pattern.finditer(line)
            for match in matches:
                results.append({
                    'line': i,
                    'text': line.strip(),
                    'match': match.group(0)
                })
    
    return results

def scan_files():
    """Scan all TSX/TS files for hardcoded text"""
    findings = defaultdict(list)
    total_files = 0
    files_with_hardcode = 0
    
    # Scan pages folder
    for tsx_file in BASE_PATH.rglob("*.tsx"):
        if 'node_modules' in str(tsx_file):
            continue
            
        total_files += 1
        
        try:
            with open(tsx_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            results = find_cyrillic_strings(content, tsx_file.name)
            if results:
                findings[str(tsx_file.relative_to(BASE_PATH))] = results
                files_with_hardcode += 1
                
        except Exception as e:
            print(f"Error reading {tsx_file}: {e}")
    
    return findings, total_files, files_with_hardcode

def main():
    print("=" * 70)
    print("SEARCHING FOR HARDCODED RUSSIAN TEXT")
    print("=" * 70)
    print()
    
    findings, total_files, files_with_hardcode = scan_files()
    
    if not findings:
        print("✅ NO HARDCODED TEXT FOUND!")
        print(f"   Scanned {total_files} files")
        return
    
    print(f"⚠️  FOUND HARDCODED TEXT IN {files_with_hardcode} FILES:")
    print()
    
    # Group by type
    labels = []
    alt_texts = []
    jsx_text = []
    other = []
    
    for filepath, results in sorted(findings.items()):
        for result in results:
            match = result['match']
            if 'Телефон:' in match or 'Информация:' in match or 'Режим работы:' in match or 'Адрес:' in match or 'Контакты:' in match:
                labels.append((filepath, result))
            elif 'alt=' in match:
                alt_texts.append((filepath, result))
            elif match.startswith('>'):
                jsx_text.append((filepath, result))
            else:
                other.append((filepath, result))
    
    # Print by category
    if labels:
        print(f"\n📌 LABELS ({len(labels)} occurrences):")
        for filepath, result in labels[:20]:  # Show first 20
            print(f"   {filepath}:{result['line']}")
            print(f"      {result['text'][:100]}")
    
    if alt_texts:
        print(f"\n🖼️  ALT TEXTS ({len(alt_texts)} occurrences):")
        for filepath, result in alt_texts[:20]:
            print(f"   {filepath}:{result['line']}")
            print(f"      {result['match']}")
    
    if jsx_text:
        print(f"\n📝 JSX TEXT ({len(jsx_text)} occurrences):")
        for filepath, result in jsx_text[:20]:
            print(f"   {filepath}:{result['line']}")
            print(f"      {result['text'][:100]}")
    
    if other:
        print(f"\n❓ OTHER ({len(other)} occurrences):")
        for filepath, result in other[:20]:
            print(f"   {filepath}:{result['line']}")
            print(f"      {result['text'][:100]}")
    
    print()
    print("=" * 70)
    print(f"TOTAL: {files_with_hardcode} files with hardcoded text")
    print(f"       {len(labels) + len(alt_texts) + len(jsx_text) + len(other)} occurrences found")
    print("=" * 70)

if __name__ == "__main__":
    main()
