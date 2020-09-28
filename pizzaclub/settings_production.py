import os
from .settings import BASE_DIR

ALLOWED_HOSTS = ['pizzaclub.herokuapp.com']

# Application definition

INSTALLED_APPS = [
    'registration.apps.RegistrationConfig',
    'orders.apps.OrdersConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'rest_framework',
    'gdstorage'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
import dj_database_url
DATABASES = {
    'default':  dj_database_url.config(conn_max_age=600)
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Google Drive Storage Settings
GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE = None
GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE_CONTENTS = os.getenv('GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE_CONTENTS')
GOOGLE_DRIVE_STORAGE_MEDIA_ROOT = 'pizzaclub/media'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# SSL Configuration
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_CONTENT_TYPE_NOSNIFF = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SESSION_SAVE_EVERY_REQUEST = True # For session dictionary modifications between request

# EMAIL SETTINGS
#EMAIL_HOST = os.getenv('MAILGUN_SMTP_SERVER')
#EMAIL_HOST_USER = os.getenv('MAILGUN_SMTP_LOGIN')
#EMAIL_HOST_PASSWORD = os.getenv('MAILGUN_SMTP_PASSWORD')
#EMAIL_PORT = os.getenv('MAILGUN_SMTP_PORT')
#EMAIL_USE_TLS = True
#EMAIL_SENDER_CONSULTA = os.getenv('EMAIL_SENDER_CONSULTA')
#EMAIL_SENDER_COMPRAS = os.getenv('EMAIL_SENDER_COMPRAS')
#EMAIL_ERROR_REPORT = os.getenv('EMAIL_ERROR_REPORT')
#EMAIL_OWNER = os.getenv('EMAIL_OWNER')
#MAILGUN_ACCESS_KEY = os.getenv('MAILGUN_API_KEY')
#MAILGUN_SERVER_NAME = os.getenv('MAILGUN_DOMAIN')
#EMAIL_BACKEND = 'django_mailgun.MailgunBackend'
#EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
#EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' # During development only

# Global settings for Django REST Framework
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly'
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_jwt.authentication.JSONWebTokenAuthentication",
    ],
}
