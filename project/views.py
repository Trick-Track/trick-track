from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from .models import Project
import json

def json_decode(request):
    json_data = json.loads(request.body.decode("utf-8"))
    return json_data

def serialize(projects):
    return serializers.serialize('json', projects)

def validate(project):
    pass

def save(data, user):
    name = data['name']
    bpm = data['bpm']
    lanes = data['lanes']
    project = Project(name=name, bpm=bpm, user=user, lanes=lanes)
    if not Project.objects.filter(user=user, name=name).exists():
        project.save()
    return project
    

def update():
    pass

def retrieve(id):
    project = Project.objects.get(pk=id)
    return project

def retrieve_all(user):
    user_projects = Project.objects.filter(user=user)
    return user_projects

def delete(id):
    project = Project.objects.get(pk=id)
    project.delete()

def delete_all(user):
    Project.objects.filter(user=user).delete()

def projects(request):
    if request.user.is_authenticated:
        user = request.user
        if request.method == 'GET':
            projects_list = retrieve_all(user)
            serialized_list = serialize(projects_list)
            return JsonResponse(serialized_list, encoder=DjangoJSONEncoder, safe=False)
        elif request.method == 'POST':
            project = json_decode(request)
            saved = save(project, user)
            serialized = serialize([saved, ])
            return JsonResponse(serialized, encoder=DjangoJSONEncoder, safe=False)
        elif request.method == 'DELETE':
            delete_all(user)
    else:
        return redirect('accounts/login/')

def project(request, id=id):
    if request.method == 'GET':
        project = retrieve(id)
        serialized = serialize([project, ])
        return JsonResponse(serialized, encoder=DjangoJSONEncoder, safe=False)
    elif request.method == 'PUT':
        project = json_decode(request)
        update()
    elif request.method == 'DELETE':
        delete(id)
        return HttpResponse('DELETED')
    return HttpResponse('OK')
