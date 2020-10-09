from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.utils.encoding import uri_to_iri, iri_to_uri

# Define constants
DELIVERY_MODE = 'delivery'

# DEFINE REST API FUNCTIONS
# Import modules
from rest_framework import status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from .models import Product, PriceList, Place, TypeProduct, Order, OrderItem
from registration.models import Address, Client
from .serializers import (
    ProductSerializer,
    PriceSerializer,
    PriceListSerializer,
    OwnerSerializer,
    TypeSerializer,
    OrderSerializer,
    OrderItemSerializer
)
from registration.serializers import ClientSerializer


# Define view functions
@api_view(['GET'])
def get_products(request):
    """
        Return a JSON format list of all products that are active.
    """
    if request.method == 'GET':
        # Get all active products
        products = Product.objects.filter(is_active=True).order_by('order_n')
        #serialize the data
        serializer = ProductSerializer(products, many=True)
        
        return Response(serializer.data)
    return Response([], status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_types(request):
    """
        Return a JSON format list of all types that are active.
    """
    if request.method == 'GET':
        # Get all active products
        types = TypeProduct.objects.order_by('order_n')
        #serialize the data
        serializer = TypeSerializer(types, many=True)
        
        return Response(serializer.data)
    return Response([], status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_owner(request):
    """
        Return a JSON format list of all products that are active.
    """
    if request.method == 'GET':
        # Get the first entry
        owner = Place.objects.first()
        #serialize the data
        serializer = OwnerSerializer(owner)
        return Response(serializer.data)
    return Response([], status=status.HTTP_400_BAD_REQUEST)

# CRUD for orders
class OrderViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'delete':
            permission_classes = [IsAdmin]
        elif self.action == 'make_order':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.perform_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer):
        return serializer.save()

    @action(detail=True, methods=['post'])
    def make_order(self, request):
        place_id = request.data.pop('owner_id')
        items = request.data.pop('items')
        request.data['items'] = []
        # Find the price list and pass the serialize data
        for item in items:
            quantity = item.pop('quantity')
            price_list = PriceList.objects.get(**item)
            #price_serializer = PriceListSerializer(instance=price_list)
            request.data['items'].append({
                'product': price_list.pk,
                'quantity': quantity
            })
        # Get the delivery address if there is
        delivery_address = request.data.pop('delivery_address', None)
        if delivery_address:
            try: 
                address = Address.objects.create(address=delivery_address)
            except:
                address = Address.objects.get(address=delivery_address)
            request.data['delivery_address'] = address.id
        else: 
            address=None
        # Get the client
        client_data = request.data.get('client')
        try:
            client = Client.objects.get(**client_data)
        except Client.DoesNotExist:
            client = Client.objects.create(**client_data)
        if address: client.address.add(address)
        # Save Client id in request.data
        request.data['client'] = client.id
        #Create the order
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # Create URL
        place = Place.objects.get(id=place_id)
        url = self.create_url_whatsapp(client, order, place)
        return Response({'url': url}, status=status.HTTP_201_CREATED, headers=headers)
    
    def create_url_whatsapp(self, client, order, place):
        # Cart Data
        data_item = ''
        for item in order.items.select_related():
            item_size = f', {item.product.size} ' if item.product.size else ''
            item_presentation = f', {item.product.presentation} ' if item.product.presentation else ''
            data_item += (
                f"- {item.quantity} x {item.product.product.types.name} {item.product.product.name}"
                f"{item_size}{item_presentation} (${item.total})\n")
        # Delivery and Intro Data
        if order.delivery_mode == DELIVERY_MODE:
            data_delivery = f"- {order.delivery_mode.title()} ($ {order.shipping.cost})\n"
            data_intro = (
                f"Soy *{client.name.title()}* y quiero hacer el siguiente pedido hacia"
                f" *{order.delivery_address.address.title()}*:\n")
        else:
            data_delivery = ''
            data_intro = (
                f"Soy *{client.name.title()}* y quiero hacer el siguiente pedido para retirar por el local "
                f"en {place.address.address.title()}:\n")
        # Get the url
        url = (
            f"{place.whatsapp}?text=Hola 🍕*{place.name.title()}*🍕!\n"
            f"{data_intro}"
            f"{data_item}"
            f"{data_delivery}"
            f"*Total: ${order.total}*\n"
            f"Comentario: {order.comment.strip()}\n"
            f"Muchas gracias!\n"
            f"Orden N°: {order.order}")
        return iri_to_uri(url)
