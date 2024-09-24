import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card.jsx';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function ClinicForm() {
  useEffect(() => {
    document.title = 'Formulario de estudiantes';
  }, []);

  const saveArray = (array) => {
    localStorage.setItem('appointmentArray', JSON.stringify(array));
  };

  const getArray = () => {
    const array = localStorage.getItem('appointmentArray');
    if (array) {
      return JSON.parse(array);
    }
    return [];
  };

  const [appointmentArray, setAppointmentArray] = useState(getArray());
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm();

  const cleanArray = () => {
    localStorage.removeItem('appointmentArray');
    setAppointmentArray([]);
    Swal.fire({
      title: 'Registros eliminados',
      icon: 'success',
      confirmButtonText: 'ok',
    });
  };

  const listMonthAppointments = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    for (let i = 0; i < 12; i++) {
      const option = document.createElement('option');
      option.value = i + 1;
      option.text = i + 1;
      select.appendChild(option);
    }
    Swal.fire({
      title: 'Selecciona el mes a listar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'listar mes',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un mes');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        appointmentArray.forEach((appointment) => {
          const date = new Date(appointment.date);
          if (date.getMonth() + 1 === parseInt(selectedOption)) {
            Swal.fire({
              title: 'Información del cita',
              html: `
              <p><strong>Id cita:</strong> ${appointment.id}</p>
              <p><strong>Paciente:</strong> ${appointment.patientId}</p>
              <p><strong>Servicio:</strong> ${appointment.service}</p>
              <p><strong>Fecha programada:</strong> ${appointment.date}</p>
              `,
              confirmButtonText: 'ok',
            });
          }
        });
      }
    });
  };

  const deleteAppointment = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    appointmentArray.forEach((appointment) => {
      const option = document.createElement('option');
      option.value = appointment.id;
      option.text = appointment.id;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el id de la cita a borrar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar cita',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un id');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        const newAppointmentArray = appointmentArray.filter(
          (appointment) => appointment.id !== selectedOption
        );
        const updatedAppointmentArray = [...newAppointmentArray].sort((a,b) => new Date(b.date) - new Date(a.date));
        setAppointmentArray(updatedAppointmentArray);
        saveArray(updatedAppointmentArray);
        Swal.close();
        Swal.fire({
          title: 'Cita eliminada',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const loadAppointment = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    appointmentArray.forEach((appointment) => {
      const option = document.createElement('option');
      option.value = appointment.id;
      option.text = appointment.id;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el id de la cita a cargar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cargar cita',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un id');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        const appointment = appointmentArray.find(
          (appointment) => appointment.id === selectedOption
        );
        setValue('id', appointment.id);
        setValue('patientId', appointment.patientId);
        setValue('service', appointment.service);
        setValue('date', appointment.date);
        clearErrors();
        setFocus('id');
        Swal.close();
        Swal.fire({
          title: 'Cita cargada',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const listAppointment = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    appointmentArray.forEach((appointment) => {
      const option = document.createElement('option');
      option.value = appointment.id;
      option.text = appointment.id;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el id del cita a listar',
      html: select,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Listar cita',
      denyButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un id');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        const appointment = appointmentArray.find(
          (appointment) => appointment.id === selectedOption
        );
        Swal.fire({
          title: 'Información del cita',
          html: `
          <p><strong>Id cita:</strong> ${appointment.id}</p>
          <p><strong>Paciente:</strong> ${appointment.patientId}</p>
          <p><strong>Servicio:</strong> ${appointment.service}</p>
          <p><strong>Fecha programada:</strong> ${appointment.date}</p>
          `,
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const onSubmit = (data) => {
    let centinel = false;
    for (let i = 0; i < appointmentArray.length; i++) {
      if (appointmentArray[i].id === data.id) {
        centinel = true;
        Swal.close();
        Swal.fire({
          title: 'Advertencia!',
          text: 'El id ya existe, deseas actualizar la información de la cita?',
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Actualizar',
          denyButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            appointmentArray[i] = data;
            const updatedAppointmentArray = [...appointmentArray].sort((a,b) => new Date(b.date) - new Date(a.date));
            setAppointmentArray(updatedAppointmentArray);
            saveArray(updatedAppointmentArray);
            setFocus('id');
            Swal.fire({
              title: 'Estudiante actualizado',
              icon: 'success',
              confirmButtonText: 'ok',
            });
            reset();
          } else if (result.isDenied) {
            Swal.close();
            Swal.fire({
              title: 'Operación cancelada',
              icon: 'info',
              confirmButtonText: 'ok',
            });
            return;
          }
        });
        if (centinel) {
          return;
        }
      }
    }
    if (!centinel) {
      const updatedAppointmentArray = [...appointmentArray, data].sort((a, b) => new Date(b.date) - new Date(a.date));
      setAppointmentArray(updatedAppointmentArray);
      saveArray(updatedAppointmentArray);
      Swal.fire({
        title: 'Cita agregada',
        icon: 'success',
        confirmButtonText: 'ok',
      });
      reset();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-0 md:p-6">
      <div className="absolute top-4 left-4 gap-4 flex">
        <Link to="/">
          <Button variant="secondary">Homepage</Button>
        </Link>
        <Link to="/parishioners">
          <Button variant="secondary">Formulario de feligreses</Button>
        </Link>
      </div>
      <Card className="w-full md:w-1/2 bg-white rounded-lg mt-12 md:mt-8">
        <CardHeader>
          <CardTitle>Formulario de Clínica</CardTitle>
          <CardDescription>Ingresa los datos de la cita</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idNumber">Id cita</Label>
              <Input
                id="idNumber"
                name="idNumber"
                placeholder="Id cita"
                type="number"
                {...register('id', {
                  required: 'El id es obligatorio',
                })}
              />
              {errors.id && (
                <p className="text-red-500">{errors.id.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4"></div>
            <div className="space-y-2">
              <Label htmlFor="patientId">Paciente</Label>
              <Input
                id="patientId"
                name="patientId"
                placeholder="Id del paciente"
                type="number"
                {...register('patientId', {
                  required: 'El id del paciente es obligatorio',
                })}
              />
              {errors.patientId && (
                <p className="text-red-500">{errors.patientId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Nombre del servicio</Label>
              <Input
                id="service"
                name="service"
                placeholder="Servicio de la cita"
                {...register('service', {
                  required: 'El nombre del servicio es obligatorio',
                })}
              />
              {errors.service && (
                <p className="text-red-500">{errors.service.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Fecha programada</Label>
              <Input
                id="date"
                name="date"
                type="date"
                placeholder="Id del paciente"
                {...register('date', {
                  required: 'La fecha programada es obligatoria',
                })}
              />
              {errors.date && (
                <p className="text-red-500">{errors.date.message}</p>
              )}
            </div>
            
            <CardFooter className="px-0 flex flex-col gap-4 justify-around">
              <Button type="submit" className="w-full">
                Confirmar
              </Button>
            </CardFooter>
          </form>
          <div className="flex justify-around flex-col gap-4 md:gap-0 md:flex-row">
            <Button onClick={deleteAppointment}>Eliminar cita</Button>
            <Button onClick={loadAppointment}>Cargar cita</Button>
            <Button onClick={listAppointment}>Listar cita</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/2 mt-8">
        <CardHeader>
          <CardTitle>Detalles de las citas</CardTitle>
          <div className='flex gap-4'>
            <Button
              className="w-full text-wrap"
              onClick={listMonthAppointments}
            >
              Listas citas de un mes
            </Button>
            <Button
              className="w-full text-wrap p-2"
              onClick={cleanArray}
            >
              Borrar todos los registros
            </Button>
          </div>
        </CardHeader>
        <CardContent className="max-h-[28rem] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id cita</TableHead>
                <TableHead className="text-nowrap">Paciente</TableHead>
                <TableHead className="text-nowrap">Nombre del servicio</TableHead>
                <TableHead className="text-nowrap">Fecha programada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointmentArray.map((appointment) => (
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
    </div>
  );
}

export default ClinicForm;
