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
import { Label } from '@/components/ui/label';
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

  const [tableTitle, setTableTitle] = useState('Consultas de datos');

  const teachers = getArrayProfesores();
  let monografias = getArrayMonografias();
  const students = getArrayEstudiantes();
  const profesorMonografia = getArray();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = useState<{ [key: string]: any }[]>([]);

  const newMonografias = monografias.map((x) => {
    return {
      ...x,
      fechaDeDefensa: new Date(x.fechaDeDefensa),
    }
  })
  monografias = newMonografias;
  
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

    const query = Enumerable.from(monografias)
      .join(
        profesorMonografia,
        (monografia) => monografia.idMonografia,
        (profesor) => profesor.idMonografia,
        (monografia, profesor) => ({ ...monografia, ...profesor })
      )
      .where((x) => x.idprofesor === idProfesor)
      .select((x) => {return {titulo: x.titulo} })
      .toArray();
      setTableTitle(`Monografias por tutor con ID ${idProfesor}`);
    return query;
  };

  const estudiantePorMonografia = (idMonografia: string) => {
    const query = Enumerable.from(students)
      .where((x) => x.Idmonografia === idMonografia)
      .select((x) => {
        return {
          carnet: x.Carnet,
          nombres: x.Nombres,
          apellidos: x.Apellidos,
          direccion: x.Direccion,
          telefono: x.Telefono,
          añoDeNacimiento: x.AñoDenacimiento,
        };
      })
      .toArray();
    setTableTitle(`Estudiantes por monografía con ID ${idMonografia}`);
    return query;
  };

  const monografiasEnRango = (fechaInicio: Date, fechaFin: Date) => {
    const query = Enumerable.from(monografias)
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
      setTableTitle(`Monografias en rango de fecha`);
      console.log(query)
    return query;
  };

  const monografiaPorEstudiante = (carnet: string) => {
    const query = Enumerable.from(students)
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
    setTableTitle(`Monografias por estudiante con carnet ${carnet}`);
    return query;
  }

  const totalMonografiasEnRango = (fechaInicio: Date, fechaFin: Date) => {
    const query = Enumerable.from(monografias)
      .where(
        (x) =>
          x.fechaDeDefensa >= fechaInicio && x.fechaDeDefensa <= fechaFin
      )
      .count();
    console.log(query)
    setTableTitle(`Total de monografias en rango de fecha`);
    return query;
  };

  const countMonografiasPorTutor = (idProfesor: string) => {
    const query = Enumerable.from(monografias)
      .join(
        profesorMonografia,
        (monografia) => monografia.idMonografia,
        (profesor) => profesor.idMonografia,
        (monografia, profesor) => ({ ...monografia, ...profesor })
      )
      .where((x) => x.idprofesor === idProfesor)
      .count();
    setTableTitle(`Monografias por profesor con ID ${idProfesor}`);
    return query;
  };

  const handleMonografiasPorTutor = () => {
    const input = document.createElement('input');
    input.id = 'swal-input';
    input.classList.add('swal2-input');
    Swal.fire({
      title: 'Selecciona el id del tutor',
      html: input,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = (document.getElementById('swal-input') as HTMLInputElement)?.value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un id');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = (document.getElementById('swal-input') as HTMLInputElement)?.value;
        const data = monografiasPorTutor(selectedOption);
        if(data){
          setTableData(data);
          Swal.fire({
            title: 'Éxito',
            icon: 'success',
            confirmButtonText: 'ok',
          });
        }
        else{
          return;
        }
      }
    });
  }

  const handleMonografiasEnRango = () => {
    console.log("waos")
    const fechaInicio = (document.getElementById('fecha-inicial') as HTMLInputElement).valueAsDate;
    const fechaFin = (document.getElementById('fecha-final') as HTMLInputElement).valueAsDate;
    if (!fechaInicio || !fechaFin) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar un rango de fechas',
      });
      return;
    }
    if(fechaInicio > fechaFin){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de inicio no puede ser mayor a la fecha final',
      });
      return;
    }
    const data = monografiasEnRango(fechaInicio, fechaFin);
    if(data){
      setTableData(data);
      Swal.fire({
        title: 'Éxito',
        icon: 'success',
        confirmButtonText: 'ok',
      });
    }
    else{
      return;
    }
  }

  const handleEstudiantesPorMonografia = () => {
    const input = document.createElement('input');
    input.id = 'swal-input';
    input.classList.add('swal2-input');
    Swal.fire({
      title: 'Selecciona el id de la monografía',
      html: input,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = (document.getElementById('swal-input') as HTMLInputElement)?.value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un id');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = (document.getElementById('swal-input') as HTMLInputElement)?.value;
        const data = estudiantePorMonografia(selectedOption);
        if(data){
          setTableData(data);
          Swal.fire({
            title: 'Éxito',
            icon: 'success',
            confirmButtonText: 'ok',
          });
        }
        else{
          return;
        }
      }
    });
  }

  const handleMonografiaPorEstudiante = () => {
    const input = document.createElement('input');
    input.id = 'swal-input';
    input.classList.add('swal2-input');
    Swal.fire({
      title: 'Selecciona el id de un estudiante',
      html: input,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = (document.getElementById('swal-input') as HTMLInputElement)?.value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un id');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = (document.getElementById('swal-input') as HTMLInputElement)?.value;
        const data = monografiaPorEstudiante(selectedOption);
        if(data){
          setTableData(data);
          Swal.fire({
            title: 'Éxito',
            icon: 'success',
            confirmButtonText: 'ok',
          });
        }
        else{
          return;
        }
      }
    });
  }

  const handleCountMonografiasEnRangoDeFechas = () => {
    const fechaInicio = (document.getElementById('fecha-inicial') as HTMLInputElement).valueAsDate;
    const fechaFin = (document.getElementById('fecha-final') as HTMLInputElement).valueAsDate;
    if (!fechaInicio || !fechaFin) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar un rango de fechas',
      });
      return;
    }
    if(fechaInicio > fechaFin){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de inicio no puede ser mayor a la fecha final',
      });
      return;
    }
    const data = totalMonografiasEnRango(fechaInicio, fechaFin);
    Swal.fire({
      title: 'Éxito',
      icon: 'success',
      confirmButtonText: 'ok',
      text: `Total de monografias en rango de fechas: ${data}`,
    });
  }

  const handleCountMonografiasPorTutor = () => {
    const fechaInicio = (document.getElementById('fecha-inicial') as HTMLInputElement).valueAsDate;
    const fechaFin = (document.getElementById('fecha-final') as HTMLInputElement).valueAsDate;
    if (!fechaInicio || !fechaFin) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar un rango de fechas',
      });
      return;
    }
    if(fechaInicio > fechaFin){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de inicio no puede ser mayor a la fecha final',
      });
      return;
    }
    const input = document.createElement('input');
    input.id = 'swal-input';
    input.classList.add('swal2-input');
    Swal.fire({
      title: 'Selecciona el id del tutor',
      html: input,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = (document.getElementById('swal-input') as HTMLInputElement)?.value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un id');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = (document.getElementById('swal-input') as HTMLInputElement)?.value;
        const data = countMonografiasPorTutor(selectedOption);
        Swal.fire({
          title: 'Éxito',
          icon: 'success',
          confirmButtonText: 'ok',
          text: `Total de monografias por tutor con ID ${selectedOption}: ${data}`,
        });
      }
    });
  }

  return (
    <>
      <div className="absolute top-4 left-4 gap-4 flex">
        <Link to="/">
          <Button variant="secondary">Insertar datos</Button>
        </Link>
        <ThemeChanger />
      </div>
      <Card className="w-full md:w-[60%] m-auto mt-12">
        <CardHeader className='flex gap-2 flex-col'>
          <CardTitle>{tableTitle}</CardTitle>
          <div className='flex items-center gap-4'>
            <Label className='text-nowrap'>Rango de fechas</Label>
            <Input type='date' id="fecha-inicial"/>
            <Input type='date' id="fecha-final"/>
          </div>
          <div className='flex gap-4'>
            <Button
              className="w-full text-wrap p-2"
              onClick={() => handleMonografiasPorTutor()}
            >
              Monografias por tutor
            </Button>
            <Button
              className="w-full text-wrap p-2"
              onClick={() => handleEstudiantesPorMonografia()}
            >
              Estudiantes por monografia
            </Button>
          </div>
          <div className='flex gap-4'>
            <Button
              className="w-full text-wrap p-2"
              onClick={() => handleMonografiasEnRango()}
            >
              Monografias en rango de fechas
            </Button>
            <Button
              className="w-full text-wrap p-2"
              onClick={() => handleMonografiaPorEstudiante()}
            >
              Monografia por estudiante
            </Button>
          </div>
          <div className='flex gap-4'>
            <Button
              className="w-full text-wrap p-2"
              onClick={() => handleCountMonografiasEnRangoDeFechas()}
            >
              Cantidad de monografias en rango de fechas
            </Button>
            <Button
              className="w-full text-wrap p-2"
              onClick={() => handleCountMonografiasPorTutor()}
            >
              Trabajos monográficos en rango de fechas
            </Button>
          </div>
        </CardHeader>
        <CardContent className="max-h-[28rem] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableData.map((element, index) => {
                  if(index === 0)
                  return (
                  Object.keys(element).map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))
                )})}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((element, index) => (
                <TableRow key={index}>
                  {Object.values(element).map((value) => (
                    <TableCell>{value instanceof Date ? value.toLocaleDateString() : value}</TableCell>
                  ))}
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
