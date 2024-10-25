using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LINQ3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        frmEstudiante Est = new frmEstudiante();
        frmAsignatura Asig = new frmAsignatura();
        frmPago Pa = new frmPago();
        frmMatricula Mat = new frmMatricula();
        frmReporte Rep = new frmReporte();

        private void estudianteToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Est.MdiParent = this;
            Est.Show();

            Asig.Hide();
            Pa.Hide();
            Mat.Hide();
            Rep.Hide();

        }

        private void asignaturaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Asig.MdiParent = this;
            Asig.Show();

            Est.Hide();
            Pa.Hide();
            Mat.Hide();
            Rep.Hide();
        }

        private void pagoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Pa.MdiParent = this;
            Pa.Show();
            Pa.LlenarComboCarnet();

            Asig.Hide();
            Est.Hide();
            Mat.Hide();
            Rep.Hide();
        }

        private void matriculaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Mat.MdiParent = this;
            Mat.Show();
            Mat.LlenarComboCarnetyAsig();

            Asig.Hide();
            Pa.Hide();
            Est.Hide();
            Rep.Hide();
        }

        private void reportesToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Rep.MdiParent = this;
            Rep.Show();
            Rep.LlenarComboAsignatura();

            Asig.Hide();
            Pa.Hide();
            Mat.Hide();
            Est.Hide();
        }
    }
}
