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
    }
}
