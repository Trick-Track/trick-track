from django.urls import path
from . import views

urlpatterns = [
    path("projects", views.projects),
    path("projects/<id>/", views.project),
    path("projects/delete_everything", views.delete_everything),
]
