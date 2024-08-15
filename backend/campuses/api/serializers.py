from rest_framework.serializers import ModelSerializer
from ..models import Campus

class CampusSerializer(ModelSerializer):
    class Meta:
        model = Campus
        fields = ('id', 'name')