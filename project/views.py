from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from django.core.serializers import serialize, deserialize
from .models import Project
import json

def json_decode(request):
    json_data = json.loads(request.body.decode("utf-8"))
    return json_data

def serialize(project):
    data = serialize('json', project)
    return data

def validate(project):
    pass

def save(data, user):
    name = data['name']
    bpm = data['bpm']
    lanes = data['lanes']
    if not Project.objects.filter(user=user, name=name).exists():
        project = Project(name=name, bpm=bpm, user=user, lanes=lanes)
        project.save()
    else:
        print('EXISTS! throw an exception, Bro!')

def update():
    pass

def retrieve(user, project_name):
    project = Project.objects.get(user=user, name=project_name)
    response = serialize(project)
    return response

def retrieve_all(user):
    return Project.objects.filter(user=user)

def delete():
    pass

def delete_all(user):
    Project.objects.filter(user=user).delete()

def projects(request):
    print('in projects')
    if request.user.is_authenticated:
        user = request.user
        if request.method == 'GET':
            retrieve_all(user)
        elif request.method == 'POST':
            project = json_decode(request)
            save(project, user)
            return JsonResponse()
        elif request.method == 'DELETE':
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
