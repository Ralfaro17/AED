using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace RA7
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        List<Persona> Personas = new List<Persona>();

        private void btnIngresar_Click(object sender, EventArgs e)
        {
            Persona p = new Persona();
            p.Nombre = txtNombre.Text;
            p.Apellido = txtApellido.Text;
            p.Año = int.Parse(txtNacimiento.Text);
            p.Telefono = int.Parse((txtTelefono.Text).Trim());
            p.CalcularEdad();

            Personas.Add(p);
            MessageBox.Show("Persona añadida");

        }

        private void btnMayores_Click(object sender, EventArgs e)
        {
            var consulta = Personas.Sum(p => p.Edad);
            MessageBox.Show(consulta.ToString());

            var consultaA = Personas.Average(p => p.Edad);
            MessageBox.Show(consultaA.ToString());

            var consultaB = Personas.Where(p => p.Edad > consultaA).Select(p => new {Nombres = p.Nombre, Apellido = p.Apellido}).ToList();
            dgvImprimir.DataSource = null;
            dgvImprimir.DataSource = consultaB;
        }

        private void btnImprimir_Click(object sender, EventArgs e)
        {
            dgvImprimir.DataSource = null;
            dgvImprimir.DataSource = Personas;
        }
    }
}
