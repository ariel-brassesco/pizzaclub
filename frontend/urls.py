from django.urls import path, re_path
from . import views

app_name = 'frontend'
urlpatterns = [
    path('', views.index, name="index"),
    re_path(r'^(?:.*)/?$', views.index),
]