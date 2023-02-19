from django.db import models
import uuid

SUBJECTS_CHOICES =(
    ("Math", "Math"),
    ("Reading & Writing", "Reading & Writing"),
)

# Create your models here.
class Student(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length=255)
    standard = models.IntegerField(default = 0)
    disability = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Grade(models.Model):
    percentage = models.FloatField(default = 0)
    date = models.DateField()
    student = models.ForeignKey(Student, blank=False, on_delete=models.CASCADE)
    subject = models.CharField(max_length = 50, choices=SUBJECTS_CHOICES)

class LessonPlan(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length=255)
    subject = models.CharField(max_length=255)
    overview = models.TextField()
    objectives = models.TextField()
    present_date = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class IEP(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4, editable = False)
    student = models.ForeignKey(Student, blank=False, on_delete=models.CASCADE)
    accommodation = models.TextField()

    def __str__(self):
        return "{} and their accomodation is {}".format(self.student.name, self.accommodation)

class LpsAccommodation(models.Model):
    uuid = models.UUIDField(primary_key=True, unique = True, default = uuid.uuid4, editable = False)
    lesson_plan = models.ForeignKey(LessonPlan, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    accommodation = models.TextField()

    def __str__(self):
        return "{} lesson-plan, for {}, with accommodations {}".format(self.lesson_plan, self.student, self.accommodation)
