from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('accounts/profile/', views.retrieve_user_projects),
    # path('projects', views.user_projects),
    path('projects', views.json_decode),
    path('projects/<id>/', views.user_project)
]
