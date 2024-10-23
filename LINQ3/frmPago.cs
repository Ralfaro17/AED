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
    public partial class frmPago : Form
    {
        public frmPago()
        {
            InitializeComponent();
        }

        public void LlenarComboCarnet()
        {
            cbCarnet.DataSource = null;
            cbCarnet.DataSource = Declaraciones.ListaEstudiante;
            cbCarnet.DisplayMember = "Nombres";
            cbCarnet.ValueMember = "Carnet";
        }

        private void btnInsertar_Click(object sender, EventArgs e)
        {
            Declaraciones.ListaPagos.Add(
                    new Pago
                    {
                        Carnet = int.Parse(cbCarnet.SelectedValue.ToString()),
                        Id = int.Parse(txtIdPago.Text),
                        Fecha = DateTime.Parse(txtFecha.Text),
                        Monto = int.Parse(txtMonto.Text),
                        Descripcion = txtDescripcion.Text
                    }
                );
            dgPagos.DataSource = null;
            dgPagos.DataSource = Declaraciones.ListaPagos;
        }
    }
}
