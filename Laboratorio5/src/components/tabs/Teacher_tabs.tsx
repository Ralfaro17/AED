import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Enumerable from "linq";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Teachers = {
  idProfesor: number;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  añoDeNacimiento: Date;
};

function TeacherTabs() {
  const getArray = (): Teachers[] => {
    const array = localStorage.getItem("teachers");
    return array ? JSON.parse(array) : [];
  };

  const [teachers, setTeachers] = useState<Teachers[]>(getArray());

  const saveArray = (array: Teachers[]) => {
    localStorage.setItem("teachers", JSON.stringify(array));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Teachers>({
    defaultValues: {
      idProfesor: 0,
      nombres: "",
      apellidos: "",
      direccion: "",
      telefono: "",
      añoDeNacimiento: new Date(),
    },
  });

  const onSubmit = (data: Teachers) => {
    // Verificar si ya existe un estudiante con el mismo Carnet Usando Linq
    const studentExists = Enumerable.from(teachers).any(
      (teachers) => teachers.idProfesor === data.idProfesor
    );

    if (studentExists) {
      Swal.fire({
        title: "Advertencia!",
        text: "El Id Profesor ya existe. ¿Deseas actualizar la información del Profesor?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Actualizar",
        denyButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {

          // Actualizar los datos del estudiante existente
          const updatedTeacher = teachers.map((teacher) =>
            teacher.idProfesor === data.idProfesor ? data : teacher
          );
          setTeachers(updatedTeacher);
          saveArray(updatedTeacher);
          Swal.fire({
            title: "Estudiante actualizado",
            icon: "success",
            confirmButtonText: "ok",
          });
          reset();
        } else if (result.isDenied) {
          Swal.fire({
            title: "Operación cancelada",
            icon: "info",
            confirmButtonText: "ok",
          });
        }
      });
    } else {

      const updatedTeacher = [...teachers, data];
      setTeachers(updatedTeacher);
      saveArray(updatedTeacher);
      Swal.fire({
        title: "Estudiante agregado",
        icon: "success",
        confirmButtonText: "ok",
      });
      reset();
    }
  };

  return (
    <>
        {/* Formulario de Profesores */}
      <Card className="w-full md:w-1/2 rounded-lg">
        <CardHeader>
          <CardTitle>Formulario de Profesores</CardTitle>
          <CardDescription>Ingresa los datos del Profesor</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Id Profesor */}
            <div className="space-y-2">
              <Label htmlFor="idProfesor">ID Profesor</Label>
              <Input
                id="idProfesor"
                placeholder="ID del profesor"
                type="number"
                {...register("idProfesor", {
                  required: "El ID del profesor es obligatorio",
                  min: {
                    value: 1,
                    message: "El ID debe ser mayor a 0",
                  },
                })}
              />
              {errors.idProfesor && (
                <p className="text-red-500">{errors.idProfesor.message}</p>
              )}
            </div>

            {/* Nombres */}
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres</Label>
              <Input
                id="nombres"
                placeholder="Nombres del profesor"
                type="text"
                {...register("nombres", {
                  required: "El nombre es obligatorio",
                })}
              />
              {errors.nombres && (
                <p className="text-red-500">{errors.nombres.message}</p>
              )}
            </div>

            {/* Apellidos */}
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                placeholder="Apellidos del profesor"
                type="text"
                {...register("apellidos", {
                  required: "El apellido es obligatorio",
                })}
              />
              {errors.apellidos && (
                <p className="text-red-500">{errors.apellidos.message}</p>
              )}
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                placeholder="Dirección del profesor"
                type="text"
                {...register("direccion", {
                  required: "La dirección es obligatoria",
                })}
              />
              {errors.direccion && (
                <p className="text-red-500">{errors.direccion.message}</p>
              )}
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                placeholder="Teléfono del profesor"
                type="tel"
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9]{8}$/,
                    message: "El teléfono debe ser un número de 8 dígitos",
                  },
                })}
              />
              {errors.telefono && (
                <p className="text-red-500">{errors.telefono.message}</p>
              )}
            </div>

            {/* Año de Nacimiento */}
            <div className="space-y-2">
              <Label htmlFor="añoDeNacimiento">Año de Nacimiento</Label>
              <Input
                id="añoDeNacimiento"
                type="date"
                {...register("añoDeNacimiento", {
                  required: "La fecha de nacimiento es obligatoria",
                })}
              />
              {errors.añoDeNacimiento && (
                <p className="text-red-500">{errors.añoDeNacimiento.message}</p>
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
      {/* Tabla de Profesores */}
      <Card className="w-full md:w-[60%]">
        <CardHeader>
          <CardTitle>profesores</CardTitle>
          <CardDescription>Lista de Profesores</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Profesor</TableHead>
                <TableHead>Nombres</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Año de Nacimiento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow key={index}>
                  <TableCell>{teacher.idProfesor}</TableCell>
                  <TableCell>{teacher.nombres}</TableCell>
                  <TableCell>{teacher.apellidos}</TableCell>
                  <TableCell>{teacher.direccion}</TableCell>
                  <TableCell>{teacher.telefono}</TableCell>
                  <TableCell>
                    {new Date(teacher.añoDeNacimiento).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default TeacherTabs;
