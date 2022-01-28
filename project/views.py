from django.http import HttpResponse
from django.shortcuts import redirect
from django.http import JsonResponse
from django.core import serializers
from django.core.exceptions import ValidationError
from .models import Project
import json


ERRORS = {
    "name_is_taken": {"error": "Name is already taken. Please choose another one."}
}


def projects(request):
    if request.user.is_authenticated:
        user = request.user
        if request.method == "GET":
            return JsonResponse(serialize(retrieve_all(user)), safe=False)
        elif request.method == "POST":
            saved = new(request, user)
            if saved:
                answer = serialize(
                    [
                        saved,
                    ]
                )
            else:
                answer = ERRORS["name_is_taken"]
            return JsonResponse(answer, safe=False)
        elif request.method == "DELETE":
            delete_all(user)
    else:
        return HttpResponse(status=401)


def project(request, id=id):
    if request.user.is_authenticated:
        user = request.user
        if request.method == "GET":
            project = retrieve(id)
            serialized = serialize(
                [
                    project,
                ]
            )
            return JsonResponse(serialized, safe=False)
        elif request.method == "PATCH":
            updated_project = update(request, id)
            if not updated_project:
                answer = ERRORS["name_is_taken"]
            else:
                serialized_project = serialize(
                    [
                        updated_project,
                    ]
                )
                answer = serialized_project
            return JsonResponse(answer, safe=False)
        elif request.method == "DELETE":
            delete(id)
            return JsonResponse(serialize(retrieve_all(user)), safe=False)
    else:
        return HttpResponse(status=401)


def json_decode(request):
    json_data = json.loads(request.body.decode("utf-8"))
    return json_data


def new(request, user):
    new_project = json_decode(request)
    if valid(new_project):
        try:
            name = new_project["name"]
            bpm = new_project["bpm"]
            lanes = new_project["lanes"]
            project = Project(name=name, bpm=bpm, user=user, lanes=lanes)
            project.validate_unique(exclude=[lanes, bpm])
            project.save()
            return project
        except ValidationError:
            return None


def update(request, id):
    version = json_decode(request)
    if valid(version):
        try:
            name = version["name"]
            bpm = version["bpm"]
            lanes = version["lanes"]
            project = Project.objects.get(pk=id)
            project.name = name
            project.bpm = bpm
            project.lanes = lanes
            project.validate_unique(exclude=[lanes, bpm])
            project.save()
            return project
        except ValidationError:
            return None


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
    return redirect("/")


def serialize(projects):
    return serializers.serialize("json", projects)


def valid(project):
    return project
