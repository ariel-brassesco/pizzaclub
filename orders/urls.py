from django.urls import path

from . import views

app_name = 'orders'
urlpatterns = [
    path('', views.index, name="main_page"),
    path('empleado/profile/', views.profile_employee, name='profile_employee'),
    path('cliente/profile/', views.profile_client, name='profile_client')
]