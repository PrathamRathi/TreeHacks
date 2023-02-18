from django.shortcuts import render

from django.views import View
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *

class StudentViews(View):
    def get(self, request):
        data = Student.objects.all()
        serializer = StudentSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            student = Student.objects.get(uuid=request.data.get('student'))
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = StudentSerializer(student, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            student = Student.objects.get(uuid=request.data.get('student'))
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
            
class LessonPlanViews(View):
    def get(self, request):
        data = LessonPlan.objects.all()
        serializer = LessonPlanSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = LessonPlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            LessonPlan = LessonPlan.objects.get(uuid=request.data.get('LessonPlan'))
        except LessonPlan.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = LessonPlanSerializer(LessonPlan, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            LessonPlan = LessonPlan.objects.get(uuid=request.data.get('LessonPlan'))
        except LessonPlan.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        LessonPlan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)