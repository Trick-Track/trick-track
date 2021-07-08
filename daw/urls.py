from django.urls import path
from . import views

urlpatterns = [
    path('', views.login),
    path('accounts/profile/', views.index)
    # path('log_mod', views.log_mod)
]
