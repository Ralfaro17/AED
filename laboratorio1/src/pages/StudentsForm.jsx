import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card.jsx"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function StudentsForm() {
  useEffect(() => {
    document.title = 'Formulario de estudiantes';
  }, []);

  const students = [
    { id: '001', name: 'Alice Johnson', grade1: 85, grade2: 90, grade3: 88, grade4: 92 },
    { id: '002', name: 'Bob Smith', grade1: 78, grade2: 82, grade3: 80, grade4: 85 },
    { id: '003', name: 'Charlie Brown', grade1: 92, grade2: 88, grade3: 95, grade4: 90 },
    { id: '004', name: 'Diana Ross', grade1: 88, grade2: 91, grade3: 87, grade4: 89 },
  ]

  const [studentArray, setAtudentArray] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.finalGrade = +data.partial1 + +data.partial2 + +data.systematic + +data.project ;
    if (data.finalGrade > 100) {
      Swal.fire({
        title: 'Error!',
        text: 'La noa final no puede ser mayor a 100',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      return;
    }
    for (let i = 0; i < studentArray.length; i++) {
      if (studentArray[i].carnet === data.carnet) {
        Swal.fire({
          title: 'Error!',
          text: 'El carnet ya existe',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        return;
      }
    }
    console.log(data);
    setAtudentArray([...studentArray, data]);
    document.getElementById("idNumber").focus();
    
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <Card className="w-full md:w-1/2 bg-white rounded-lg">
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
                {...register("carnet", {
                  required: "El carnet es obligatorio",
                  maxLength: { value: 10, message: "El carnet debe tener 8 dígitos" },
                })}
              />
              {errors.carnet && (
                <p className="text-red-500">{errors.carnet.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                name="fullName"
                {...register("fullName", { 
                  required: "El nombre es obligatorio", 
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
                  type="number"
                  {...register("partial1", { 
                    required: "La nota 1 es obligatoria", 
                    min: { value: 0, message: "La nota mínima es 0" },
                    max: { value: 100, message: "La nota máxima es 100" },
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
                  name="partial2"
                  type="number"
                  {...register("partial2", { 
                    required: "La nota 2 es obligatoria", 
                    min: { value: 0, message: "La nota mínima es 0" },
                    max: { value: 100, message: "La nota máxima es 100" },
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
                  name="systematic"
                  type="number"
                  {...register("systematic", { 
                    required: "La nota 3 es obligatoria", 
                    min: { value: 0, message: "La nota mínima es 0" },
                    max: { value: 100, message: "La nota máxima es 100" },
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
                  type="number"
                  {...register("project", { 
                    required: "La nota 4 es obligatoria", 
                    min: { value: 0, message: "La nota mínima es 0" },
                    max: { value: 100, message: "La nota máxima es 100" },
                  })}
                />
                {errors.project&& (
                  <p className="text-red-500">{errors.project.message}</p>
                )}
              </div>
            </div>
            <CardFooter className="px-0">
              <Button type="submit" className="w-full">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Student Grades</CardTitle>
          <CardDescription>Overview of student performance</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <TableCell className="text-nowrap">{student.carnet}</TableCell>
                  <TableCell className="text-nowrap">{student.fullName}</TableCell>
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
  )
}

export default StudentsForm