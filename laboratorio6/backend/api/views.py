from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Monografia, Student, Teachers, ProfesorMonografia
from .serializers import MonografiaSerializer, StudentSerializer, TeachersSerializer, ProfesorMonografiaSerializer


# Create your views here.
class StudentView(APIView):
    http_method_names = ['get', 'post']
    
    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentDetailView(APIView):
    http_method_names = ['get', 'put', 'delete']
    
    def get(self, request, pk):
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TeacherView(APIView):
    http_method_names = ['get', 'post']
    
    def get(self, request):
        teachers = Teachers.objects.all()
        serializer = TeachersSerializer(teachers, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TeachersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeacherDetailView(APIView):
    http_method_names = ['get', 'put', 'delete']
    
    def get(self, request, pk):
        try:
            teacher = Teachers.objects.get(pk=pk)
        except Teachers.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TeachersSerializer(teacher)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            teacher = Teachers.objects.get(pk=pk)
        except Teachers.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TeachersSerializer(teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            teacher = Teachers.objects.get(pk=pk)
        except Teachers.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        teacher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MonografiaView(APIView):
    http_method_names = ['get', 'post']
    
    def get(self, request):
        monografias = Monografia.objects.all()
        serializer = MonografiaSerializer(monografias, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MonografiaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MonografiaDetailView(APIView):
    http_method_names = ['get', 'put', 'delete']
    
    def get(self, request, pk):
        try:
            monografia = Monografia.objects.get(pk=pk)
        except Monografia.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MonografiaSerializer(monografia)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            monografia = Monografia.objects.get(pk=pk)
        except Monografia.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MonografiaSerializer(monografia, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            monografia = Monografia.objects.get(pk=pk)
        except Monografia.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        monografia.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProfesorMonografiaView(APIView):
    http_method_names = ['get', 'post']
    
    def get(self, request):
        profesorMonografias = ProfesorMonografia.objects.all()
        serializer = ProfesorMonografiaSerializer(profesorMonografias, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProfesorMonografiaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfesorMonografiaDetailView(APIView):
    http_method_names = ['get', 'put', 'delete']
    
    def get(self, request, pk):
        try:
            profesorMonografia = ProfesorMonografia.objects.get(pk=pk)
        except ProfesorMonografia.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProfesorMonografiaSerializer(profesorMonografia)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            profesorMonografia = ProfesorMonografia.objects.get(pk=pk)
        except ProfesorMonografia.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProfesorMonografiaSerializer(profesorMonografia, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            profesorMonografia = ProfesorMonografia.objects.get(pk=pk)
        except ProfesorMonografia.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        profesorMonografia.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)