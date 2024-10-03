import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect } from "react";
import './Homepage.css'

function Homepage() {

  useEffect(() => {
    document.title = 'Homepage';
  }, []);


  return (
    <div className="h-screen flex justify-center flex-col homepage-div">
      <div className="flex flex-col gap-8 ">
        <h1>Selecciona la aplicación a la que deseas acceder</h1>
        <div className="card flex md:justify-around gap-8 md:gap-0 flex-col md:flex-row">
          <Link to="/bank">
            <Button variant="secondary">Sistema de bancos</Button>
          </Link>
          <Link to="/music">
            <Button variant="secondary">Reproductor de música</Button>
          </Link>
        </div>
        <h3>Hecho por Roger Alfaro y Enyel Baltodano</h3>
      </div>
    </div>
  )
}

export default Homepage