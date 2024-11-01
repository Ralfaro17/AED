using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RelacionesListasYLINQ
{
    internal class Estudiantes
    {
        public int Carnet {  get; set; }
        public int idMonografia { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public DateTime añoDeNacimiento { get; set; }
    }
}
