# Generated by Django 3.2.3 on 2021-06-07 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('welcome', '0003_auto_20210520_1435'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]