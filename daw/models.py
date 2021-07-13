from django.db import models
from django.contrib.auth.models import User, auth
from django.db.models import JSONField

# Create your models here.
class Project(models.Model):
	name = models.CharField(max_length=20)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	data = JSONField(default={'name': 'nonExi'})
	# data = models.TextField()

	# class Meta:
	# 	abstract = True

	def __str__(self):
		return self.name

