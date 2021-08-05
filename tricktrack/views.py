from django.shortcuts import render, redirect
from project.views import retrieve_all
from project.models import Project

def index(request):
    if request.user.is_authenticated:
        user = request.user
        return render(request, 'index.html', {'projects':retrieve_all(user)})
        # return redirect('/projects')
    else:
        return render(request, 'index.html')

def profile(request):
    return redirect('/')