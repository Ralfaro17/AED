namespace LINQ3
{
    partial class frmMatricula
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
            this.cbAsignatura = new System.Windows.Forms.ComboBox();
            this.dgMatricula = new System.Windows.Forms.DataGridView();
            this.btnInsertar = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.cbCarnet = new System.Windows.Forms.ComboBox();
            ((System.ComponentModel.ISupportInitialize)(this.dgMatricula)).BeginInit();
            this.SuspendLayout();
            // 
            // cbAsignatura
            // 
            this.cbAsignatura.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.cbAsignatura.FormattingEnabled = true;
            this.cbAsignatura.Location = new System.Drawing.Point(154, 83);
            this.cbAsignatura.Name = "cbAsignatura";
            this.cbAsignatura.Size = new System.Drawing.Size(176, 37);
            this.cbAsignatura.TabIndex = 26;
            // 
            // dgMatricula
            // 
            this.dgMatricula.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgMatricula.Location = new System.Drawing.Point(346, 30);
            this.dgMatricula.Name = "dgMatricula";
            this.dgMatricula.RowHeadersWidth = 51;
            this.dgMatricula.RowTemplate.Height = 24;
            this.dgMatricula.Size = new System.Drawing.Size(794, 390);
            this.dgMatricula.TabIndex = 25;
            // 
            // btnInsertar
            // 
            this.btnInsertar.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.btnInsertar.Location = new System.Drawing.Point(179, 145);
            this.btnInsertar.Name = "btnInsertar";
            this.btnInsertar.Size = new System.Drawing.Size(117, 55);
            this.btnInsertar.TabIndex = 20;
            this.btnInsertar.Text = "Insertar";
            this.btnInsertar.UseVisualStyleBackColor = true;
            this.btnInsertar.Click += new System.EventHandler(this.btnInsertar_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.label2.Location = new System.Drawing.Point(12, 83);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(126, 29);
            this.label2.TabIndex = 18;
            this.label2.Text = "Asignatura";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.label1.Location = new System.Drawing.Point(12, 32);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(84, 29);
            this.label1.TabIndex = 19;
            this.label1.Text = "Carnet";
            // 
            // cbCarnet
            // 
            this.cbCarnet.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.cbCarnet.FormattingEnabled = true;
            this.cbCarnet.Location = new System.Drawing.Point(154, 32);
            this.cbCarnet.Name = "cbCarnet";
            this.cbCarnet.Size = new System.Drawing.Size(176, 37);
            this.cbCarnet.TabIndex = 26;
            // 
            // frmMatricula
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1152, 450);
            this.Controls.Add(this.cbCarnet);
            this.Controls.Add(this.cbAsignatura);
            this.Controls.Add(this.dgMatricula);
            this.Controls.Add(this.btnInsertar);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "frmMatricula";
            this.Text = "frmMatricula";
            ((System.ComponentModel.ISupportInitialize)(this.dgMatricula)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox cbAsignatura;
        private System.Windows.Forms.DataGridView dgMatricula;
        private System.Windows.Forms.Button btnInsertar;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ComboBox cbCarnet;
    }
}