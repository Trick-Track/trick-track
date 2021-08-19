. venv/bin/activate
python manage.py migrate --settings=tricktrack.settings.local
python manage.py runserver --settings=tricktrack.settings.local