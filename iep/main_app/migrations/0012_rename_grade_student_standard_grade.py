# Generated by Django 4.1.7 on 2023-02-19 03:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0011_lessonplan_present_date_lessonplan_subject'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='grade',
            new_name='standard',
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('percentage', models.FloatField(default=0)),
                ('date', models.DateField()),
                ('subject', models.CharField(choices=[('Math', 'Math'), ('Reading', 'Reading')], max_length=50)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.student')),
            ],
        ),
    ]
