using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RA7
{
    internal class Persona
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Telefono { get; set; }
        public int Año { get; set; }
        public int Edad { get; set; }

        public void CalcularEdad()
        {
            Edad = DateTime.Now.Year - Año;
        }
    }
}
