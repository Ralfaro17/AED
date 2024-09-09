import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useForm } from "react-hook-form";

function EmployeeForm() {
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
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Student Grade Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <I  nput
                id="studentId"
                name="studentId"
                {...register('carnet', {
                  required: 'Tu carnet es requerido',
                })}
                placeholder="Ingresa un carnet"
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.carnet.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                {...register('fullName', {
                  required: 'El nombre completo es obligatorio',
                })}
                placeholder="Ingresa el nombre completo"
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              
            </div>
            
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Grades</Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default EmployeeForm