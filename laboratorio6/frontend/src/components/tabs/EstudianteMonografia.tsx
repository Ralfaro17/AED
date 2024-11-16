import { useState } from 'react';
import { Label } from '@/components/ui/label';
import Swal from 'sweetalert2';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
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

type Student = {
  Carnet: string;
  Idmonografia?: string;
  Nombres: string;
  Apellidos: string;
  Direccion: string;
  Telefono: string;
  AñoDenacimiento: Date;
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

function EstudianteMonografia() {
  const getStudents = (): Student[] => {
    const students = localStorage.getItem('students');
    return students ? JSON.parse(students) : [];
  };

  const getArrayMonografias = (): Monografia[] => {
    const array = localStorage.getItem('monografia');
    return array ? JSON.parse(array) : [];
  };

  const [monografias] = useState<Monografia[]>(
    getArrayMonografias()
  );

  const [students, setStudents] = useState<Student[]>(getStudents());

  const [openEstudiante, setOpenEstudiante] = useState(false);
  const [valueEstudiante, setValueEstudiante] = useState('');

  const [openMonografia, setOpenMonografia] = useState(false);
  const [valueMonografia, setValueMonografia] = useState('');

  const handleAssignMonografia = () => {
    const selectedStudent = valueEstudiante;
    const monografiaId = valueMonografia;
    if (!selectedStudent || !monografiaId) {
      Swal.fire(
        'Error',
        'Selecciona un estudiante y un Id de monografía',
        'error'
      );
      return;
    }

    // Contar cuántos estudiantes ya tienen asignado el mismo Idmonografia
    const assignedCount = students.filter(
      (student) => student.Idmonografia === monografiaId
    ).length;

    // Validar si ya hay 3 estudiantes asignados a esta monografía
    if (assignedCount >= 3) {
      Swal.fire(
        'Error',
        'Esta monografía ya tiene 3 estudiantes asignados',
        'error'
      );
      return;
    }

    const updatedStudents = students.map((student) =>
      student.Carnet === selectedStudent
        ? { ...student, Idmonografia: monografiaId }
        : student
    );

    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    Swal.fire(
      'Asignación Completa',
      'Id de monografía asignado correctamente',
      'success'
    );
  };

  return (
    <>
      <Card className="w-full md:w-1/2 rounded-lg mt-8">
        <CardHeader>
          <CardTitle>Asignación de Monografía</CardTitle>
          <CardDescription>
            Asignar Id de Monografía a Estudiante
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col justify-evenly items-center h-1/2'>
          <div className="flex flex-col gap-2">
            <Label htmlFor="studentSelect">Selecciona un Estudiante</Label>
            <Popover open={openEstudiante} onOpenChange={setOpenEstudiante}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openEstudiante}
                  className="justify-between"
                >
                  {valueEstudiante
                    ? students.find((student) => student.Carnet === valueEstudiante)
                        ?.Nombres + ' ' + students.find((student) => student.Carnet === valueEstudiante)?.Apellidos
                    : 'Selecciona un estudiante'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Buscar estudiante por id" />
                  <CommandList>
                    <CommandEmpty>No se ha podido encontrar el estudiante</CommandEmpty>
                    <CommandGroup>
                      {students.map((student) => (
                        <CommandItem
                          key={student.Carnet}
                          value={student.Carnet}
                          onSelect={(currentValue) => {
                            setValueEstudiante(
                              currentValue === valueEstudiante ? '' : currentValue
                            );
                            setOpenEstudiante(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              valueEstudiante === student.Carnet
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {student.Carnet} - {student.Nombres} {student.Apellidos}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex flex-col gap-2 my-4">
            <Label htmlFor="monografiaId">Id de Monografía</Label>
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

          <Button onClick={handleAssignMonografia} className="w-full">
            Asignar Monografía
          </Button>
        </CardContent>
      </Card>

      {/* Tabla de estudiantes con Idmonografia asignado */}
      <Card className="w-full md:w-3/4 mt-8">
        <CardHeader>
          <CardTitle>Lista de Estudiantes</CardTitle>
          <CardDescription>Estudiantes y sus Ids de Monografía</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Carnet</TableHead>
                <TableHead>Nombres</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Id Monografía</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.Carnet}</TableCell>
                  <TableCell>{student.Nombres}</TableCell>
                  <TableCell>{student.Apellidos}</TableCell>
                  <TableCell>{student.Idmonografia || 'No asignado'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default EstudianteMonografia;
