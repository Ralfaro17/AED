import { Separator } from "@/components/ui/separator" 

function Footer() {
  return (
    <footer className="flex flex-col justify-between items-center px-[3rem] py-[1.5rem] md:flex-row w-full mt-auto border-t-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4 md:mb-0">© 2024 Banco anónimo. Todos los derechos reservados</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" disabled href="#">
            Términos y condiciones
          </a>
          <Separator orientation="vertical" className="border-x-1 border-y-8" />
          <a className="text-xs hover:underline underline-offset-4" disabled href="#">
            Privacidad
          </a>
        </nav>
    </footer>
  )
}

export default Footer