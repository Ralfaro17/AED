using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Serialization;

namespace RelacionesListasYLINQ
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public void InsertarEstudiante()
        {
            Declaraciones.ListaEstudiantes.Add(
                new Estudiantes
                {
                    Carnet = int.Parse(txtCarnet.Text),
                    Nombres = txtNombres.Text,
                    Apellidos = txtApellidos.Text,
                    Direccion = txtDireccion.Text,
                    Telefono = txtTelefono.Text,
                    añoDeNacimiento = DateTime.Parse(txtNacimiento.Text)
                }
                ); 
        }

        public void AñadirMonografia()
        {
            Declaraciones.ListaProfesoresMonografia.Add(
                new ProfesoresMonografia
                {
                    idProfesor = int.Parse(txtIdTutor.Text),
                    idMonografia = int.Parse(txtIdMonografia.Text),
                    rol = "Tutor"
                }
                );
            Declaraciones.ListaProfesoresMonografia.Add(
                new ProfesoresMonografia
                {
                    idProfesor = int.Parse(txtIdJurado1.Text),
                    idMonografia = int.Parse(txtIdMonografia.Text),
                    rol = "Jurado"
                }
                );
            Declaraciones.ListaProfesoresMonografia.Add(
                new ProfesoresMonografia
                {
                    idProfesor = int.Parse(txtIdJurado2.Text),
                    idMonografia = int.Parse(txtIdMonografia.Text),
                    rol = "Jurado"
                }
                );
            Declaraciones.ListaProfesoresMonografia.Add(
                new ProfesoresMonografia
                {
                    idProfesor = int.Parse(txtIdJurado3.Text),
                    idMonografia = int.Parse(txtIdMonografia.Text),
                    rol = "Jurado"
                }
                );
            var estudiantes = [txtIdEstudiante1.Text, txtIdEstudiante2.txt, txtIdEstudiante3.txt];
            foreach(var estudiante in (from E in Declaraciones.ListaEstudiantes where E.Carnet == estudiantes[0] || E.Carnet == estudiantes[1] || E.Carnet == estudiantes[2]).ToArray()
            {

            }


        }

        private void Form1_Load(object sender, EventArgs e)
        {
            
        }
    }
}
