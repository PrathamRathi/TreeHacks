from django.contrib import admin
from .models import *
# Register your models here.
class StudentAdmin(admin.ModelAdmin):
    list_display = ("name", "uuid", "standard", "disability")

class LessonPlanAdmin(admin.ModelAdmin):
    list_display = ("name", "uuid", "overview", "objectives")

class IepAdmin(admin.ModelAdmin):
    list_display = ("uuid", "student", "accommodation")

class lpsaAdmin(admin.ModelAdmin):
    list_display = ("uuid", "lesson_plan", "student", "accommodation")

class gradesAdmin(admin.ModelAdmin):
    list_display = ("student", "percentage", "subject", "date")

admin.site.register(Student, StudentAdmin)
admin.site.register(LessonPlan, LessonPlanAdmin)
admin.site.register(IEP, IepAdmin)
admin.site.register(LpsAccommodation, lpsaAdmin)
admin.site.register(Grade, gradesAdmin)