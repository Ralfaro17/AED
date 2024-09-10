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
import { buttonVariants } from "@/components/ui/button"
import 'sweetalert2/src/sweetalert2.scss';

function EmployeeForm() {
  useEffect(() => {
    document.title = 'Formulario de empleados';
  }, [])

  const students = [
    { id: '001', name: 'Alice Johnson', grade1: 85, grade2: 90, grade3: 88, grade4: 92 },
    { id: '002', name: 'Bob Smith', grade1: 78, grade2: 82, grade3: 80, grade4: 85 },
    { id: '003', name: 'Charlie Brown', grade1: 92, grade2: 88, grade3: 95, grade4: 90 },
    { id: '004', name: 'Diana Ross', grade1: 88, grade2: 91, grade3: 87, grade4: 89 },
  ]

  const [employeeArray, setEmployeeArray] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className='absolute top-4 left-4 gap-4 flex'>
        <Link to="/"><Button variant="secondary">Homepage</Button></Link>
        <Link to="/students"><Button variant="secondary">Formulario de estudiantes</Button></Link>
      </div>
      <Card className="w-full md:w-1/2 bg-white rounded-lg">
        <CardHeader>
          <CardTitle>Student Grade Form</CardTitle>
          <CardDescription>Enter student details and grades</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idNumber">Carnet</Label>
              <Input
                id="idNumber"
                name="idNumber"
                placeholder="Carnet"
                {...register("carnet", {
                  required: "El carnet es obligatorio",
                })}
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.carnet.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                {...register("fulName", { 
                  required: "El nombre es obligatorio", 
                })}
              />
              {errors.full_name && (
                <p className="text-red-500">{errors.full_name.message}</p>
              )}
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
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Grade 1</TableHead>
                <TableHead>Grade 2</TableHead>
                <TableHead>Grade 3</TableHead>
                <TableHead>Grade 4</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade1}</TableCell>
                  <TableCell>{student.grade2}</TableCell>
                  <TableCell>{student.grade3}</TableCell>
                  <TableCell>{student.grade4}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        
      </Card>
    </div>
  )
}

export default EmployeeForm