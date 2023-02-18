from rest_framework import serializers
from .models import *

class StudentSerializer(serializers.Serializer):
    class Meta:
        model = Student
        fields = ('uuid', 'name', 'grade')

class LessonPlanSerializer(serializers.Serializer):
    class Meta:
        model = LessonPlan
        fields = ('uuid', 'name', 'overview', 'objectives')

class IEPSerializer(serializers.Serializer):
    class Meta:
        model = IEP
        fields = ('uuid', 'student', 'accomodation')
        depth = 1

class LpsAccomodationSerializer(serializers.Serializer):
    class Meta:
        model = LpsAccomodation
        fields = ('uuid', 'lesson_plan', 'student', 'accomodation')
        depth = 1