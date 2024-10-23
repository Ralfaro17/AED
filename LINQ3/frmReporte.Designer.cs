namespace LINQ3
{
    partial class frmReporte
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
            this.dgReportes = new System.Windows.Forms.DataGridView();
            this.txtCarnet = new System.Windows.Forms.TextBox();
            this.btnAsignaturasInscritas = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.btnPagosRealizados = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.cbAsignatura = new System.Windows.Forms.ComboBox();
            this.btnMatriculados = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.dgReportes)).BeginInit();
            this.SuspendLayout();
            // 
            // dgReportes
            // 
            this.dgReportes.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgReportes.Location = new System.Drawing.Point(346, 30);
            this.dgReportes.Name = "dgReportes";
            this.dgReportes.RowHeadersWidth = 51;
            this.dgReportes.RowTemplate.Height = 24;
            this.dgReportes.Size = new System.Drawing.Size(553, 390);
            this.dgReportes.TabIndex = 25;
            // 
            // txtCarnet
            // 
            this.txtCarnet.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.txtCarnet.Location = new System.Drawing.Point(112, 30);
            this.txtCarnet.Name = "txtCarnet";
            this.txtCarnet.Size = new System.Drawing.Size(213, 34);
            this.txtCarnet.TabIndex = 24;
            // 
            // btnAsignaturasInscritas
            // 
            this.btnAsignaturasInscritas.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.btnAsignaturasInscritas.Location = new System.Drawing.Point(12, 93);
            this.btnAsignaturasInscritas.Name = "btnAsignaturasInscritas";
            this.btnAsignaturasInscritas.Size = new System.Drawing.Size(313, 55);
            this.btnAsignaturasInscritas.TabIndex = 20;
            this.btnAsignaturasInscritas.Text = "Asignaturas Inscritas";
            this.btnAsignaturasInscritas.UseVisualStyleBackColor = true;
            this.btnAsignaturasInscritas.Click += new System.EventHandler(this.btnAsignaturasInscritas_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.label2.Location = new System.Drawing.Point(22, 30);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(84, 29);
            this.label2.TabIndex = 18;
            this.label2.Text = "Carnet";
            // 
            // btnPagosRealizados
            // 
            this.btnPagosRealizados.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.btnPagosRealizados.Location = new System.Drawing.Point(12, 164);
            this.btnPagosRealizados.Name = "btnPagosRealizados";
            this.btnPagosRealizados.Size = new System.Drawing.Size(313, 55);
            this.btnPagosRealizados.TabIndex = 20;
            this.btnPagosRealizados.Text = "Pagos Realizados";
            this.btnPagosRealizados.UseVisualStyleBackColor = true;
            this.btnPagosRealizados.Click += new System.EventHandler(this.btnPagosRealizados_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.label1.Location = new System.Drawing.Point(968, 30);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(126, 29);
            this.label1.TabIndex = 18;
            this.label1.Text = "Asignatura";
            // 
            // cbAsignatura
            // 
            this.cbAsignatura.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.cbAsignatura.FormattingEnabled = true;
            this.cbAsignatura.Location = new System.Drawing.Point(933, 69);
            this.cbAsignatura.Name = "cbAsignatura";
            this.cbAsignatura.Size = new System.Drawing.Size(204, 37);
            this.cbAsignatura.TabIndex = 26;
            // 
            // btnMatriculados
            // 
            this.btnMatriculados.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.btnMatriculados.Location = new System.Drawing.Point(954, 122);
            this.btnMatriculados.Name = "btnMatriculados";
            this.btnMatriculados.Size = new System.Drawing.Size(160, 55);
            this.btnMatriculados.TabIndex = 20;
            this.btnMatriculados.Text = "Matriculados";
            this.btnMatriculados.UseVisualStyleBackColor = true;
            this.btnMatriculados.Click += new System.EventHandler(this.btnMatriculados_Click);
            // 
            // frmReporte
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1152, 450);
            this.Controls.Add(this.cbAsignatura);
            this.Controls.Add(this.dgReportes);
            this.Controls.Add(this.txtCarnet);
            this.Controls.Add(this.btnMatriculados);
            this.Controls.Add(this.btnPagosRealizados);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btnAsignaturasInscritas);
            this.Controls.Add(this.label2);
            this.Name = "frmReporte";
            this.Text = "frmReporte";
            ((System.ComponentModel.ISupportInitialize)(this.dgReportes)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.DataGridView dgReportes;
        private System.Windows.Forms.TextBox txtCarnet;
        private System.Windows.Forms.Button btnAsignaturasInscritas;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button btnPagosRealizados;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ComboBox cbAsignatura;
        private System.Windows.Forms.Button btnMatriculados;
    }
}