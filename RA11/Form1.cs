using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace RA11
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        bool band = false;
        List<Producto> ListaProducto = new List<Producto>();
        int i;
        DataTable dt = new DataTable();

        void Procedimiento()
        {
            dt.Clear();
            if (band == false)
            {
                foreach( DataGridViewColumn col in dgProductos.Columns)
                {
                    dt.Columns.Add(col.HeaderText);
                }
                band = true;
            }

            foreach(DataGridViewRow row in dgProductos.Rows)
            {
                DataRow dRow = dt.NewRow();
                foreach(DataGridViewCell cell in row.Cells)
                {
                    dRow[cell.ColumnIndex] = cell.Value;
                }
                dt.Rows.Add(dRow);
            }
        }

        void Buscar()
        {
            int id = int.Parse(txtBuscarid.Text);
            var t = ListaProducto.Where(x => x.Id == id).ToList();
            dgProductos.DataSource = null;
            dgProductos.DataSource = t;
        }

        private void btnLimpiar_Click(object sender, EventArgs e)
        {
            txtId.Clear();
            txtBuscarid.Clear();
            txtDescripcion.Clear();
            txtCosto.Clear();
            txtPrecio.Clear();
            txtSMaximo.Clear();
            txtSMinimo.Clear();
            txtExistencia.Clear();
            cbPorcentaje.Visible = true;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            this.WindowState = FormWindowState.Normal;
            this.StartPosition = FormStartPosition.CenterScreen;
            cbPorcentaje.DropDownStyle = ComboBoxStyle.DropDownList;
            for(int a = 10; a <= 100; a = a + 10)
            {
                cbPorcentaje.Items.Add(a);
            }
        }

        private void cbPorcentaje_SelectedIndexChanged(object sender, EventArgs e)
        {
            Producto Instancia1 = new Producto();
            txtPrecio.Text = Instancia1.CalcularPrecio(double.Parse(txtCosto.Text), double.Parse(cbPorcentaje.Text));
        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            Producto Instancia = new Producto();
            Instancia.Id = int.Parse(txtId.Text);
            Instancia.Descripcion = txtDescripcion.Text;
            Instancia.Costo = double.Parse(txtCosto.Text);
            Instancia.Precio = double.Parse(txtPrecio.Text);
            Instancia.SMaximo = int.Parse(txtSMaximo.Text);
            Instancia.SMinimo = int.Parse(txtSMinimo.Text);
            Instancia.Existencia = int.Parse(txtExistencia.Text);
            ListaProducto.Add(Instancia);
            cbPorcentaje.Visible = true;

            dgProductos.DataSource = null;
            dgProductos.DataSource = ListaProducto;
            Procedimiento();
        }

        private void btnImprimir_Click(object sender, EventArgs e)
        {
            dgProductos.DataSource = null;
            dgProductos.DataSource = ListaProducto;
            Procedimiento();
        }

        private void txtBuscar_TextChanged(object sender, EventArgs e)
        {
            dt.DefaultView.RowFilter = $"Descripcion LIKE '{txtBuscar.Text}%'";
            dgProductos.DataSource = null;
            dgProductos.DataSource = dt;
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            Buscar();
        }

        private void btnEliminar_Click(object sender, EventArgs e)
        {
            int id = int.Parse(txtBuscarid.Text);
            ListaProducto = ListaProducto.Where(x => x.Id != id).ToList();
            dgProductos.DataSource = ListaProducto;
        }

        private void rbExistencia_CheckedChanged(object sender, EventArgs e)
        {
            if(rbExistencia.Checked) {
                var t = ListaProducto.Sum(x => x.Existencia);
                txtResultado.Text = Convert.ToString(t);
            }
        }

        private void rbPromedio_CheckedChanged(object sender, EventArgs e)
        {
            if (rbPromedio.Checked)
            {
                var t = ListaProducto.Average(x => x.Precio);
                txtResultado.Text = Convert.ToString(t);
            }
        }

        private void rbMayores_CheckedChanged(object sender, EventArgs e)
        {
            if (rbMayores.Checked)
            {
                var t = ListaProducto.Where(x => x.Precio > ListaProducto.Average(c => c.Precio)).ToList();
                dgProductos.DataSource= t;
            }
        }

        private void dgProductos_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int IndiceFila;
            IndiceFila = dgProductos.CurrentRow.Index;
            txtId.Text = Convert.ToString(dgProductos.Rows[IndiceFila].Cells[0].Value);
            txtDescripcion.Text = Convert.ToString(dgProductos.Rows[IndiceFila].Cells[1].Value); ;
            txtCosto.Text = Convert.ToString(dgProductos.Rows[IndiceFila].Cells[2].Value);
            txtPrecio.Text = Convert.ToString(dgProductos.Rows[IndiceFila].Cells[3].Value);
            txtSMaximo.Text = Convert.ToString(dgProductos.Rows[IndiceFila].Cells[4].Value);
            txtSMinimo.Text = Convert.ToString(dgProductos.Rows[IndiceFila].Cells[5].Value); 
            txtExistencia.Text = Convert.ToString(dgProductos.Rows[IndiceFila].Cells[6].Value);
        }

        private void txtBuscarid_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == 13)
            {
                Buscar();
            }
        }
    }
}
