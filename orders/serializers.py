from rest_framework.serializers import ModelSerializer, RelatedField
from .models import (
    Product,
    PriceList,
    SubTypeProduct,
    TypeProduct,
    SizeProduct,
    PresentationProduct,
    FeatureProduct,
    Place
    )
from registration.models import Address

class ExtraFieldsSerializer(ModelSerializer):
    '''
     This class override th get_field_names to add extra field defined in Meta class
     as extra_fields
    '''
    def get_field_names(self, declared_fields, info):
        expanded_fields = super(ExtraFieldsSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields

# class LogoPlaceSerializer(RelatedField):
#     '''
#         Serialize only the url of each image.
#     '''
#     def to_representation(self, value):
#         return value.logo.url

class AddressSerializer(ExtraFieldsSerializer):
    class Meta:
        model = Address
        fields = '__all__' 

class OwnerSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Place Class.
    '''
    address = AddressSerializer(read_only=True)
    class Meta:
        model = Place
        fields = (
            'id',
            'name',
            'instagram',
            'whatsapp',
            'phone',
            'address'
        )

class SubTypeSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    class Meta:
        model = SubTypeProduct
        fields = '__all__'

class TypeSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    subtype = SubTypeSerializer(many=True, read_only=True)
    class Meta:
        model = TypeProduct
        fields = '__all__'

class SizeSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    class Meta:
        model = SizeProduct
        fields = '__all__'

class PresentationSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    class Meta:
        model = PresentationProduct
        fields = '__all__'

class FeatureSerializer(ExtraFieldsSerializer):
    '''
        Serializer of Category Class.
    '''
    class Meta:
        model = FeatureProduct
        fields = '__all__'

class PriceSerializer(RelatedField):
    '''
        Change the representation for price in the ProductSerializer.
    '''
    def to_representation(self, value):
        size = value.size.id if value.size else None 
        presentation = value.presentation.id if value.presentation else None
        return {
            'size': size,
            'presentation': presentation,
            'price': value.price
            }

class ProductSerializer(ExtraFieldsSerializer):
    '''
        Serialize the data of product.
    '''
    # images = ProductImagesSerializer(many=True, read_only=True)
    size = SizeSerializer(many=True, read_only=True)
    presentation = PresentationSerializer(many=True, read_only=True)
    feature = FeatureSerializer(many=True, read_only=True)
    prices = PriceSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
