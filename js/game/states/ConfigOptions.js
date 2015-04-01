ZacEsquilo.ConfigOptions = function() {};

ZacEsquilo.ConfigOptions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";
  },

  create: function() {
    this.createText();

    ZacEsquilo.back = this.game.add.button(this.game.world.width - 10, this.game.world.height - 10, 'back', this.backToMenu, this, 1, 0);
    ZacEsquilo.back.anchor.setTo(1);
    ZacEsquilo.controlKeysText = this.game.add.button(this.game.world.centerX, 250, "control_keys", this.configKeys, this, 1, 0 );
    ZacEsquilo.controlKeysText.anchor.setTo(0.5);

    // instanciar um oneswitchmanager
    var oneswitchmanager = new ZacEsquilo.OneSwitchManager([
      ZacEsquilo.back,
      ZacEsquilo.controlKeysText,
    ], 2, this.game);
    oneswitchmanager.start();
  },

  createText: function() {
    this.fontStyleTitle = { font: "40px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(10, 30, "Opções", this.fontStyleTitle);
    ZacEsquilo.optionsTitle.anchor.setTo(0);

    ZacEsquilo.speedText = this.game.add.text(this.game.world.centerX, 120, "Controle de velocidade", this.fontStyleOptions);
    ZacEsquilo.speedText.anchor.setTo(0.5);

    
  },

  backToMenu: function(){
    this.state.start('MainMenu');
  }
}
