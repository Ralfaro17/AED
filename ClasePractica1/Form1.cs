using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ClasePractica1
{
    public partial class Form1 : Form
    {
        // Declaraciones globales
        Persona[] personas;
        int Tam, N;

        void Limpiar()
        {
            txtNombres.Clear();
            txtApellidos.Clear();
            txtTelefono.Clear();
            txtAño.Clear();
            txtNombres.Focus();
        }

        public Form1()
        {
            InitializeComponent();
        }

        private void btnCantidad_Click(object sender, EventArgs e)
        {
            Tam = int.Parse(txtCantidad.Text);
            personas = new Persona[Tam];
            MessageBox.Show("Limite establecido correctamente");
        }

        private void btnImprimir_Click(object sender, EventArgs e)
        {
            lbImprimir.Items.Clear();
            for (int i = 0; i < N; i++)
            {
                int Edad = personas[i].Edad(personas[i].AñoNacimiento);
                lbImprimir.Items.Add(personas[i].Imprimir() + "\t" + Edad);
            }
        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            if(N <= Tam - 1)
            {
                personas[N] = new Persona();
                personas[N].Nombres = txtNombres.Text;
                personas[N].Apellidos = txtApellidos.Text;
                personas[N].Telefono = int.Parse(txtTelefono.Text);
                personas[N].AñoNacimiento = int.Parse(txtAño.Text);
                MessageBox.Show("Persona agregada correctamente");
                Limpiar();
                N++;
            }
            else
            {
                MessageBox.Show("No se pueden agregar más personas");
            }
        }
    }
}
