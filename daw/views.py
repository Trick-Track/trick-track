from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth


def index(request):
    return render(request, 'daw/index.html')

def login(request):
    return redirect('accounts/login')

