from django.shortcuts import render, redirect
from project.views import retrieve_all


def index(request):
    if request.user.is_authenticated:
        user = request.user
        return render(request, 'index.html', {'projects': retrieve_all(user)})
    else:
        return render(request, 'index.html')

