import Navbar from '@/components/bank/Navbar';
import Footer from '@/components/bank/Footer';
import QueueTable from '@/components/bank/QueueTable';
import { useEffect, useState } from 'react';
import Queue from '@/classes/queue';
import { getQueue } from '@/components/bank/utils';

function BankPanel() {
  useEffect(() => {
    document.title = 'Panel de atención';
  }, []);

  const [serviciosQueue, setServiciosQueue] = useState(
    new Queue(getQueue('servicios').printKeys)
  );
  const [cajaQueue, setCajaQueue] = useState(
    new Queue(getQueue('caja').printKeys)
  );
  const [logServiciosQueue, setLogServiciosQueue] = useState(
    new Queue(getQueue('serviciosLog').printKeys)
  );
  const [logCajaQueue, setLogCajaQueue] = useState(
    new Queue(getQueue('cajaLog').printKeys)
  );

  return (
    <div className="h-full flex flex-col items-center">
      <Navbar />
      <div className="w-full flex flex-col justify-center gap-0 md:gap-10 md:flex-row">
        <QueueTable
          queue={cajaQueue}
          setQueue={setCajaQueue}
          name="caja"
          logQueue={logCajaQueue}
          setLogQueue={setLogCajaQueue}
        />
        <QueueTable
          queue={serviciosQueue}
          setQueue={setServiciosQueue}
          name="servicios"
          logQueue={logServiciosQueue}
          setLogQueue={setLogServiciosQueue}
        />
      </div>
      <Footer />
    </div>
  );
}

export default BankPanel;
