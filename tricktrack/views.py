from django.shortcuts import render, redirect

def index(request):
    if request.user.is_authenticated:
        return redirect('/projects')
    else:
        return render(request, 'index.html')

def profile(request):
    return redirect('/projects')