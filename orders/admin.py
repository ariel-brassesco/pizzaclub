from django.contrib import admin

# Register your models here.
from .models import TypeProduct, SubTypeProduct, PresentationProduct, SizeProduct, FeatureProduct
from .models import Product, PriceList, Place, Shipping, Order, OrderItem

class PlaceAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'email',
        'created_at',
        'last_modified'
    )
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name',
                    'description',
                    'types',
                    'subtype',
                    'is_active',
                    'created_at',
                    'last_modified')
    #list_filter = ['menu_type', 'name']
    search_fields = ['name', 'types']
    ordering=['types', 'name']
    filter_horizontal = ('presentation', 'size', 'feature')

class TypeAdmin(admin.ModelAdmin):
    list_display = (
        'order_n',
        'name',
        'created_at',
        'last_modified')
    #list_filter = ['menu_type', 'name']
    #search_fields = ['name', 'types']
    ordering=['order_n', 'name']
    filter_horizontal = ('subtype',)

class PriceAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'presentation',
        'size',
        'is_active',
        'is_available',
        'created_at',
        'last_modified'
    )

admin.site.register(TypeProduct, TypeAdmin)
admin.site.register(SubTypeProduct)
admin.site.register(SizeProduct)
admin.site.register(PresentationProduct)
admin.site.register(FeatureProduct)
admin.site.register(Product, ProductAdmin)
admin.site.register(PriceList, PriceAdmin)
admin.site.register(Place, PlaceAdmin)
admin.site.register(Shipping)
admin.site.register(Order)
admin.site.register(OrderItem)

