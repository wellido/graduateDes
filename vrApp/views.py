from django.shortcuts import render
from rest_framework import status
from vrApp.models import vrRecord
from vrApp.serializers import vrAppSerializer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

def index(request, format=None):
    return render(request,'vrApp/index.html')

@csrf_exempt
def vrRequst(request):
    if request.method == 'GET':
        vrapps = vrRecord.objects.all()
        serializer = vrAppSerializer(vrapps, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        serializer = vrAppSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

