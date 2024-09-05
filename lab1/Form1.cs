using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace lab1
{
    public partial class Form1 : Form
    {
        Persona[] instancia;
        int N;
        public Form1()
        {
            InitializeComponent();
        }

        void limpiar()
        {
            txtNombres.Clear();
            txtApellidos.Clear();
            txtAño.Clear();
            txtTelefono.Clear();
        }

        void Agregar()
        {
            Array.Resize(ref instancia, N + 1);
            instancia[N] = new Persona();
            instancia[N].Nombres = txtNombres.Text;
            instancia[N].Apellidos = txtApellidos.Text;
            instancia[N].Telefono = int.Parse(txtTelefono.Text);
            instancia[N].Año = int.Parse(txtAño.Text);
            N = N + 1;
            MessageBox.Show("Persona registrada");
            limpiar();
        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            Agregar();
        }

        private void btnImprimir_Click(object sender, EventArgs e)
        {
            dtgvImprimir.DataSource = null;
            dtgvImprimir.DataSource = instancia;
        }

        private void txtAño_KeyPress(object sender, KeyPressEventArgs e)
        {
            if(e.KeyChar == 13)
            {
                Agregar();
            }
        }
    }
}
