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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/src/sweetalert2.scss';

import Enumerable from 'linq';
import { parse } from 'path';

interface Parishioner {
  id: number;
  name: string;
  address: string;
  phone: string;
}
interface Tithe {
  id: number;
  id_feligres: number;
  day: number;
  month: number;
  year: number
  amount: number;
}

function ParishionersForm() {
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    document.title = 'Formulario de feligreses';
    // Cargar datos de feligreses desde localStorage
    const storedParishioners = localStorage.getItem('parishionerArray');
    const storedTithes = localStorage.getItem('tithes');

    if (storedParishioners) {
      setParishioners(JSON.parse(storedParishioners)); // Parsear y establecer estado
    }

    if (storedTithes) {
      setTithes(JSON.parse(storedTithes)); // Parsear y establecer estado
    }
  }, []);
// Función para guardar la lista de feligreses en localStorage
const saveArray = (array: any) => {
  localStorage.setItem('parishionerArray', JSON.stringify(array));
  console.log("Lista de feligreses guardada:", array);
};

// Función para guardar la lista de diezmos en localStorage
const saveTithes = (tithes: any) => {
  localStorage.setItem('tithes', JSON.stringify(tithes));
  console.log("Lista de diezmos guardada:", tithes);
};
  const [formData, setFormData] = useState<{ id: number; name: string; address: string; phone: string }>({
    id: 0, // Asigna un valor numérico inicial si es necesario
    name: '',
    address: '',
    phone: '',
  });
  const [titheData, setTitheData] = useState<Omit<Tithe, 'id'>>({
    id_feligres: 0,
    day: 0,
    month: 0,
    year: 0,
    amount: 0,
  });
  const [parishioners, setParishioners] = useState<Parishioner[]>([]);
  const [tithes, setTithes] = useState<Tithe[]>([]);


  const [startMonth, setStartMonth] = useState(0)
  const [endMonth, setEndMonth] = useState(0)



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === "id") {
      // Asegurarse de que `id` sea un número positivo
      if (+value < 0) {
        Swal.fire('ID debe ser un número positivo.', '', 'warning');
        return;
      }
    }
  
    setFormData({ ...formData, [name]: value });
  };
  
  
  const handleAddParishioner = () => {
    const existingParishioner = Enumerable.from(parishioners)
      .firstOrDefault((p) => p.id === formData.id);
  
    if (existingParishioner) {
      Swal.fire({
        title: 'Advertencia!',
        text: 'El feligrés ya existe, ¿deseas actualizar sus datos?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Actualizar',
        denyButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Actualizar los datos del feligrés existente
          const updatedParishioners = parishioners.map((p) =>
            p.id === formData.id ? { ...formData, quantity: 0, month: '' } : p
          );
  
          setParishioners(updatedParishioners);
          saveArray(updatedParishioners); // Guardar en localStorage
  
          Swal.fire('Feligrés actualizado', '', 'success');
        }
      });
    } else {
      // Si el feligrés no existe, lo agrega al array
      const updatedParishioners = [...parishioners, { ...formData, quantity: 0, month: '' }];
  
      setParishioners(updatedParishioners);
      saveArray(updatedParishioners); // Guardar en localStorage
  
      Swal.fire('Feligrés agregado', '', 'success');
    }
  
    // Limpiar el formulario
    setFormData({ id: 0, name: '', address: '', phone: '' }); // Resetear los campos a valores vacíos
  };
  
  const handleAddTithe = () => {
    MySwal.fire({
      title: 'Agregar Diezmo',
      html: (
        <div>
          <label>ID del Feligres:</label>
          <select id="parishionerID" className="swal2-select mt-2 mb-3 p-2 border rounded">
            {parishioners.map((parishioner) => (
              <option key={parishioner.id} value={parishioner.id}>
                {parishioner.id}
              </option>
            ))}
          </select>
  
          <label>Día:</label>
          <input
            type="number"
            id="day"
            placeholder="Día"
            min="1"
            max="31"
            className="swal2-input mt-1 mb-2"
          />
  
          <label>Mes:</label>
          <input
            type="number"
            id="month"
            placeholder="Mes"
            min="1"
            max="12"
            className="swal2-input mt-1 mb-2"
          />
  
          <label>Año:</label>
          <input
            type="number"
            id="year"
            placeholder="Año"
            min="1900"
            max="2100"
            className="swal2-input mt-1 mb-2"
          />
  
          <label>Cantidad:</label>
          <input
            type="number"
            id="amount"
            placeholder="Cantidad"
            min="0"
            className="swal2-input mt-1"
          />
        </div>
      ),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Agregar Diezmo',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const parishionerID = Number((document.getElementById('parishionerID') as HTMLSelectElement).value);
        const day = Number((document.getElementById('day') as HTMLInputElement).value);
        const month = Number((document.getElementById('month') as HTMLInputElement).value);
        const year = Number((document.getElementById('year') as HTMLInputElement).value);
        const amount = Number((document.getElementById('amount') as HTMLInputElement).value);
  
        if (!parishionerID || !day || !month || !year || amount <= 0) {
          Swal.showValidationMessage('Completa todos los campos correctamente.');
          return false;
        }
  
        // Retorna un objeto con todos los datos
        return { id_feligres: parishionerID, day, month, year, amount };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { id_feligres, day, month, year, amount } = result.value!;
  
        // Verifica si el diezmo ya existe para ese feligrés en esa fecha
        const existingTithe = tithes.find(
          (t) => t.id_feligres === id_feligres && t.day === day && t.month === month && t.year === year
        );
  
        if (existingTithe) {
          Swal.fire('Este feligrés ya tiene un diezmo registrado en esta fecha.', '', 'warning');
          return;
        }
  
        // Agrega el nuevo diezmo generando un id único
        const newTithe: Tithe = {
          id: Date.now(), // ID único generado
          id_feligres,
          day,
          month,
          year,
          amount,
        };
  
// Asegúrate de que el nuevo diezmo se agregue a tithes correctamente y esté ordenado
setTithes((prevTithes) => {
  const updatedTithes = [...prevTithes, newTithe];
  
  // Ordena la lista por 'amount' de mayor a menor
  updatedTithes.sort((a, b) => b.amount - a.amount);
  
  saveTithes(updatedTithes); // Guarda en localStorage o base de datos
  return updatedTithes;
});

  
        Swal.fire({
          title: 'Éxito',
          text: 'Diezmo agregado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  };
  
  
  const handleDeleteParishioner = () => {
    // Muestra una alerta con ComboBox para seleccionar el ID del feligrés a eliminar
    Swal.fire({
      title: 'Eliminar Feligrés',
      text: 'Selecciona el ID del feligrés que deseas eliminar:',
      icon: 'warning',
      input: 'select',
      inputOptions: parishioners.reduce((options, parishioner) => {
        options[parishioner.id] = parishioner.id.toString(); // Convierte a string para la opción del ComboBox
        return options;
      }, {} as Record<string, string>),
      inputPlaceholder: 'Selecciona un feligrés',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const parishionerID = parseInt(result.value, 10); // Convertir el valor a número
  
        if (isNaN(parishionerID)) {
          Swal.fire('Ningún feligrés seleccionado', '', 'info');
          return;
        }
  
        // Imprime la lista de feligreses antes de la eliminación
        console.log("Lista de feligreses antes de eliminación:", parishioners);
        console.log("ID de feligrés a eliminar:", parishionerID);
  
        // Filtra la lista de feligreses y diezmos usando Enumerable
        const updatedParishioners = Enumerable.from(parishioners)
          .where(p => p.id !== parishionerID)
          .toArray();
  
        const updatedParishionerTithes = Enumerable.from(tithes)
          .where(pt => pt.id_feligres !== parishionerID) // Asegúrate de que el campo sea correcto
          .toArray();
  
        // Actualiza el estado con las nuevas listas
        setParishioners(updatedParishioners); // Actualiza el estado de feligreses
        setTithes(updatedParishionerTithes); // Actualiza el estado de diezmos
  
        // Guarda las listas actualizadas en localStorage
        saveArray(updatedParishioners); // Guardar feligreses en localStorage
        saveTithes(updatedParishionerTithes); // Guardar diezmos en localStorage
  
        // Imprime la lista actualizada de feligreses y diezmos
        console.log("Lista actualizada de feligreses:", updatedParishioners);
        console.log("Diezmos después de eliminación:", updatedParishionerTithes);
  
        Swal.fire('Eliminación exitosa', 'Feligrés y sus diezmos asociados han sido eliminados.', 'success');
      }
    });
  };

  const handleLoadParishioner = () => {
    // Genera el ComboBox con los IDs de los feligreses
    Swal.fire({
      title: 'Cargar Feligrés',
      text: 'Selecciona el ID del feligrés que deseas cargar:',
      icon: 'info',
      input: 'select',
      inputOptions: parishioners.reduce((options, parishioner) => {
        options[parishioner.id.toString()] = parishioner.id.toString(); // Convierte a string
        return options;
      }, {} as Record<string, string>),
      inputPlaceholder: 'Selecciona un feligrés',
      showCancelButton: true,
      confirmButtonText: 'Cargar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const parishionerID = result.value;
        const parishioner = parishioners.find(p => p.id.toString() === parishionerID); // Asegúrate de comparar como string
  
        if (parishioner) {
          setFormData(parishioner); // Carga los datos en el formulario
          Swal.fire({
            title: 'Feligrés cargado',
            text: 'Puedes editar la información del feligrés.',
            icon: 'info',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Feligrés no encontrado.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Operación cancelada',
          text: 'No se ha cargado ningún feligrés.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  };
  
  const amountInRange = () => {
    // Crear el combobox para seleccionar el ID del feligrés
    const select = document.createElement('select');
    select.id = 'swal-select';
    select.classList.add('swal2-select');
  
    // Obtener los IDs únicos de los feligreses
    const uniqueIds = [...new Set(parishioners.map(parishioner => parishioner.id))];
  
// Agregar opciones al select
uniqueIds.forEach(id => {
  const option = document.createElement('option');
  option.value = id.toString(); // Convertir a string
  option.text = id.toString();   // Convertir a string
  select.appendChild(option);
});
  
    // Obtener valores del rango de meses desde los inputs
    const initial = parseInt(document.querySelector('#range1').value, 10);
    const final = parseInt(document.querySelector('#range2').value, 10);
  
    // Validación del rango
    if (
      isNaN(initial) || isNaN(final) ||
      initial < 1 || final > 12 || initial > final
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'Los meses no son válidos (1-12).',
        icon: 'error',
        confirmButtonText: 'ok',
      });
      return;
    }
  
    // Mostrar el SweetAlert para seleccionar un feligrés
    Swal.fire({
      title: 'Selecciona el feligrés',
      html: select,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Buscar feligrés',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selectedOption = document.getElementById('swal-select').value;
        if (!selectedOption) {
          Swal.showValidationMessage('Debes seleccionar un ID');
          return false;
        }
        return selectedOption;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = document.getElementById('swal-select').value;
  
        // Filtrar y sumar los diezmos usando LINQ
        const tithesInRange = Enumerable.from(tithes)
          .where(tithe =>
            tithe.id_feligres === parseInt(selectedOption) &&
            tithe.month >= initial &&
            tithe.month <= final
          )
          .toArray();
          console.log(tithesInRange);
  
        // Sumar el total de diezmo en el rango usando LINQ
        const total = Enumerable.from(tithesInRange).sum(tithe => tithe.amount);
        console.log(total);
  
        // Obtener el nombre del feligrés para el mensaje
        const parishioner = parishioners.find(p => p.id === selectedOption);
        console.log(parishioner);
  
        // Mostrar el total en el rango
        if (parishioner) {
          Swal.fire({
            title: `Total de diezmo en rango para el feligrés ${selectedOption}`,
            text: `El total de diezmo en el rango de ${initial} a ${final} para ${parishioner.name} es de: ${total}`,
            icon: 'success',
            confirmButtonText: 'ok',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'No se encontró el feligrés.',
            icon: 'error',
            confirmButtonText: 'ok',
          });
        }
      }
    });
  };
  

  const handleListParishioners = () => {
    // Muestra el estado inicial de los feligreses y diezmos
    console.log("Estado inicial de feligreses:", parishioners);
    console.log("Estado inicial de diezmos:", tithes);
  
    // Genera un ComboBox con los IDs de los feligreses
    Swal.fire({
      title: 'Selecciona un Feligrés',
      input: 'select',
      inputOptions: parishioners.reduce((options, parishioner) => {
        options[parishioner.id] = parishioner.name; // Muestra el nombre del feligrés
        return options;
      }, {} as Record<string, string>),
      inputPlaceholder: 'Selecciona un feligrés',
      showCancelButton: true,
      confirmButtonText: 'Consultar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const selectedParishionerID = result.value;
        console.log("ID de feligrés seleccionado:", selectedParishionerID);
  
        // Filtra el feligrés seleccionado
        const parishioner = Enumerable.from(parishioners).where(p => p.id === selectedParishionerID).firstOrDefault();
        console.log("Feligrés seleccionado:", parishioner);
        if (parishioner) {
          // Filtra los diezmos del feligrés y guarda en un nuevo arreglo de objetos
          const parishionerTithesData = Enumerable.from(tithes)
          .where(t => t.id_feligres === parseInt(selectedParishionerID)) // Asegúrate de que el tipo sea el mismo
          .toArray(); // Convierte a un array
          console.log("Datos de diezmos del feligrés:", parishionerTithesData);
  
          // Verifica si el arreglo de diezmos no está vacío
          if (parishionerTithesData.length > 0) {
            console.log("Datos de diezmos del feligrés:", parishionerTithesData);
  
            // Sumar el monto total de los diezmos
            const totalAmount = parishionerTithesData.reduce((sum, tithe) => sum + tithe.amount, 0);
            console.log("Monto total de diezmos:", totalAmount);
  
            // Muestra la información del feligrés y el monto total de diezmos
            Swal.fire({
              title: `Feligrés: ${parishioner.name}`,
              html: `<p><strong>ID:</strong> ${parishioner.id}</p>
                     <p><strong>Monto Total de Diezmos:</strong> $${totalAmount.toFixed(2)}</p>`,
              icon: 'info',
              confirmButtonText: 'Aceptar',
            });
          } else {
            console.log("No se encontraron diezmos para el feligrés seleccionado.");
            Swal.fire({
              title: 'Sin Diezmos',
              text: 'No se encontraron diezmos para este feligrés.',
              icon: 'warning',
              confirmButtonText: 'Aceptar',
            });
          }
        } else {
          console.log("Error: Feligrés no encontrado.");
          Swal.fire({
            title: 'Error',
            text: 'Feligrés no encontrado.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("Operación cancelada, no se ha seleccionado ningún feligrés.");
        Swal.fire({
          title: 'Operación cancelada',
          text: 'No se ha seleccionado ningún feligrés.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  };
  
  
  const handleDeleteAll = () => {
    // Actualizar los estados para eliminar ambas listas
    setParishioners([]); // Elimina todos los feligreses
    setTithes([]); // Elimina todos los diezmos
  
    // Elimina los datos del localStorage
    localStorage.removeItem('parishionerArray'); // Elimina la lista de feligreses
    localStorage.removeItem('tithes'); // Elimina la lista de diezmos
  
    // Muestra un mensaje de confirmación
    Swal.fire({
      title: 'Listas eliminadas',
      text: 'Todos los feligreses y diezmos han sido eliminados.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };
  


  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Formulario de Feligreses</h2>
        <p className="text-center text-muted-foreground">Ingresa los datos del Feligrés</p>
        <Input
          placeholder="Dirección"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Nombre"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Id"
          name="id"
          value={formData.id}
          type='number'
          onChange={handleInputChange}
        />
        <Input
          placeholder="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <Button className="w-full" onClick={handleAddParishioner}>Agregar Feligres</Button>
        <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => handleAddTithe()}>
                Agregar Diezmo
              </Button>
              <Button variant="outline" onClick={() => handleDeleteParishioner(formData.id)}>
                Eliminar Feligrés
              </Button>
              <Button variant="outline" onClick={() => handleLoadParishioner(formData.id)}>
                Cargar Feligrés
              </Button>
              <Button variant="outline" onClick={handleListParishioners}>
                Listar Feligreses
              </Button>
            </div>


      </div>
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle>Detalles de los feligreses</CardTitle>
          <div className="flex gap-4 justify-around flex-col md:flex-row">
            <Button className="w-full text-wrap p-2" onClick={amountInRange}>
              Diezmo en rango
            </Button>
            <div className="flex flex-row md:flex-row w-full gap-4 md:w-[100%]">
              <input
                type="number"
                id="range1" // Asegúrate de que estos IDs coincidan
                value={startMonth}
                onChange={(e) => setStartMonth(Number(e.target.value))}
                placeholder="Mes de inicio (1-12)"
                min="1"
                max="12"
                className="p-2 border border-gray-300 rounded bg-white"
              />
              <input
                type="number"
                id="range2" // Asegúrate de que estos IDs coincidan
                value={endMonth}
                onChange={(e) => setEndMonth(Number(e.target.value))}
                placeholder="Mes de fin (1-12)"
                min="1"
                max="12"className="p-2 border border-gray-300 rounded bg-white"
              />
            </div>
            <Button className="w-full text-wrap p-2" onClick={handleDeleteAll}>
              Borrar todos los registros
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="parishioners">
            <TabsList>
              <div className="flex flex-nowrap">
              <TabsTrigger value="parishioners">Feligreses</TabsTrigger>
              <TabsTrigger value="tithes">Diezmos</TabsTrigger>
              <TabsTrigger value="parishionerTithes">Todo</TabsTrigger>
              </div>
            </TabsList>

            <TabsContent value="parishioners">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Nombres</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Teléfono</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parishioners.map((parishioner) => (
                    <TableRow key={parishioner.id}>
                      <TableCell>{parishioner.id}</TableCell>
                      <TableCell>{parishioner.name}</TableCell>
                      <TableCell>{parishioner.address}</TableCell>
                      <TableCell>{parishioner.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="tithes">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IdDiezmo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>IdFeligres</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tithes.map((tithe) => (
                    <TableRow key={tithe.id}>
                      <TableCell>{tithe.id}</TableCell>
                      <TableCell>{tithe.day + "/" + tithe.month + "/" + tithe.year}</TableCell>
                      <TableCell>{tithe.amount}</TableCell>
                      <TableCell>{tithe.id_feligres}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="Reporte General">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IdDiezmo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>IdFeligres</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tithes.map((tithe) => (
                    <TableRow key={tithe.id}>
                      <TableCell>{tithe.id}</TableCell>
                      <TableCell>{tithe.day + "/" + tithe.month + "/" + tithe.year}</TableCell>
                      <TableCell>{tithe.amount}</TableCell>
                      <TableCell>{tithe.id_feligres}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>


    </div>
  );
}

export default ParishionersForm;