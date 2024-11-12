import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeChanger from '@/components/theme-changer';
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
  rol : string;
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

  const teachers = getArrayProfesores();
  const monografias = getArrayMonografias();
  const students = getArrayEstudiantes();

  const [openProfesor, setOpenProfesor] = useState(false);
  const [valueProfesor, setValueProfesor] = useState('');

  const [openMonografia, setOpenMonografia] = useState(false);
  const [valueMonografia, setValueMonografia] = useState('');

  const [tableData, setTableData] = useState([]);

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
          <CardTitle>Detalles de las citas</CardTitle>
          <div className="flex gap-4 justify-around flex-col md:flex-row">
            <AlertDialog open={openMonth} onOpenChange={setOpenMonth}>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full text-wrap"
                  onClick={listMonthAppointments}
                >
                  Listar citas de un mes
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-black absolute left-8 top-4 md:right-0">
                    Citas del mes {month}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <Card className="w-[70%] md:w-[90%] mt-8">
                      <CardContent className="overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-nowrap">
                                Id cita
                              </TableHead>
                              <TableHead className="text-nowrap">
                                Paciente
                              </TableHead>
                              <TableHead className="text-nowrap">
                                Nombre del servicio
                              </TableHead>
                              <TableHead className="text-nowrap">
                                Fecha programada
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {monthAppointments.map((appointment) => (
                              <TableRow key={appointment.id}>
                                <TableCell className="text-nowrap">
                                  {appointment.id}
                                </TableCell>
                                <TableCell className="text-nowrap">
                                  {appointment.patientId}
                                </TableCell>
                                <TableCell>{appointment.service}</TableCell>
                                <TableCell>{appointment.date}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center items-center">
                  <AlertDialogAction className="w-[4rem] md:w-[4rem] absolute top-3 right-4">
                    ok
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Input
              type="number"
              placeholder="Mes a listar"
              id="listedMonth"
              min="1"
              max="12"
            />
            <Button
              className="w-full text-wrap p-2"
              onClick={cleanArray}
              variant={'destructive'}
            >
              Borrar todas las citas
            </Button>
          </div>
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
                  <TableCell className="text-nowrap">
                    {element.id}
                  </TableCell>
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
