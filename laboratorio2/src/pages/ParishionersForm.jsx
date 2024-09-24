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

function ParishionersForm() {
  useEffect(() => {
    document.title = 'Formulario de feligreses';
  }, []);

  const saveArray = (array) => {
    localStorage.setItem('parishionerArray', JSON.stringify(array));
  }

  const getArray = () => {
    const array = localStorage.getItem('parishionerArray');
    if (array) {
      return JSON.parse(array);
    }
    return [];
  }
  
  const [parishionerArray, setParishionerArray] = useState(getArray());
  
  const cleanArray = () => {
    localStorage.removeItem('parishionerArray');
    setParishionerArray([]);
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

  const amountInRange = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    parishionerArray.forEach((parishioner) => {
      const option = document.createElement('option');
      option.value = parishioner.id;
      option.text = parishioner.id;
      select.appendChild(option);
    });

    const select2 = document.createElement('select');
    select2.id = 'swal-select2';
    select2.classList.add('swal2-select');
    for (let i = 0; i < 12; i++) {
      const option = document.createElement('option');
      option.value = i + 1;
      option.text = i + 1;
      select.appendChild(option);
    }
    
    Swal.fire({
      title: 'Selecciona el feligrés',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Buscar cantidad',
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
      if(result.isConfirmed){
        Swal.fire({
          title: 'Selecciona el mes',
          html: select2,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'confirmar',
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
          if(result.isConfirmed){
            const selectedOption = document.getElementById('swal-select').value;
            const selectedOption2 = document.getElementById('swal-select2').value;
            let amount = 0;
            parishionerArray.forEach((parishioner) => {
              if (parishioner.id === selectedOption && parishioner.month === selectedOption2) {
                amount += parishioner.amount;
              }
            })
            const parishioner = parishionerArray.find(
              (parishioner) => parishioner.id === selectedOption
            )
            Swal.fire({
              title: 'Cantidad del feligrés',
              html: `La cantidad del feligrés ${parishioner.id} en el mes ${parishioner.month} es de ${amount}`,
              confirmButtonText: 'ok',
            });
          }
        });
      }
    });
  };

  const deleteParishioner = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    parishionerArray.forEach((parishioner) => {
      const option = document.createElement('option');
      option.value = parishioner.id;
      option.text = parishioner.id;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el id del feligrés a borrar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar feligrés',
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
        const newParishionerArray = parishionerArray.filter(
          (parishioner) => parishioner.id !== selectedOption
        );
        const updatedArray = newParishionerArray.sort((a, b) => +b.amount - +a.amount)
        setParishionerArray(updatedArray)
        saveArray(updatedArray);
        Swal.close();
        Swal.fire({
          title: 'feligrés eliminado',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const loadParishioner = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    parishionerArray.forEach((parishioner) => {
      const option = document.createElement('option');
      option.value = parishioner.id;
      option.text = parishioner.id;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el id del feligrés a cargar',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cargar feligrés',
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
        const parishioner = parishionerArray.find(
          (parishioner) => parishioner.id === selectedOption
        );
        setValue('id', parishioner.id);
        setValue('name', parishioner.name);
        setValue('address', parishioner.address);
        setValue('amount', parishioner.amount);
        setValue('month', parishioner.month);
        setValue('phone', parishioner.phone);
        clearErrors();
        setFocus('id');
        Swal.close();
        Swal.fire({
          title: 'Feligrés cargado',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const listParishioner = () => {
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
    parishionerArray.forEach((parishioner) => {
      const option = document.createElement('option');
      option.value = parishioner.id;
      option.text = parishioner.id;
      select.appendChild(option);
    });
    Swal.fire({
      title: 'Selecciona el id del feligrés a listar',
      html: select,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Listar feligrés',
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
        const parishioner = parishionerArray.find(
          (parishioner) => parishioner.id === selectedOption
        );
        Swal.fire({
          title: 'Información del empleado',
          html: `
          <p><strong>Id:</strong> ${parishioner.id}</p>
          <p><strong>Nombre:</strong> ${parishioner.name}</p>
          <p><strong>Dirección:</strong> ${parishioner.address}</p>
          <p><strong>Cantidad:</strong> ${parishioner.amount}</p>
          <p><strong>Teléfono:</strong> ${parishioner.phone}</p>
          <p><strong>Mes:</strong> ${parishioner.month}</p>
          `,
          confirmButtonText: 'ok',
        });
      }
    });
  };

  const onSubmit = (data) => {
    let centinel = false;
    for (let i = 0; i < parishionerArray.length; i++) {
      if (parishionerArray[i].id === data.id && parishionerArray[i].month === data.month) {
        centinel = true;
        Swal.close();
        Swal.fire({
          title: 'Advertencia!',
          text: 'El registro ya existe, deseas actualizar los datos del feligrés?',
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Actualizar',
          denyButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            data.amount = ((+data.amount) + 0.00).toFixed(2);
            parishionerArray[i] = data;
            const updatedArray = parishionerArray.sort((a, b) => +b.amount - +a.amount)
            setParishionerArray(updatedArray)
            saveArray(updatedArray);
            setFocus('id');
            Swal.fire({
              title: 'feligrés actualizado',
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
      data.amount = ((+data.amount) + 0.00).toFixed(2);
      const updatedArray = [...parishionerArray, data].sort((a, b) => +b.amount - +a.amount)
      setParishionerArray(updatedArray)
      saveArray(updatedArray);
      Swal.fire({
        title: 'Feligrés agregado',
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
        <Link to="/clinic">
          <Button variant="secondary">Formulario de clínica</Button>
        </Link>
      </div>
      <Card className="w-full md:w-1/2 bg-white rounded-lg mt-12 md:mt-8">
        <CardHeader>
          <CardTitle>Formulario de Feligreses</CardTitle>
          <CardDescription>Ingresa los datos del Feligrés</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                name="address"
                placeholder="Dirección"
                {...register('address', {
                  required: 'la dirección es obligatoria',
                })}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4"></div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nombre"
                {...register('name', {
                  required: 'El nombre es requeridos',
                })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex justify-around">
              <div className="space-y-2">
                <Label htmlFor="id">Id</Label>
                <Input
                  id="id"
                  placeholder="Id"
                  name="id"
                  type="number"
                  {...register('id', {
                    required: 'Campo requerido',
                    min: {
                      value: 1,
                      message: 'El Id no puede ser menor a 1',
                    },
                  })}
                />
                {errors.id && (
                  <p className="text-red-500">{errors.id.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="1234-1234"
                  pattern="[0-9]{4}-[0-9]{4}"
                  {...register('phone', {
                    required: 'Campo requerido',
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-around">
              <div className="space-y-2">
                <Label htmlFor="amount">Cantidad</Label>
                <Input
                  id="amount"
                  step="0.01"
                  placeholder="Monto cantidad"
                  name="amount"
                  type="number"
                  {...register('amount', {
                    required: 'Campo requerido',
                    min: {
                      value: 0,
                      message: 'La cantidad no puede ser menor a 0',
                    },
                  })}
                />
                {errors.amount && (
                  <p className="text-red-500">{errors.amount.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">Mes</Label>
                <Input
                  id="month"
                  name="month"
                  type="number"
                  placeholder="Mes"
                  {...register('month', {
                    required: 'Campo requerido',
                    min: { value: 1, message: 'El mes mínimo es 1' },
                  })}
                />
                {errors.month && (
                  <p className="text-red-500">{errors.month.message}</p>
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
            <Button onClick={deleteParishioner}>Eliminar feligrés</Button>
            <Button onClick={loadParishioner}>Cargar feligrés</Button>
            <Button onClick={listParishioner}>Listar feligrés</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/2 mt-8">
        <CardHeader>
          <CardTitle>Detalles de los feligreses</CardTitle>
          <div className='flex gap-4'>
            <Button
              className="w-full text-wrap p-2"
              onClick={amountInRange}
            >
              Total de diezmo en rango
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
                <TableHead>Id</TableHead>
                <TableHead className="text-nowrap">Nombres</TableHead>
                <TableHead className="text-nowrap">Dirección</TableHead>
                <TableHead className="text-nowrap">Cantidad</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Mes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parishionerArray.map((parishioner) => (
                <TableRow key={parishioner.id}>
                  <TableCell className="text-nowrap">
                    {parishioner.id}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {parishioner.name}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {parishioner.address}
                  </TableCell>
                  <TableCell>{parishioner.amount}</TableCell>
                  <TableCell className="text-nowrap">{parishioner.phone}</TableCell>
                  <TableCell>{parishioner.month}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ParishionersForm;
