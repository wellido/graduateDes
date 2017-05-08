from rest_framework import serializers
from vrApp.models import vrRecord

class vrAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = vrRecord
        fields = ('vrID','audioFile', 'textFile','textRealFile')