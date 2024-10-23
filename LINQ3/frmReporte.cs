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
    public partial class frmReporte : Form
    {
        public frmReporte()
        {
            InitializeComponent();
        }

        public void LlenarComboAsignatura()
        {
            cbAsignatura.DataSource = null;
            cbAsignatura.DataSource = Declaraciones.ListaAsignatura;
            cbAsignatura.DisplayMember = "Nombre";
            cbAsignatura.ValueMember = "idAsignatura";
        }

        private void btnAsignaturasInscritas_Click(object sender, EventArgs e)
        {
            var consulta = (from E in Declaraciones.ListaEstudiante
                            join EA in Declaraciones.ListaEstAsig
                            on E.Carnet equals EA.Carnet
                            join A in Declaraciones.ListaAsignatura
                            on EA.idAsignatura equals A.idAsignatura
                            select new
                            {
                                Nombre = A.Nombre,
                                Credito = A.Credito,
                                Frecuencia = A.Frecuencia
                            }).ToList();
            dgReportes.DataSource = null;
            dgReportes.DataSource = consulta;
        }

        private void btnPagosRealizados_Click(object sender, EventArgs e)
        {
            var consulta = (from P in Declaraciones.ListaPagos
                            join E in Declaraciones.ListaEstudiante
                            on P.Carnet equals E.Carnet
                            select new
                            {
                                Fecha = P.Fecha,
                                Monto = P.Monto,
                                Descripcion = P.Descripcion
                            }).ToList();
            dgReportes.DataSource = null;
            dgReportes.DataSource = consulta;
        }

        private void btnMatriculados_Click(object sender, EventArgs e)
        {
            var consulta = (from E in Declaraciones.ListaEstudiante
                            join EA in Declaraciones.ListaEstAsig
                            on E.Carnet equals EA.Carnet
                            join A in Declaraciones.ListaAsignatura
                            on EA.idAsignatura equals A.idAsignatura
                            where A.idAsignatura == int.Parse(cbAsignatura.SelectedValue.ToString())
                            select new
                            {
                                Carnet = E.Carnet,
                                Apellidos = E.Apellidos,
                                Nombres = E.Nombres
                            }).ToList();
            dgReportes.DataSource = null;
            dgReportes.DataSource = consulta;
        }
    }
}
