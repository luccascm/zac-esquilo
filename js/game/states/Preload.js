ZacEsquilo.Preload = function() {
  this.ready = false;
};

ZacEsquilo.Preload.prototype = {
  preload: function() {
    // Barra preload + splash logo
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'logo');
    this.splash.anchor.setTo(0.5);
    this.splash.scale.x = 1.5;
    this.splash.scale.y = 1.5;

    this.preload_bar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.preload_bar.anchor.setTo(0.5);

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.preload_bar);

    // Imagem do personagem para introdução
    this.zac_intro = this.add.sprite(this.game.world.centerX, 210, 'zacStart');
    this.zac_intro.anchor.setTo(0.5);
    this.zac_intro.scale.x = 0.4;
    this.zac_intro.scale.y = 0.4;

    // Imagem com nome do jogo
    this.game_name = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 195, 'gameName')
    this.game_name.anchor.setTo(0.5);

    // Imagem de fundo do menu inicial
    this.load.image('forestBackground', 'assets/images/credits/forest-bg-small.png');
    this.load.image('menu-bg', 'assets/images/credits/capa_small.jpg');
    this.load.image('win-bg', 'assets/images/credits/vitoria_small.jpg');

    // Imagem (sprite) do personagem
    // #TODO: Alterar imagem para spritesheet
    this.load.image('char', 'assets/images/sprites/player/esquilo.png');
    this.game.load.spritesheet('zac-sprite', 'assets/images/sprites/player/zac_spritesheet2.png', 50, 50, 5);

    //  37x45 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load

    // Enemies (cars)
    // Params: key, path, width, height, num of frames
    this.load.image('truck', 'assets/images/sprites/enemies/truck.png');
    this.load.image('mini_car', 'assets/images/sprites/enemies/mini_car.png');
    this.load.image('conversivel', 'assets/images/sprites/enemies/conversivel.png');
    this.load.image('mini_truck2', 'assets/images/sprites/enemies/mini_truck2.png');

    // Friends ( wood & nuts )
    this.load.image('log1', 'assets/images/sprites/friends/log1.png');
    this.load.image('log2', 'assets/images/sprites/friends/log2.png');

    // Cria textos e define parametros iniciais da animação de carregamento
    this.createText();
    ZacEsquilo.credits_text.alpha = 0;
    this.splash.alpha = 0;
    this.game_name.alpha = 0;
    this.zac_intro.alpha = 0;
  },

  create: function() {
    this.preload_bar.cropEnabled = false;


    // Time animations (fade in/out)
    // Fade in: Texto de créditos + splash logo + preload bar
    this.game.time.events.add(20, function() {
      this.game.add.tween(this.splash).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(ZacEsquilo.credits_text).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(this.preload_bar).to( { alpha: 0 }, 900, Phaser.Easing.Linear.None, true);
    }, this);

    // // Fade out: Texto de créditos + splash logo + preload bar
    this.game.time.events.add(1200, function() {
      this.game.add.tween(this.splash).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(ZacEsquilo.credits_text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    }, this);

    // // Fade in: Nome do jogo + Imagem personagem intro
    this.game.time.events.add(2020, function() {
      this.game.add.tween(this.zac_intro).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(this.game_name).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    }, this);

    // // Fade out: Nome do jogo + Imagem personagem intro
    this.game.time.events.add(5020, function() {
      this.game.add.tween(this.zac_intro).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(this.game_name).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    }, this);

    // Inicia estado 'PreMenu'
    if (!this.game.device.desktop){ this.game.time.events.add(6500, function() { ZacEsquilo.config.oneSwitchActive = false; this.state.start('MainMenu'); }, this); }
    else this.game.time.events.add(6500, function() { this.state.start('PreMenu'); }, this);

  },

  update: function() {
  },

  createText: function() {
    ZacEsquilo.credits_text = null;

    this.fontStyle = { font: "40px Bubblegum Sans", fill: "#330033", align: "center"};
    this.fontStyle2 = { font: "40px Sigmar One", fill: "#330033", align: "center"};

    ZacEsquilo.credits_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 55, "Lucas Cardoso Medeiros \n apresenta", this.fontStyle2 );

    ZacEsquilo.credits_text.anchor.setTo(0.5);
  },
};
