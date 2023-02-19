from rest_framework import serializers
from .models import *


class LessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonPlan
        fields = ('uuid', 'name', 'overview', 'objectives', 'subject', 'present_date')

class IepSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), many=False)
    class Meta:
        model = IEP
        fields = ('uuid', 'student', 'accommodation')
        depth = 1

class LpsaccommodationSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), many=False)
    lesson_plan = serializers.PrimaryKeyRelatedField(queryset=LessonPlan.objects.all(), many=False)
    class Meta:
        model = LpsAccommodation
        fields = ('uuid', 'lesson_plan', 'student', 'accommodation')
        depth = 1

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('uuid', 'name', 'grade')