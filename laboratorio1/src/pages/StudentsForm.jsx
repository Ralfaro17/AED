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

function StudentsForm() {
  useEffect(() => {
    document.title = 'Formulario de estudiantes';
  }, []);

  const saveArray = (array) => {
    localStorage.setItem('studentArray', JSON.stringify(array));
  };

  const getArray = () => {
    const array = localStorage.getItem('studentArray');
    if (array) {
      return JSON.parse(array);
    }
    return [];
  };

  const [studentArray, setStudentArray] = useState(getArray());
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
    localStorage.removeItem('studentArray');
    setStudentArray([]);
    Swal.fire({
      title: 'Registros eliminados',
      icon: 'success',
      confirmButtonText: 'ok',
    });
  };

  const totalAndBestStudent = () => {
    if (studentArray.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'No hay estudiantes registrados',
        icon: 'error',
        confirmButtonText: 'ok',
      });
      return;
    }
    let total = 0;
    let bestStudent = studentArray[0];
    studentArray.forEach((student) => {
      total += student.finalGrade;
      if (student.finalGrade > bestStudent.finalGrade) {
        bestStudent = student;
      }
    });
    Swal.fire({
      title: 'Promedio general y mejor estudiante',
      html: `
      <br>
      <p><strong>Promedio general:</strong> ${total / studentArray.length}</p>
      <br>
      <p><strong>Mejor estudiante:</strong> ${bestStudent.carnet} - ${
        bestStudent.fullName
      }</p>
      <br>
      <p><strong>Nota Final del Mejor estudiante:</strong> ${
        bestStudent.finalGrade
      }</p>
      `,
      confirmButtonText: 'ok',
    });
  };

  const deleteStudent = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    studentArray.forEach((student) => {
      const option = document.createElement('option');
      option.value = student.carnet;
      option.text = student.carnet;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el carnet del estudiante a borrar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar estudiante',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un carnet');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        const newStudentArray = studentArray.filter(
          (student) => student.carnet !== selectedOption
        );
        setStudentArray(newStudentArray);
        saveArray(newStudentArray);
        Swal.close();
        Swal.fire({
          title: 'Estudiante eliminado',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const loadStudent = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    studentArray.forEach((student) => {
      const option = document.createElement('option');
      option.value = student.carnet;
      option.text = student.carnet;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el carnet del estudiante a cargar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cargar estudiante',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un carnet');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        const student = studentArray.find(
          (student) => student.carnet === selectedOption
        );
        setValue('carnet', student.carnet);
        setValue('fullName', student.fullName);
        setValue('partial1', student.partial1);
        setValue('partial2', student.partial2);
        setValue('systematic', student.systematic);
        setValue('project', student.project);
        clearErrors();
        setFocus('carnet');
        Swal.close();
        Swal.fire({
          title: 'Estudiante cargado',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const listStudent = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    studentArray.forEach((student) => {
      const option = document.createElement('option');
      option.value = student.carnet;
      option.text = student.carnet;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el carnet del estudiante a listar',
      html: select,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Listar estudiante',
      denyButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar un carnet');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        const student = studentArray.find(
          (student) => student.carnet === selectedOption
        );
        Swal.fire({
          title: 'Información del estudiante',
          html: `
          <p><strong>Carnet:</strong> ${student.carnet}</p>
          <p><strong>Nombre:</strong> ${student.fullName}</p>
          <p><strong>I P:</strong> ${student.partial1}</p>
          <p><strong>II P:</strong> ${student.partial2}</p>
          <p><strong>SIST:</strong> ${student.systematic}</p>
          <p><strong>PROY:</strong> ${student.project}</p>
          <p><strong>N.F:</strong> ${student.finalGrade}</p>
          `,
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const onSubmit = (data) => {
    let centinel = false;
    data.finalGrade =
      +data.partial1 + +data.partial2 + +data.systematic + +data.project;
    if (data.finalGrade > 100) {
      Swal.fire({
        title: 'Error!',
        text: 'La nota final no puede ser mayor a 100, revisa cada nota individual',
        icon: 'error',
        confirmButtonText: 'ok',
      });
      return;
    }
    for (let i = 0; i < studentArray.length; i++) {
      if (studentArray[i].carnet === data.carnet) {
        centinel = true;
        Swal.close();
        Swal.fire({
          title: 'Advertencia!',
          text: 'El carnet ya existe, deseas actualizar la información del estudiante?',
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Actualizar',
          denyButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            studentArray[i] = data;
            setStudentArray([...studentArray]);
            saveArray(studentArray);
            setFocus('carnet');
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
      setStudentArray([...studentArray, data]);
      saveArray([...studentArray, data]);
      Swal.fire({
        title: 'Estudiante agregado',
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
        <Link to="/employee">
          <Button variant="secondary">Formulario de empleados</Button>
        </Link>
      </div>
      <Card className="w-full md:w-1/2 bg-white rounded-lg mt-12 md:mt-8">
        <CardHeader>
          <CardTitle>Formulario de Estudiantes</CardTitle>
          <CardDescription>Ingresa los datos del estudiante</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idNumber">Carnet</Label>
              <Input
                id="idNumber"
                name="idNumber"
                placeholder="Carnet"
                {...register('carnet', {
                  required: 'El carnet es obligatorio',
                  maxLength: {
                    value: 10,
                    message: 'El carnet debe tener 8 dígitos',
                  },
                })}
              />
              {errors.carnet && (
                <p className="text-red-500">{errors.carnet.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4"></div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Nombre completo"
                {...register('fullName', {
                  required: 'El nombre es obligatorio',
                })}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            <div className="flex justify-around">
              <div className="space-y-2">
                <Label htmlFor="partial1">I P</Label>
                <Input
                  id="partial1"
                  name="partial1"
                  step="0.01"
                  type="number"
                  placeholder="Nota primer parcial"
                  {...register('partial1', {
                    required: 'Campo requerido',
                    min: { value: 0, message: 'La nota mínima es 0' },
                    max: { value: 100, message: 'La nota máxima es 100' },
                  })}
                />
                {errors.partial1 && (
                  <p className="text-red-500">{errors.partial1.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="partial2">II P</Label>
                <Input
                  id="partial2"
                  step="0.01"
                  name="partial2"
                  type="number"
                  placeholder="Nota segundo parcial"
                  {...register('partial2', {
                    required: 'Campo requerido',
                    min: { value: 0, message: 'La nota mínima es 0' },
                    max: { value: 100, message: 'La nota máxima es 100' },
                  })}
                />
                {errors.partial2 && (
                  <p className="text-red-500">{errors.partial2.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-around">
              <div className="space-y-2">
                <Label htmlFor="systematic">SIST</Label>
                <Input
                  id="systematic"
                  placeholder="Nota sistematico"
                  name="systematic"
                  step="0.01"
                  type="number"
                  {...register('systematic', {
                    required: 'Campo requerido',
                    min: { value: 0, message: 'La nota mínima es 0' },
                    max: { value: 100, message: 'La nota máxima es 100' },
                  })}
                />
                {errors.systematic && (
                  <p className="text-red-500">{errors.systematic.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">PROY</Label>
                <Input
                  id="project"
                  name="project"
                  step="0.01"
                  type="number"
                  placeholder="Nota Proyecto"
                  {...register('project', {
                    required: 'Campo requerido',
                    min: { value: 0, message: 'La nota mínima es 0' },
                    max: { value: 100, message: 'La nota máxima es 100' },
                  })}
                />
                {errors.project && (
                  <p className="text-red-500">{errors.project.message}</p>
                )}
              </div>
            </div>
            <CardFooter className="px-0 flex flex-col gap-4 justify-around">
              <Button type="submit" className="w-full">
                Confirmar
              </Button>
            </CardFooter>
          </form>
          <div className="flex justify-around flex-col gap-4 md:gap-0 md:flex-row">
            <Button onClick={deleteStudent}>Eliminar estudiante</Button>
            <Button onClick={loadStudent}>Cargar estudiante</Button>
            <Button onClick={listStudent}>Listar estudiante</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/2 mt-8">
        <CardHeader>
          <CardTitle>Detalles de la clase</CardTitle>
          <div className='flex gap-4'>
            <Button
              className="w-full text-wrap"
              onClick={totalAndBestStudent}
            >
              promedio general, mejor estudiante
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
                <TableHead>Carnet</TableHead>
                <TableHead className="text-nowrap">Nombre Completo</TableHead>
                <TableHead className="text-nowrap">I P</TableHead>
                <TableHead className="text-nowrap">II P</TableHead>
                <TableHead>SIST</TableHead>
                <TableHead>PROY</TableHead>
                <TableHead>N.F</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentArray.map((student) => (
                <TableRow key={student.carnet}>
                  <TableCell className="text-nowrap">
                    {student.carnet}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {student.fullName}
                  </TableCell>
                  <TableCell>{student.partial1}</TableCell>
                  <TableCell>{student.partial2}</TableCell>
                  <TableCell>{student.systematic}</TableCell>
                  <TableCell>{student.project}</TableCell>
                  <TableCell>{student.finalGrade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentsForm;
