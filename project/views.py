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

def save(from_frontend, user):
    name = from_frontend['name']
    # print('name = ', name)
    bpm = from_frontend['bpm']
    lanes = from_frontend['lanes']
    if not Project.objects.filter(user=user, name=name).exists():
        project = Project(name=name, bpm=bpm, user=user, lanes=lanes)
        project.save()
    else:
        project = Project.objects.get(user=user, name=name)
    return project
    
def update(from_frontend, id):
    # print(from_frontend)
    bpm = from_frontend['bpm']
    # print(bpm)
    lanes = from_frontend['lanes']
    project = Project.objects.get(pk=id)
    project.bpm = bpm
    project.lanes = lanes
    project.save()
    return project

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
            all_projects = serialize(retrieve_all(user))
            return JsonResponse(all_projects, encoder=DjangoJSONEncoder, safe=False)
        elif request.method == 'POST':
            project = json_decode(request)
            saved_project = save(project, user)
            serialized = serialize([saved_project, ])
            return JsonResponse(serialized, encoder=DjangoJSONEncoder, safe=False)
        elif request.method == 'DELETE':
            delete_all(user)
    else:
        return redirect('accounts/login/')

def project(request, id=id):
    if request.user.is_authenticated:
        user = request.user
        if request.method == 'GET':
            project = retrieve(id)
            serialized = serialize([project, ])
            return JsonResponse(serialized, encoder=DjangoJSONEncoder, safe=False)
        elif request.method == 'PUT':
            project = json_decode(request)
            updated_project = update(project, id)
            serialized = serialize([updated_project, ])
            return JsonResponse(serialized, encoder=DjangoJSONEncoder, safe=False)
        elif request.method == 'DELETE':
            delete(id)
            all_projects = serialize(retrieve_all(user))
            return JsonResponse(all_projects, encoder=DjangoJSONEncoder, safe=False)
    else:
        return redirect('accounts/login/')

    # function to delete all projects of current user 
    # in response to url 'projects/delete_everything'

def delete_everything(request):
    user = request.user
    delete_all(user)
    return redirect('/')