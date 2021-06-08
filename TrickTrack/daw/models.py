from django.db import models

# Create your models here.


class Device(models.Model):
    name = models.CharField('device name', max_length=36)
    description = models.TextField('device description')

    def __str__(self):
        return self.name

