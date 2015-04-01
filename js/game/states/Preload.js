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
    this.zac_intro = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'zacStart');
    this.zac_intro.anchor.setTo(0.5);
    this.zac_intro.scale.x = 0.7;
    this.zac_intro.scale.y = 0.7;

    // Imagem com nome do jogo
    this.game_name = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'gameName')
    this.game_name.anchor.setTo(0.5);

    // Imagem de fundo do menu inicial
    this.load.image('forestBackground', 'assets/images/credits/forest-bg-small.png');

    // Imagem (sprite) do personagem
    // #TODO: Alterar imagem para spritesheet
    this.load.image('char', 'assets/images/sprites/player/esquilo.png');

    // Enemies (cars)
    // #TODO: Transformar imagem em spritesheet
    // Params: key, path, width, height, num of frames
    this.load.image('blue_car', 'assets/images/sprites/enemies/blue_car.png');
    this.load.image('black_viper', 'assets/images/sprites/enemies/black_viper.png');
    this.load.image('mini_truck', 'assets/images/sprites/enemies/mini_truck.png');

    // Friends ( wood & nuts )
    this.load.image('log', 'assets/images/sprites/friends/log100.png');

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
    // this.game.time.events.add(20, function() {
    //   this.game.add.tween(this.splash).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    //   this.game.add.tween(ZacEsquilo.credits_text).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    //   this.game.add.tween(this.preload_bar).to( { alpha: 0 }, 900, Phaser.Easing.Linear.None, true);
    // }, this);

    // // Fade out: Texto de créditos + splash logo + preload bar
    // this.game.time.events.add(1200, function() {
    //   this.game.add.tween(this.splash).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    //   this.game.add.tween(ZacEsquilo.credits_text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    // }, this);

    // // Fade in: Nome do jogo + Imagem personagem intro
    // this.game.time.events.add(2020, function() {
    //   this.game.add.tween(this.zac_intro).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    //   this.game.add.tween(this.game_name).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    // }, this);

    // // Fade out: Nome do jogo + Imagem personagem intro
    // this.game.time.events.add(3020, function() {
    //   this.game.add.tween(this.zac_intro).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    //   this.game.add.tween(this.game_name).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    // }, this);

    // Inicia estado 'PreMenu'
    this.game.time.events.add(1025, function() { this.state.start('PreMenu'); }, this);

  },

  update: function() {
  },

  createText: function() {
    ZacEsquilo.credits_text = null;

    this.fontStyle = { font: "40px Bubblegum Sans", fill: "#330033", align: "center"};
    this.fontStyle2 = { font: "40px Sigmar One", fill: "#330033", align: "center"};

    ZacEsquilo.credits_text = this.game.add.text(
                                this.game.world.centerX,
                                this.game.world.centerY + 55,
                                "Lucas Cardoso Medeiros \n\n apresenta",
                                this.fontStyle2
                              );
    
    ZacEsquilo.credits_text.anchor.setTo(0.5);
  },
};
