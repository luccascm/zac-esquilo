ZacEsquilo.MainMenu = function(game){
  ZacEsquilo.menu_title_text = null;
  ZacEsquilo.menu_bg = null ;
};

ZacEsquilo.MainMenu.prototype = {
  preload: function(){
    // this.game.stage.backgroundColor = "#FFB631";
    // Define imagem de fundo para menu inicial
    ZacEsquilo.menu_bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'menu-bg');
    // ZacEsquilo.menu_bg.scale.x = 0.3;
    // ZacEsquilo.menu_bg.scale.y = 0.3;

    this.background = ZacEsquilo.menu_bg;
    // Auto scroll da imagem de fundo do menu (para a esquerda)
    // this.background.autoScroll(-100, 0);
    
    // Imagem de introdução do personagem
    // this.preload_char = this.add.sprite(30, this.game.world.height - 190, 'zacStart');

    // Botões de opções do menu
    this.load.spritesheet('playBtn', 'assets/images/buttons/play.png', 189, 58, 2);
    this.load.spritesheet('optionsBtn', 'assets/images/buttons/options.png', 189, 58, 2);
    this.load.spritesheet('instructionsBtn', 'assets/images/buttons/instructions.png', 189, 58, 2);
  },

  create: function(){
    // 
    // this.game.stage.backgroundColor = '#2aacc1';
    // this.preload_char.scale.x = 0.5;
    // this.preload_char.scale.y = 0.5;
    
    // Cria texto "MENU INICIAL"
    this.createText();

    ZacEsquilo.play_btn = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 70, 'playBtn', this.startGame, this, 1, 0);
    ZacEsquilo.options_btn = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'optionsBtn', this.configOptions, this, 1, 0);
    ZacEsquilo.instructions_btn = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 70, 'instructionsBtn', this.instructions, this, 1, 0);

    if(ZacEsquilo.config.oneSwitchActive === true){
      var oneswitchmanager = new ZacEsquilo.OneSwitchManager([
        ZacEsquilo.play_btn,
        ZacEsquilo.options_btn,
        ZacEsquilo.instructions_btn
      ], 2, this.game);
      oneswitchmanager.start();
    }
  },

  createText: function(){
    ZacEsquilo.menu_title_text = this.game.add.text(this.game.world.centerX, 50, "MENU PRINCIPAL");
    ZacEsquilo.menu_title_text.anchor.setTo(0.5);

    ZacEsquilo.menu_title_text.font = 'Revalia';
    ZacEsquilo.menu_title_text.fontSize = 45;

    //  x0, y0 - x1, y1
    grd = ZacEsquilo.menu_title_text.context.createLinearGradient(0, 0, 0, ZacEsquilo.menu_title_text.canvas.height);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');
    ZacEsquilo.menu_title_text.fill = grd;

    ZacEsquilo.menu_title_text.align = 'center';
    ZacEsquilo.menu_title_text.stroke = '#000000';
    ZacEsquilo.menu_title_text.strokeThickness = 3;
    ZacEsquilo.menu_title_text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    // ZacEsquilo.menu_title_text.inputEnabled = true;
    // ZacEsquilo.menu_title_text.input.enableDrag();
    // ZacEsquilo.switch_text.wordWrap = true;
    // ZacEsquilo.switch_text.wordWrapWidth = window.innerWidth - 20;
  },

  over: function() {
    console.log('button over');
  },

  out: function() {
    console.log('button out');
  },

  startGame: function() {
    this.state.start('PlayGame');
  },

  configOptions: function() {
    this.state.start('ConfigOptions');
  },

  instructions: function() {
    this.state.start('Instructions');
  }
};
