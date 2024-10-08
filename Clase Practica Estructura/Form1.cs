﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Clase_Practica_Estructura
{
    public partial class FormStruct : Form
    { 
        public struct Fecha
        {
            public int Dia;
            public String Mes;
            public int Año;
        }

        public struct Datos
        {
            public string Carnet;
            public string Nombres;
            public string Apellidos;
            public string Sexo;
            public Fecha FechaNac;
        }

        void Limpiar()
        {
            txtApellidos.Clear();
            txtCarnet.Clear();
            txtNombres.Clear();
            txtAño.Clear();
            cbDia.ResetText();
            cbMes.ResetText();
            cbSexo.ResetText();
        }

        void Registrar()
        {
            if (N <= Tam - 1)
            {
                Registros[N].Carnet = txtCarnet.Text;
                Registros[N].Nombres = txtNombres.Text;
                Registros[N].Apellidos = txtApellidos.Text;
                Registros[N].Sexo = cbSexo.Text;
                Registros[N].FechaNac.Dia = int.Parse(cbDia.Text);
                Registros[N].FechaNac.Mes = cbMes.Text;
                Registros[N].FechaNac.Año = int.Parse(txtAño.Text);
                N++;
                Limpiar();
                MessageBox.Show("Estudiante insertado");
                txtCarnet.Focus();
            }
            else
            {
                MessageBox.Show("No hay espacio en la estructura");
            }
        }

        int Tam, N, i;
        Datos[] Registros;


        public FormStruct()
        {
            InitializeComponent();
        }

        private void FormStruct_Load(object sender, EventArgs e)
        {
            MessageBox.Show("Bienvenidos");
            cbSexo.Items.Add("F");
            cbSexo.Items.Add("M");

            for(int i = 0; i <= 31; i++)
            {
                cbDia.Items.Add(Convert.ToString(i));
            }

            cbMes.Items.Add("Enero");
            cbMes.Items.Add("Febrero");
            cbMes.Items.Add("Marzo");
            cbMes.Items.Add("Abril");
            cbMes.Items.Add("Mayo");
            cbMes.Items.Add("Junio");
            cbMes.Items.Add("Julio");
            cbMes.Items.Add("Agosto");
            cbMes.Items.Add("Septiembre");
            cbMes.Items.Add("Octubre");
            cbMes.Items.Add("Noviembre");
            cbMes.Items.Add("Diciembre");
        }

        private void btnEstablecer_Click(object sender, EventArgs e)
        {
            Tam = int.Parse(txtCantidad.Text);
            Registros = new Datos[Tam];
            MessageBox.Show("Cantidad establecida exitosamente");
        }

        private void btnImprimir_Click(object sender, EventArgs e)
        {
            lbImprimir.Items.Clear();
            lbImprimir.Items.Add("Carnet" + "\t" + "Nombres" + "\t" + "Apellidos" + "\t" + "Sexo" + "\t" + "Dia" + "\t" + "Mes" + "\t" + "Año");
            for(int i = 0; i < N; i++)
            {
                lbImprimir.Items.Add(Registros[i].Carnet + "\t" + Registros[i].Nombres + "\t" + Registros[i].Apellidos + "\t" + Registros[i].Sexo + "\t" + Registros[i].FechaNac.Dia + "\t" + Registros[i].FechaNac.Mes + "\t" + Registros[i].FechaNac.Año);
            }
        }

        private void btnBorrar_Click(object sender, EventArgs e)
        {
            int i = 0;
            string x;
            x = txtCarnet.Text;
            while (i < N && x != Registros[i].Carnet)
            {
                i = i + 1;
            }
            if(i >= N)
            {
                MessageBox.Show(x + "No está Registrado");
            }
            else
            {
                for (int k = i; k < N; k++)
                {
                    Registros[k].Carnet = Registros[k + 1].Carnet;
                    Registros[k].Nombres = Registros[k + 1].Nombres;
                    Registros[k].Apellidos = Registros[k + 1].Apellidos;
                    Registros[k].Sexo = Registros[k + 1].Sexo;
                    Registros[k].FechaNac.Dia = Registros[k + 1].FechaNac.Dia;
                    Registros[k].FechaNac.Mes = Registros[k + 1].FechaNac.Mes;
                    Registros[k].FechaNac.Año = Registros[k + 1].FechaNac.Año;
                }
                N = N - 1;
                MessageBox.Show("El estudiante con Carnet=" + x + " se ha eliminado");
            }
        }

        private void txtAño_KeyPress(object sender, KeyPressEventArgs e)
        {
            if(e.KeyChar == 13)
            {
                Registrar();
            }
        }

        private void btnActualizar_Click(object sender, EventArgs e)
        {
            int i = 0;
            string x;
            x = txtCarnet.Text;
            while(i < N && x != Registros[i].Carnet)
            {
                i = i + 1;
            }
            if(i >= N)
            {
                MessageBox.Show(x + " No está Registrado");
            }
            else
            {   
                Registros[i].Nombres = txtNombres.Text;
                Registros[i].Apellidos = txtApellidos.Text;
                Registros[i].Sexo = cbSexo.Text;
                Registros[i].FechaNac.Dia = int.Parse(cbDia.Text);
                Registros[i].FechaNac.Mes = cbMes.Text;
                Registros[i].FechaNac.Año = int.Parse(txtAño.Text);
                Limpiar();
                MessageBox.Show("El estudiante con Carnet=" + x + " se ha actualizado");
            }
        }

        private void btnRegistrar_Click(object sender, EventArgs e)
        {
            Registrar();
        }
    }
}
