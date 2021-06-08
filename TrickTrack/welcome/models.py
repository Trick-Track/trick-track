from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField('username', max_length=36)
    password = models.CharField('PASSWORD', max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Юзер'
        verbose_name_plural = 'Юзеры'


class Project(models.Model):
    pass
