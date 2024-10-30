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
import Enumerable from 'linq';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card.tsx';

type Patient = {
  id: string;
  name: string;
  lastName: string;
  birthDate: string;
};

function PatientsTab() {
  let lastPatientId: number = Number.parseInt(JSON.parse(localStorage.getItem('patientLastId') || '1'));

  const saveArray = (array: Patient[]) => {
    localStorage.setItem('patientsArray', JSON.stringify(array));
  };

  const getArray = (): Patient[] => {
    const array = localStorage.getItem('patientsArray');
    if (array) {
      return JSON.parse(array);
    }
    return [];
  };

  const [patientsArray, setPatientsArray] = useState(getArray());

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<Patient>(
    {
      defaultValues: {
        id: (lastPatientId + 1).toString(),
        name: '',
        lastName: '',
        birthDate: ''
      }
    }
  );

  const cleanArray = () => {
    Swal.fire({
      title: 'Advertencia!',
      text: 'Estas seguro que deseas eliminar todos los pacientes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar pacientes',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('patientsArray');
        localStorage.removeItem('appointmentArray');
        setPatientsArray([]);
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

  const deletePatient = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    patientsArray.forEach((patient: Patient) => {
      const option = document.createElement('option');
      option.value = patient.id;
      option.text = patient.id;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el id del paciente a borrar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar paciente',
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
        const newPatientsArray = patientsArray.filter(
          (patient: Patient) => patient.id !== selectedOption
        );
        const updatedPatientsArray = [...newPatientsArray].sort(
          (a, b) => Number.parseInt(a.id) - Number.parseInt(b.id)
        );
        setPatientsArray(updatedPatientsArray);
        saveArray(updatedPatientsArray);
        Swal.close();
        Swal.fire({
          title: 'Paciente eliminado',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const loadPatient = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    patientsArray.forEach((patient) => {
      const option = document.createElement('option');
      option.value = patient.id;
      option.text = patient.id;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el id del paciente a cargar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cargar paciente',
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
        const patient = Enumerable.from(patientsArray).first(
          (patient) => patient.id === selectedOption
        );
        /* const appointment = appointmentArray.find(
          (appointment) => appointment.id === selectedOption
        ); */
        setValue('id', patient.id);
        setValue('name', patient.name);
        setValue('lastName', patient.lastName);
        setValue('birthDate', patient.birthDate);
        clearErrors();
        setFocus('id');
        Swal.close();
        Swal.fire({
          title: 'Paciente cargado',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const onSubmit = (data: Patient) => {
    let centinel = false;
    for (let i = 0; i < patientsArray.length; i++) {
      if (patientsArray[i].id === data.id) {
        centinel = true;
        Swal.close();
        Swal.fire({
          title: 'Advertencia!',
          text: 'El id ya existe, deseas actualizar la información del paciente?',
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Actualizar',
          denyButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            patientsArray[i] = data;
            const updatedPatientsArray = [...patientsArray].sort(
              (a, b) => Number.parseInt(a.id) - Number.parseInt(b.id)
            );
            setPatientsArray(updatedPatientsArray);
            saveArray(updatedPatientsArray);
            setFocus('id');
            Swal.fire({
              title: 'Paciente actualizado',
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
      if (Number.parseInt(data.id) != lastPatientId + 1) {
        Swal.fire({
          title: 'Error',
          text: 'El id de un nuevo paciente debe ser consecutivo',
          icon: 'error',
          confirmButtonText: 'ok',
        });
        return;
      }
      const updatedPatientsArray = [...patientsArray, data].sort(
        (a, b) => Number.parseInt(a.id) - Number.parseInt(b.id)
      );
      setPatientsArray(updatedPatientsArray);
      saveArray(updatedPatientsArray);
      localStorage.setItem('patientLastId', JSON.stringify(data.id));
      lastPatientId = Number.parseInt(data.id);
      Swal.fire({
        title: 'Paciente agregado',
        icon: 'success',
        confirmButtonText: 'ok',
      });
      reset();
    }
  };

  return (
    <>
      <Card className="w-full md:w-[60%] rounded-lg">
        <CardHeader>
          <CardTitle>Formulario de Clínica</CardTitle>
          <CardDescription>Ingresa los datos del paciente</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idNumber">Id Paciente</Label>
              <Input
                id="idNumber"
                placeholder="Id del paciente"
                type="number"
                value={patientsArray.length + 1}
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
              <Label htmlFor="patientName">Nombre</Label>
              <Input
                id="patientName"
                placeholder="Nombre del paciente"
                type="text"
                {...register('name', {
                  required: 'El nombre del paciente es obligatorio',
                })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientLastName">Apellido del paciente</Label>
              <Input
                id="patientLastName"
                placeholder="Apellido del paciente"
                {...register('lastName', {
                  required: 'El apellido del paciente es obligatorio',
                })}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Fecha de nacimiento</Label>
              <Input
                id="date"
                type="date"
                placeholder="Fecha de nacimiento del paciente"
                {...register('birthDate', {
                  required: 'La fecha de nacimiento es obligatoria',
                })}
              />
              {errors.birthDate && (
                <p className="text-red-500">{errors.birthDate.message}</p>
              )}
            </div>

            <CardFooter className="px-0 flex flex-col gap-4 justify-around">
              <Button type="submit" className="w-full">
                Confirmar
              </Button>
            </CardFooter>
          </form>
          <div className="flex justify-around flex-col gap-4 md:gap-0 md:flex-row">
            <Button onClick={deletePatient}>Eliminar Paciente</Button>
            <Button onClick={loadPatient}>Cargar Paciente</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full md:w-[605]">
        <CardHeader>
          <CardTitle>Detalles de los pacientes</CardTitle>
          <div className="flex gap-4 justify-around flex-col md:flex-row p-2">
            <Button
              className="w-full text-wrap p-2"
              onClick={cleanArray}
              variant={'destructive'}
            >
              Borrar todos los paciente y citas
            </Button>
          </div>
        </CardHeader>
        <CardContent className="max-h-[28rem] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead className="text-nowrap">Nombre</TableHead>
                <TableHead className="text-nowrap">
                  Apellido
                </TableHead>
                <TableHead className="text-nowrap">Fecha Nacimiento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientsArray.map((patient: Patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="text-nowrap">
                    {patient.id}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {patient.name}
                  </TableCell>
                  <TableCell>{patient.lastName}</TableCell>
                  <TableCell>{patient.birthDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default PatientsTab;
