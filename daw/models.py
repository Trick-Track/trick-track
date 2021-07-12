from django.db import models
from django.contrib.auth.models import User, auth

# Create your models here.
class Project(models.Model):
	name = models.CharField(max_length=20)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
# 	pass
