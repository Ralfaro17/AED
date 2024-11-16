import TeacherTabs from '@/components/tabs/Teacher_tabs';
import StudentForm from '@/components/tabs/Student_tabs';
import MonografiaTabs from '@/components/tabs/Monografia_tabs';
import ProfesorMonografia from '@/components/tabs/ProfesorMonografia';
import EstudianteMonografia from '@/components/tabs/EstudianteMonografia';
import ThemeChanger from '@/components/theme-changer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Main() {
  return (
    <>
      <div className="absolute top-4 left-4 gap-4 flex">
        <Link to="/queries">
          <Button variant="secondary">Consultar datos</Button>
        </Link>
        <ThemeChanger />
      </div>
      <Tabs
        defaultValue="Monografia"
        className="flex flex-col justify-center items-center gap-0 flex-nowrap"
      >
        <TabsList className="grid grid-cols-5 w-full mt-12 md:absolute md:top-4 md:right-4 md:w-[50%] md:mt-0">
          <TabsTrigger value="Student">Estudiante</TabsTrigger>
          <TabsTrigger value="Teacher">Profesor</TabsTrigger>
          <TabsTrigger value="Monografia">Monografia</TabsTrigger>
          <TabsTrigger value="ProfesorMonografia">Asignar Rol</TabsTrigger>
          <TabsTrigger value="EstudianteMonograf">
            Asignar Monografia
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="Student"
          className="flex flex-col md:flex-row gap-6 p-0 md:p-6"
        >
          <StudentForm />
        </TabsContent>
        <TabsContent
          value="Teacher"
          className="flex flex-col md:flex-row gap-6 p-0 md:p-6 mt-0 md:mt-[-48px]"
        >
          <TeacherTabs />
        </TabsContent>
        <TabsContent
          value="Monografia"
          className="flex flex-col md:flex-row gap-6 p-0 md:p-6 mt-0 md:mt-[-48px]"
        >
          <MonografiaTabs />
        </TabsContent>
        <TabsContent
          value="ProfesorMonografia"
          className="flex flex-col md:flex-row gap-6 p-0 md:p-6 mt-0 md:mt-[-48px]"
        >
          <ProfesorMonografia />
        </TabsContent>
        <TabsContent
          value="EstudianteMonograf"
          className="flex flex-col md:flex-row gap-6 p-0 md:p-6 mt-0 md:mt-[-48px]"
        >
          <EstudianteMonografia />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Main;
