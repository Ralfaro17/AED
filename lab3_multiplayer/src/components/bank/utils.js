import Queue from "@/classes/queue";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export const saveQueue = (queue, name) => {
  localStorage.setItem(`${name}`, JSON.stringify(queue.printKeys));
}

export const cleanQueue = (name, setQueue) => {
  const tempQueue = new Queue([]);
  setQueue(tempQueue);
  saveQueue(tempQueue, name);
};

export const getQueue = (name) => {
  const tempQueue = localStorage.getItem(`${name}`);
  return tempQueue ? new Queue(JSON.parse(tempQueue)) : new Queue([]);
}

export const dequeue = (queue, setQueue, name) => {
  const tempQueue = queue.clone();
  tempQueue.dequeue();
  setQueue(tempQueue);
  saveQueue(tempQueue, `${name}`); 
  const utterance = new SpeechSynthesisUtterance(`siguiente cliente ${tempQueue.peek().name}, Favor pasar a ${name}`)
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