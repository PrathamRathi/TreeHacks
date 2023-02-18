from django.contrib import admin
from .models import *
# Register your models here.
class StudentAdmin(admin.ModelAdmin):
    list_display = ("name", "uuid", "grade")

class LessonPlanAdmin(admin.ModelAdmin):
    list_display = ("name", "uuid", "overview", "objectives")

class IepAdmin(admin.ModelAdmin):
    list_display = ("uuid", "student", "accommodation")

class lpsaAdmin(admin.ModelAdmin):
    list_display = ("uuid", "lesson_plan", "student", "accommodation")

admin.site.register(Student, StudentAdmin)
admin.site.register(LessonPlan, LessonPlanAdmin)
admin.site.register(IEP, IepAdmin)
admin.site.register(LpsAccommodation, lpsaAdmin)