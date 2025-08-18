#!/bin/sh
set -euo pipefail

mkdir -p /app/data /app/media /app/staticfiles

python manage.py makemigrations --noinput || true
python manage.py migrate --noinput

exec "$@"


