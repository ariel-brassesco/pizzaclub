"""
WSGI config for pizzaclub project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
import dotenv

from django.core.wsgi import get_wsgi_application

try:
    dotenv.read_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))
except Exception as e:
    print('no .env file, using default os env')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pizzaclub.settings')

application = get_wsgi_application()
