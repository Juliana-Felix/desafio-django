from django.test import TestCase
from django.contrib.auth.models import User as AdminUser
from api.models import User, Establishment, Store, Contact_store

class UserModelTestCase(TestCase):
    def setUp(self):
        self.admin_user = AdminUser.objects.create(username="admin")
        self.user = User.objects.create(admin_user=self.admin_user)

    def test_user_fields(self):
        self.assertEqual(self.user.admin_user, self.admin_user)

class EstablishmentModelTestCase(TestCase):
    def setUp(self):
        self.establishment = Establishment.objects.create(
            name="My Establishment",
            address="123 Main Street",
            phone="123-456-7890",
            business_type="Retail",
            email_address="info@example.com",
            state="California",
            category="Food",
        )

    def test_establishment_fields(self):
        self.assertEqual(self.establishment.name, "My Establishment")
        self.assertEqual(self.establishment.address, "123 Main Street")
        self.assertEqual(self.establishment.phone, "123-456-7890")
        self.assertEqual(self.establishment.business_type, "Retail")
        self.assertEqual(self.establishment.email_address, "info@example.com")
        self.assertEqual(self.establishment.state, "California")
        self.assertEqual(self.establishment.category, "Food")

class StoreModelTestCase(TestCase):
    def setUp(self):
        self.establishment = Establishment.objects.create(
            name="My Establishment",
            address="123 Main Street",
            phone="123-456-7890",
            business_type="Retail",
            email_address="info@example.com",
            state="California",
            category="Food",
        )
        self.store = Store.objects.create(
            name="My Store",
            description="Test store",
            service="Online",
            cod_establishment=self.establishment,
        )

    def test_store_fields(self):
        self.assertEqual(self.store.name, "My Store")
        self.assertEqual(self.store.description, "Test store")
        self.assertEqual(self.store.service, "Online")
        self.assertEqual(self.store.cod_establishment, self.establishment)

class ContactStoreModelTestCase(TestCase):
    def setUp(self):
        self.establishment = Establishment.objects.create(
            name="My Establishment",
            address="123 Main Street",
            phone="123-456-7890",
            business_type="Retail",
            email_address="info@example.com",
            state="California",
            category="Food",
        )
        self.store = Store.objects.create(
            name="My Store",
            description="Test store",
            service="Online",
            cod_establishment=self.establishment,
        )
        self.contact_store = Contact_store.objects.create(
            phone="123-456-7890",
            email_address="contact@example.com",
            instagram="@example",
            whatsapp="123-456-7890",
            cod_store=self.store,
        )

    def test_contact_store_fields(self):
        self.assertEqual(self.contact_store.phone, "123-456-7890")
        self.assertEqual(self.contact_store.email_address, "contact@example.com")
        self.assertEqual(self.contact_store.instagram, "@example")
        self.assertEqual(self.contact_store.whatsapp, "123-456-7890")
        self.assertEqual(self.contact_store.cod_store, self.store)
