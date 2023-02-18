# Generated by Django 4.1.7 on 2023-02-18 19:23

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0005_alter_iep_uuid_alter_lessonplan_uuid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iep',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('580e254a-31c0-4ac2-b932-05d794332e99'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='lessonplan',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('92605d64-a994-43ee-835e-4d06773e8e5d'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='lpsaccommodation',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('833f3451-ab36-43c9-bad1-98b7e2c7c66c'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('2b6f377c-5bb7-416e-97a3-b8eb43432f55'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]
