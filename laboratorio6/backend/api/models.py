from django.db import models

# Create your models here.
class Monografia(models.Model):
    idMonografia = models.AutoField(primary_key=True)
    titulo = models.TextField()
    fechaDeDefensa = models.DateField()
    notaDeLaDefensa = models.FloatField()
    tiempoOtorgado = models.IntegerField()
    tiempoDefensa = models.IntegerField()
    tiempoDePreguntas = models.IntegerField()
    
    def __str__(self):
        return self.titulo

class Student(models.Model):
    Carnet = models.AutoField(primary_key=True)
    Idmonografia = models.ForeignKey(Monografia, on_delete=models.CASCADE, null=True, blank=True)
    Nombres = models.TextField()
    Apellidos = models.TextField()
    Direccion = models.TextField()
    Telefono = models.TextField()
    AñoDenacimiento = models.DateField()
    
    def __str__(self):
        return self.Nombres + " " + self.Apellidos

class Teachers(models.Model):
    idProfesor = models.AutoField(primary_key=True)
    nombres = models.TextField()
    apellidos = models.TextField()
    direccion = models.TextField()
    telefono = models.TextField()
    añoDenacimiento = models.DateField()
    monografias = models.ManyToManyField(Monografia, through='ProfesorMonografia')
    
    def __str__(self):
        return self.nombres + " " + self.apellidos

class ProfesorMonografia(models.Model):
    class Roles(models.TextChoices):
        Tutor = 'Tutor'
        Jurado = 'Jurado'
    
    idProfesor = models.ForeignKey(Teachers, on_delete=models.CASCADE)
    idMonografia = models.ForeignKey(Monografia, on_delete=models.CASCADE)
    rol = models.TextField(choices=Roles.choices)
    
    def __str__(self):
        return self.idProfesor + " " + self.idMonografia