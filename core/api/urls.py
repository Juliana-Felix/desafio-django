from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api import views

router = routers.DefaultRouter()
router.register('home', views.EstablishmentViewSet)
router.register('store', views.StoreViewSet)
router.register('contact', views.ContactStoreViewSet)
router.register('user', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/', views.ApiViews.login, name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token_refresh')
]