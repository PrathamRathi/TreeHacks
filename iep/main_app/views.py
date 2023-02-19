from django.shortcuts import render

from rest_framework import viewsets

from .models import *
from .serializers import *


# def post(self,request):
#         if request.method == 'POST':
#             data = request.POST
#             objective = data.get('objective')
#             overview = data.get('overview')
#             subject = data.get('subject')
#             ieps = IEP.objects.all()
#             grades = Grade.objects.all()        
#             return JsonResponse(response)

class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class LessonPlanView(viewsets.ModelViewSet):
    serializer_class = LessonPlanSerializer
    queryset = LessonPlan.objects.all()

class IepView(viewsets.ModelViewSet):
    serializer_class = IepSerializer
    queryset = IEP.objects.all()


class LpsaView(viewsets.ModelViewSet):
    serializer_class = LpsaccommodationSerializer
    queryset = LpsAccommodation.objects.all()

class GradeView(viewsets.ModelViewSet):
    serializer_class = GradeSerializer
    queryset = Grade.objects.all()
