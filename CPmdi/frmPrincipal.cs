using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CPmdi
{
    public partial class frmPrincipal : Form
    {
        frmEmpleado ventanaEmpleado = new frmEmpleado();
        frmPrestamo ventanaPrestamo = new frmPrestamo();

        public frmPrincipal()
        {
            InitializeComponent();
        }

        private void empleadoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ventanaPrestamo.Hide();
            ventanaEmpleado.MdiParent = this;
            ventanaEmpleado.Show();
        }

        private void prestamoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ventanaEmpleado.Hide();
            ventanaPrestamo.MdiParent = this;
            ventanaPrestamo.Show();
        }

        private void salirToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if(MessageBox.Show(
                "¿Estas seguro de que quieres salir?", 
                "Salir",
                MessageBoxButtons.YesNo, 
                MessageBoxIcon.Question
                ) == DialogResult.Yes)
            {
                this.Close();
            }
        }
    }
}
