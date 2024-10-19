using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace RA12
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public struct Datos
        {
            public int Id;
            public string Nombres;
            public double Salario;
            public DateTime Fecha;
        }

        Datos[] Registro;
        int N;
        int i = 0;
        
        void Imprimir()
        {
            dgImprimir.Rows.Clear();
            N = 0;
            foreach(var Elemento in Registro)
            {
                dgImprimir.Rows.Add();
                dgImprimir.Rows[N].Cells[0].Value = Elemento.Id;
                dgImprimir.Rows[N].Cells[1].Value = Elemento.Nombres;
                dgImprimir.Rows[N].Cells[2].Value = Elemento.Salario;
                dgImprimir.Rows[N].Cells[3].Value = Elemento.Fecha;
                N++;
            }
        }


        private void Form1_Load(object sender, EventArgs e)
        {
            dgImprimir.Columns.Add("", "Id");
            dgImprimir.Columns.Add("", "Nombres");
            dgImprimir.Columns.Add("", "Salario");
            dgImprimir.Columns.Add("", "Fecha");

            cbOpciones.Items.Add("Promedio");
            cbOpciones.Items.Add("Suma de salario");
            cbOpciones.Items.Add("Salario mayor de 20");
            cbOpciones.Items.Add("Despues de una Fecha");
            cbOpciones.Items.Add("Edades");
        }

        private void btnIngresar_Click(object sender, EventArgs e)
        {
            Array.Resize(ref Registro, i + 1);
            Registro[i].Id = int.Parse(txtId.Text);
            Registro[i].Nombres = txtNombre.Text;
            Registro[i].Salario = double.Parse(txtSalario.Text);
            Registro[i].Fecha = DateTime.Parse(dtFecha.Text);
            i++;
            Imprimir();
        }

        private void cbOpciones_SelectedIndexChanged(object sender, EventArgs e)
        {
            switch(cbOpciones.SelectedIndex) 
            {
                case 0:
                    var Consulta1 = Registro.Average(x => x.Salario);
                    lbImprimir.DataSource = null;
                    lbImprimir.Items.Add("Promedio de salario: " + Consulta1);
                    break;
                case 1:
                    var Consulta2 = Registro.Sum(x => x.Salario);
                    lbImprimir.DataSource = null;
                    lbImprimir.Items.Add("Suma de salario: " + Consulta2);
                    break;
                case 2:
                    var Consulta3 = Registro.Where(x => x.Salario > Registro.Average(c => c.Salario)).Select(x => x.Nombres);
                    lbImprimir.DataSource = null;
                    lbImprimir.DataSource = Consulta3.ToList();
                    break;
                case 3:
                    var Consulta4 = Registro.Where(x => x.Fecha > DateTime.Parse("26/04/1990")).Select(x => x.Nombres);
                    lbImprimir.DataSource = null;
                    lbImprimir.DataSource = Consulta4.ToList();
                    break;
                case 4:
                    var Consulta5 = from a in Registro select DateTime.Now.Year - a.Fecha.Year;
                    lbImprimir.DataSource = null;
                    lbImprimir.DataSource = Consulta5.ToList();
                    break;
                default:
                    break;
            }
        }
    }
}
