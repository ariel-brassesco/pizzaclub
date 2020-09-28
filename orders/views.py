from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.utils.encoding import uri_to_iri, iri_to_uri


# Define constants
DELIVERY_MODE = 'delivery'

# Create your views here.
def index(request):
    return render(request, 'orders/index.html')
#    return HttpResponseRedirect(reverse('registration:login'))

def profile_employee(request):
    user = request.user
    if user.is_authenticated and user.is_order_manager():
        return render(request, 'orders/profile_employee.html', {'usuario': request.user.first_name})
    return HttpResponseRedirect(reverse('orders:main_page'))

def profile_client(request):
    return render(request, 'orders/index.html', {'usuario': request.user.first_name})


# DEFINE REST API FUNCTIONS
# Import modules
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, PriceList, Place, TypeProduct, Order, OrderItem
from .serializers import ProductSerializer, PriceSerializer, OwnerSerializer, TypeSerializer
from registration.models import Address, Client

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
        print('Request Data')
        owner = Place.objects.first()
        #serialize the data
        serializer = OwnerSerializer(owner)
        return Response(serializer.data)
    return Response([], status=status.HTTP_400_BAD_REQUEST)

def validate_client(data, delivery_mode):
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    address = data.get('address')
    delivery = (delivery_mode == DELIVERY_MODE) and address if (delivery_mode == DELIVERY_MODE) else True
    return all([name, phone, email, delivery])

def validate_cart(data):
    return True

def create_whatsapp_url(client, order, address, place):
    # Place Data
    place_name = place.name.title()
    place_address = place.address.address.title()
    whatsapp = 'https://wa.me/541134205675'
    #whatsapp = place.whatsapp
    # Client Data
    name = client.name.title()
    comment = order.comment.strip()
    # Cart Data
    data_item = ''
    for item in order.items.select_related():
        item_size = f', {item.product.size} ' if item.product.size else ''
        item_presentation = f', {item.product.presentation} ' if item.product.presentation else ''
        data_item += (
            f"- {item.quantity} x {item.product.product.name}"
            f"{item_size}{item_presentation} (${item.total})\n")
    # Delivery and Intro Data
    if order.delivery_mode == DELIVERY_MODE:
        data_delivery = f"- {order.delivery_mode.title()} ($ {order.shipping.cost})\n"
        data_intro = f"Soy *{name}* y quiero hacer el siguiente pedido hacia *{address.address}*:\n"
    else:
        data_delivery = ''
        data_intro = (
            f"Soy *{name}* y quiero hacer el siguiente pedido para retirar por el local"
            f"en {place_address}:\n")
    # Get the url
    
    url = (
        f"{whatsapp}?text=Hola 🍕*{place_name}*🍕!\n"
        f"{data_intro}"
        f"{data_item}"
        f"{data_delivery}"
        f"*Total: ${order.total}*\n"
        f"Comentario: {comment}\n"
        f"Muchas gracias!\n"
        f"Orden N°: {order.order}")
    return iri_to_uri(url)

@api_view(['POST'])
def make_order(request):
    if request.method == 'POST':
        #Get the data
        client = request.data.get('client')
        cart = request.data.get('cart')
        # Check the data is correct
        check_client = validate_client(client, cart.get('mode'))
        check_cart = validate_cart(cart)

        if not (check_client and check_cart): return JsonResponse({'success': False, 'error': 'Some Data is invalid'})
        # Client Data
        name, phone = client.get('name').strip(), client.get('phone').strip()
        email, address = client.get('email').strip(), client.get('address')
        comment = client.get('comment').strip() if client.get('comment') else ''
        # Cart Data
        order_type = cart.get('order_type')
        delivery_mode = cart.get('mode')
        items = cart.get('items')
        # Load the data in database
        # Load the address if needed
        if delivery_mode == DELIVERY_MODE:
            try: 
                address = Address.objects.get(address=address)
            except Address.DoesNotExist:
                address = Address.objects.create(address=address)
        else: 
            address = None
        # Load Client
        try:
            client_db = Client.objects.get(
                name=name,
                phone=phone,
                email=email)
            if address: client_db.address.add(address)
        except Client.DoesNotExist:
            print(address)
            client_db = Client.objects.create(
                name=name,
                phone=phone,
                email=email)
            if address: client_db.address.add(address)
        # Load the Order
        order = Order.objects.create(
            order_type=order_type,
            client=client_db,
            employee=None,
            status='pending',
            table=None,
            delivery_mode=delivery_mode,
            comment=comment)
        # Load Items
        total = 0
        for item in items:
            try:
                product = item['product']['id']
                size, presentation = item.get('size'), item.get('presentation')
                quantity = item.get('quantity')
                price = PriceList.objects.get(
                    product=product,
                    size=size,
                    presentation=presentation)
                order_item = OrderItem.objects.create(
                    order=order,
                    product=price,
                    quantity=quantity,
                    )
            except:
                return JsonResponse({'success': False, 'error': 'Some Item is invalid'})
        # Save order to set total value
        order.save()
        # Return the WhatsApp URL
        place = Place.objects.first()
        return JsonResponse({
            'success': True,
            'url': create_whatsapp_url(client_db, order, address, place)
            })
    return JsonResponse({'success': False})
