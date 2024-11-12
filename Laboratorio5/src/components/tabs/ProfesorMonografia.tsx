import { useState } from 'react';
import { Label } from '@/components/ui/label';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Enumerable from 'linq';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type ProfesorMonografia = {
  idprofesor: string;
  idMonografia: string;
  rol: string;
};

type Teachers = {
  idProfesor: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  añoDeNacimiento: Date;
};

type Monografia = {
  idMonografia: string;
  titulo: string;
  fechaDeDefensa: Date;
  notaDeLaDefensa: number;
  tiempoOtorgado: number;
  tiempoDefensa: number;
  tiempoDePreguntas: number;
};

function ProfesorMonografia() {
  const getArray = (): ProfesorMonografia[] => {
    const array = localStorage.getItem('ProfesorMonografia');
    return array ? JSON.parse(array) : [];
  };

  const getArrayMonografias = (): Monografia[] => {
    const array = localStorage.getItem('monografia');
    return array ? JSON.parse(array) : [];
  };

  const getArrayProfesores = (): Teachers[] => {
    const array = localStorage.getItem('teachers');
    return array ? JSON.parse(array) : [];
  };

  const teachers = getArrayProfesores();
  const monografias = getArrayMonografias();

  const [openProfesor, setOpenProfesor] = useState(false);
  const [valueProfesor, setValueProfesor] = useState('');

  const [openMonografia, setOpenMonografia] = useState(false);
  const [valueMonografia, setValueMonografia] = useState('');

  const [valueRol, setValueRol] = useState('');

  const [profesorMonografia, setProfesorMonografia] = useState<
    ProfesorMonografia[]
  >(getArray());

  const saveArray = (array: ProfesorMonografia[]) => {
    localStorage.setItem('ProfesorMonografia', JSON.stringify(array));
  };

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfesorMonografia>({
    defaultValues: {
      idprofesor: '',
      idMonografia: '',
      rol: '',
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
    if(valueMonografia === '' || valueProfesor === '' || valueRol === '') {
      Swal.fire({
        title: 'Error',
        text: 'Por favor llene todos los campos',
        icon: 'error',
        confirmButtonText: 'ok',
      });
      return;
    }
    data.idprofesor = valueProfesor;
    data.idMonografia = valueMonografia;
    data.rol = valueRol;
    const monografiaExists = Enumerable.from(profesorMonografia).where(
      (pm) => pm.idMonografia === data.idMonografia
    );

    const tutorCount = monografiaExists.count((pm) => pm.rol === 'Tutor');
    const juradoCount = monografiaExists.count((pm) => pm.rol === 'Jurado');

    if (data.rol === 'Tutor' && tutorCount >= 1) {
      Swal.fire({
        title: 'Error',
        text: 'Ya existe un tutor asignado para esta monografía.',
        icon: 'error',
        confirmButtonText: 'ok',
      });
      return;
    }

    if (data.rol === 'Jurado' && juradoCount >= 3) {
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
      (pm) => pm.idprofesor === data.idprofesor && pm.rol === data.rol
    );

    if (profesorExists) {
      Swal.fire({
        title: 'Advertencia!',
        text: 'El profesor ya tiene este rol asignado en la monografía. ¿Deseas actualizar?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        denyButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Actualizar el rol del profesor
          const updatedProfesorMonografia = profesorMonografia.map((pm) =>
            pm.idprofesor === data.idprofesor &&
            pm.idMonografia === data.idMonografia
              ? data
              : pm
          );
          setProfesorMonografia(updatedProfesorMonografia);
          saveArray(updatedProfesorMonografia);
          Swal.fire({
            title: 'Rol actualizado',
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
      // Agregar nuevo rol para el profesor en la monografía
      const updatedProfesorMonografia = [...profesorMonografia, data];
      setProfesorMonografia(updatedProfesorMonografia);
      saveArray(updatedProfesorMonografia);
      Swal.fire({
        title: 'Rol asignado',
        icon: 'success',
        confirmButtonText: 'ok',
      });
      reset();
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Asignar Rol a Profesor</CardTitle>
          <CardDescription>
            Asigna un rol a un profesor en una monografía
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="idProfesor">Profesor</Label>
              <Popover open={openProfesor} onOpenChange={setOpenProfesor}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openProfesor}
                    className="justify-between"
                  >
                    {valueProfesor
                      ? teachers.find(
                          (teacher) => teacher.idProfesor === valueProfesor
                        )?.nombres +
                        ' ' +
                        teachers.find(
                          (teacher) => teacher.idProfesor === valueProfesor
                        )?.apellidos
                      : 'Selecciona un profesor'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Buscar profesor por id" />
                    <CommandList>
                      <CommandEmpty>
                        No se ha encontrado un profesor.
                      </CommandEmpty>
                      <CommandGroup>
                        {teachers.map((teacher) => (
                          <CommandItem
                            key={teacher.idProfesor}
                            value={teacher.idProfesor}
                            onSelect={(currentValue) => {
                              setValueProfesor(
                                currentValue === valueProfesor
                                  ? ''
                                  : currentValue
                              );
                              setOpenProfesor(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                valueProfesor === teacher.idProfesor
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {teacher.nombres + ' ' + teacher.apellidos}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2 my-4">
              <Label htmlFor="idMonografia">Monografia</Label>
              <Popover open={openMonografia} onOpenChange={setOpenMonografia}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openMonografia}
                    className="justify-between"
                  >
                    {valueMonografia
                      ? monografias.find(
                          (monografia) =>
                            monografia.idMonografia === valueMonografia
                        )?.titulo
                      : 'Selecciona una monografia'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Buscar monografia por id" />
                    <CommandList>
                      <CommandEmpty>
                        No se ha encontrado ninguna monografia
                      </CommandEmpty>
                      <CommandGroup>
                        {monografias.map((monografia) => (
                          <CommandItem
                            key={monografia.idMonografia}
                            value={monografia.idMonografia}
                            onSelect={(currentValue) => {
                              setValueMonografia(
                                currentValue === valueMonografia
                                  ? ''
                                  : currentValue
                              );
                              setOpenMonografia(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                valueMonografia === monografia.idMonografia
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {monografia.titulo + ' ' + monografia.fechaDeDefensa}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="rol">Rol</Label>
              <Select onValueChange={(value) => setValueRol(value)}>
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Seleccione un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tutor">Tutor</SelectItem>
                  <SelectItem value="Jurado">Jurado</SelectItem>
                </SelectContent>
              </Select>
              {errors.rol && <span>{errors.rol.message}</span>}
            </div>
            <Button type="submit">Asignar Rol</Button>
          </form>
        </CardContent>
      </Card>
      {/* Tabla de ProfesorMonografia */}
      <Card className="w-full md:w-[60%]">
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
