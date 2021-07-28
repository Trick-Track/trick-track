from django.db import models
from django.contrib.auth.models import User, auth
from django.db.models import JSONField

# Create your models here.
class Project(models.Model):
	name = models.CharField(max_length=20, default='NoName')
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	data = JSONField(dict())

	def __str__(self):
		return self.name

