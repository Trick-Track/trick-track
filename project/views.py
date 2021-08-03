from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from .models import Project
import json

def json_decode(request):
    json_data = json.loads(request.body.decode("utf-8"))
    return json_data

def save(data, user):
    name = data['name']
    bpm = data['bpm']
    lanes = data['lanes']
    project = Project(name=name, bpm=bpm, user=user, lanes=lanes)
    project.save()

def update():
    pass

def retrieve():
    pass

def retrieve_all():
    pass

def delete():
    pass

def delete_all(user):
    Project.objects.filter(user=user).delete()

def projects(request):
    print('in projects')
    if request.user.is_authenticated:
        user = request.user
        print(user)
        if request.method == 'GET':
            retrieve_all(user)
        elif request.method == 'POST':
            project = json_decode(request)
            save(project, user)
        elif request.method == 'DELETE':
            print('I am IN')
            delete_all(user)
    else:
        print('something is wrong')
    return HttpResponse('OK')

def project(request, id=id):
    if request.method == 'GET':
        retrieve(project)
    elif request.method == 'PUT':
        project = json_decode(request)
        update()
    elif request.method == 'GET':
        return HttpResponse('GET')
    return HttpResponse('OK')
