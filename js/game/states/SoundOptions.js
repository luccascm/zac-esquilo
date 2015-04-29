ZacEsquilo.SoundOptions = function() {};

ZacEsquilo.SoundOptions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";

    this.load.spritesheet('music_on', 'assets/images/buttons/optionOn.png', 256, 58, 2);
    this.load.spritesheet('se_on', 'assets/images/buttons/optionOn.png', 256, 58, 2);

    this.load.spritesheet('music_off', 'assets/images/buttons/optionOff.png', 256, 58, 2);
    this.load.spritesheet('se_off', 'assets/images/buttons/optionOff.png', 256, 58, 2);
  },

  create: function() {
    var worldWidth = this.game.world.width;
    var halfWidth = this.game.world.width/2;
    var quarterWidth = this.game.world.width/4;

    this.createText();

    // botoes

    ZacEsquilo.back = this.game.add.button(worldWidth - 10, this.game.world.height - 10, 'back', this.backToMenu, this, 1, 0);
    ZacEsquilo.back.anchor.setTo(1);

    ZacEsquilo.musicOn = this.game.add.button(halfWidth + 64, 240, 'music_on', this.music_On, this, 1, 0);
    ZacEsquilo.musicOn.anchor.setTo(1, 0.5);
    ZacEsquilo.musicOff = this.game.add.button(halfWidth + quarterWidth, 240, 'music_off', this.music_Off, this, 1, 0);
    ZacEsquilo.musicOff.anchor.setTo(0.5);

    ZacEsquilo.soundEffectsOn = this.game.add.button(halfWidth + 64, 330, 'se_on', this.soundEffects_On, this, 1, 0);
    ZacEsquilo.soundEffectsOn.anchor.setTo(1, 0.5);
    ZacEsquilo.soundEffectsOff = this.game.add.button(halfWidth + quarterWidth, 330, 'se_off', this.soundEffects_Off, this, 1, 0);
    ZacEsquilo.soundEffectsOff.anchor.setTo(0.5);

    // instanciando one switch manager para musica
    ZacEsquilo.oneswitch_music = new ZacEsquilo.OneSwitchManager([ZacEsquilo.musicOn, ZacEsquilo.musicOff], ZacEsquilo.config.oneSwitchSpeed, this.game, true);
    ZacEsquilo.oneswitch_music.start();

    ZacEsquilo.oneswitch_soundEffects = new ZacEsquilo.OneSwitchManager([ZacEsquilo.soundEffectsOn, ZacEsquilo.soundEffectsOff], ZacEsquilo.config.oneSwitchSpeed, this.game, true);

    ZacEsquilo.oneswitchmanager_back = new ZacEsquilo.OneSwitchManager([ZacEsquilo.back], ZacEsquilo.config.oneSwitchSpeed, this.game);

  },

  createText: function() {
    this.fontStyleTitle = { font: "40px Revalia", fill: "#330033", align: "center"};
    this.fontStyleSubtitle = { font: "30px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(10, 20, "Som", this.fontStyleTitle);
    ZacEsquilo.optionsTitle.anchor.setTo(0);

    ZacEsquilo.soundText = this.game.add.text(20, 100, "Ajuste configurações de música e efeitos sonoros", this.fontStyleOptions);
    ZacEsquilo.soundText.anchor.setTo(0);
    ZacEsquilo.soundText.wordWrap = true;
    ZacEsquilo.soundText.wordWrapWidth = this.game.world.width - 20;


    // ZacEsquilo.soundeffectsText = this.game.add.text(this.game.world.centerX, 320, "Som", this.fontStyleSubtitle);
    // ZacEsquilo.soundeffectsText.anchor.setTo(0.5);

    ZacEsquilo.musicText = this.game.add.text(20, 240, "Música", this.fontStyleOptions);
    ZacEsquilo.musicText.anchor.setTo(0, 0.5);
    ZacEsquilo.musicText = this.game.add.text(20, 330, "Efeitos sonoros", this.fontStyleOptions);
    ZacEsquilo.musicText.anchor.setTo(0, 0.5);

  },

  backToMenu: function(){
    this.state.start('ConfigOptions');
  },

  music_On: function(){
    ZacEsquilo.config.music = true;
    ZacEsquilo.soundtrack.play();
    ZacEsquilo.oneswitch_music.stop();
    ZacEsquilo.oneswitch_soundEffects.start();
  },

  music_Off: function(){
    ZacEsquilo.config.music = false;
    ZacEsquilo.soundtrack.stop();
    ZacEsquilo.oneswitch_music.stop();
    ZacEsquilo.oneswitch_soundEffects.start();
  },

  soundeffects_On: function(){
    ZacEsquilo.config.soundEffects = true;
    ZacEsquilo.oneswitch_soundEffects.stop();
    ZacEsquilo.oneswitchmanager_back.start();
  },

  soundeffects_Off: function(){
    ZacEsquilo.config.soundEffects = false;
    ZacEsquilo.oneswitch_soundEffects.stop();
    ZacEsquilo.oneswitchmanager_back.start();
  }
}
