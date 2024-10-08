import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuildingColumns,
  faHouse,
  faUserPlus,
  faBars,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link
          to="/bank"
          className="flex items-center gap-2 hover:text-blue-600 transition-all duration-500"
        >
          <FontAwesomeIcon icon={faBuildingColumns} className="w-6 h-6" />
          <span className="font-bold text-maize text-3xl">Banco</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-blue-600 transition-all duration-500"
          >
            <FontAwesomeIcon icon={faHouse} className="mr-2" />
            Homepage
          </Link>
          <Link
            to="/bank/register"
            className="hover:text-blue-600 transition-all duration-500"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Registro Clientes
          </Link>
          <Link
            to="/bank/panel"
            className="hover:text-blue-600 transition-all duration-500"
          >
            <FontAwesomeIcon icon={faTableColumns} className="mr-2" />
            Panel
          </Link>
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden ">
                <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="md:hidden w-[12rem] bg-white border-l-0"
            >
              <SheetHeader>
                <SheetTitle>
                  <Link to="/bank" className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faBuildingColumns}
                      className="w-6 h-6"
                    />
                    <span className="font-bold hover:text-blue-600 transition-all duration-500 text-2xl">
                      Banco
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-4 p-4">
                <Link
                  to="/"
                  className="hover:text-blue-600 transition-all duration-500"
                >
                  <FontAwesomeIcon icon={faHouse} className="mr-2" />
                  Homepage
                </Link>
                <Link
                  to="/bank/register"
                  className="hover:text-blue-600 transition-all duration-500"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Registro Clientes
                </Link>
                <Link
                  to="/bank/panel"
                  className="hover:text-blue-600 transition-all duration-500"
                >
                  <FontAwesomeIcon icon={faTableColumns} className="mr-2" />
                  Panel
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
