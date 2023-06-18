from django.contrib.auth.models import User as AdminUser
from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key = True)
    admin_user = models.OneToOneField(
        AdminUser, 
        null = False, 
        blank = False,
        on_delete = models.CASCADE, 
    )


class Establishment(models.Model):
    id = models.AutoField(primary_key=True) 
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=13)
    business_type = models.CharField(max_length=100)
    email_address = models.EmailField(unique=True)
    state = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Store(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=50)
    service = models.CharField(max_length=50)
    cod_establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)

class Contact_store(models.Model):
    id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=13)
    email_address = models.EmailField()
    instagram = models.CharField(max_length=30)
    whatsapp = models.CharField(max_length=13)
    cod_store = models.ForeignKey(Store, on_delete=models.CASCADE)

