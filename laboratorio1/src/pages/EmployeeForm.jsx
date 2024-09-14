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

function EmployeeForm() {
  useEffect(() => {
    document.title = 'Formulario de empleados';
  }, []);

  const saveArray = (array) => {
    localStorage.setItem('employeeArray', JSON.stringify(array));
  }

  const getArray = () => {
    const array = localStorage.getItem('employeeArray');
    if (array) {
      return JSON.parse(array);
    }
    return [];
  }
  
  const [employeeArray, setEmployeeArray] = useState(getArray());
  
  const cleanArray = () => {
    localStorage.removeItem('employeeArray');
    setEmployeeArray([]);
    Swal.fire({
      title: 'Registros eliminados',
      icon: 'success',
      confirmButtonText: 'ok',
    });
  }
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm();

  const increaseSalary = () => {
    if (employeeArray.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'No hay empleados registrados',
        icon: 'error',
        confirmButtonText: 'ok',
      });
      return;
    }
    let sum = 0;
    employeeArray.forEach((employee) => {
      sum += +employee.salary;
    });
    const average = sum / employeeArray.length;
    const newEmployeeArray = employeeArray.map((employee) => {
      if (employee.salary < average) {
        employee.salary = employee.salary * 1.1;
        employee.salary = ((+employee.salary) + 0.00).toFixed(2);
      }
      return employee;
    });
    setEmployeeArray(newEmployeeArray);
    saveArray(newEmployeeArray);
    Swal.fire({
      title: 'Salarios actualizados',
      icon: 'success',
      confirmButtonText: 'ok',
    });
  };

  const deleteEmployee = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    employeeArray.forEach((employee) => {
      const option = document.createElement('option');
      option.value = employee.idCard;
      option.text = employee.idCard;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona la cedula del empleado a borrar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar empleado',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar una cedula');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        const newEmployeeArray = employeeArray.filter(
          (student) => student.idCard !== selectedOption
        );
        setEmployeeArray(newEmployeeArray);
        saveArray(newEmployeeArray);
        Swal.close();
        Swal.fire({
          title: 'empleado eliminado',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const loadEmployee = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    employeeArray.forEach((employee) => {
      const option = document.createElement('option');
      option.value = employee.idCard;
      option.text = employee.idCard;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona la cedula del empleado a cargar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cargar empleado',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar una cedula');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        const student = employeeArray.find(
          (student) => student.idCard === selectedOption
        );
        setValue('idCard', student.idCard);
        setValue('names', student.names);
        setValue('lastNames', student.lastNames);
        setValue('salary', student.salary);
        setValue('children', student.children);
        clearErrors();
        setFocus('idCard');
        Swal.close();
        Swal.fire({
          title: 'Empleado cargado',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const listEmployee = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    employeeArray.forEach((employee) => {
      const option = document.createElement('option');
      option.value = employee.idCard;
      option.text = employee.idCard;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona la cedula del empleado a listar',
      html: select,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Listar empleado',
      denyButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (selectedOption === '' || selectedOption === null) {
          Swal.showValidationMessage('Debes seleccionar una cedula');
        } else {
          return selectedOption;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
        const employee = employeeArray.find(
          (employee) => employee.idCard === selectedOption
        );
        Swal.fire({
          title: 'Información del empleado',
          html: `
          <p><strong>Cedula:</strong> ${employee.idCard}</p>
          <p><strong>Nombres:</strong> ${employee.name}</p>
          <p><strong>Apellidos</strong> ${employee.lastNames}</p>
          <p><strong>Salario</strong> ${employee.salary}</p>
          <p><strong>N° Hijos</strong> ${employee.children}</p>
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
    if (data.finalGrade > 151) {
      Swal.fire({
        title: 'Error!',
        text: 'La cantidad de hijos no puede ser mayor a 151',
        icon: 'error',
        confirmButtonText: 'ok',
      });
      return;
    }
    for (let i = 0; i < employeeArray.length; i++) {
      if (employeeArray[i].idCard === data.idCard) {
        centinel = true;
        Swal.close();
        Swal.fire({
          title: 'Advertencia!',
          text: 'La cedula ya existe, deseas actualizar el salario del empleado?',
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Actualizar',
          denyButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            employeeArray[i].salary = data.salary;
            setEmployeeArray([...employeeArray]);
            saveArray([...employeeArray]);
            setFocus('idCard');
            Swal.fire({
              title: 'Empleado actualizado',
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
      data.salary = ((+data.salary) + 0.00).toFixed(2);
      setEmployeeArray([...employeeArray, data]);
      saveArray([...employeeArray, data]);
      Swal.fire({
        title: 'Empleado agregado',
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
        <Link to="/students">
          <Button variant="secondary">Formulario de estudiantes</Button>
        </Link>
      </div>
      <Card className="w-full md:w-1/2 bg-white rounded-lg mt-12 md:mt-8">
        <CardHeader>
          <CardTitle>Formulario de Empleados</CardTitle>
          <CardDescription>Ingresa los datos del empleado</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idCard">Cedula</Label>
              <Input
                id="idCard"
                name="idCard"
                placeholder="Cedula"
                {...register('idCard', {
                  required: 'la cedula es obligatoria',
                  maxLength: {
                    value: 16,
                    message: 'La cedula debe tener 16 dígitos',
                  },
                })}
              />
              {errors.idCard && (
                <p className="text-red-500">{errors.idCard.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4"></div>
            <div className="space-y-2">
              <Label htmlFor="names">Nombres</Label>
              <Input
                id="names"
                name="names"
                placeholder="Nombres"
                {...register('names', {
                  required: 'Los nombres son requeridos',
                })}
              />
              {errors.names && (
                <p className="text-red-500">{errors.names.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastNames">Apellidos</Label>
              <Input
                id="lastNames"
                name="lastNames"
                placeholder="Apellidos"
                {...register('lastNames', {
                  required: 'Los apellidos son requeridos',
                })}
              />
              {errors.lastNames && (
                <p className="text-red-500">{errors.lastNames.message}</p>
              )}
            </div>
            <div className="flex justify-around">
              <div className="space-y-2">
                <Label htmlFor="salary">Salario</Label>
                <Input
                  id="salary"
                  step="0.01"
                  placeholder="Monto salario"
                  name="salary"
                  type="number"
                  {...register('salary', {
                    required: 'Campo requerido',
                    min: {
                      value: 0,
                      message: 'el salario no puede ser menor a 0',
                    },
                  })}
                />
                {errors.salary && (
                  <p className="text-red-500">{errors.salary.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="children">N° Hijos</Label>
                <Input
                  id="children"
                  name="children"
                  type="number"
                  placeholder="Cantidad hijos"
                  {...register('children', {
                    required: 'Campo requerido',
                    min: { value: 0, message: 'La cantidad mínima es 0' },
                  })}
                />
                {errors.children && (
                  <p className="text-red-500">{errors.children.message}</p>
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
            <Button onClick={deleteEmployee}>Eliminar empleado</Button>
            <Button onClick={loadEmployee}>Cargar empleado</Button>
            <Button onClick={listEmployee}>Listar empleado</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/2 mt-8">
        <CardHeader>
          <CardTitle>Detalles de la clase</CardTitle>
          <div className='flex gap-4'>
            <Button
              className="w-full text-wrap p-2"
              onClick={increaseSalary}
            >
              Aumentar salario
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
                <TableHead>Cedula</TableHead>
                <TableHead className="text-nowrap">Nombres</TableHead>
                <TableHead className="text-nowrap">Apellidos</TableHead>
                <TableHead className="text-nowrap">Salario</TableHead>
                <TableHead>N° Hijos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeArray.map((employee) => (
                <TableRow key={employee.idCard}>
                  <TableCell className="text-nowrap">
                    {employee.idCard}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {employee.names}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {employee.lastNames}
                  </TableCell>
                  <TableCell>{employee.salary}</TableCell>
                  <TableCell>{employee.children}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmployeeForm;
