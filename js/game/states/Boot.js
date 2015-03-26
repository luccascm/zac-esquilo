var ZacEsquilo = function() {};

ZacEsquilo.config = {
  oneSwitchKey: "SPACEBAR",
  oneSwitchActive: true,
  tileSize: 50,
  playerLives: 3,
  playerSpeed: 5
};

ZacEsquilo.Boot = function() {};

ZacEsquilo.Boot.prototype = {
  preload: function() {
    this.game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    this.load.image('logo', 'assets/images/credits/logo-lcm-small.png');
    this.load.image('preloadBar', 'assets/images/credits/preloader-bar.png');
    this.load.image('gameName', 'assets/images/credits/Zac-IntroText.png');
    
    this.load.image('zacStart', 'assets/images/sprites/player/zacStart.gif');

    this.load.spritesheet('back', 'assets/images/buttons/voltar.png', 189, 58, 2);
  },

  create: function(){
    this.game.stage.backgroundColor = '#FFB631';

    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    // this.input.maxPointers = 1;

    if (this.game.device.desktop) {
      //  If you have any desktop specific settings, they can go in here
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    } else {
      //  Same goes for mobile settings.
      //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 750;
      this.scale.minHeight = 500;
      this.scale.maxWidth = 2048;
      this.scale.maxHeight = 1536;
      // this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.setScreenSize(true);
    }

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // this.game.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
    //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //  So now let's start the real preloader going
    this.state.start('Preloader');
  }
};
