import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect } from "react";

function Homepage() {

  useEffect(() => {
    document.title = 'Homepage';
  }, []);


  return (
    <div className="h-screen flex justify-center flex-col">
      
      <h1>Selecciona el formulario al que deseas acceder</h1>
      <div className="card flex md:justify-around gap-8 md:gap-0 flex-col md:flex-row">
        <Link to="/parishioners">
          <Button variant="secondary">Formulario de feligreses</Button>
        </Link>
        <Link to="/clinic">
          <Button variant="secondary">Formulario de clínica</Button>
        </Link>
      </div>
      <h3>Hecho por Roger Alfaro y Enyel Baltodano</h3>
    </div>
  )
}

export default Homepage