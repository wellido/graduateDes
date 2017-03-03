from django.shortcuts import render
# Create your views here.

def index(request):
    testList = ["HTML", "CSS", "jQuery", "Python", "Django"]
    context = {'latest_question_list': testList,}
    return render(request,'vrApp/index.html',context)

