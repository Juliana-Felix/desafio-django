# Generated by Django 4.2.2 on 2023-06-18 03:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_register_user_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='birthday_date',
        ),
        migrations.RemoveField(
            model_name='user',
            name='name',
        ),
    ]
