from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

from .models import Client, Address

class ClientSerializer(ModelSerializer):
    '''
        Serialize the data of client.
    '''
    
    class Meta:
        model = Client
        fields = ['name', 'phone', 'email', 'address']

