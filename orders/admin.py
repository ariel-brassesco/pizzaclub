from django.contrib import admin

# Register your models here.
from .models import TypeProduct, SubTypeProduct, SizeProduct, Product, PriceList, Place


admin.site.register(TypeProduct)
admin.site.register(SubTypeProduct)
admin.site.register(SizeProduct)
admin.site.register(Product)
admin.site.register(PriceList)
admin.site.register(Place)

