using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RA11
{
    internal class Producto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public double Precio { get; set; }
        public double Costo { get; set; }
        public int SMaximo { get; set; }
        public int SMinimo { get; set; }
        public int Existencia { get; set; }

        public string CalcularPrecio(double Costo,  double Porcentaje)
        {
            double ganancia;
            ganancia = Costo * Porcentaje * 0.01;
            Precio = Costo + ganancia;
            return Convert.ToString(Precio);
        }
    }
}
