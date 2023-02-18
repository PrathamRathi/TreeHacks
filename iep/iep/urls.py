"""iep URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from main_app import views
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'students', views.StudentView, 'student')
router.register(r'lesson-plans', views.LessonPlanView, 'lesson-plan')
router.register(r'ieps', views.IepView, 'ieps')
router.register(r'lps-accommodations', views.LpsaView, 'lps-accommodations')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]