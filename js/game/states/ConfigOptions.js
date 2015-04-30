ZacEsquilo.ConfigOptions = function() {};

ZacEsquilo.ConfigOptions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";
    
    this.load.spritesheet('speedControl', 'assets/images/buttons/controle_velocidade.png', 256, 58, 2);
    this.load.spritesheet('soundControl', 'assets/images/buttons/som.png', 256, 58, 2);

  },

  create: function() {
    this.createText();

    // botoes
    ZacEsquilo.back = this.game.add.button(this.game.world.width - 10, this.game.world.height - 10, 'back', this.backToMenu, this, 1, 0);
    ZacEsquilo.back.anchor.setTo(1);

    this.speedControl = this.game.add.button(this.game.world.centerX, 150, 'speedControl', this.speedOptions, this, 1, 0);
    this.speedControl.anchor.setTo(0.5);

    this.soundControl = this.game.add.button(this.game.world.centerX, 250, 'soundControl', this.soundOptions, this, 1, 0);
    this.soundControl.anchor.setTo(0.5);

    // instanciando one switch manager para botoes de velocidade
    var oneSwitchOptions = new ZacEsquilo.OneSwitchManager([
      this.speedControl,
      this.soundControl,
      ZacEsquilo.back,
    ], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    oneSwitchOptions.start();    
    
  },

  createText: function() {
    this.fontStyleTitle = { font: "40px Revalia", fill: "#330033", align: "center"};
    this.fontStyleSubtitle = { font: "30px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(10, 20, "Opções", this.fontStyleTitle);
    ZacEsquilo.optionsTitle.anchor.setTo(0);

  },

  backToMenu: function(){ this.state.start('MainMenu'); },

  speedOptions: function(){ this.state.start('SpeedOptions'); },

  soundOptions: function(){ this.state.start('SoundOptions'); }
}
