ZacEsquilo.SpeedOptions = function() {};

ZacEsquilo.SpeedOptions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";
    this.load.spritesheet('speed1', 'assets/images/buttons/speed1.png', 256, 58, 2);
    this.load.spritesheet('speed2', 'assets/images/buttons/speed2.png', 256, 58, 2);
    this.load.spritesheet('speed3', 'assets/images/buttons/speed3.png', 256, 58, 2);

    this.load.spritesheet('speedControl', 'assets/images/buttons/controle_velocidade.png', 256, 58, 2);

    this.load.spritesheet('speedIndicator', 'assets/images/buttons/speedIndicator.png', 35, 35, 2);
  },

  create: function() {
    var worldWidth = this.game.world.width;
    var halfWidth = this.game.world.width/2;
    var quarterWidth = this.game.world.width/4;

    this.createText();

    // botoes

    ZacEsquilo.back = this.game.add.button(worldWidth - 10, this.game.world.height - 10, 'back', this.backToMenu, this, 1, 0);
    ZacEsquilo.back.anchor.setTo(1);

    this.speed1Btn = this.game.add.button(quarterWidth - 64, 150, 'speed1', this.setSpeed1, this, 1, 0);
    this.speed1Btn.anchor.setTo(0.5, 0);
    this.speed2Btn = this.game.add.button(quarterWidth - 64, 240, 'speed2', this.setSpeed2, this, 1, 0);
    this.speed2Btn.anchor.setTo(0.5, 0);
    this.speed3Btn = this.game.add.button(quarterWidth - 64, 330, 'speed3', this.setSpeed3, this, 1, 0);
    this.speed3Btn.anchor.setTo(0.5, 0);

    this.speedIndicator11 = this.game.add.button(halfWidth, 150, 'speedIndicator', this.speed1, this, 1, 0);
    this.speedIndicator21 = this.game.add.button(halfWidth + 60, 150, 'speedIndicator', this.speed1, this, 1, 0);

    this.speedIndicator12 = this.game.add.button(halfWidth, 240, 'speedIndicator', this.speed2, this, 1, 0);
    this.speedIndicator22 = this.game.add.button(halfWidth +60, 240, 'speedIndicator', this.speed2, this, 1, 0);

    this.speedIndicator13 = this.game.add.button(halfWidth, 330, 'speedIndicator', this.speed3, this, 1, 0);
    this.speedIndicator23 = this.game.add.button(halfWidth + 60, 330, 'speedIndicator', this.speed3, this, 1, 0);

    // instanciando one switch manager para speed1
    var oneSwitchSpeed1 = new ZacEsquilo.OneSwitchManager([this.speedIndicator11, this.speedIndicator21], 1, this.game, false);
    oneSwitchSpeed1.start();
    // instanciando one switch manager para speed2
    var oneSwitchSpeed2 = new ZacEsquilo.OneSwitchManager([this.speedIndicator12, this.speedIndicator22], 2, this.game, false);
    oneSwitchSpeed2.start();
    // instanciando one switch manager para speed3
    var oneSwitchSpeed3 = new ZacEsquilo.OneSwitchManager([this.speedIndicator13, this.speedIndicator23], 3, this.game, false);
    oneSwitchSpeed3.start();

    // instanciando one switch manager para botoes de velocidade
    ZacEsquilo.oneswitchSpeed = new ZacEsquilo.OneSwitchManager([
      this.speed1Btn,
      this.speed2Btn,
      this.speed3Btn,
    ], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    ZacEsquilo.oneswitchSpeed.start();

    ZacEsquilo.oneswitchmanager_back = new ZacEsquilo.OneSwitchManager([ZacEsquilo.back], ZacEsquilo.config.oneSwitchSpeed, this.game);

  },

  createText: function() {
    this.fontStyleTitle = { font: "40px Revalia", fill: "#330033", align: "center"};
    this.fontStyleSubtitle = { font: "30px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(10, 20, "Controle de velocidade", this.fontStyleTitle);
    ZacEsquilo.optionsTitle.anchor.setTo(0);

    ZacEsquilo.speedText = this.game.add.text(20, 100, "Escolha o tempo de alternância de seleção dos botões", this.fontStyleOptions);
    ZacEsquilo.speedText.anchor.setTo(0);
    ZacEsquilo.speedText.wordWrap = true;
    ZacEsquilo.speedText.wordWrapWidth = this.game.world.width - 20;

  },

  backToMenu: function(){
    this.state.start('ConfigOptions');
  },

  setSpeed1: function(){
    ZacEsquilo.config.oneSwitchSpeed = 1;
    ZacEsquilo.oneswitchSpeed.stop();
    ZacEsquilo.oneswitchmanager_back.start();
  },

  setSpeed2: function(){
    ZacEsquilo.config.oneSwitchSpeed = 2;
    ZacEsquilo.oneswitchSpeed.stop();
    ZacEsquilo.oneswitchmanager_back.start();
  },

  setSpeed3: function(){
    ZacEsquilo.config.oneSwitchSpeed = 3;
    ZacEsquilo.oneswitchSpeed.stop();
    ZacEsquilo.oneswitchmanager_back.start();
  }
}
