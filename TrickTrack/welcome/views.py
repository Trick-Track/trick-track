from django.shortcuts import render
from .models import User


def index(request):
    users = User.objects.all()
    return render(request, 'welcome/index.html', {'title': 'preveeed', 'users': users})


def login(request):
    return render(request, 'welcome/login.html')
