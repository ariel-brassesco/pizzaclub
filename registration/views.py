from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse

from .models import User

# Create your views here.

def login_view(request):
    '''
        Login a user request. If the credentials are not valid return to Login Page.
    '''
    if request.method == 'POST':
        # Get the email and password from request
        email = request.POST["email"]
        password = request.POST["password"]
        
        # Check the user credentials
        try:
            # Get the username
            username = User.objects.get(email=email).username
            # Check password
            user = authenticate(request, username=username, password=password)

            if user:
                # Login user if credentials are valid
                login(request, user)
                # Set URL to redirect if the user is an employee or and client
                url_employee = reverse("orders:profile_employee")
                url_client = reverse("orders:profile_client")
                employee = user.is_employee or user.is_staff
                redirect =  url_employee if employee else url_client
                
                return JsonResponse({
                        'success': True,
                        'redirect': redirect
                    })
            # raise User.DoesNotExist exception if autenticate return None
            raise User.DoesNotExist('Invalid Credentials')
        except User.DoesNotExist:
            return JsonResponse({
                'success': False,
                'error': 'E-mail o Contraseña Incorrectos.'
                })
    return render(request, "registration/login_view.html")

def logout_view(request):
    logout(request)
    return render(request, 'registration/logout_view.html')
