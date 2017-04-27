#encoding=utf-8
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
import urllib, urllib2, pycurl
import base64
import StringIO
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
# 删除旧wav
def rmAudio():
    sshClient = ssh.SSHClient()
    sshClient.set_missing_host_key_policy(ssh.AutoAddPolicy())
    sshClient.connect("192.168.1.108", port=22, username="april", password="xiaojing527")
    stdin, stdout, stderr = sshClient.exec_command("cd /home/april/kaldi/egs/thchs30/online_demo/"
                                                  "online-data/audio/;rm audio.wav")
    if stdout.channel.recv_exit_status()== 0:
        print "delete old audio success."
    else :
        print "delete old audio error."
# 远程操纵kaldi
def sshKaldi():
    sshClient = ssh.SSHClient()
    sshClient.set_missing_host_key_policy(ssh.AutoAddPolicy())
    sshClient.connect("192.168.1.108", port=22, username="april", password="xiaojing527")
    stdin, stdout, stderr = sshClient.exec_command("cd /home/april/kaldi/egs/thchs30/online_demo/;"
                                                   "bash run.sh")
    readRrturn = stdout.read()
    print readRrturn
    return readRrturn
# kaldi返回结果处理
def stringSplit(str):
    str1="ce!"
    str2="%WER"
    index1 = str.index(str1)
    index2 = str.index(str2)
    return str[index1+3:index2]
# api返回结果处理
def stringSplit2(str):
    str1=":[\""
    str2="，\"]"
    index1 = str.index(str1)
    index2 = str.index(str2)
    return str[(index1+3):index2]
#获取api操纵权
def get_token():
    apiKey = "8s01laGyUBMsAnmMMx2DHVVH"
    secretKey = "230b13a0116c4cfda432412062999c6c"
    auth_url = "https://openapi.baidu.com/oauth/2.0/token?" \
               "grant_type=client_credentials&client_id=" \
               + apiKey + "&client_secret=" + secretKey;
    res = urllib2.urlopen(auth_url)
    json_data = res.read()
    return json.loads(json_data)['access_token']
# 打印res
def dump_res(buf):
    print buf
# 调用百度api
def use_cloud(token):
    fp = wave.open('/home/april/kaldi/egs/thchs30/online_demo/online-data/audio/audio.wav', 'rb')
    nf = fp.getnframes()
    f_len = nf * 2
    audio_data = fp.readframes(nf)

    cuid = "48:d2:24:50:ad:84"
    srv_url = 'http://vop.baidu.com/server_api' + '?cuid=' + cuid + '&token=' + token
    http_header = [
        'Content-Type: audio/pcm; rate=8000',
        'Content-Length: %d' % f_len
    ]
    apiResult = StringIO.StringIO()
    crulPost = pycurl.Curl()
    crulPost.setopt(pycurl.URL, str(srv_url))
    crulPost.setopt(crulPost.HTTPHEADER, http_header)
    crulPost.setopt(crulPost.POST, 1)
    crulPost.setopt(crulPost.CONNECTTIMEOUT, 30)
    crulPost.setopt(crulPost.TIMEOUT, 30)
    crulPost.setopt(crulPost.WRITEFUNCTION, apiResult.write)
    crulPost.setopt(crulPost.POSTFIELDS, audio_data)
    crulPost.setopt(crulPost.POSTFIELDSIZE, f_len)
    crulPost.perform()
    return stringSplit2(apiResult.getvalue())
# 存放数据
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
                token = get_token()
                apiRes = use_cloud(token)
                apiPostJson = json.dumps(apiRes,ensure_ascii=False)
                return JsonResponse(apiPostJson, safe=False, status=status.HTTP_201_CREATED)
            return JsonResponse("not ok", safe=False,status=status.HTTP_400_BAD_REQUEST)




