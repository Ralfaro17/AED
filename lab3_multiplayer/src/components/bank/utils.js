import Queue from "@/classes/queue";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export const saveQueue = (queue, name) => {
  queue.printKeys.filter((element) => element !== null && element !== undefined);
  localStorage.setItem(`${name}`, JSON.stringify(queue.printKeys));
}

export const cleanQueue = (name, setQueue, logQueue, setLogQueue) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar todos los registros de ${name}?`,
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrar todo'
  }).then((result) => {
    if (result.isConfirmed) {
      const cleanQueue = new Queue([]);
      setQueue(cleanQueue);
      saveQueue(cleanQueue, name);
      setLogQueue(cleanQueue);
      saveQueue(cleanQueue, `${name}Log`);
      Swal.fire({
        title: 'Borrado!',
        text: `La cola de atención de ${name} ha sido borrada.`,
        icon: 'success'
      })
      return true;
    }
  })
  return false;
};

export const getQueue = (name) => {
  const tempQueue = localStorage.getItem(`${name}`);
  return tempQueue ? new Queue(JSON.parse(tempQueue)) : new Queue([]);
}

export const dequeue = (queue, setQueue, name, logQueue, setLogQueue) => {
  const tempQueue = queue.clone();
  const tempLogQueue = logQueue.clone();
  const dequeued = tempQueue.dequeue();
  if (!dequeued) {
    Swal.fire({
      icon: 'info',
      title: 'No hay más clientes en la cola',
      showConfirmButton: false,
      timer: 3000
    })
  }
  tempLogQueue.enqueue(dequeued);
  setQueue(tempQueue);
  saveQueue(tempQueue, `${name}`);
  setLogQueue(tempLogQueue);
  saveQueue(tempLogQueue, `${name}Log`);
  window.speechSynthesis.cancel();
  if(dequeued){
    const utterance = new SpeechSynthesisUtterance(`siguiente cliente ${tempQueue.peek().name} con código ${tempQueue.peek().attentionCode}, Favor pasar a ${name}`)
    const voices = speechSynthesis.getVoices()
    utterance.lang = 'es-MX'
    /* utterance.pitch = 1
    utterance.rate = 1
    utterance.volume = 1 */
    utterance.voice = voices.find(voice => voice.lang === 'es-MX')
    speechSynthesis.speak(utterance)
  
  
    Swal.fire({
      icon: 'success',
      title: 'Cliente atendido',
      showConfirmButton: false,
      timer: 3000
    })
  }
}

export const revertLastDequeue = (queue, setQueue, name, logQueue, setLogQueue) => {
  const tempQueue = queue.clone();
  const tempLogQueue = logQueue.clone();
  const deleted = tempLogQueue.deleteLast();
  if (!deleted) {
    Swal.fire({
      icon: 'error',
      title: 'No hay clientes atendidos',
      showConfirmButton: false,
      timer: 3000
    })
    return
  }
  tempQueue.stackItem(deleted);
  setQueue(tempQueue);
  saveQueue(tempQueue, `${name}`);
  setLogQueue(tempLogQueue);
  saveQueue(tempLogQueue, `${name}Log`);
  Swal.fire({
    icon: 'success',
    title: 'Última atención revertida',
    showConfirmButton: false,
    timer: 3000
  })
}