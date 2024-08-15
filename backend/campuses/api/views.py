from rest_framework.viewsets import ModelViewSet
from ..models import Campus
from .serializers import CampusSerializer

class CampusViewSet(ModelViewSet):
    queryset = Campus.objects.all()
    serializer_class = CampusSerializer