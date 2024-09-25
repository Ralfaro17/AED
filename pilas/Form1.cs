using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace pilas
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        Stack<string> PilaNombre = new Stack<string>();

        void Imprimir(ListBox listBox)
        {
            listBox.Items.Clear();

            foreach( var item in PilaNombre)
            {
                listBox.Items.Add(item);
                listBox.Items.Add("-------------------");
            }
        }

        void Agregar()
        {
            PilaNombre.Push(txtElemento.Text);
            Imprimir(lbPila);
            txtElemento.Clear();
            txtElemento.Focus();

        }

        private void txtElemento_KeyPress(object sender, KeyPressEventArgs e)
        {
            if((Keys)e.KeyChar == Keys.Enter)
            {
                Agregar();
            }
        }

        private void btnPop_Click(object sender, EventArgs e)
        {
            if(PilaNombre.Count == 0)
            {
                MessageBox.Show("No hay elementos en la pila");
                return;
            }

            lbImprimir.Items.Add("Popping/Desapilado: " + PilaNombre.Pop());

            Imprimir(lbCopiar);
        }

        private void btnApilar_Click(object sender, EventArgs e)
        {
            Agregar();
        }

        private void btnCopiar_Click(object sender, EventArgs e)
        {
            Imprimir(lbCopiar);
        }

        private void btnPeek_Click(object sender, EventArgs e)
        {
            if(PilaNombre.Count == 0)
            {
                MessageBox.Show("No hay elementos en la pila");
                return;
            }

            lbImprimir.Items.Add("Primer elemento en pila " + PilaNombre.Peek());
        }
    }
}
