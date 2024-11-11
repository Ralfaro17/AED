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
  

type Monografia = {
  idMonografia: string;
  titulo: string;
  fechaDeDefensa: Date;
  notaDeLaDefensa: number;
  tiempoOtorgado: number;
  tiempoDefensa: number;
  tiempoDePreguntas: number;
};
type ProfesorMonografia = {
    idprofesor: number;
    idMonografia: number;
    rol : string;
};

function MonografiaTabs() {
  let LastMonografiaId: number= Number.parseInt(JSON.parse(localStorage.getItem('MonografiaLastId') || '1'));
  const getArray = (): Monografia[] => {
    const array = localStorage.getItem("monografia");
    return array ? JSON.parse(array) : [];
  };

  const [monografias, setMonografias] = useState<Monografia[]>(getArray());

  const saveArray = (array: Monografia[]) => {
    localStorage.setItem("monografia", JSON.stringify(array));
  };

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<Monografia>({
    defaultValues: {
      idMonografia: (LastMonografiaId + 1).toString(),
      titulo: "",
      fechaDeDefensa: new Date(),
      notaDeLaDefensa: 0,
      tiempoOtorgado: 0,
      tiempoDefensa: 0,
      tiempoDePreguntas: 0,
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
        localStorage.removeItem('monografia');
        localStorage.setItem('MonografiaLastId', '1');
        setMonografias([]);
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

  const onSubmit = (data: Monografia) => {
    //verificar si el id ya existe
    const monografiaExists = Enumerable.from(monografias).any(
      (monografia) => monografia.idMonografia === data.idMonografia
    );
    // Verificar si el ID del carnet es consecutivo
    if (Number.parseInt(data.idMonografia) !== LastMonografiaId + 1 && !monografiaExists) {
      Swal.fire({
        title: 'Error',
        text: 'El id de una nueva monogriafia debe ser consecutivo',
        icon: 'error',
        confirmButtonText: 'ok',
      });
      return;
    }

    if (monografiaExists) {
      Swal.fire({
        title: "Advertencia!",
        text: "El ID de la monografía ya existe. ¿Deseas actualizar la información?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Actualizar",
        denyButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Actualizar monografía
          const updatedMonografias = monografias.map((monografia) =>
            monografia.idMonografia === data.idMonografia ? data : monografia
          );
          setMonografias(updatedMonografias);
          saveArray(updatedMonografias);
          setFocus("idMonografia");
          Swal.fire({
            title: "Monografía actualizada",
            icon: "success",
            confirmButtonText: "ok",
          }).then(() => {
            reset();
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
      const updatedMonografias = [...monografias, data];
      setMonografias(updatedMonografias);
      saveArray(updatedMonografias);
      localStorage.setItem('MonografiaLastId', JSON.stringify(data.idMonografia));
      Swal.fire({
        title: "Monografía registrada",
        icon: "success",
        confirmButtonText: "ok",
      });
      reset();
      setValue("idMonografia", (LastMonografiaId + 1).toString());
    }
  };

  return (
    <>
      <Card className="w-full md:w-1/2 rounded-lg">
        <CardHeader>
          <CardTitle>Formulario de Monografía</CardTitle>
          <CardDescription>Ingresa los datos de la Monografía</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* ID Monografía */}
            <div className="space-y-2">
              <Label htmlFor="idMonografia">ID Monografía</Label>
              <Input
                id="idMonografia"
                placeholder="ID de la monografía"
                type="number"
                {...register("idMonografia", {
                  required: "El ID de la monografía es obligatorio",
                  min: { value: 1, message: "El ID debe ser mayor a 0" },
                })}
              />
              {errors.idMonografia && (
                <p className="text-red-500">{errors.idMonografia.message}</p>
              )}
            </div>

            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                placeholder="Título de la monografía"
                type="text"
                {...register("titulo", {
                  required: "El título es obligatorio",
                })}
              />
              {errors.titulo && (
                <p className="text-red-500">{errors.titulo.message}</p>
              )}
            </div>

            {/* Fecha de Defensa */}
            <div className="space-y-2">
              <Label htmlFor="fechaDeDefensa">Fecha de Defensa</Label>
              <Input
                id="fechaDeDefensa"
                type="date"
                {...register("fechaDeDefensa", {
                  required: "La fecha es obligatoria",
                })}
              />
              {errors.fechaDeDefensa && (
                <p className="text-red-500">{errors.fechaDeDefensa.message}</p>
              )}
            </div>
          
          <div className="grid grid-cols-2" >
            {/* Nota de la Defensa */}
            <div className="space-y-2">
              <Label htmlFor="notaDeLaDefensa">Nota de la Defensa</Label>
              <Input
                id="notaDeLaDefensa"
                placeholder="Nota de la defensa"
                type="number"
                {...register("notaDeLaDefensa", {
                  required: "La nota es obligatoria",
                  min: { value: 0, message: "La nota debe ser positiva" },
                  max: { value: 100, message: "La nota no debe superar 100" },
                })}
              />
              {errors.notaDeLaDefensa && (
                <p className="text-red-500">{errors.notaDeLaDefensa.message}</p>
              )}
            </div>

            {/* Tiempo Otorgado */}
            <div className="space-y-2">
              <Label htmlFor="tiempoOtorgado">Tiempo Otorgado (minutos)</Label>
              <Input
                id="tiempoOtorgado"
                placeholder="Tiempo otorgado en minutos"
                type="number"
                {...register("tiempoOtorgado", {
                  required: "El tiempo otorgado es obligatorio",
                })}
              />
              {errors.tiempoOtorgado && (
                <p className="text-red-500">{errors.tiempoOtorgado.message}</p>
              )}
            </div>

            {/* Tiempo de Defensa */}
            <div className="space-y-2">
              <Label htmlFor="tiempoDefensa">Tiempo de Defensa (minutos)</Label>
              <Input
                id="tiempoDefensa"
                placeholder="Tiempo de defensa en minutos"
                type="number"
                {...register("tiempoDefensa", {
                  required: "El tiempo de defensa es obligatorio",
                })}
              />
              {errors.tiempoDefensa && (
                <p className="text-red-500">{errors.tiempoDefensa.message}</p>
              )}
            </div>

            {/* Tiempo de Preguntas */}
            <div className="space-y-2">
              <Label htmlFor="tiempoDePreguntas">
                Tiempo de Preguntas (minutos)
              </Label>
              <Input
                id="tiempoDePreguntas"
                placeholder="Tiempo de preguntas en minutos"
                type="number"
                {...register("tiempoDePreguntas", {
                  required: "El tiempo de preguntas es obligatorio",
                })}
              />
              {errors.tiempoDePreguntas && (
                <p className="text-red-500">
                  {errors.tiempoDePreguntas.message}
                </p>
              )}
            </div>
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
      {/* Tabla de Monografia */}
      <Card className="w-full md:w-[60%]">
        <CardHeader>
          <CardTitle>Monografias</CardTitle>
          <CardDescription>Lista de Monografias</CardDescription>
          <Button
              className="w-full text-wrap p-2"
              onClick={cleanArray}
              variant={'destructive'}
            >
              Borrar todas las Monografias
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Monografía</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Fecha de Defensa</TableHead>
                <TableHead>Nota de la Defensa</TableHead>
                <TableHead>Tiempo Otorgado</TableHead>
                <TableHead>Tiempo de Defensa</TableHead>
                <TableHead>Tiempo de Preguntas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monografias.map((monografia, index) => (
                <TableRow key={index}>
                    <TableCell>{monografia.idMonografia}</TableCell>
                    <TableCell>{monografia.titulo}</TableCell>
                    <TableCell>{new Date(monografia.fechaDeDefensa).toLocaleDateString()}</TableCell>
                    <TableCell>{monografia.notaDeLaDefensa}</TableCell>
                    <TableCell>{monografia.tiempoOtorgado}</TableCell>
                    <TableCell>{monografia.tiempoDefensa}</TableCell>
                    <TableCell>{monografia.tiempoDePreguntas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default MonografiaTabs;
