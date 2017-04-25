from django.shortcuts import render
from rest_framework import status
from vrApp.models import vrRecord
from vrApp.serializers import vrAppSerializer
from django.http import HttpResponse, JsonResponse
import json
import sqlite3
import sys
import wave
import commands
import os
import ssh
from django.views.decorators.csrf import csrf_exempt
reload(sys)
sys.setdefaultencoding('utf-8')

audioPath = "/home/april/kaldi/egs/thchs30/online_demo/online-data/audio/"
# kaldi run.sh path
cmd = '/home/april/kaldi/egs/thchs30/online_demo/run.sh'
conn = sqlite3.connect("/home/april/graduateDes/db.sqlite3",check_same_thread = False)
cu=conn.cursor();

def index(request, format=None):
    return render(request,'vrApp/index.html')

def prn_obj(obj):
    print '\n'.join(['%s:%s' % item for item in obj.__dict__.items()])

def insertinaryToDB(conn, cu, audioFile, audioBinary):
	cu.execute("UPDATE vrApp_vrrecord audioBinary = '"+str(audioBinary)+
               "' WHERE audioFile = '"+str(audioFile)+"'" )
	conn.commit()

def insertToDB(conn, cu, audioFile, textFile,audioBinary):
    cu.execute("INSERT INTO vrApp_vrrecord(audioFile, textFile,audioBinary) "
               "VALUES (?,?,?)", (audioFile, textFile,audioBinary) )
    conn.commit()

def rmAudio():
    sshClient = ssh.SSHClient()
    sshClient.set_missing_host_key_policy(ssh.AutoAddPolicy())
    sshClient.connect("202.115.24.67", port=22, username="april", password="xiaojing527")
    stdin, stdout, stderr = sshClient.exec_command("cd /home/april/kaldi/egs/thchs30/online_demo/"
                                                  "online-data/audio/;rm audio.wav")
    if stdout.channel.recv_exit_status()== 0:
        print "delete old audio success."
    else :
        print "delete old audio error."

def sshKaldi():
    sshClient = ssh.SSHClient()
    sshClient.set_missing_host_key_policy(ssh.AutoAddPolicy())
    sshClient.connect("202.115.24.67", port=22, username="april", password="xiaojing527")
    stdin, stdout, stderr = sshClient.exec_command("cd /home/april/kaldi/egs/thchs30/online_demo/;"
                                                   "bash run.sh")
    readRrturn = stdout.read()
    print readRrturn
    return readRrturn

def stringSplit(str):
    str1="ce!"
    str2="%WER"
    index1 = str.index(str1)
    index2 = str.index(str2)
    return str[index1+3:index2]

@csrf_exempt
def vrRequst(request):
    if request.method == 'GET':
        vrapps = vrRecord.objects.all()
        print(type(vrapps[0]))
        serializer = vrAppSerializer(vrapps, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        postDict={}
        req = json.loads(request.body)
        postDict['audioFile']=req['audioFile']
        postDict['textFile']=req['textFile']
        postDict['audioBinary']=req['audioBinary']
        rmAudio()
        with open(audioPath+"audio.wav", 'wb') as file:
            file.write(postDict['audioBinary'])
        if req['isKaldi']==0:
            kaldiResult = stringSplit(sshKaldi());
            kaldiPostJson = json.dumps(kaldiResult,ensure_ascii=False)
            print kaldiPostJson
            if postDict:
                insertToDB(conn,cu,postDict['audioFile'],postDict['textFile'],postDict['audioBinary'])
                return JsonResponse(kaldiPostJson, safe=False, status=status.HTTP_201_CREATED)
            return JsonResponse("not ok", safe=False,status=status.HTTP_400_BAD_REQUEST)
        else:
            if postDict:
                insertToDB(conn,cu,postDict['audioFile'],postDict['textFile'],postDict['audioBinary'])
                return JsonResponse("ok", safe=False, status=status.HTTP_201_CREATED)
            return JsonResponse("not ok", safe=False,status=status.HTTP_400_BAD_REQUEST)




