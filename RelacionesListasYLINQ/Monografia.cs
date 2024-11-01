using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RelacionesListasYLINQ
{
    internal class Monografia
    {
        public int idMonografia { get; set; }
        public string Titulo { get; set; }
        public DateTime fechaDeDefensa { get; set; }
        public string notaDeDefensa {  get; set; }
        public int tiempoOtorgado { get; set; }
        public int tiempoDefensa { get; set; }
        public int tiempoDePreguntasYRespuestas { get; set; }
    }
}
