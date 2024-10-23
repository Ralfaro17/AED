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
    public partial class frmEstudiante : Form
    {
        public frmEstudiante()
        {
            InitializeComponent();
        }

        private void btnInsertar_Click(object sender, EventArgs e)
        {
            Declaraciones.ListaEstudiante.Add(
                    new Estudiante
                    {
                        Carnet = Convert.ToInt32(txtCarnet.Text),
                        Nombres = txtNombres.Text,
                        Apellidos = txtApellidos.Text,
                        FechaNac = DateTime.Parse(txtFechaNac.Text)
                    }
                );
            dgEstudiantes.DataSource = null;
            dgEstudiantes.DataSource = Declaraciones.ListaEstudiante;
        }
    }
}
