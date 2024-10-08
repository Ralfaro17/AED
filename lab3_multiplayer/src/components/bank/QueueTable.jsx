import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cleanQueue, dequeue, revertLastDequeue } from '@/components/bank/utils';
import propTypes from 'prop-types';

function QueueTable({queue, setQueue, name, logQueue, setLogQueue}) {
  return (
    <Card className="w-full md:w-[44%] mt-8 bg-[#f3f4f6]">
      <CardHeader>
        <CardTitle className="text-2xl">Cola {`${name}`}</CardTitle>
        <CardDescription className="pb-4">
          Clientes en cola para ser atendidos en {`${name}`}
        </CardDescription>
        <div className="flex gap-4 justify-around flex-col md:flex-row">
          <Button
            className="w-full text-wrap"
            onClick={() => dequeue(queue, setQueue, `${name}`, logQueue, setLogQueue)}
          >
            Siguiente cliente
          </Button>
          <Button
            className="w-full text-wrap"
            onClick={() => revertLastDequeue(queue, setQueue, `${name}`, logQueue, setLogQueue)}
          >
            Cliente Anterior
          </Button>
          <Button
            className="w-full text-wrap p-2"
            onClick={() => cleanQueue(`${name}`, setQueue, logQueue, setLogQueue)}
          >
            Borrar todos los registros
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[18rem] overflow-hidden w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-nowrap">Numero</TableHead>
              <TableHead className="text-nowrap">Nombre</TableHead>
              <TableHead className="text-nowrap">Código</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queue.printKeys.slice(0, 5).map((client, index) => {
              if(client != null && client != undefined){
                return (
                  <TableRow
                    key={index}
                    className="first:bg-slate-300 hover:bg-slate-200"
                  >
                    <TableCell className="text-nowrap">{index + 1}</TableCell>
                    <TableCell className="text-nowrap">{client.name}</TableCell>
                    <TableCell>{client.attentionCode}</TableCell>
                  </TableRow>
                )
              }
              })}
            
            {queue.printKeys.length > 5 && (
              <TableRow>
                <TableCell className="text-nowrap">...</TableCell>
                <TableCell className="text-nowrap">...</TableCell>
                <TableCell>...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

QueueTable.propTypes = {
  queue: propTypes.object,
  setQueue: propTypes.func,
  name: propTypes.string,
  logQueue: propTypes.object,
  setLogQueue: propTypes.func,
};

export default QueueTable;
