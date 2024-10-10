
namespace ordenacionDirecta
{
    partial class Form1
    {
        /// <summary>
        /// Variable del diseñador necesaria.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpiar los recursos que se estén usando.
        /// </summary>
        /// <param name="disposing">true si los recursos administrados se deben desechar; false en caso contrario.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código generado por el Diseñador de Windows Forms

        /// <summary>
        /// Método necesario para admitir el Diseñador. No se puede modificar
        /// el contenido de este método con el editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.cbMetodo = new System.Windows.Forms.ComboBox();
            this.txtNumero = new System.Windows.Forms.TextBox();
            this.txtOrden = new System.Windows.Forms.TextBox();
            this.lEtiqueta = new System.Windows.Forms.Label();
            this.lbNumeros = new System.Windows.Forms.ListBox();
            this.btnLimpiar = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.label1.Location = new System.Drawing.Point(665, 23);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(315, 29);
            this.label1.TabIndex = 0;
            this.label1.Text = "Elija mètodo de ordenaciòn ";
            // 
            // cbMetodo
            // 
            this.cbMetodo.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.cbMetodo.FormattingEnabled = true;
            this.cbMetodo.Location = new System.Drawing.Point(685, 71);
            this.cbMetodo.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.cbMetodo.Name = "cbMetodo";
            this.cbMetodo.Size = new System.Drawing.Size(268, 37);
            this.cbMetodo.TabIndex = 1;
            this.cbMetodo.SelectedIndexChanged += new System.EventHandler(this.cbMetodo_SelectedIndexChanged);
            // 
            // txtNumero
            // 
            this.txtNumero.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.txtNumero.Location = new System.Drawing.Point(107, 30);
            this.txtNumero.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.txtNumero.Name = "txtNumero";
            this.txtNumero.Size = new System.Drawing.Size(147, 34);
            this.txtNumero.TabIndex = 2;
            this.txtNumero.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txtNumero_KeyPress);
            // 
            // txtOrden
            // 
            this.txtOrden.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.txtOrden.Location = new System.Drawing.Point(657, 145);
            this.txtOrden.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.txtOrden.Name = "txtOrden";
            this.txtOrden.Size = new System.Drawing.Size(336, 34);
            this.txtOrden.TabIndex = 2;
            // 
            // lEtiqueta
            // 
            this.lEtiqueta.AutoSize = true;
            this.lEtiqueta.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.lEtiqueta.Location = new System.Drawing.Point(60, 502);
            this.lEtiqueta.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lEtiqueta.Name = "lEtiqueta";
            this.lEtiqueta.Size = new System.Drawing.Size(263, 29);
            this.lEtiqueta.TabIndex = 0;
            this.lEtiqueta.Text = "0 elementos insertados";
            // 
            // lbNumeros
            // 
            this.lbNumeros.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F);
            this.lbNumeros.FormattingEnabled = true;
            this.lbNumeros.ItemHeight = 20;
            this.lbNumeros.Location = new System.Drawing.Point(45, 73);
            this.lbNumeros.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.lbNumeros.Name = "lbNumeros";
            this.lbNumeros.Size = new System.Drawing.Size(297, 404);
            this.lbNumeros.TabIndex = 3;
            // 
            // btnLimpiar
            // 
            this.btnLimpiar.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F);
            this.btnLimpiar.Location = new System.Drawing.Point(352, 438);
            this.btnLimpiar.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnLimpiar.Name = "btnLimpiar";
            this.btnLimpiar.Size = new System.Drawing.Size(172, 53);
            this.btnLimpiar.TabIndex = 4;
            this.btnLimpiar.Text = "Limpiar";
            this.btnLimpiar.UseVisualStyleBackColor = true;
            this.btnLimpiar.Click += new System.EventHandler(this.btnLimpiar_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1067, 554);
            this.Controls.Add(this.btnLimpiar);
            this.Controls.Add(this.lbNumeros);
            this.Controls.Add(this.txtOrden);
            this.Controls.Add(this.txtNumero);
            this.Controls.Add(this.cbMetodo);
            this.Controls.Add(this.lEtiqueta);
            this.Controls.Add(this.label1);
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "Form1";
            this.Text = "Ordenacion Directa";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ComboBox cbMetodo;
        private System.Windows.Forms.TextBox txtNumero;
        private System.Windows.Forms.TextBox txtOrden;
        private System.Windows.Forms.Label lEtiqueta;
        private System.Windows.Forms.ListBox lbNumeros;
        private System.Windows.Forms.Button btnLimpiar;
    }
}

