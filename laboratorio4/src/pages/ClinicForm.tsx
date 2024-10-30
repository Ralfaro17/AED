import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import ThemeChanger from '@/components/theme-changer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppointmentsTab from '@/components/tabs/appointments-tab';
import PatientsTab from '@/components/tabs/patients-tab';

function ClinicForm() {
  useEffect(() => {
    document.title = 'Formulario de clinica';
  }, []);

  return (
    <div>
      <div className="absolute top-4 left-4 gap-4 flex">
        <Link to="/">
          <Button variant="secondary">Homepage</Button>
        </Link>
        <Link to="/parishioners">
          <Button variant="secondary">Formulario de feligreses</Button>
        </Link>
        <ThemeChanger />
      </div>

      <Tabs defaultValue="patients" className='flex flex-col justify-center items-center gap-0 flex-nowrap'>
        <TabsList className="grid grid-cols-2 w-full mt-12 md:absolute md:top-4 md:right-4 md:w-[50%] md:mt-0">
          <TabsTrigger value="patients">Pacientes</TabsTrigger>
          <TabsTrigger value="appointments">Citas</TabsTrigger>
        </TabsList>
        <TabsContent value="patients" className="flex flex-col md:flex-row gap-6 p-0 md:p-6">
          <PatientsTab />
        </TabsContent>
        <TabsContent value="appointments" className="flex flex-col md:flex-row gap-6 p-0 md:p-6 mt-0 md:mt-[-48px]">
          <AppointmentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ClinicForm;
