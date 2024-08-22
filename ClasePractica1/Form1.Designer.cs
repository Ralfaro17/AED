namespace ClasePractica1
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.labelCantidad = new System.Windows.Forms.Label();
            this.labelNombres = new System.Windows.Forms.Label();
            this.labelApellidos = new System.Windows.Forms.Label();
            this.labelTelefono = new System.Windows.Forms.Label();
            this.labelAño = new System.Windows.Forms.Label();
            this.txtCantidad = new System.Windows.Forms.TextBox();
            this.txtNombres = new System.Windows.Forms.TextBox();
            this.txtApellidos = new System.Windows.Forms.TextBox();
            this.txtTelefono = new System.Windows.Forms.TextBox();
            this.txtAño = new System.Windows.Forms.TextBox();
            this.btnCantidad = new System.Windows.Forms.Button();
            this.btnImprimir = new System.Windows.Forms.Button();
            this.lbImprimir = new System.Windows.Forms.ListBox();
            this.btnAgregar = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // labelCantidad
            // 
            this.labelCantidad.AutoSize = true;
            this.labelCantidad.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.labelCantidad.Location = new System.Drawing.Point(12, 23);
            this.labelCantidad.Name = "labelCantidad";
            this.labelCantidad.Size = new System.Drawing.Size(550, 42);
            this.labelCantidad.TabIndex = 0;
            this.labelCantidad.Text = "Ingrese la cantidad de personas";
            // 
            // labelNombres
            // 
            this.labelNombres.AutoSize = true;
            this.labelNombres.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.labelNombres.Location = new System.Drawing.Point(12, 96);
            this.labelNombres.Name = "labelNombres";
            this.labelNombres.Size = new System.Drawing.Size(169, 42);
            this.labelNombres.TabIndex = 0;
            this.labelNombres.Text = "Nombres";
            // 
            // labelApellidos
            // 
            this.labelApellidos.AutoSize = true;
            this.labelApellidos.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.labelApellidos.Location = new System.Drawing.Point(12, 174);
            this.labelApellidos.Name = "labelApellidos";
            this.labelApellidos.Size = new System.Drawing.Size(170, 42);
            this.labelApellidos.TabIndex = 0;
            this.labelApellidos.Text = "Apellidos";
            // 
            // labelTelefono
            // 
            this.labelTelefono.AutoSize = true;
            this.labelTelefono.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.labelTelefono.Location = new System.Drawing.Point(12, 245);
            this.labelTelefono.Name = "labelTelefono";
            this.labelTelefono.Size = new System.Drawing.Size(164, 42);
            this.labelTelefono.TabIndex = 0;
            this.labelTelefono.Text = "Telefono";
            // 
            // labelAño
            // 
            this.labelAño.AutoSize = true;
            this.labelAño.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.labelAño.Location = new System.Drawing.Point(12, 321);
            this.labelAño.Name = "labelAño";
            this.labelAño.Size = new System.Drawing.Size(85, 42);
            this.labelAño.TabIndex = 0;
            this.labelAño.Text = "Año";
            // 
            // txtCantidad
            // 
            this.txtCantidad.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.txtCantidad.Location = new System.Drawing.Point(582, 27);
            this.txtCantidad.Name = "txtCantidad";
            this.txtCantidad.Size = new System.Drawing.Size(191, 49);
            this.txtCantidad.TabIndex = 1;
            // 
            // txtNombres
            // 
            this.txtNombres.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.txtNombres.Location = new System.Drawing.Point(197, 96);
            this.txtNombres.Name = "txtNombres";
            this.txtNombres.Size = new System.Drawing.Size(191, 49);
            this.txtNombres.TabIndex = 1;
            // 
            // txtApellidos
            // 
            this.txtApellidos.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.txtApellidos.Location = new System.Drawing.Point(197, 171);
            this.txtApellidos.Name = "txtApellidos";
            this.txtApellidos.Size = new System.Drawing.Size(191, 49);
            this.txtApellidos.TabIndex = 1;
            // 
            // txtTelefono
            // 
            this.txtTelefono.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.txtTelefono.Location = new System.Drawing.Point(197, 238);
            this.txtTelefono.Name = "txtTelefono";
            this.txtTelefono.Size = new System.Drawing.Size(191, 49);
            this.txtTelefono.TabIndex = 1;
            // 
            // txtAño
            // 
            this.txtAño.Font = new System.Drawing.Font("Microsoft Sans Serif", 22F);
            this.txtAño.Location = new System.Drawing.Point(197, 318);
            this.txtAño.Name = "txtAño";
            this.txtAño.Size = new System.Drawing.Size(191, 49);
            this.txtAño.TabIndex = 1;
            // 
            // btnCantidad
            // 
            this.btnCantidad.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F);
            this.btnCantidad.Location = new System.Drawing.Point(794, 16);
            this.btnCantidad.Name = "btnCantidad";
            this.btnCantidad.Size = new System.Drawing.Size(200, 77);
            this.btnCantidad.TabIndex = 2;
            this.btnCantidad.Text = "Establecer Cantidad";
            this.btnCantidad.UseVisualStyleBackColor = true;
            this.btnCantidad.Click += new System.EventHandler(this.btnCantidad_Click);
            // 
            // btnImprimir
            // 
            this.btnImprimir.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F);
            this.btnImprimir.Location = new System.Drawing.Point(827, 119);
            this.btnImprimir.Name = "btnImprimir";
            this.btnImprimir.Size = new System.Drawing.Size(133, 42);
            this.btnImprimir.TabIndex = 2;
            this.btnImprimir.Text = "Imprimir";
            this.btnImprimir.UseVisualStyleBackColor = true;
            this.btnImprimir.Click += new System.EventHandler(this.btnImprimir_Click);
            // 
            // lbImprimir
            // 
            this.lbImprimir.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F);
            this.lbImprimir.FormattingEnabled = true;
            this.lbImprimir.ItemHeight = 25;
            this.lbImprimir.Location = new System.Drawing.Point(465, 169);
            this.lbImprimir.Name = "lbImprimir";
            this.lbImprimir.Size = new System.Drawing.Size(528, 254);
            this.lbImprimir.TabIndex = 3;
            // 
            // btnAgregar
            // 
            this.btnAgregar.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F);
            this.btnAgregar.Location = new System.Drawing.Point(225, 396);
            this.btnAgregar.Name = "btnAgregar";
            this.btnAgregar.Size = new System.Drawing.Size(133, 42);
            this.btnAgregar.TabIndex = 2;
            this.btnAgregar.Text = "Agregar";
            this.btnAgregar.UseVisualStyleBackColor = true;
            this.btnAgregar.Click += new System.EventHandler(this.btnAgregar_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1006, 450);
            this.Controls.Add(this.lbImprimir);
            this.Controls.Add(this.btnAgregar);
            this.Controls.Add(this.btnImprimir);
            this.Controls.Add(this.btnCantidad);
            this.Controls.Add(this.txtAño);
            this.Controls.Add(this.txtTelefono);
            this.Controls.Add(this.txtApellidos);
            this.Controls.Add(this.txtNombres);
            this.Controls.Add(this.txtCantidad);
            this.Controls.Add(this.labelAño);
            this.Controls.Add(this.labelTelefono);
            this.Controls.Add(this.labelApellidos);
            this.Controls.Add(this.labelNombres);
            this.Controls.Add(this.labelCantidad);
            this.Name = "Form1";
            this.Text = "Clase Practica 1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label labelCantidad;
        private System.Windows.Forms.Label labelNombres;
        private System.Windows.Forms.Label labelApellidos;
        private System.Windows.Forms.Label labelTelefono;
        private System.Windows.Forms.Label labelAño;
        private System.Windows.Forms.TextBox txtCantidad;
        private System.Windows.Forms.TextBox txtNombres;
        private System.Windows.Forms.TextBox txtApellidos;
        private System.Windows.Forms.TextBox txtTelefono;
        private System.Windows.Forms.TextBox txtAño;
        private System.Windows.Forms.Button btnCantidad;
        private System.Windows.Forms.Button btnImprimir;
        private System.Windows.Forms.ListBox lbImprimir;
        private System.Windows.Forms.Button btnAgregar;
    }
}

