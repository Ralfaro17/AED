using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace sistematico
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        Queue<string> ColaNombre = new Queue<string>();

        void Imprimir(ListBox listbox)
        {
            listbox.Items.Clear();
            foreach(string item in ColaNombre)
            {
                listbox.Items.Add(item);
                listbox.Items.Add("-------------------");
            }
        }

        void Agregar()
        {
            string elemento = txtElemento.Text;
            ColaNombre.Enqueue(elemento);

            Imprimir(lbCola);

            txtElemento.Clear();
            txtElemento.Focus();
        }

        private void btnEncolar_Click(object sender, EventArgs e)
        {
            Agregar();
        }

        private void btnCopiar_Click(object sender, EventArgs e)
        {
            Imprimir(lbCopiaCola);
        }

        private void btnDesencolar_Click(object sender, EventArgs e)
        {
            if(ColaNombre.Count != 0)
            {
                lbImprimir.Items.Add("Desencolado: " + ColaNombre.Dequeue());
                Imprimir(lbCola);
            }
            else
            {
                MessageBox.Show("No hay elementos para borrar en la cola");
            }
        }

        private void btnPeek_Click(object sender, EventArgs e)
        {
            if(ColaNombre.Count != 0)
            {
                lbImprimir.Items.Add("Peeked: " + ColaNombre.Peek());
            }
            else
            {
                MessageBox.Show("No hay elementos para mostrar en la cola");
            }
        }

        private void txtElemento_KeyPress(object sender, KeyPressEventArgs e)
        {
            if((Keys)e.KeyChar == Keys.Enter)
            {
                Agregar();
            }
        }

        private void txtBuscar_KeyPress(object sender, KeyPressEventArgs e)
        {
            if((Keys)e.KeyChar != Keys.Enter)
            {
                return;
            }

            if (ColaNombre.Contains(txtBuscar.Text))
            {
                MessageBox.Show("Existe el elemento");
            }
            else
            {
                MessageBox.Show("No existe el elemento");
            }

            txtBuscar.Clear();
            txtBuscar.Focus();
        }
    }
}
