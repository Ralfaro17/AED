import Navbar from '@/components/bank/Navbar';
import Footer from '@/components/bank/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getQueue, saveQueue } from '@/components/bank/utils';
import { useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';
import Queue from '@/classes/queue';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function ClientRegister() {
  useEffect(() => {
    document.title = 'Registro de clientes';
  }, [])

  const utterance = new SpeechSynthesisUtterance('Siguiente numero')
  const voices = speechSynthesis.getVoices()
  utterance.lang = 'es-MX'
  utterance.pitch = 1
  utterance.rate = 1
  utterance.volume = 1
  utterance.voice = voices.find(voice => voice.lang === 'es-MX')
  console.log(voices)

  const [service, setService] = useState(1);
  const [serviciosQueue, setServiciosQueue] = useState(new Queue(getQueue('servicios').printKeys));
  const [cajaQueue, setCajaQueue] = useState(new Queue(getQueue('caja').printKeys));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.service = service;
    if (data.service === 1){
      const tempCajaQueue = cajaQueue.clone();
      tempCajaQueue.enqueue(data);
      setCajaQueue(tempCajaQueue);
      saveQueue(tempCajaQueue, 'caja');
    }
    else{
      const tempServiciosQueue = serviciosQueue.clone();
      tempServiciosQueue.enqueue(data);
      setServiciosQueue(tempServiciosQueue);
      saveQueue(tempServiciosQueue, 'servicios');
    }
    Swal.fire({
      icon: 'success',
      title: 'Cliente añadido a la cola',
      showConfirmButton: false,
      timer: 3000,
    });
    reset();
  };

  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center my-auto '>
        <Card className="bg-beige w-full md:w-1/2 mx-4 md:mx-0 bg-[#f3f4f6]">
          <CardHeader>
            <CardTitle className="text-2xl">Registro Cliente</CardTitle>
            <CardDescription>Ingresa los datos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col gap-4 mb-4">
            <div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register('name', {
                    required: 'Campo obligatorio',
                  })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>
            <RadioGroup
              aria-label="service"
              className="flex items-center flex-row gap-8 md:flex-row"
              defaultValue="1"
            >
              <Label>Servicio</Label>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  id="caja"
                  value="1"
                  {...register('service', {
                    required: 'Campo obligatorio',
                  })}
                  onClick={() => setService(1)}
                />
                <Label htmlFor="caja">Caja</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  id="bank-services"
                  value="2"
                  {...register('service', {
                    required: 'Campo obligatorio',
                  })}
                  onClick={() => setService(2)}
                />
                <Label htmlFor="bank-services">Servicio Bancarios</Label>
              </div>

              {errors.service && (
                <p className="text-red-500">{errors.service.message}</p>
              )}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full "
              type="submit"
            >
              Confirmar
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Footer />
    </div>
  );
}

export default ClientRegister;
