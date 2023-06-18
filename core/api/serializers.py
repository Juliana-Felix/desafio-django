from rest_framework import serializers
from .models import Establishment, Store, Contact_store, User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.CharField(source='django_user.email')
    password = serializers.CharField(source='django_user.password')

    class Meta:
        model = User
        fields = [
            'id', 'email','password','created_at','updated_at'
        ]

class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ('id', 'name', 'address', 'phone',
            'business_type', 'email_address', 'state', 'category', 'created_at', 'updated_at' )
        

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('id', 'name', 'description', 'service', 'cod_establishment')
        


class ContactStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact_store
        fields = ('id', 'phone', 'email_address', 'instagram','whatsapp', 'cod_store')
        
