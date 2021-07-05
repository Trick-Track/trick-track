from django.shortcuts import render


def index(request):
    return render(request, 'daw/index.html')

# def log_mod(request):
    # return render(request, 'daw/signin_mod.html')
