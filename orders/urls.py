from django.urls import path

from .views import OrderViewSet

from . import views

app_name = 'orders'


order_list = OrderViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

order_detail = OrderViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

order_whatsapp = OrderViewSet.as_view({
    'post': 'make_order',
})

urlpatterns = [
    path("products/", views.get_products),
    path("types/", views.get_types),
    path("owner/", views.get_owner),
    # path("orders/new_order/", views.make_order),
    path("orders/", order_list),
    path("orders/<int:pk>/", order_detail),
    path("orders/whatsapp/", order_whatsapp)
]