from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse

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

from .models import Product, PriceList, Place, TypeProduct
from .serializers import ProductSerializer, PriceSerializer, OwnerSerializer, TypeSerializer

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
