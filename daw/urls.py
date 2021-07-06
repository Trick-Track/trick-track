from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    # path('log_mod', views.log_mod)
]
