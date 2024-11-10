import TeacherTabs from '@/components/tabs/Teacher_tabs';
import StudentForm from '@/components/tabs/Student_tabs';
import MonografiaTabs from '@/components/tabs/Monografia_tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect } from 'react';
import './App.css'

function App() {
  useEffect(() => {
    document.title = 'Laboratorio 5';
    
  }, []);
  return (
    
    <>
    
      <Tabs defaultValue="Monografia" className='flex flex-col justify-center items-center gap-0 flex-nowrap'>
        <TabsList className="grid grid-cols-3 w-full mt-12 md:absolute md:top-4 md:right-4 md:w-[50%] md:mt-0">
          <TabsTrigger value="Student">Estudiante</TabsTrigger>
          <TabsTrigger value="Teacher">Profesor</TabsTrigger>
          <TabsTrigger value="Monografia">Monografia</TabsTrigger>
        </TabsList>
        <TabsContent value="Student" className="flex flex-col md:flex-row gap-6 p-0 md:p-6">
          <StudentForm />
        </TabsContent>
        <TabsContent value="Teacher" className="flex flex-col md:flex-row gap-6 p-0 md:p-6 mt-0 md:mt-[-48px]">
          <TeacherTabs />
        </TabsContent>
        <TabsContent value="Monografia" className="flex flex-col md:flex-row gap-6 p-0 md:p-6 mt-0 md:mt-[-48px]">
          <MonografiaTabs/>
        </TabsContent>
      </Tabs>
      
    </>
  )
}

export default App
