using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClasePractica1
{
    internal class Persona
    {
        public string Nombres;
        public string Apellidos;
        public int Telefono; 
        public int AñoNacimiento;

        public int Edad(int añoNacimiento)
        {
            return DateTime.Now.Year - añoNacimiento;
        }

        public string Imprimir()
        {
            return Nombres + "\t" + Apellidos + "\t" + Telefono;
        }
    }
}
