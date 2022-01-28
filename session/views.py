# Create your views here.
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.serializers import ModelSerializer


class User_serializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")


class Users(CreateAPIView):
    serializer_class = User_serializer


class Session(APIView):
    pass
