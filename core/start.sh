#!/bin/sh

# Migrations
python manage.py makemigrations
python manage.py makemigrations api
python manage.py migrate

# Default user
python manage.py initadmin

# Run Server
python manage.py runserver 0.0.0.0:8000