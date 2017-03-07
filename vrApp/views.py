from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from vrApp.models import vrRecord
from vrApp.serializers import vrAppSerializer

def index(request, format=None):
    return render(request,'vrApp/index.html')

@api_view(['GET', 'POST'])
def vrRequst(request):
    if request.method == 'GET':
        vrapps = vrRecord.objects.all()
        serializer = vrAppSerializer(vrapps)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = vrAppSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

