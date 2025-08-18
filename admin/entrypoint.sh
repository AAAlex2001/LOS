#!/bin/sh
set -euo pipefail

mkdir -p /app/data /app/media /app/staticfiles

# Apply committed migrations only
python manage.py migrate --noinput

exec "$@"


