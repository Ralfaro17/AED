using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CPMDI
{
    public partial class frmPrincipal : Form
    {
        public frmPrincipal()
        {
            InitializeComponent();
        }

        frmPrestamo ventanaPrestamo = new frmPrestamo();
        frmEmpleado ventanaEmpleado = new frmEmpleado();

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void empleadoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ventanaEmpleado.MdiParent = this;
            ventanaEmpleado.Show();
            ventanaPrestamo.Hide();
        }

        private void prestamoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ventanaPrestamo.MdiParent = this;
            ventanaPrestamo.Show();
            ventanaEmpleado.Hide();
        }

        private void salirToolStripMenuItem_Click(object sender, EventArgs e)
        {
            
            if (Message.show ("Estas seguro de salir?", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            
            this.Close();
        }
    }
}
