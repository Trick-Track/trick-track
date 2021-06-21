from django.shortcuts import render


def index(request):
    return render(request, 'daw/index.html')
