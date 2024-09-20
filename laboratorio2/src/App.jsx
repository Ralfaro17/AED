import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<dic className="">
<AlertDialog>
  <AlertDialogTrigger><Button variant="outline" className="boton">Este boton hace algo</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>estas completamente seguro?</AlertDialogTitle>
      <AlertDialogDescription className="text-xl text-stone-900" >
        todo es una prueba para el yutu
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>no</AlertDialogCancel>
      <AlertDialogAction>si</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</dic>

    </>
  )
}

export default App
