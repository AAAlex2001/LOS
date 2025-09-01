#!/bin/sh
set -euo pipefail

mkdir -p /app/data /app/media /app/staticfiles

# Создаем миграции если нужно
python manage.py makemigrations

# Применяем миграции
python manage.py migrate

exec "$@"


