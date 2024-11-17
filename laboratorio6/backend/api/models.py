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
    
    # Validates that the monograph doesn't have a more than 3 students assigned
    def save(self, *args, **kwargs):
        if self.Idmonografia and Student.objects.filter(Idmonografia=self.Idmonografia).count() == 3:
            raise ValueError("Ya no pueden haber mas estudiantes en esta monografia")
        super(Student, self).save(*args, **kwargs)

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
    
    # Validates that there is only one tutor for each monograph and 3 jurors at most
    def save(self, *args, **kwargs):
        if self.rol == 'Tutor' and ProfesorMonografia.objects.filter(idMonografia=self.idMonografia, rol='Tutor').exists():
            raise ValueError("Ya existe un tutor para esta monografía")
        if self.rol == 'Jurado' and ProfesorMonografia.objects.filter(idMonografia=self.idMonografia, rol='Jurado').count() == 3:
            raise ValueError("Ya no pueden haber mas jurados en esta monografía")
        if ProfesorMonografia.objects.filter(idProfesor=self.idProfesor, idMonografia=self.idMonografia).exists():
            raise ValueError("Este profesor ya está asignado a esta monografía")
        super(ProfesorMonografia, self).save(*args, **kwargs)