import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Student = {
  Carnet: string;
  Idmonografia?: string;
  Nombres: string;
  Apellidos: string;
  Direccion: string;
  Telefono: string;
  AñoDenacimiento: Date;
};

function EstudianteMonografia() {
  const getStudents = (): Student[] => {
    const students = localStorage.getItem("students");
    return students ? JSON.parse(students) : [];
  };

  const [students, setStudents] = useState<Student[]>(getStudents());
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [monografiaId, setMonografiaId] = useState<string>("");

  const handleAssignMonografia = () => {
    if (!selectedStudent || !monografiaId) {
      Swal.fire("Error", "Selecciona un estudiante y un Id de monografía", "error");
      return;
    }

    // Contar cuántos estudiantes ya tienen asignado el mismo Idmonografia
    const assignedCount = students.filter(
      (student) => student.Idmonografia === monografiaId
    ).length;

    // Validar si ya hay 3 estudiantes asignados a esta monografía
    if (assignedCount >= 3) {
      Swal.fire("Error", "Esta monografía ya tiene 3 estudiantes asignados", "error");
      return;
    }

    const updatedStudents = students.map((student) =>
      student.Carnet === selectedStudent
        ? { ...student, Idmonografia: monografiaId }
        : student
    );

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    Swal.fire("Asignación Completa", "Id de monografía asignado correctamente", "success");

    setSelectedStudent(null);
    setMonografiaId("");
  };

  return (
    <>
      <Card className="w-full md:w-1/2 rounded-lg">
        <CardHeader>
          <CardTitle>Asignación de Monografía</CardTitle>
          <CardDescription>Asignar Id de Monografía a Estudiante</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="studentSelect">Selecciona un Estudiante</Label>
            <select
              id="studentSelect"
              value={selectedStudent || ""}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                -- Selecciona un estudiante --
              </option>
              {students.map((student) => (
                <option key={student.Carnet} value={student.Carnet}>
                  {student.Nombres} {student.Apellidos} (Carnet: {student.Carnet})
                </option>
              ))}
            </select>

            <Label htmlFor="monografiaId">Id de Monografía</Label>
            <Input
              id="monografiaId"
              value={monografiaId}
              onChange={(e) => setMonografiaId(e.target.value)}
              placeholder="Ingresa el Id de monografía"
            />

            <Button onClick={handleAssignMonografia} className="w-full">
              Asignar Monografía
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de estudiantes con Idmonografia asignado */}
      <Card className="w-full md:w-3/4 mt-8">
        <CardHeader>
          <CardTitle>Lista de Estudiantes</CardTitle>
          <CardDescription>Estudiantes y sus Ids de Monografía</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Carnet</TableHead>
                <TableHead>Nombres</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Id Monografía</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.Carnet}</TableCell>
                  <TableCell>{student.Nombres}</TableCell>
                  <TableCell>{student.Apellidos}</TableCell>
                  <TableCell>{student.Idmonografia || "No asignado"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default EstudianteMonografia;
