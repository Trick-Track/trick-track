from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from .models import Project
import json

def json_decode(request):
    json_data = json.loads(request.body.decode("utf-8"))
    return json_data

def projects(request):
    data = json_decode(request)
    if request.user.is_authenticated:
        if request.method == 'POST':
            project = Project(user=request.user, data=data)
            project.save()
            # TODO:
            # return correct http status or project ID            
            return HttpResponse('POST')
        elif request.method == 'GET':
            return HttpResponse('GET')
        else:
            print('something is wrong')

def project(request, id=id):
    if request.method == 'PATCH':
        return HttpResponse('POST')
    elif request.method == 'GET':
        return HttpResponse('GET')

