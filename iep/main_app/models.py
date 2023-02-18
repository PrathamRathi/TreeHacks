from django.db import models
import uuid

# Create your models here.
class Student(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length=255)
    grade = models.IntegerField(default = 0)
    
    def __str__(self):
        return self.name

class LessonPlan(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length=255)
    overview = models.TextField()
    objectives = models.TextField()

    def __str__(self):
        return self.name

class IEP(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4, editable = False)
    student = models.ForeignKey(Student, blank=False, on_delete=models.CASCADE)
    accommodation = models.TextField()

    def __str__(self):
        return self.student + " and their accommodation is: " + self.accommodation

class LpsAccommodation(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4, editable = False)
    lesson_plan = models.ForeignKey(LessonPlan, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    accommodation = models.TextField()

    def __str__(self):
        return "{} lesson-plan, for {}, with accommodations {}".format(self.lesson_plan, self.student, self.accommodation)
