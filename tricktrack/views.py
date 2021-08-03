from django.shortcuts import render, redirect

def index(request):
    return render(request, 'index.html')

def profile(request):
    print('redirecting from main')
    return redirect('/projects')