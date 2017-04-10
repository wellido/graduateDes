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
import subprocess
from django.views.decorators.csrf import csrf_exempt
reload(sys)
sys.setdefaultencoding('utf-8')

# kaldi run.sh path
cmd = '/home/april/kaldi/egs/thchs30/online_demo/run.sh'

conn = sqlite3.connect("/home/april/graduateDes/db.sqlite3",check_same_thread = False)
cu=conn.cursor();

def index(request, format=None):
    return render(request,'vrApp/index.html')

def prn_obj(obj):
    print '\n'.join(['%s:%s' % item for item in obj.__dict__.items()])

def insertinaryToDB(conn, cu, audioFile, audioBinary):
	cu.execute("UPDATE vrApp_vrrecord audioBinary = '"+str(audioBinary)+"' WHERE audioFile = '"+str(audioFile)+"'" )
	conn.commit()

def insertToDB(conn, cu, audioFile, textFile,audioBinary):
    cu.execute("INSERT INTO vrApp_vrrecord(audioFile, textFile,audioBinary) VALUES (?,?,?)", (audioFile, textFile,audioBinary) )
    conn.commit()

# def output_wave(path, frames):
    # Python 3.X allows the use of the with statement
    # with wave.open(path,'w') as output:
    #     # Set parameters for output WAV file
    #     output.setparams((2,2,rate,0,'NONE','not compressed'))
    #     output.writeframes(frames)

    # output = wave.open(path,'w')
    # output.setparams((2,2,rate,0,'NONE','not compressed'))
    # output.writeframes(frames)
    # output.close()

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
        # with open("audio.wav", 'wb') as file:
        #     file.write(postDict['audioBinary'])
        # p = os.popen(cmd)
        p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

        # p = create_multiprocess(target=getsmoketest,
        # args=[intranetip, username, password])
        #
        # def create_multiprocess(target, args=()):
        #      p = multiprocessing.Process(target=target, args=args)
        #      p.start()
        #      return p
        # script_path = os.path.join(BASE_DIR, "common/smoketestreport/runsmoketestcases.sh")
        # args = ["sh", "-x", script_path, self.ip, self.user, self.password, BASE_DIR]
        # exit_value = 1
        # try:
        #    process = subprocess.Popen(args, bufsize=1, stdout=subprocess.PIPE, close_fds=True, preexec_fn=os.setsid,
        #                            universal_newlines=True)
        #    while process.poll() is None:
        #       out_put_log = process.stdout.readline()
        #       self.logger.output_shelllog_to_logger(out_put_log)
        #       process.wait()
        #    exit_value = process.returncode
        # except Exception, e:
        #    self.logger.error(e.message)



        while p.poll() == None:
            line = p.stdout.readline()
            print line
            shellResult=""
            shellResult = shellResult + line
        if postDict:
            insertToDB(conn,cu,postDict['audioFile'],postDict['textFile'],postDict['audioBinary'])
            return JsonResponse("ok", safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse("not ok", safe=False,status=status.HTTP_400_BAD_REQUEST)




