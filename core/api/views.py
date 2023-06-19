from rest_framework import viewsets, filters, status
from rest_framework.exceptions import NotFound, ValidationError, ParseError
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from django.contrib.auth.models import User as AdminUser


from .models import Establishment, Store, Contact_store, User
from .serializers import EstablishmentSerializer, StoreSerializer, ContactStoreSerializer, UserSerializer

class ApiViews:
    @api_view(['POST'])
    def login(request):
        return Response()

    @api_view(['POST'])
    def logout(request):
        return Response()

    @api_view(['POST'])
    def edit_profile(request):
        user = request.user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def create(self, request):
        try:
            user = User()

            adm = AdminUser()
            adm.email = request.data['email']
            adm.username = request.data['email']
            adm.set_password(request.data['password'])
            adm.save()

            user.admin_user = adm
            user.save()

            return Response(request.data, status=status.HTTP_201_CREATED)


        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except ParseError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

    def update(self, request, pk):
        try:
            user = User.objects.get(id = pk)
        
            user.django_user.email = request.data['email']
            user.django_user.username = request.data['email']
            user.django_user.set_password(request.data['password'])

            user.django_user.save()
            user.save()

            return Response(request.data, status=status.HTTP_201_CREATED)

        except NotFound:
            return Response({'error': 'Usuário não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except ParseError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
    
class EstablishmentViewSet(viewsets.ModelViewSet):
    queryset = Establishment.objects.all().order_by('-name')
    serializer_class = EstablishmentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['category']

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        search_query = request.query_params.get('search', None)

        if search_query:
            queryset = queryset.filter(name__icontains=search_query)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            establishment = self.get_object()
            serializer = self.get_serializer(establishment, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        except NotFound:
            return Response({'error': 'Estabelecimento não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except ParseError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)

            return Response(status=status.HTTP_204_NO_CONTENT)

        except NotFound:
            return Response({'error': 'Estabelecimento não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
    def filter_by_category(self, request):
        category = request.query_params.get('category', None)

        if category:
            queryset = self.get_queryset().filter(category=category)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

        return Response({'detail': 'Category not provided.'}, status=status.HTTP_400_BAD_REQUEST)



class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all().order_by('-name')
    serializer_class = StoreSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        search_query = request.query_params.get('search', None)

        if search_query:
            queryset = queryset.filter(name__icontains=search_query)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            store = self.get_object()
            serializer = self.get_serializer(store, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        except NotFound:
            return Response({'error': 'Loja não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except ParseError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)

            return Response(status=status.HTTP_204_NO_CONTENT)

        except NotFound:
            return Response({'error': 'Loja não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    
    def get_store_by_establishment(self, request, *args, **kwargs):
        establishment_id = kwargs.get('establishment_id')
        
        try:
            queryset = self.get_queryset().filter(cod_establishment=establishment_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except NotFound:
            return Response({'error': 'Nenhuma loja encontrada para o estabelecimento informado.'}, status=status.HTTP_404_NOT_FOUND)


class ContactStoreViewSet(viewsets.ModelViewSet):
    queryset = Contact_store.objects.all()
    serializer_class = ContactStoreSerializer

    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None):
        try:
            contact = self.get_object()
            serializer = self.get_serializer(contact, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        except NotFound:
            return Response({'error': 'Estabelecimento não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except ParseError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)

            return Response(status=status.HTTP_204_NO_CONTENT)

        except NotFound:
            return Response({'error': 'Estabelecimento não encontrado.'}, status=status.HTTP_404_NOT_FOUND)