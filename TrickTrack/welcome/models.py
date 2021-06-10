from django.db import models

# Create your models here.


class PseudoUser(models.Model):
    name = models.CharField('username', max_length=36)
    password = models.CharField('PASSWORD', max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'ПсевдоЮзер'
        verbose_name_plural = 'ПсевдоЮзеры'


class Project(models.Model):
    pass
