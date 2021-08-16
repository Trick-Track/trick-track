from django.http import HttpResponse
from django.shortcuts import redirect
from django.http import JsonResponse
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from .models import Project
import json


def projects(request):
    if request.user.is_authenticated:
        user = request.user
        if request.method == 'GET':
            return JsonResponse(serialize(retrieve_all(user)), 
                                encoder=DjangoJSONEncoder, 
                                safe=False)
        elif request.method == 'POST':
            return JsonResponse(serialize([new(request, user), ]),
                                encoder=DjangoJSONEncoder, 
                                safe=False)
        elif request.method == 'DELETE':
            delete_all(user)
    else:
        return HttpResponse(status=401)


def project(request, id=id):
    if request.user.is_authenticated:
        user = request.user
        if request.method == 'GET':
            project = retrieve(id)
            serialized = serialize([project, ])
            return JsonResponse(serialized, 
                                encoder=DjangoJSONEncoder, 
                                safe=False)
        elif request.method == 'PATCH':
            updated_project = update(request, id)
            serialized_project = serialize([updated_project, ])
            return JsonResponse(serialized_project, 
                                encoder=DjangoJSONEncoder, 
                                safe=False)
        elif request.method == 'DELETE':
            delete(id)
            return JsonResponse(serialize(retrieve_all(user)), 
                                encoder=DjangoJSONEncoder, 
                                safe=False)
    else:
        return HttpResponse(status=401)


def json_decode(request):
    json_data = json.loads(request.body.decode("utf-8"))
    print(json_data)
    return json_data


def new(request, user):
    new_project = json_decode(request)
    if valid(new_project):
        name = new_project['name']
        bpm = new_project['bpm']
        lanes = new_project['lanes']
        if not Project.objects.filter(user=user, name=name).exists():
            project = Project(name=name, bpm=bpm, user=user, lanes=lanes)
            project.save()
        else:
            project = Project.objects.get(user=user, name=name)
    return project


def update(request, id):
    version = json_decode(request)
    name = version['name']
    bpm = version['bpm']
    lanes = version['lanes']
    project = Project.objects.get(pk=id)
    project.name = name
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


# function to delete all projects of current user 
# in response to url 'projects/delete_everything'
def delete_everything(request):
    user = request.user
    delete_all(user)
    return redirect('/')


def serialize(projects):
    return serializers.serialize('json', projects)


def valid(project):
    return project
