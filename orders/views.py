from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse

# Create your views here.
def index(request):
    return HttpResponseRedirect(reverse('registration:login'))

def profile_employee(request):
    user = request.user
    if user.is_authenticated and user.is_order_manager():
        return render(request, 'orders/index.html', {'usuario': request.user.first_name})
    return HttpResponseRedirect(reverse('orders:main_page'))

def profile_client(request):
    return render(request, 'orders/index.html', {'usuario': request.user.first_name})
