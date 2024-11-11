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
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  type ProfesorMonografia = {
    idprofesor: string;
    idMonografia: string;
    rol : string;
};


function ProfesorMonografia(){

    const getArray = ():ProfesorMonografia[] => {
        const array = localStorage.getItem("ProfesorMonografia");
        return array ? JSON.parse(array) : [];
    }

    const [profesorMonografia, setProfesorMonografia] = useState<ProfesorMonografia[]>(getArray());

    const saveArray = (array: ProfesorMonografia[]) => {
        localStorage.setItem("ProfesorMonografia", JSON.stringify(array));
    };

    const{
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfesorMonografia>({
        defaultValues: {
            idprofesor: "",
            idMonografia: "",
            rol: "",
        },
    });

    const cleanArray = () => {
        Swal.fire({
          title: 'Advertencia!',
          text: 'Estas seguro que deseas eliminar todas las Monografias?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar Monografias',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('ProfesorMonografia');
            setProfesorMonografia([]);
            Swal.fire({
              title: 'Registros eliminados',
              icon: 'success',
              confirmButtonText: 'ok',
            }).then(() => {
              location.reload();
            });
          }
        });
      };
      const onSubmit = (data: ProfesorMonografia) => {
        // Verificar si la monografía ya tiene el tutor o tres jurados asignados
        const monografiaExists = Enumerable.from(profesorMonografia).where(
            pm => pm.idMonografia === data.idMonografia
        );

        const tutorCount = monografiaExists.count(pm => pm.rol === "Tutor");
        const juradoCount = monografiaExists.count(pm => pm.rol === "Jurado");

        if (data.rol === "Tutor" && tutorCount >= 1) {
            Swal.fire({
                title: 'Error',
                text: 'Ya existe un tutor asignado para esta monografía.',
                icon: 'error',
                confirmButtonText: 'ok',
            });
            return;
        }

        if (data.rol === "Jurado" && juradoCount >= 3) {
            Swal.fire({
                title: 'Error',
                text: 'Ya hay tres jurados asignados para esta monografía.',
                icon: 'error',
                confirmButtonText: 'ok',
            });
            return;
        }

        // Verificar si el profesor ya tiene un rol asignado en esta monografía
        const profesorExists = monografiaExists.any(
            pm => pm.idprofesor === data.idprofesor && pm.rol === data.rol
        );

        if (profesorExists) {
            Swal.fire({
                title: "Advertencia!",
                text: "El profesor ya tiene este rol asignado en la monografía. ¿Deseas actualizar?",
                icon: "warning",
                showDenyButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Actualizar",
                denyButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Actualizar el rol del profesor
                    const updatedProfesorMonografia = profesorMonografia.map((pm) =>
                        pm.idprofesor === data.idprofesor && pm.idMonografia === data.idMonografia
                        ? data : pm
                    );
                    setProfesorMonografia(updatedProfesorMonografia);
                    saveArray(updatedProfesorMonografia);
                    Swal.fire({
                        title: "Rol actualizado",
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
            // Agregar nuevo rol para el profesor en la monografía
            const updatedProfesorMonografia = [...profesorMonografia, data];
            setProfesorMonografia(updatedProfesorMonografia);
            saveArray(updatedProfesorMonografia);
            Swal.fire({
                title: "Rol asignado",
                icon: "success",
                confirmButtonText: "ok",
            });
            reset();
        }
    };

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle>Asignar Rol a Profesor</CardTitle>
                <CardDescription>Asigna un rol a un profesor en una monografía</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="idprofesor">ID Profesor</Label>
                        <Input id="idprofesor" {...register("idprofesor", { required: "ID Profesor requerido" })} />
                        {errors.idprofesor && <span>{errors.idprofesor.message}</span>}
                    </div>
                    <div>
                        <Label htmlFor="idMonografia">ID Monografía</Label>
                        <Input id="idMonografia" {...register("idMonografia", { required: "ID Monografía requerido" })} />
                        {errors.idMonografia && <span>{errors.idMonografia.message}</span>}
                    </div>
                    <div>
                        <Label htmlFor="rol">Rol</Label>
                        <select id="rol" {...register("rol", { required: "Rol requerido" })}>
                            <option value="">Seleccione un rol</option>
                            <option value="Tutor">Tutor</option>
                            <option value="Jurado">Jurado</option>
                        </select>
                        {errors.rol && <span>{errors.rol.message}</span>}
                    </div>
                    <Button type="submit">Asignar Rol</Button>
                </form>
            </CardContent>
        </Card>
         {/* Tabla de ProfesorMonografia */}
      <Card className='w-full md:w-[60%]'>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
          <CardDescription>Lista de roles de profesor</CardDescription>
          <Button
              className="w-full text-wrap p-2"
              onClick={cleanArray}
              variant={'destructive'}
            >
              Borrar todos los registros
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
               <TableHead>ID Monografía</TableHead>
                <TableHead>ID Profesor</TableHead>
                <TableHead>Rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profesorMonografia.map((ProfMono, index) => (
                <TableRow key={index}>
                  <TableCell>{ProfMono.idMonografia}</TableCell>
                  <TableCell>{ProfMono.idprofesor}</TableCell>
                  <TableCell>{ProfMono.rol}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    
        </>
    );
}

export default ProfesorMonografia;