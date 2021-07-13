from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.models import User, auth
from .models import Project
import json

def json_decode(request):
  # if request.method == 'POST':
    json.loads(request.body.decode("utf-8"))
    json_data = json.loads(request.body)
    # print(json_data)
    return json_data

    # do your thing

def index(request):
    user = User()
    return render(request, 'daw/index.html')

# def login(request):
    # return redirect('accounts/login')

def retrieve_user_projects(request):
    # return redirect('/')
    # pass
    # return index(request)
    return redirect('/')

def user_projects(request):
    data = json_decode(request)
    if request.method == 'POST':
        # if user.
        print("Oh I've GOT SOMETHING")
        project = Project(user=user, data=data)
        project.save()
        return HttpResponse('POST')
    elif request.method == 'GET':
        return HttpResponse('GET')

def user_project(request, id=id):
    if request.method == 'POST':
        return HttpResponse('POST')
    elif request.method == 'GET':
        return HttpResponse('GET')


