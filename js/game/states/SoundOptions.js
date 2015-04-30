ZacEsquilo.SoundOptions = function() {
  
};

ZacEsquilo.SoundOptions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";

    this.load.spritesheet('optionOn', 'assets/images/buttons/optionOn.png', 256, 58, 2);
    this.load.spritesheet('optionOff', 'assets/images/buttons/optionOff.png', 256, 58, 2);
  },

  create: function() {
    var worldWidth = this.game.world.width;
    var halfWidth = this.game.world.width/2;
    var quarterWidth = this.game.world.width/4;

    this.createText();

    // botoes

    ZacEsquilo.back = this.game.add.button(worldWidth - 10, this.game.world.height - 10, 'back', this.backToMenu, this, 1, 0);
    ZacEsquilo.back.anchor.setTo(1);
        
    this.musicOn = this.game.add.button(halfWidth, 370, 'optionOn', this.music_On, this, 1, 0);
    this.musicOn.anchor.setTo(1, 0.5);
    this.musicOff = this.game.add.button(halfWidth + quarterWidth, 370, 'optionOff', this.music_Off, this, 1, 0);
    this.musicOff.anchor.setTo(0.5);
    
    this.soundEffectsOn = this.game.add.button(halfWidth, 430, 'optionOn', this.soundEffects_On, this, 1, 0);
    this.soundEffectsOn.anchor.setTo(1, 0.5);
    this.soundEffectsOff = this.game.add.button(halfWidth + quarterWidth, 430, 'optionOff', this.soundEffects_Off, this, 1, 0);
    this.soundEffectsOff.anchor.setTo(0.5);

    // instanciando one switch manager para botoes de velocidade
    // var oneswitchSpeed = new ZacEsquilo.OneSwitchManager([
    //   this.speed1Btn,
    //   this.speed2Btn,
    //   this.speed3Btn,
    // ], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    // oneswitchSpeed.start();    
    
  },

  createText: function() {
    this.fontStyleTitle = { font: "40px Revalia", fill: "#330033", align: "center"};
    this.fontStyleSubtitle = { font: "30px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(10, 20, "Som", this.fontStyleTitle);
    ZacEsquilo.optionsTitle.anchor.setTo(0);

    ZacEsquilo.speedText = this.game.add.text(this.game.world.centerX, 100, "Ajuste configurações de música e efeitos sonoros", this.fontStyleSubtitle);
    ZacEsquilo.speedText.anchor.setTo(0.5);

    
    // ZacEsquilo.soundeffectsText = this.game.add.text(this.game.world.centerX, 320, "Som", this.fontStyleSubtitle);
    // ZacEsquilo.soundeffectsText.anchor.setTo(0.5);
    
    // ZacEsquilo.musicText = this.game.add.text(20, 380, "Música", this.fontStyleOptions);
    // ZacEsquilo.musicText.anchor.setTo(0, 0.5);
    // ZacEsquilo.musicText = this.game.add.text(20, 440, "Efeitos sonoros", this.fontStyleOptions);
    // ZacEsquilo.musicText.anchor.setTo(0, 0.5);

  },

  backToMenu: function(){
    this.state.start('MainMenu');
  },

  music_On: function(){
    ZacEsquilo.config.music = true;
  },

  music_Off: function(){
    ZacEsquilo.soundtrack.stop();
  },

  soundeffects_On: function(){
    ZacEsquilo.config.soundEffects = true;
  },

  soundeffects_Off: function(){
    ZacEsquilo.config.soundEffects = false;
  }
}
