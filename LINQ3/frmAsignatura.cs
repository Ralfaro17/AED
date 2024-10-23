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
    public partial class frmAsignatura : Form
    {
        public frmAsignatura()
        {
            InitializeComponent();
        }

        private void btnInsertar_Click(object sender, EventArgs e)
        {
            Declaraciones.ListaAsignatura.Add(
                    new Asignatura
                    {
                        idAsignatura = int.Parse(txtIdAsignatura.Text),
                        Nombre = txtNombre.Text,
                        Credito = int.Parse(txtCredito.Text),
                        Frecuencia = int.Parse(txtFrecuencia.Text)
                    }
                );
            dgAsignatura.DataSource = null;
            dgAsignatura.DataSource = Declaraciones.ListaAsignatura;
        }
    }
}
