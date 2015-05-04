ZacEsquilo.GameModeOptions = function() {};

ZacEsquilo.GameModeOptions.prototype = {
  preload: function() { this.game.stage.backgroundColor = "#FFB631"; },

  create: function() {
    this.switch_on = this.game.add.button(this.game.world.centerX/2, 250, 'oneSwitchOn', this.oneSwitch_On, this, 1, 0);
    this.switch_off = this.game.add.button(this.game.world.centerX + this.game.world.centerX/2 , 250, 'oneSwitchOff', this.oneSwitch_Off, this, 1, 0);
    this.switch_on.anchor.setTo(0.5);
    this.switch_off.anchor.setTo(0.5);

    ZacEsquilo.back = this.game.add.button(this.game.world.width - 10, this.game.world.height - 10, 'back', this.backToMenu, this, 1, 0);
    ZacEsquilo.back.anchor.setTo(1);

    this.createText();

    if (ZacEsquilo.config.oneSwitchActive){
      ZacEsquilo.oneswitchmanager = new ZacEsquilo.OneSwitchManager([ this.switch_on, this.switch_off ], 2, this.game, true);
      ZacEsquilo.oneswitchmanager.start();
    }

    ZacEsquilo.oneswitchmanager_back = new ZacEsquilo.OneSwitchManager([ZacEsquilo.back], ZacEsquilo.config.oneSwitchSpeed, this.game, null);

  },

  createText: function() {
    this.fontStyleTitle = { font: "40px Revalia", fill: "#330033", align: "center"};
    this.fontStyleSubtitle = { font: "30px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(10, 20, "Modo de jogo", this.fontStyleTitle);
    ZacEsquilo.optionsTitle.anchor.setTo(0);

    ZacEsquilo.gameModeText = this.game.add.text(20, 100, "Escolha qual o modo de jogo desejado", this.fontStyleOptions);
    ZacEsquilo.gameModeText.anchor.setTo(0);
    ZacEsquilo.gameModeText.wordWrap = true;
    ZacEsquilo.gameModeText.wordWrapWidth = this.game.world.width - 20;

    this.activeMode = this.game.add.text(this.game.world.centerX - (this.game.world.centerX/2), 320, "Modo ativo:", this.fontStyleOptions);
    this.activeMode.anchor.setTo(0);
    this.activeModeOn = this.game.add.text(this.game.world.centerX - (this.game.world.centerX/2) + this.activeMode.width + 10 , 320, "", this.fontStyleOptions);
    this.activeModeOn.anchor.setTo(0);
    if (ZacEsquilo.config.oneSwitchActive) this.activeModeOn.text = "Tecla única (barra de espaço)";
    else this.activeModeOn.text = "Tradicional (setas direcionais)";

  },

  backToMenu: function(){ this.state.start('MainMenu'); },

  oneSwitch_Off: function(){
    this.activeModeOn.text = "Tradicional (setas direcionais)";
    ZacEsquilo.config.oneSwitchActive = false;
    this.switch_on.freezeFrames = false;
    this.switch_off.freezeFrames = false;
    ZacEsquilo.oneswitchmanager.stop();
  },

  oneSwitch_On: function(){
    this.activeModeOn.text = "Tecla única (barra de espaço)";
    ZacEsquilo.config.oneSwitchActive = true;
    ZacEsquilo.oneswitchmanager.stop();
    ZacEsquilo.oneswitchmanager_back.start();
  }
}
