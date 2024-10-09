using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ordenacionDirecta
{
    public partial class Form1 : Form
    { 
        public Form1()
        {
            InitializeComponent();
        }

        int N, aux, k, i;
        int[] Numeros;

        void Imprimir()
        {
            for(k = 0; k < N; k++)
            {
                txtOrden.Text = txtOrden.Text + (Numeros[k]) + " ";
            }
            txtOrden.Text = txtOrden.Text + "\r\n";
        }

        public void BurbujaMenor()
        {
            i = 0;
            N = 0;
            foreach(int Elemento in lbNumeros.Items)
            {
                Array.Resize(ref Numeros, N + 1);
                Numeros[N] = Elemento;
                N++;
            }
            txtOrden.Text = "";
            for(int i = 1; i < N; i++)
            {
                for(int j = N - 1; j > 0; j--)
                {
                    if (Numeros[j - 1] > Numeros[j])
                    {
                        aux = Numeros[j - 1];
                        Numeros[j - 1] = Numeros[j];
                        Numeros[j] = aux;
                    }
                    Imprimir();
                }
            }
        }

        void BurbujaMayor()
        {
            N = 0;
            foreach(int Elemento in lbNumeros.Items)
            {
                Array.Resize(ref Numeros, N + 1);
                Numeros[N] = Elemento;
                N++;
            }
            txtOrden.Clear();
            for( int i = N - 1; i > 0; i--)
            {
                for(int j = 0; j < i; j++)
                {
                    if(Numeros[j] > Numeros[j + 1])
                    {
                        aux = Numeros[j];
                        Numeros[j] = Numeros[j + 1];
                        Numeros[j + 1] = aux;
                    }
                    Imprimir();
                }
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            cbMetodo.Items.Add("Burburja Menor");
            cbMetodo.Items.Add("Burburja Mayor");
            cbMetodo.Items.Add("Burburja Con Señal");
            cbMetodo.DropDownStyle = ComboBoxStyle.DropDownList;
        }

        private void txtNumero_KeyPress(object sender, KeyPressEventArgs e)
        {
            if(e.KeyChar == 13)
            {
                int Num = int.Parse(txtNumero.Text);
                lbNumeros.Items.Add(Num);
                lbNumeros.Text = Convert.ToString(lbNumeros.Items.Count + "elementos insertados");
                txtNumero.Text = "";
                txtNumero.Focus();
            }
        }

        void BurbujaSeñal()
        {
            N = 0;
            foreach(int Elemento in lbNumeros.Items)
            {
                Array.Resize(ref Numeros, N + 1);
                Numeros[N] = Elemento;
                N++;
            }
            txtOrden.Clear();
            i = 0;
            bool Band = false;
            while (i < N - 1 && Band == false)
            {
                Band = true;
                for(int j = 0; j < N - 1; j++)
                {
                    if(Numeros[j] > Numeros[j + 1])
                    {
                        int aux = Numeros[j];
                        Numeros[j] = Numeros[j + 1];
                        Numeros[j + 1] = aux;
                        Band = false;
                    }
                    Imprimir();
                }
                i = i + 1;
            }
        }

        private void btnLimpiar_Click(object sender, EventArgs e)
        {
            lbNumeros.Items.Clear();
        }

        private void cbMetodo_SelectedIndexChanged(object sender, EventArgs e)
        {
            if(cbMetodo.SelectedIndex == 0)
            {
                BurbujaMenor();
            }
            if(cbMetodo.SelectedIndex == 1)
            {
                BurbujaMayor();
            }
            if(cbMetodo.SelectedIndex == 2)
            {
                BurbujaSeñal();
            }

        }
    }
}
