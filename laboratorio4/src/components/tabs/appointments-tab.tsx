import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Swal from 'sweetalert2';
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
import Enumerable from 'linq';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card.tsx';

type Appointment = {
  id: string;
  patientId: string;
  service: string;
  date: string;
};

/* type Patient = {
  id: number;
  name: string;
  lastName: string;
}; */

function AppointmentsTab() {
  const [open, setOpen] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);

  const saveArray = (array: Appointment[]) => {
    localStorage.setItem('appointmentArray', JSON.stringify(array));
  };

  const getArray = (): Appointment[] => {
    const array = localStorage.getItem('appointmentArray');
    if (array) {
      return JSON.parse(array);
    }
    return [];
  };

  const [appointmentArray, setAppointmentArray] = useState(getArray());
  const [monthAppointments, setMonthAppointments] = useState<Appointment[]>([]);
  const [month, setMonth] = useState(0);
  const [listedAppointments, setListedAppointments] = useState<Appointment[]>(
    []
  );
  const [patient, setPatient] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<Appointment>();

  const cleanArray = () => {
    Swal.fire({
      title: 'Advertencia!',
      text: 'Estas seguro que deseas eliminar todas las citas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar citas',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('appointmentArray');
        setAppointmentArray([]);
        Swal.fire({
          title: 'Registros eliminados',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const listMonthAppointments = () => {
    const input = document.querySelector('#listedMonth');
    if (!input) {
      return;
    }
    const chosenMonth = parseInt((input as HTMLInputElement).value);

    if (chosenMonth >= 1 && chosenMonth <= 12) {
      setMonth(chosenMonth);
      const newMonthAppointments = Enumerable.from(appointmentArray)
        .where(
          (appointment: Appointment) =>
            new Date(appointment.date).getMonth() + 1 === chosenMonth
        )
        .toArray();
      /* const newMonthAppointments = appointmentArray.filter(
        (appointment: Appointment) =>
          new Date(appointment.date).getMonth() + 1 === chosenMonth
      ); */
      setMonthAppointments(newMonthAppointments);
    } else {
      setMonth(0);
      setMonthAppointments([]);
      Swal.fire({
        title: 'Error',
        text: 'El mes a listar debe ser un número entre 1 y 12',
        icon: 'error',
        confirmButtonText: 'ok',
      });
      setOpenMonth(false);
    }
  };

  const deleteAppointment = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    appointmentArray.forEach((appointment: Appointment) => {
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
        const selectedOption = (
          document.getElementById('swal-select') as HTMLSelectElement
        )?.value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un id');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = (
          document.getElementById('swal-select') as HTMLSelectElement
        )?.value;
        const newAppointmentArray = appointmentArray.filter(
          (appointment: Appointment) => appointment.id !== selectedOption
        );
        const updatedAppointmentArray = [...newAppointmentArray].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
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
        const selectedOption = (
          document.getElementById('swal-select') as HTMLSelectElement
        )?.value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un id');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = (
          document.getElementById('swal-select') as HTMLSelectElement
        )?.value;
        const appointment = Enumerable.from(appointmentArray).first(
          (appointment) => appointment.id === selectedOption
        );
        /* const appointment = appointmentArray.find(
          (appointment) => appointment.id === selectedOption
        ); */
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

  const listAppointments = () => {
    if (!open) {
      const select = document.createElement('select');
      select.id = 'swal-select';
      select.classList.add('swal2-select');
      const idList: string[] = [];
      appointmentArray.forEach((appointment) => {
        idList.push(appointment.patientId);
      });
      const set = [...new Set(idList)];
      for (let i = 0; i < set.length; i++) {
        const option = document.createElement('option');
        option.value = set[i];
        option.text = set[i];
        select.appendChild(option);
      }
      Swal.fire({
        title: 'Selecciona el id del paciente para listar sus citas',
        html: select,
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Listar citas',
        denyButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
          const selectedOption = (
            document.getElementById('swal-select') as HTMLSelectElement
          )?.value;
          if (selectedOption === '' || selectedOption === null) {
            Swal.showValidationMessage('Debes seleccionar un id');
          } else {
            return selectedOption;
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedOption = (
            document.getElementById('swal-select') as HTMLSelectElement
          )?.value;

          const appointments = Enumerable.from(
            appointmentArray as Appointment[]
          )
            .where(
              (appointment: Appointment) =>
                appointment.patientId === selectedOption
            )
            .toArray();
          setListedAppointments(appointments);
          setPatient(selectedOption);
          setOpen(true);
        }
      });
    } else {
      setOpen(false);
    }
  };

  const onSubmit = (data: Appointment) => {
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
            if (new Date(data.date).getFullYear() != 2024) {
              Swal.fire({
                title: 'Error',
                text: 'El año de la fecha programada debe ser de 2024',
                icon: 'error',
                confirmButtonText: 'ok',
              });
              return;
            }
            appointmentArray[i] = data;
            const updatedAppointmentArray = [...appointmentArray].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setAppointmentArray(updatedAppointmentArray);
            saveArray(updatedAppointmentArray);
            setFocus('id');
            Swal.fire({
              title: 'Cita actualizada',
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
      if (new Date(data.date).getFullYear() != 2024) {
        Swal.fire({
          title: 'Error',
          text: 'El año de la fecha programada debe ser 2024',
          icon: 'error',
          confirmButtonText: 'ok',
        });
        return;
      }
      const updatedAppointmentArray = [...appointmentArray, data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
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
    <>
    
    <Card className="w-full md:w-1/2 rounded-lg">
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
                placeholder="Id cita"
                value={appointmentArray.length + 1}
                type="number"
                {...register('id', {
                  required: 'El id es obligatorio',
                  min: {
                    value: 1,
                    message: 'El Id no puede ser menor a 1',
                  },
                })}
              />
              {errors.id && <p className="text-red-500">{errors.id.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientId">Id Paciente</Label>
              <Input
                id="patientId"
                placeholder="Id del paciente"
                type="number"
                {...register('patientId', {
                  required: 'El id del paciente es obligatorio',
                  min: {
                    value: 1,
                    message: 'El id del paciente no puede ser menor a 1',
                  },
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
            <Button onClick={listAppointments}>Listar cita</Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-black absolute left-8 top-4 md:right-0">
                    Citas del paciente {patient}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <Card className="w-[70%] md:w-[100%] mt-8 p-0">
                      <CardContent className="overflow-auto p-0">
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
                            {listedAppointments.map(
                              (appointment: Appointment) => (
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
                              )
                            )}
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
          </div>
        </CardContent>
      </Card>

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
              {appointmentArray.map((appointment: Appointment) => (
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
    </>
  )
}

export default AppointmentsTab