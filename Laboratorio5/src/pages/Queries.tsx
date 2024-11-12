import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeChanger from '@/components/theme-changer';
import Swal from 'sweetalert2';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.tsx';
import Enumerable from 'linq';

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

type Student = {
  Carnet: string;
  Idmonografia?: string;
  Nombres: string;
  Apellidos: string;
  Direccion: string;
  Telefono: string;
  AñoDenacimiento: Date;
};

type ProfesorMonografia = {
  idprofesor: string;
  idMonografia: string;
  rol: string;
};

function Queries() {
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

  const getArrayEstudiantes = (): Student[] => {
    const array = localStorage.getItem('students');
    return array ? JSON.parse(array) : [];
  };

  const [tableTitle, setTableTitle] = useState('');

  const teachers = getArrayProfesores();
  const monografias = getArrayMonografias();
  const students = getArrayEstudiantes();
  const profesorMonografia = getArray();

  const [openProfesor, setOpenProfesor] = useState(false);
  const [valueProfesor, setValueProfesor] = useState('');

  const [openMonografia, setOpenMonografia] = useState(false);
  const [valueMonografia, setValueMonografia] = useState('');

  const [tableData, setTableData] = useState([]);

  const monografiasPorTutor = (idProfesor: string) => {
    const esTutor = Enumerable.from(profesorMonografia)
      .where((x) => x.idprofesor === idProfesor && x.rol === 'Tutor')
      .toArray();

    if (esTutor.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El profesor no es tutor de ninguna monografía',
      });
      return;
    }


    const monografiasPorTutor = Enumerable.from(monografias)
      .join(
        profesorMonografia,
        (monografia) => monografia.idMonografia,
        (profesor) => profesor.idMonografia,
        (monografia, profesor) => ({ ...monografia, ...profesor })
      )
      .where((x) => x.idprofesor === idProfesor)
      .select((x) => x.titulo)
      .toArray();
    return monografiasPorTutor;
  };

  const estudiantePorMonografia = (idMonografia: string) => {
    const estudiantePorMonografia = Enumerable.from(students)
      .where((x) => x.Idmonografia === idMonografia)
      .select((x) => x)
      .toArray();
    return estudiantePorMonografia;
  };

  const monografiasEnRango = (fechaInicio: Date, fechaFin: Date) => {
    const monografiasEnRango = Enumerable.from(monografias)
      .where(
        (x) =>
          x.fechaDeDefensa >= fechaInicio && x.fechaDeDefensa <= fechaFin
      )
      .join(
        students,
        (monografia) => monografia.idMonografia,
        (student) => student.Idmonografia,
        (monografia, student) => ({ ...monografia, ...student })
      )
      .join(
        profesorMonografia,
        (monografia) => monografia.idMonografia,
        (profesor) => profesor.idMonografia,
        (monografia, profesor) => ({ ...monografia, ...profesor })
      )
      .join(
        teachers,
        (monografia) => monografia.idprofesor,
        (teacher) => teacher.idProfesor,
        (monografia, teacher) => ({
          ...monografia,
          ...teacher,
        })
      )
      .where((x) => x.rol === 'Tutor')
      .select((x) => {
        return {
          titulo: x.titulo,
          estudiante: x.Carnet + ' ' + x.Nombres + ' ' + x.Apellidos,
          tutor: x.nombres + ' ' + x.apellidos,
        };
      })
      .toArray();
    return monografiasEnRango;
  };

  const monografiaPorEstudiante = (carnet: string) => {
    const monografiaPorEstudiante = Enumerable.from(students)
      .where((x) => x.Carnet === carnet)
      .join(
        monografias,
        (student) => student.Idmonografia,
        (monografia) => monografia.idMonografia,
        (student, monografia) => ({ ...student, ...monografia })
      )
      .select((x) => {
        return {
          titulo: x.titulo,
          fechaDeDefensa: x.fechaDeDefensa,
          notaDeLaDefensa: x.notaDeLaDefensa,
          tiempoOtorgado: x.tiempoOtorgado,
          tiempoDefensa: x.tiempoDefensa,
        };
      })
      .toArray();
    return monografiaPorEstudiante;
  }

  const totalMonografiasEnRango = (fechaInicio: Date, fechaFin: Date) => {
    const monografiasEnRango = Enumerable.from(monografias)
      .where(
        (x) =>
          x.fechaDeDefensa >= fechaInicio && x.fechaDeDefensa <= fechaFin
      )
      .count();
    return monografiasEnRango;
  };

  const countMonografiasPorTutor = (idProfesor: string) => {
    const monografiasPorTutor = Enumerable.from(monografias)
      .join(
        profesorMonografia,
        (monografia) => monografia.idMonografia,
        (profesor) => profesor.idMonografia,
        (monografia, profesor) => ({ ...monografia, ...profesor })
      )
      .where((x) => x.idprofesor === idProfesor)
      .count();
    return monografiasPorTutor;
  };

  return (
    <>
      <div className="absolute top-4 left-4 gap-4 flex">
        <Link to="/queries">
          <Button variant="secondary">Consultar datos</Button>
        </Link>
        <ThemeChanger />
      </div>
      <Card className="w-full md:w-[60%]">
        <CardHeader>
          <CardTitle>{tableTitle}</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[28rem] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id cita</TableHead>
                <TableHead className="text-nowrap">Paciente</TableHead>
                <TableHead className="text-nowrap">
                  Nombre del servicio
                </TableHead>
                <TableHead className="text-nowrap">Fecha programada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((element: Appointment) => (
                <TableRow key={element.id}>
                  <TableCell className="text-nowrap">{element.id}</TableCell>
                  <TableCell className="text-nowrap">
                    {element.patientId}
                  </TableCell>
                  <TableCell>{element.service}</TableCell>
                  <TableCell>{element.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default Queries;
