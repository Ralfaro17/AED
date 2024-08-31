using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Arreglos
{
    public partial class Form1 : Form
    {
        // Declaraciones globales
        int[] id;
        string[] Nombres;
        int[] Edad;
        int N, Tam;

        public Form1()
        {
            InitializeComponent();
        }

        void Limpiar()
        {
            txtEdad.Clear();
            txtNombres.Clear(); 
            txtId.Clear();
            txtId.Focus();
        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            if (N <= Tam - 1)
            {
                id[N] = int.Parse(txtId.Text);
                Nombres[N] = txtNombres.Text;
                Edad[N] = int.Parse(txtEdad.Text);
                MessageBox.Show("La persona con el Id " + id[N] + " Se ha registrado exitosamente");
                N++;
                Limpiar();
            }
            else
            {
                MessageBox.Show("No hay espacio disponible");
            }
        }

        private void btnBorrar_Click(object sender, EventArgs e)
        {
            int x = int.Parse(txtId.Text);
            int i = 0;
            while(i < N && x != id[i])
            {
                i++;
            }

            if (i >= N)
            {
                MessageBox.Show("La persona con el Id " + x + " no se ha encontrado");
            }
            else
            {
                for (int k = i; k < N - 1; k++)
                {
                    id[k] = id[k + 1];
                    Nombres[k] = Nombres[k + 1];
                    Edad[k] = Edad[k + 1];
                }
                N--;
                MessageBox.Show("La persona con el id " + x + " se ha eliminado");
                Limpiar();
            }
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            int x = int.Parse(txtId.Text);
            int i = 0;
            while (i < N && x != id[i])
            {
                i++;
            }

            if (i >= N)
            {
                MessageBox.Show("La persona con el Id " + x + " no se ha encontrado");
            }
            else
            {
                txtNombres.Text = Nombres[i];
                txtEdad.Text = Edad[i].ToString();
                MessageBox.Show("Persona con Id " + x + " encontrada");
            }
        }

        private void btnImprimir_Click(object sender, EventArgs e)
        {
            lbImprimir.Items.Clear();
            for (int i = 0; i < N; i++)
            {
                lbImprimir.Items.Add(id[i] + "\t" + Nombres[i] + "\t" + Edad[i]);
            }
        }

        private void btnActualizar_Click(object sender, EventArgs e)
        {
            int x = int.Parse(txtId.Text);
            int i = 0;
            while (i < N && x != id[i])
            {
                i++;
            }

            if (i >= N)
            {
                MessageBox.Show("La persona con el Id " + x + " no se ha encontrado");
            }
            else
            {
                Nombres[i] = txtNombres.Text;
                Edad[i] = int.Parse(txtEdad.Text);

                MessageBox.Show("La persona con el id " + x + " Ha sido actualizada");
                Limpiar();
            }
        }

        private void btnEstablecer_Click(object sender, EventArgs e)
        {
            Tam = int.Parse(txtEstablecer.Text);
            id = new int[Tam];
            Nombres = new string[Tam];
            Edad = new int[Tam];
            N = 0;

            MessageBox.Show("Se ha establecido la cantidad de " + Tam);
        }
    }
}
