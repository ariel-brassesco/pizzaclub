from django.urls import path

from . import views

app_name = 'orders'
urlpatterns = [
    #path('', views.index, name="main_page"),
    #path('empleado/profile/', views.profile_employee, name='profile_employee'),
    #path('cliente/profile/', views.profile_client, name='profile_client'),
    path("api/products/", views.get_products),
    path("api/types/", views.get_types),
    path("api/owner/", views.get_owner),
    path("api/orders/new_order/", views.make_order),
]