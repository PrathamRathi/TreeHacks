# Generated by Django 4.1.7 on 2023-02-18 19:34

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0006_alter_iep_uuid_alter_lessonplan_uuid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iep',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('67e75494-fb1e-4e5d-89d9-ac4a11b995e4'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='lessonplan',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('35f78048-aa11-481d-89aa-4e51efdcfef3'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='lpsaccommodation',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('5f506a13-8dda-47b5-8bc7-929588da3010'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('2541c6b5-9349-4a3c-9da8-28d807f08700'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]
