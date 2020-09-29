from django.urls import path

from . import views

app_name = "registration"
urlpatterns = [
    path("me", views.me, name="me"),
    path("register", views.register, name="register"),
]
