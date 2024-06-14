#!/bin/sh
# Prevents script execution if any command fails
set -e

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Start Django server
echo "Starting Django server..."
exec python manage.py runserver 0.0.0.0:8000