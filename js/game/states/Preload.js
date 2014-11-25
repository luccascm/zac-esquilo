ZacEsquilo.Preload = function() {
  this.ready = false;
};

ZacEsquilo.Preload.prototype = {
  preload: function() {
    // Splash screen and preload bar
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    // Zac image for loading and menu
    this.zacStart = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'zacStart');
    this.zacStart.anchor.setTo(0.5);

    // TODO: Create text and tween opacity (time animation)

    // Loading assets needed for the game
    // this.load.image('ground', 'assets/images/ground.png');
    // this.load.image('background', 'assets/images/background.png');
    // this.load.image('foreground', 'assets/images/foreground.png');
    //
    // this.load.spritesheet('coins', 'assets/images/coins-ps.png', 51, 51, 7);
    // this.load.spritesheet('player', 'assets/images/jetpack-ps.png', 229, 296, 4);
    // this.load.spritesheet('missile', 'assets/images/missiles-ps.png', 361, 218, 4);
    //
    // this.load.audio('gameMusic', ['assets/audio/Pamgaea.mp3', 'assets/audio/Pamgaea.ogg']);
    // this.load.audio('rocket', 'assets/audio/rocket.wav');
    // this.load.audio('bounce', 'assets/audio/bounce.wav');
    // this.load.audio('coin', 'assets/audio/coin.wav');
    // this.load.audio('death', 'assets/audio/death.wav');

    this.createText();

    this.load.onLoadComplete.add(this.onLoadComplete, this);
  },

  create: function() {
    ZacEsquilo.creditsText.alpha = 0;
    this.splash.alpha = 0;
    ZacEsquilo.gameName.alpha = 0;
    this.zacStart.alpha = 0;
    this.preloadBar.cropEnabled = false;

    // Time animations (fade in/out)
    // Credits text and logo fade in
    this.game.time.events.add(200, function() {
      this.game.add.tween(this.splash).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(ZacEsquilo.creditsText).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(this.preloadBar).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
    }, this);

    // Credits text and logo fade out
    this.game.time.events.add(2200, function() {
      this.game.add.tween(this.splash).to( { alpha: 0 }, 1200, Phaser.Easing.Linear.None, true);
      this.game.add.tween(ZacEsquilo.creditsText).to( { alpha: 0 }, 1200, Phaser.Easing.Linear.None, true);
    }, this);

    // Char and game name fade in
    this.game.time.events.add(4400, function() {
      this.game.add.tween(this.zacStart).to( { alpha: 1 }, 1200, Phaser.Easing.Linear.None, true);
      this.game.add.tween(ZacEsquilo.gameName).to( { alpha: 1 }, 1200, Phaser.Easing.Linear.None, true);
    }, this);

    // Char and game name fade out
    this.game.time.events.add(7000, function() {
      this.game.add.tween(this.zacStart).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
      this.game.add.tween(ZacEsquilo.gameName).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
    }, this);

    this.game.time.events.add(8600, function() { this.onLoadComplete(); }, this);
  },

  update: function() {
    // if(this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
    //   this.state.start('MainMenu');
    // }
    if (this.ready == true){
      this.state.start('PreMenu');
    }
  },

  createText: function() {
    ZacEsquilo.creditsText = null;
    ZacEsquilo.gameName = null;
    
    this.fontStyle = { font: "40px Sigmar One", fill: "#330033", align: "center"};
    this.fontStyle2 = { font: "40px Wellfleet", fill: "#330033", align: "center"};
    
    ZacEsquilo.creditsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 55, "Lucas Cardoso Medeiros \n\n apresenta", this.fontStyle);
    ZacEsquilo.creditsText.anchor.setTo(0.5);
    
    ZacEsquilo.gameName = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 105, "Zac - O esquilo", this.fontStyle);
    ZacEsquilo.gameName.anchor.setTo(0.5);

  },

  onLoadComplete: function() {
    this.ready = true;
  }
};
