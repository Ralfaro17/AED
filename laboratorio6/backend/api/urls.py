from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.StudentView.as_view()),
    path('students/<int:pk>/', views.StudentDetailView.as_view()),
    path('teachers/', views.TeacherView.as_view()),
    path('teachers/<int:pk>/', views.TeacherDetailView.as_view()),
    path('monografias/', views.MonografiaView.as_view()),
    path('monografias/<int:pk>/', views.MonografiaDetailView.as_view()),
    path('profesores-monografia/', views.ProfesorMonografiaView.as_view()),
    path('profesores-monografia/<int:pk>/', views.ProfesorMonografiaDetailView.as_view()),
]