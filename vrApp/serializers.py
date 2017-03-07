from rest_framework import serializers
from vrApp.models import vrRecord

class vrAppSerializer(serializers.Serializer):
    class Meta:
        model = vrRecord
        fields = ('audioFile', 'textFile')