ZacEsquilo.ConfigOptions = function() {};

ZacEsquilo.ConfigOptions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";
  },

  create: function() {
    this.createText();

    ZacEsquilo.back = this.game.add.button(window.innerWidth - 289, window.innerHeight - 100, 'back', this.backToMenu, this, 1, 0);

    // instanciar um oneswitchmanager
    var oneswitchmanager = new ZacEsquilo.OneSwitchManager([
      ZacEsquilo.back,
    ], 2, this.game);
    oneswitchmanager.start();
  },

  createText: function() {
    this.fontStyleTitle = { font: "40px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(20, 60, "Opções", this.fontStyleTitle);
    ZacEsquilo.menuTitleText.anchor.setTo(0.5);

    ZacEsquilo.speedText = this.game.add.text(this.game.world.centerX, 150, "Controle de velocidade", this.fontStyleOptions);
    ZacEsquilo.speedText.anchor.setTo(0.5);
  },

  backToMenu: function(){
    this.state.start('MainMenu');
  }
}
