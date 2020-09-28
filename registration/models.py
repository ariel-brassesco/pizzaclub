from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator, MaxLengthValidator, RegexValidator

from pizzaclub.settings import MAX_DNI_LENGTH, MAX_CUIL_LENGTH, PASSWORD_RESET_TIMEOUT
from pizzaclub.settings import MIN_DNI_LENGTH, MIN_CUIL_LENGTH
from pizzaclub.settings import MAX_PHONE_LENGTH, MIN_PHONE_LENGTH

import secrets
import datetime
# Create your models here.
class Address(models.Model):
    address = models.CharField(max_length=100, unique=True)
    lat = models.DecimalField(max_digits=9, decimal_places=7, default=0)
    lon= models.DecimalField(max_digits=9, decimal_places=7, default=0)
    elev = models.DecimalField(max_digits=9, decimal_places=2, default=0)

    class Meta:
        verbose_name_plural = "Address"

class User(AbstractUser):
    '''
        Extend the User Django built in model.
        Add token data for password reset, ans is_employee flag for Employee Profile.
    '''
    is_employee = models.BooleanField(default=False)
    token = models.CharField(max_length=50)
    token_date = models.DateTimeField(auto_now=True)
    token_valid = models.BooleanField(default=True)

    def is_order_manager(self):
        return (self.is_employee and self.is_active) or self.is_superuser

    def generate_token(self):
        return secrets.token_urlsafe()

    def check_token(self, token):
        '''
        Check token validity for an hour since was generated.
        '''
        tz = self.token_date.tzinfo
        t_now = datetime.datetime.now(tz=tz)

        # Check the token time less than hour
        dt = t_now - self.token_date
        if dt.total_seconds() > PASSWORD_RESET_TIMEOUT:
            self.token_valid = False

        # Return True if the token is correct and is_valid
        res = (token == self.token) and self.token_valid
        
        # Set the token invalid
        self.token_valid = False

        return res

    def save(self, *args, **kwargs):
        '''
        Until save generate a new token and set valid.
        '''
        # Generate a token and set valid
        self.token = self.generate_token()
        self.token_valid = True
        super(User, self).save(*args, **kwargs)

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    dni = models.CharField(
        max_length=MAX_DNI_LENGTH,
        unique=True,
        validators=[
            MinLengthValidator(MIN_DNI_LENGTH),
            MaxLengthValidator(MAX_DNI_LENGTH),
            RegexValidator(regex=r'^\d+$')
        ])
    cuil = models.CharField(
        max_length=MAX_CUIL_LENGTH,
        unique=True,
        validators=[
            MinLengthValidator(MIN_CUIL_LENGTH),
            MaxLengthValidator(MAX_CUIL_LENGTH),
            RegexValidator(regex=r'^\d+$')
        ])
    phone = models.CharField(
        max_length=MAX_PHONE_LENGTH,
        null=True,
        blank=True,
        validators=[
            MinLengthValidator(MIN_DNI_LENGTH),
            MaxLengthValidator(MAX_DNI_LENGTH),
            RegexValidator(regex=r'^\d+$')
        ])
    address = models.ManyToManyField(Address)

    def __str__(self):
        return self.user.get_full_name()
    
    def save(self, *args, **kwargs):
        # Check user is employee
        if not self.user.is_employee:
            raise TypeError('The User must be an Employee')
        # Check validation fields
        self.full_clean()
        # Save instance
        super(Employee, self).save(*args, **kwargs)

class Client(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    phone = models.CharField(
        max_length=MAX_PHONE_LENGTH,
        validators=[
            MinLengthValidator(MIN_DNI_LENGTH),
            MaxLengthValidator(MAX_DNI_LENGTH),
            RegexValidator(regex=r'^\d+$')
        ])
    address = models.ManyToManyField(Address)

