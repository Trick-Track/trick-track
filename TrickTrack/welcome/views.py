from django.shortcuts import render
from .models import PseudoUser


def index(request):
    users = PseudoUser.objects.all()
    return render(request, 'welcome/index.html', {'title': 'preveeed', 'users': users})


def login(request):
    return render(request, 'welcome/login.html')
