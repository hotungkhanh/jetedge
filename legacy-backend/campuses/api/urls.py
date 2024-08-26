from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CampusViewSet

campus_router = DefaultRouter()
campus_router.register(r'campuses', CampusViewSet)