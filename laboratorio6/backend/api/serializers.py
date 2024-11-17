from rest_framework import serializers
from .models import Monografia, Student, Teachers, ProfesorMonografia

class MonografiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monografia
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
    
    # Validates that the monograph doesn't have a more than 3 students assigned
    def validate(self, data):
        if "Idmonografia" in data and Student.objects.filter(Idmonografia=data['Idmonografia']).count() == 3:
            raise serializers.ValidationError("Ya no pueden haber mas estudiantes en esta monografía")
        return data

class TeachersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teachers
        fields = '__all__'

class ProfesorMonografiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesorMonografia
        fields = '__all__'
    
    # Validates that there is only one tutor for each monografía and 3 jurors at most
    def validate(self, data):
        if data['rol'] == 'Tutor' and ProfesorMonografia.objects.filter(idMonografia=data['idMonografia'], rol='Tutor').exists():
            raise serializers.ValidationError("Ya existe un tutor para esta monografía")
        if data['rol'] == 'Jurado' and ProfesorMonografia.objects.filter(idMonografia=data['idMonografia'], rol='Jurado').count() == 3:
            raise serializers.ValidationError("Ya no pueden haber mas jurados en esta monografía")
        if ProfesorMonografia.objects.filter(idProfesor=data['idProfesor'], idMonografia=data['idMonografia']).exists():
            raise serializers.ValidationError("Este profesor ya está asignado a esta monografía")
        return data