from django.db import models
import uuid

# Create your models here.
class Student(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4(), editable = False)
    name = models.CharField(max_length=255)
    grade = models.IntegerField(default = 0)

class LessonPlan(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4(), editable = False)
    name = models.CharField(max_length=255)
    overview = models.TextField()
    objectives = models.TextField()

class IEP(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4(), editable = False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    accomodation = models.TextField()

class LpsAccomodation(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4(), editable = False)
    lesson_plan = models.ForeignKey(LessonPlan, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    accomodation = models.TextField()
