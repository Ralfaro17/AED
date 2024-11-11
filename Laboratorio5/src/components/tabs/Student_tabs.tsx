import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Enumerable from 'linq';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Student = {
  Carnet: number;
  Idmonografia: number;
  Nombres: string;
  Apellidos: string;
  Direccion: string;
  Telefono: string;
  AñoDenacimiento: Date;
};

function StudentForm() {
  const getArray = (): Student[] => {
    const array = localStorage.getItem('students');
    return array ? JSON.parse(array) : [];
  };

  const [students, setStudents] = useState<Student[]>(getArray());

  const saveArray = (array: Student[]) => {
    localStorage.setItem('student', JSON.stringify(array));
  };
  const cleanArray = () => {
    Swal.fire({
      title: 'Advertencia!',
      text: 'Estas seguro que deseas eliminar todos los estudiante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar citas',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('students');
        setStudents([]);
        Swal.fire({
          title: 'Registros eliminados',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Student>({
    defaultValues: {
      Carnet: 0,
      
      Nombres: '',
      Apellidos: '',
      Direccion: '',
      Telefono: '',
      AñoDenacimiento: new Date(),
    },
  });

  const onSubmit = (data: Student) => {
    // Verificar si ya existe un estudiante con el mismo Carnet
    const studentExists = Enumerable.from(students).any((student) => student.Carnet === data.Carnet);

    if (studentExists) {
      Swal.fire({
        title: 'Advertencia!',
        text: 'El carnet ya existe. ¿Deseas actualizar la información del estudiante?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        denyButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {

          // Actualizar los datos del estudiante existente
          const updatedStudents = students.map((student) =>
            student.Carnet === data.Carnet ? data : student
          );
          setStudents(updatedStudents);
          saveArray(updatedStudents);
          Swal.fire({
            title: 'Estudiante actualizado',
            icon: 'success',
            confirmButtonText: 'ok',
          });
          reset();
        } else if (result.isDenied) {
          Swal.fire({
            title: 'Operación cancelada',
            icon: 'info',
            confirmButtonText: 'ok',
          });
        }
      });
    } else {

      const updatedStudents = [...students, data];
      setStudents(updatedStudents);
      saveArray(updatedStudents);
      Swal.fire({
        title: 'Estudiante agregado',
        icon: 'success',
        confirmButtonText: 'ok',
      });
      reset();
    }
  };

  return (
    <>
      <Card className="w-full md:w-1/2 rounded-lg">
        <CardHeader>
          <CardTitle>Formulario de Estudiante</CardTitle>
          <CardDescription>Ingresa los datos del estudiante</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Carnet */}
            <div className="space-y-2">
              <Label htmlFor="carnet">Carnet</Label>
              <Input
                id="carnet"
                placeholder="Número de carnet"
                type="number"
                {...register('Carnet', {
                  required: 'El carnet es obligatorio',
                  min: {
                    value: 1,
                    message: 'El carnet debe ser mayor a 0',
                  },
                })}
              />
              {errors.Carnet && <p className="text-red-500">{errors.Carnet.message}</p>}
            </div>

            {/* Id Monografía 
            <div className="space-y-2">
              <Label htmlFor="idMonografia">Id Monografía</Label>
              <Input
                id="idMonografia"
                placeholder="Id de la monografía"
                type="number"
                {...register('Idmonografia', {
                  required: 'El Id de monografía es obligatorio',
                })}
              />
              {errors.Idmonografia && <p className="text-red-500">{errors.Idmonografia.message}</p>}
            </div>
            */}

            {/* Nombres */}
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres</Label>
              <Input
                id="nombres"
                placeholder="Nombres del estudiante"
                type="text"
                {...register('Nombres', {
                  required: 'El nombre es obligatorio',
                })}
              />
              {errors.Nombres && <p className="text-red-500">{errors.Nombres.message}</p>}
            </div>

            {/* Apellidos */}
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                placeholder="Apellidos del estudiante"
                type="text"
                {...register('Apellidos', {
                  required: 'El apellido es obligatorio',
                })}
              />
              {errors.Apellidos && <p className="text-red-500">{errors.Apellidos.message}</p>}
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                placeholder="Dirección del estudiante"
                type="text"
                {...register('Direccion', {
                  required: 'La dirección es obligatoria',
                })}
              />
              {errors.Direccion && <p className="text-red-500">{errors.Direccion.message}</p>}
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                placeholder="Teléfono del estudiante"
                type="tel"
                {...register('Telefono', {
                  required: 'El teléfono es obligatorio',
                  pattern: {
                    value: /^[0-9]{8}$/,
                    message: 'El teléfono debe ser un número de 8 dígitos',
                  },
                })}
              />
              {errors.Telefono && <p className="text-red-500">{errors.Telefono.message}</p>}
            </div>

            {/* Año de Nacimiento */}
            <div className="space-y-2">
              <Label htmlFor="anioNacimiento">Año de Nacimiento</Label>
              <Input
                id="anioNacimiento"
                type="date"
                {...register('AñoDenacimiento', {
                  required: 'La fecha de nacimiento es obligatoria',
                })}
              />
              {errors.AñoDenacimiento && (
                <p className="text-red-500">{errors.AñoDenacimiento.message}</p>
              )}
            </div>

            <CardFooter className="px-0 flex flex-col gap-4 justify-around">
              <Button type="submit" className="w-full">
                Confirmar
              </Button>
              <Button
                type="button"
                onClick={() => reset()}
                className="w-full bg-gray-300 text-black"
              >
                Limpiar Formulario
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* Tabla de estudiantes */}
      <Card className='w-full md:w-[60%]'>
        <CardHeader>
          <CardTitle>Estudiantes</CardTitle>
          <CardDescription>Lista de estudiantes</CardDescription>
          <Button
              className="w-full text-wrap p-2"
              onClick={cleanArray}
              variant={'destructive'}
            >
              Borrar todas las citas
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Carnet</TableHead>
                <TableHead>IdMonografia</TableHead>
                <TableHead>Nombres</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Direccion</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Año De nacimiento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.Carnet}</TableCell>
                  <TableCell>{student.Idmonografia}</TableCell>
                  <TableCell>{student.Nombres}</TableCell>
                  <TableCell>{student.Apellidos}</TableCell>
                  <TableCell>{student.Direccion}</TableCell>
                  <TableCell>{student.Telefono}</TableCell>
                  <TableCell>{new Date(student.AñoDenacimiento).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default StudentForm;
