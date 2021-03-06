from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=20, default='NoName')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bpm = models.IntegerField(default=120)
    lanes = JSONField(dict())

    class Meta:
        constraints = [models.UniqueConstraint(fields=['name', 'user'], name='unique_project_name')]
        ordering = ('name',)
        db_table = 'project'
        verbose_name_plural = 'projects'

    def __str__(self):
        return self.name
