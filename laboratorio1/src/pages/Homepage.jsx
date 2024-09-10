import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect } from "react";

function Homepage() {

  useEffect(() => {
    document.title = 'Homepage';
  }, []);


  return (
    <div>
      
      <h1>Selecciona el formulario al que deseas acceder</h1>
      <div className="card flex justify-around">
        <Link to="/students">
          <Button variant="secondary">Formulario de estudiantes</Button>
        </Link>
        <Link to="/employee">
          <Button variant="secondary">Formulario de empleados</Button>
        </Link>
      </div>
    </div>
  )
}

export default Homepage