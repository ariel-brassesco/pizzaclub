from django.db import models
from django.db.models import Q
from django.core.validators import MinLengthValidator, MaxLengthValidator, RegexValidator
from django.utils import timezone

from pizzaclub.settings import MAX_CUIL_LENGTH, MIN_CUIL_LENGTH
from pizzaclub.settings import MAX_PHONE_LENGTH, MIN_PHONE_LENGTH
from registration.models import Employee, Client, Address
from minio_storage.storage import MinioMediaStorage

storage = MinioMediaStorage()
# Create your models here.

class SizeProductError(Exception):
    pass

class PresentationProductError(Exception):
    pass

class SubTypeProduct(models.Model):
    order_n = models.PositiveSmallIntegerField(default=0)
    name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order_n', 'pk']

    def __str__(self):
        return self.name

class TypeProduct(models.Model):
    order_n = models.PositiveSmallIntegerField(default=0)
    name = models.CharField(max_length=20)
    subtype = models.ManyToManyField(SubTypeProduct, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order_n', 'pk']

    def __str__(self):
        return self.name
    
    def is_subtype(self, subtype_id):
        return self.subtype.filter(pk=subtype_id).exists()

class PresentationProduct(models.Model):
    '''
    Save porduct's characteristic different of size.
    For example, colors, shapes, etc.
    '''
    order_n = models.PositiveSmallIntegerField(default=0)
    name = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order_n', 'pk']

    def __str__(self):
        return self.name

class SizeProduct(models.Model):
    '''
    Save the diferent size type for products.
    '''
    order_n = models.PositiveSmallIntegerField(default=0)
    name = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order_n', 'pk']

    def __str__(self):
        return self.name

class FeatureProduct(models.Model):
    '''
    This models save information about special features of products,
    like vegan, vegetarian, suitable celiac, etc.
    Allows to save an unicode symbol.
    '''
    name = models.CharField(max_length=20)
    symbol = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} ({self.symbol})'

"""
class ProductImages(models.Model):

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="products/", storage=storage)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.image.url}"
    
    def save(self, *args, **kwargs):
        '''
            Change the name of file to uuid.
        '''
        # Get the file extension
        extension = '.' + self.image.name.split('.')[-1]
        # Change the name of image
        self.image.name = '/'.join([str(self.product.id), str(uuid.uuid4().hex + extension)])
        super(ProductImages, self).save(*args, **kwargs)
"""
class Shipping(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    cost = models.FloatField(default=0.0)

    def __str__(self):
        return str(self.cost)

class Place(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    instagram = models.URLField()
    whatsapp = models.URLField()
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
            MinLengthValidator(MIN_PHONE_LENGTH),
            MaxLengthValidator(MAX_PHONE_LENGTH),
            RegexValidator(regex=r'^\d+$')
        ])
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    shipping = models.ManyToManyField(Shipping, related_name='place')
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    '''
    This models save the data of products and the relation
    with characteristic's tables, like SizeProduct.
    '''
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    order_n = models.PositiveSmallIntegerField(default=0)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to="products/", storage=storage)
    types = models.ForeignKey(TypeProduct, on_delete=models.CASCADE)
    subtype = models.ForeignKey(SubTypeProduct, on_delete=models.SET_NULL, null=True, blank=True)
    presentation = models.ManyToManyField(PresentationProduct, blank=True)
    size = models.ManyToManyField(SizeProduct, blank=True)
    feature = models.ManyToManyField(FeatureProduct, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.subtype:
            return f"{self.name} ({self.types.name}:{self.subtype.name})"
        return f"{self.name} ({self.types.name})"
    
    def is_size(self, size_id):
        return self.size.filter(pk=size_id).exists()

    def is_presentation(self, presentation_id):
        return self.presentation.filter(pk=presentation_id).exists()

    def check_subtype(self):
        if not self.types.is_subtype(self.subtype.id):
            raise ValueError(f"Subtype must belong to Type of Product")

    def save(self, *args, **kwargs):
        if self.subtype: self.check_subtype()
        super(Product, self).save(*args, **kwargs)

class PriceList(models.Model):
    '''
    This model generate the list of prices for products,
    taking into account the size and presentation.
    '''
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='prices')
    presentation = models.ForeignKey(PresentationProduct, on_delete=models.SET_NULL, null=True, blank=True)
    size = models.ForeignKey(SizeProduct, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.FloatField(default=0)
    is_active = models.BooleanField(default=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['product', 'presentation', 'size'],
                name='unique_price'
                ),
            models.UniqueConstraint(
                fields=['product', 'size'],
                name='unique_price_without_presentation',
                condition=Q(presentation__isnull = True)
                ),
            models.UniqueConstraint(
                fields=['product', 'presentation'],
                name='unique_price_without_size',
                condition=Q(size__isnull = True)
                ),
            models.UniqueConstraint(
                fields=['product'],
                name='unique_price_without_presentation_and_size',
                condition=Q(presentation__isnull = True) & Q(size__isnull = True)
                ),
            ]

    def __str__(self):
        return str(self.product)

    def check_price_gte_zero(self):
        if self.price < 0:
            raise ValueError(f"Price must be greater than zero.")

    def check_size(self):
        if not self.product.is_size(self.size.id):
            raise SizeProductError('Size Product not valid.')

    def check_presentation(self):
        if not self.product.is_presentation(self.presentation.id): 
            raise PresentationProductError('Presentation Product not valid.')

    def save(self, *args, **kwargs):
        # Check price, size and presentation
        self.check_price_gte_zero()
        if self.size: self.check_size()
        if self.presentation: self.check_presentation()
        # If the Product is not active, the PriceProduct must be inactive too.
        if not self.product.is_active: self.is_active = False
        super(PriceList, self).save(*args, **kwargs)

class Order(models.Model):
    STATUS_CHOICES = [
        ('shipping', 'shipping'),
        ('open', 'open'),
        ('cancel', 'cancel'),
        ('pending', 'pending'),
        ('processing', 'processing'),
        ('delivering', 'delivering'),
        ('ready', 'ready')
        ]
    
    ORDER_TYPES = [
        ('whatsapp', 'whatsapp'),
        ('phone', 'phone'),
        ('local', 'local'),
        ('pedidos ya', 'pedidos ya')
    ]

    DELIVERY_CHOICES = [
        ('takeaway', 'takeaway'),
        ('delivery', 'delivery'),
        ('local', 'local')
    ]

    order = models.AutoField(primary_key=True)
    order_type = models.CharField(max_length=10, choices=ORDER_TYPES)
    date = models.DateTimeField(auto_now_add=True)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True)
    employee = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    table = models.PositiveSmallIntegerField(null=True)
    delivery_mode = models.CharField(max_length=8, choices=DELIVERY_CHOICES)
    delivery_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True)
    shipping = models.ForeignKey(Shipping, on_delete=models.SET_NULL, null=True)
    comment = models.TextField(blank=True, null=True)
    total = models.FloatField(default=0)
    is_delete = models.BooleanField(default=False)
    date_delete = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.order)

    def perform_delete(self):
        self.is_delete = True
        self.date_delete = timezone.now()
        self.save()

    def save(self, *args, **kwargs):
        # Set the value of shipping
        if self.delivery_mode == 'delivery': self.shipping = Shipping.objects.last()
        shipping_cost = self.shipping.cost if self.shipping else 0.0
        # Calculate the total
        total = 0
        for item in self.items.select_related():
            total += item.total
        self.total = total + shipping_cost
        super(Order, self).save(*args, **kwargs)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(PriceList, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    unitary_price = models.FloatField(default=0)
    discount = models.FloatField(default=0.0)
    total = models.FloatField(default=0)
    
    def __str__(self):
        return f"#{self.id}"
    
    def check_discount(self):
        if self.discount > self.total: raise ValueError('Discount is greater than Total')

    def save(self, *args, **kwargs):
        self.unitary_price = self.product.price
        self.total = self.quantity*self.unitary_price - self.discount
        #self.total_cost = self.quantity*self.unitary_cost
        self.check_discount()
        super(OrderItem, self).save(*args, **kwargs)
 