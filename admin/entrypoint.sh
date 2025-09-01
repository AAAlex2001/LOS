#!/bin/sh
set -euo pipefail

mkdir -p /app/data /app/media /app/staticfiles

echo "🚀 Запуск Django приложения..."

# Создаем миграции автоматически
echo "📝 Создание миграций..."
python manage.py makemigrations --noinput

# Применяем все миграции
echo "🔄 Применение миграций..."
python manage.py migrate --noinput

# Собираем статические файлы
echo "📦 Сбор статических файлов..."
python manage.py collectstatic --noinput

echo "✅ Django готов к работе!"

exec "$@"


