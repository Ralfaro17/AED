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
    public partial class frmMatricula : Form
    {
        public frmMatricula()
        {
            InitializeComponent();
        }

        public void LlenarComboCarnetyAsig()
        {
            cbCarnet.DataSource = null;
            cbCarnet.DataSource = Declaraciones.ListaEstudiante;
            cbCarnet.DisplayMember = "Nombres";
            cbCarnet.ValueMember = "Carnet";

            cbAsignatura.DataSource = null;
            cbAsignatura.DataSource = Declaraciones.ListaAsignatura;
            cbAsignatura.DisplayMember = "Nombre";
            cbAsignatura.ValueMember = "idAsignatura";
        }

        private void btnInsertar_Click(object sender, EventArgs e)
        {
            Declaraciones.ListaEstAsig.Add(
                    new Est_Asig
                    {
                        Carnet = int.Parse(cbCarnet.SelectedValue.ToString()),
                        idAsignatura = int.Parse(cbAsignatura.SelectedValue.ToString())
                    }
                );
            dgMatricula.DataSource = null;
            dgMatricula.DataSource = Declaraciones.ListaEstAsig;
        }
    }
}
