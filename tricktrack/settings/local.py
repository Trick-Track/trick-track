from .base import *

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {'default': {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': config('DB_NAME'),
    'USER': config('DB_USER'),
    'PASSWORD': config('DB_PASSWORD'),
    'HOST': config('DB_HOST'),
    'PORT': config('DB_PORT')}
}

ALLOWED_HOSTS = config('ALLOWED_HOSTS').split(' ')
ALLOWED_HOSTS = [] if not any(ALLOWED_HOSTS) else ALLOWED_HOSTS