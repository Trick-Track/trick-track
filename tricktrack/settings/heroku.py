from .base import *

import django_heroku

ALLOWED_HOSTS = ['.herokuapp.com']
django_heroku.settings(locals())
