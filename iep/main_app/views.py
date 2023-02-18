from django.shortcuts import render

from rest_framework import viewsets

from .models import *
from .serializers import *

class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class LessonPlanView(viewsets.ModelViewSet):
    serializer_class = LessonPlanSerializer
    queryset = LessonPlan.objects.all()

class IepView(viewsets.ModelViewSet):
    serializer_class = IepSerializer
    queryset = IEP.objects.all()
    def perform_create(self, serializer):
        return serializer.save(student = self.request.data.get('student'))

class LpsaView(viewsets.ModelViewSet):
    serializer_class = LpsaccommodationSerializer
    queryset = LpsAccommodation.objects.all()
