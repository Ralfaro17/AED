namespace LINQ3
{
    partial class frmAsignatura
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
            this.dgAsignatura = new System.Windows.Forms.DataGridView();
            this.txtFrecuencia = new System.Windows.Forms.TextBox();
            this.txtCredito = new System.Windows.Forms.TextBox();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.txtIdAsignatura = new System.Windows.Forms.TextBox();
            this.btnInsertar = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dgAsignatura)).BeginInit();
            this.SuspendLayout();
            // 
            // dgAsignatura
            // 
            this.dgAsignatura.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgAsignatura.Location = new System.Drawing.Point(346, 30);
            this.dgAsignatura.Name = "dgAsignatura";
            this.dgAsignatura.RowHeadersWidth = 51;
            this.dgAsignatura.RowTemplate.Height = 24;
            this.dgAsignatura.Size = new System.Drawing.Size(794, 390);
            this.dgAsignatura.TabIndex = 13;
            // 
            // txtFrecuencia
            // 
            this.txtFrecuencia.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.txtFrecuencia.Location = new System.Drawing.Point(149, 199);
            this.txtFrecuencia.Name = "txtFrecuencia";
            this.txtFrecuencia.Size = new System.Drawing.Size(176, 34);
            this.txtFrecuencia.TabIndex = 9;
            // 
            // txtCredito
            // 
            this.txtCredito.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.txtCredito.Location = new System.Drawing.Point(149, 139);
            this.txtCredito.Name = "txtCredito";
            this.txtCredito.Size = new System.Drawing.Size(176, 34);
            this.txtCredito.TabIndex = 10;
            // 
            // txtNombre
            // 
            this.txtNombre.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.txtNombre.Location = new System.Drawing.Point(149, 83);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(176, 34);
            this.txtNombre.TabIndex = 11;
            // 
            // txtIdAsignatura
            // 
            this.txtIdAsignatura.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.txtIdAsignatura.Location = new System.Drawing.Point(149, 32);
            this.txtIdAsignatura.Name = "txtIdAsignatura";
            this.txtIdAsignatura.Size = new System.Drawing.Size(176, 34);
            this.txtIdAsignatura.TabIndex = 12;
            // 
            // btnInsertar
            // 
            this.btnInsertar.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.btnInsertar.Location = new System.Drawing.Point(175, 254);
            this.btnInsertar.Name = "btnInsertar";
            this.btnInsertar.Size = new System.Drawing.Size(117, 55);
            this.btnInsertar.TabIndex = 8;
            this.btnInsertar.Text = "Insertar";
            this.btnInsertar.UseVisualStyleBackColor = true;
            this.btnInsertar.Click += new System.EventHandler(this.btnInsertar_Click);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.label4.Location = new System.Drawing.Point(12, 199);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(133, 29);
            this.label4.TabIndex = 4;
            this.label4.Text = "Frecuencia";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.label3.Location = new System.Drawing.Point(12, 139);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(92, 29);
            this.label3.TabIndex = 5;
            this.label3.Text = "Credito";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.label2.Location = new System.Drawing.Point(12, 83);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(101, 29);
            this.label2.TabIndex = 6;
            this.label2.Text = "Nombre";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.label1.Location = new System.Drawing.Point(12, 32);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(33, 29);
            this.label1.TabIndex = 7;
            this.label1.Text = "Id";
            // 
            // frmAsignatura
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1152, 450);
            this.Controls.Add(this.dgAsignatura);
            this.Controls.Add(this.txtFrecuencia);
            this.Controls.Add(this.txtCredito);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.txtIdAsignatura);
            this.Controls.Add(this.btnInsertar);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "frmAsignatura";
            this.Text = "frmAsignatura";
            ((System.ComponentModel.ISupportInitialize)(this.dgAsignatura)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView dgAsignatura;
        private System.Windows.Forms.TextBox txtFrecuencia;
        private System.Windows.Forms.TextBox txtCredito;
        private System.Windows.Forms.TextBox txtNombre;
        private System.Windows.Forms.TextBox txtIdAsignatura;
        private System.Windows.Forms.Button btnInsertar;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
    }
}