from rest_framework import serializers
from .models import *

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('uuid', 'name', 'grade')

class LessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonPlan
        fields = ('uuid', 'name', 'overview', 'objectives')

class IepSerializer(serializers.ModelSerializer):
    class Meta:
        model = IEP
        fields = ('uuid', 'student', 'accommodation')
        depth = 1

class LpsaccommodationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LpsAccommodation
        fields = ('uuid', 'lesson_plan', 'student', 'accommodation')
        depth = 1