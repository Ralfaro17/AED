import Footer from '@/components/bank/Footer'
import { useEffect } from 'react'
import Navbar from '../components/bank/Navbar'
import { CreditCard, Lock, Smartphone } from "lucide-react"
import './BankSystemApp.css'

function BankSystemApp() {
  useEffect(() => {
    document.title = 'Sistema de banco'
  }, [])

  return (
    <div className='h-full flex flex-col'>
      <Navbar />
      <main>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Bienvenido a la banca en línea
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Por favor dirigirse a la sección que usted desee acceder mediante el menu de navegación en la zona superior de la pagina.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold">Tarjetas inteligentes</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Administra tus finanzas con nuestras tarjetas inteligentes y sin contacto.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary p-3 rounded-full">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold">Banca Movil</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Accede a tus cuentas en cualquier momento, y en cualquier lugar con nuestra aplicación móvil segura.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary p-3 rounded-full">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold">Transacciones seguras</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Dispón de la tranquilidad de saber que tus transacciones están protegidas por la seguridad de última generación.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default BankSystemApp