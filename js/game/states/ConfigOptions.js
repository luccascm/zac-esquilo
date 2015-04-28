ZacEsquilo.ConfigOptions = function() {
  
};

ZacEsquilo.ConfigOptions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";
    this.load.spritesheet('speed1', 'assets/images/buttons/speed1.png', 256, 58, 2);
    this.load.spritesheet('speed2', 'assets/images/buttons/speed2.png', 256, 58, 2);
    this.load.spritesheet('speed3', 'assets/images/buttons/speed3.png', 256, 58, 2);

    this.load.spritesheet('optionOn', 'assets/images/buttons/optionOn.png', 256, 58, 2);
    this.load.spritesheet('optionOff', 'assets/images/buttons/optionOff.png', 256, 58, 2);

    this.load.spritesheet('speedIndicator', 'assets/images/buttons/speedIndicator.png', 35, 35, 2);
  },

  create: function() {
    var worldWidth = this.game.world.width;
    var halfWidth = this.game.world.width/2;
    var quarterWidth = this.game.world.width/4;

    this.createText();

    ZacEsquilo.back = this.game.add.button(worldWidth - 10, this.game.world.height - 10, 'back', this.backToMenu, this, 1, 0);
    ZacEsquilo.back.anchor.setTo(1);

    this.speed1Btn = this.game.add.button(quarterWidth - 90, 130, 'speed1', this.setSpeed1, this, 1, 0);
    this.speed1Btn.anchor.setTo(0.5, 0);
    this.speed2Btn = this.game.add.button(halfWidth, 130, 'speed2', this.setSpeed2, this, 1, 0);
    this.speed2Btn.anchor.setTo(0.5, 0);
    this.speed3Btn = this.game.add.button(worldWidth - quarterWidth + 90, 130, 'speed3', this.setSpeed3, this, 1, 0);
    this.speed3Btn.anchor.setTo(0.5, 0);

    this.speedIndicator11 = this.game.add.button(quarterWidth - 90, 200, 'speedIndicator', this.speed1, this, 1, 0);
    this.speedIndicator21 = this.game.add.button(quarterWidth - 90, 250, 'speedIndicator', this.speed1, this, 1, 0);
    this.speedIndicator12 = this.game.add.button(halfWidth, 200, 'speedIndicator', this.speed2, this, 1, 0);
    this.speedIndicator22 = this.game.add.button(halfWidth, 250, 'speedIndicator', this.speed2, this, 1, 0);
    this.speedIndicator13 = this.game.add.button(worldWidth - quarterWidth + 90, 200, 'speedIndicator', this.speed3, this, 1, 0);
    this.speedIndicator23 = this.game.add.button(worldWidth - quarterWidth + 90, 250, 'speedIndicator', this.speed3, this, 1, 0);
    
    this.musicOn = this.game.add.button(halfWidth, 370, 'optionOn', this.music_On, this, 1, 0);
    this.musicOn.anchor.setTo(1, 0.5);
    this.musicOff = this.game.add.button(halfWidth + quarterWidth, 370, 'optionOff', this.music_Off, this, 1, 0);
    this.musicOff.anchor.setTo(0.5);
    
    this.soundEffectsOn = this.game.add.button(halfWidth, 430, 'optionOn', this.soundEffects_On, this, 1, 0);
    this.soundEffectsOn.anchor.setTo(1, 0.5);
    this.soundEffectsOff = this.game.add.button(halfWidth + quarterWidth, 430, 'optionOff', this.soundEffects_Off, this, 1, 0);
    this.soundEffectsOff.anchor.setTo(0.5);

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
    var oneswitchSpeed = new ZacEsquilo.OneSwitchManager([
      this.speed1Btn,
      this.speed2Btn,
      this.speed3Btn,
    ], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    oneswitchSpeed.start();    
    
  },

  createText: function() {
    this.fontStyleTitle = { font: "40px Revalia", fill: "#330033", align: "center"};
    this.fontStyleSubtitle = { font: "30px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(10, 20, "Opções", this.fontStyleTitle);
    ZacEsquilo.optionsTitle.anchor.setTo(0);

    ZacEsquilo.speedText = this.game.add.text(this.game.world.centerX, 100, "Controle de velocidade", this.fontStyleSubtitle);
    ZacEsquilo.speedText.anchor.setTo(0.5);

    
    ZacEsquilo.soundeffectsText = this.game.add.text(this.game.world.centerX, 320, "Som", this.fontStyleSubtitle);
    ZacEsquilo.soundeffectsText.anchor.setTo(0.5);
    
    ZacEsquilo.musicText = this.game.add.text(20, 380, "Música", this.fontStyleOptions);
    ZacEsquilo.musicText.anchor.setTo(0, 0.5);
    ZacEsquilo.musicText = this.game.add.text(20, 440, "Efeitos sonoros", this.fontStyleOptions);
    ZacEsquilo.musicText.anchor.setTo(0, 0.5);

  },

  backToMenu: function(){
    this.state.start('MainMenu');
  },

  setSpeed1: function(){
    ZacEsquilo.config.oneSwitchSpeed = 1;
    // instanciando one switch manager para musica on/off
    this.oneSwitchMusic = new ZacEsquilo.OneSwitchManager([this.musicOn, this.musicOff], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    this.oneSwitchMusic.start();
    this.oneswitchSpeed.stop();
  },
  
  setSpeed2: function(){
    ZacEsquilo.config.oneSwitchSpeed = 2;
    // instanciando one switch manager para musica on/off
    this.oneSwitchMusic = new ZacEsquilo.OneSwitchManager([this.musicOn, this.musicOff], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    this.oneSwitchMusic.start();
    this.oneswitchSpeed.stop();
  },
  
  setSpeed3: function(){
    ZacEsquilo.config.oneSwitchSpeed = 3;
    // instanciando one switch manager para musica on/off
    this.oneSwitchMusic = new ZacEsquilo.OneSwitchManager([this.musicOn, this.musicOff], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    this.oneSwitchMusic.start();
    this.oneswitchSpeed.stop();
  },

  music_On: function(){
    ZacEsquilo.config.music = true;
    ZacEsquilo.soundtrack.play();
    this.oneSwitchMusic.stop();
    this.oneSwitchSoundEffects = new ZacEsquilo.OneSwitchManager([this.soundEffectsOn, this.soundEffectsOff], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    this.oneSwitchSoundEffects.start();
  },

  music_Off: function(){
    ZacEsquilo.soundtrack.stop();
    ZacEsquilo.config.music = false;
    this.oneSwitchMusic.stop();
    this.oneSwitchSoundEffects = new ZacEsquilo.OneSwitchManager([this.soundEffectsOn, this.soundEffectsOff], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    this.oneSwitchSoundEffects.start();
  },

  soundeffects_On: function(){
    ZacEsquilo.config.soundEffects = true;
    // instanciando one switch manager para botao voltar
    this.oneSwitchSoundEffects.stop();
    this.oneswitchmanager = new ZacEsquilo.OneSwitchManager([ZacEsquilo.back], ZacEsquilo.config.oneSwitchSpeed, this.game);
    this.oneswitchmanager.start();
  },

  soundeffects_Off: function(){
    ZacEsquilo.config.soundEffects = false;
    // instanciando one switch manager para botao voltar
    this.oneSwitchSoundEffects.stop();
    this.oneswitchmanager = new ZacEsquilo.OneSwitchManager([ZacEsquilo.back], ZacEsquilo.config.oneSwitchSpeed, this.game);
    this.oneswitchmanager.start();
  }
}
