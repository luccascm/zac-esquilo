ZacEsquilo.ConfigOptions = function() {};

ZacEsquilo.ConfigOptions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";
  },

  create: function() {
    this.createText();
  },

  createText: function() {
    this.fontStyleTitle = { font: "40px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(20, 60, "OPÇÕES", this.fontStyleTitle);
    ZacEsquilo.menuTitleText.anchor.setTo(0.5);

    ZacEsquilo.speedText = this.game.add.text(this.game.world.centerX, 150, "CONTROLE DE VELOCIDADE", this.fontStyleOptions);
    ZacEsquilo.speedText.anchor.setTo(0.5);
  }
}