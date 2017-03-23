from django.shortcuts import render
from rest_framework import status
from vrApp.models import vrRecord
from vrApp.serializers import vrAppSerializer
from django.http import HttpResponse, JsonResponse
import json
import sqlite3
import sys
# from rest_framework.renderers import JSONRenderer
# from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt

reload(sys)
sys.setdefaultencoding('utf-8')

conn = sqlite3.connect("/home/april/graduateDes/db.sqlite3",check_same_thread = False)
cu=conn.cursor();

def index(request, format=None):
    return render(request,'vrApp/index.html')

def prn_obj(obj):
    print '\n'.join(['%s:%s' % item for item in obj.__dict__.items()])

def insertinaryToDB(conn, cu, audioFile, audioBinary):

	cu.execute("UPDATE vrrecord audioBinary = '"+str(audioBinary)+"' WHERE audioFile = '"+str(audioFile)+"'" )
	conn.commit()

def insertToDB(conn, cu, audioFile, textFile,audioBinary):
    cu.execute("INSERT INTO vrrecord(audioFile, textFile,audioBinary) VALUES (?,?,?)", audioFile, textFile,audioBinary )
    conn.commit()

@csrf_exempt
def vrRequst(request):
    if request.method == 'GET':
        vrapps = vrRecord.objects.all()
        print(type(vrapps[0]))
        serializer = vrAppSerializer(vrapps, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        postDict={}
        # data = request.POST
        req = json.loads(request.body)
        postDict['audioFile']=req['audioFile']
        postDict['textFile']=req['textFile']
        # postDict['audioFileRes']=req['audioFileRes']
        postDict['audioBinary']=buffer(req['audioBinary'])
        # audioBinary=buffer(req['audioBinary'])
        postList=[postDict]
        serializer = vrAppSerializer(data=postList, many=True)
        # print serializer
        if serializer.is_valid():
            serializer.save()
            # insertinaryToDB(conn,cu,postDict['audioFile'],audioBinary)
            insertToDB(conn,cu,postDict['audioFile'],postDict['textFile'],postDict['audioBinary'])
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.data, safe=False,status=status.HTTP_400_BAD_REQUEST)




