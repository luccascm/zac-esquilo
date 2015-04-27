ZacEsquilo.MainMenu = function(game){
  ZacEsquilo.menu_title_text = null;
  ZacEsquilo.menu_bg = null ;
};

ZacEsquilo.MainMenu.prototype = {
  preload: function(){
    // this.game.stage.backgroundColor = "#FFB631";
    // Define imagem de fundo para menu inicial
    ZacEsquilo.menu_bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'menu-bg');

    this.background = ZacEsquilo.menu_bg;

    // Botões de opções do menu
    this.load.spritesheet('playBtn', 'assets/images/buttons/play.png', 189, 58, 2);
    this.load.spritesheet('optionsBtn', 'assets/images/buttons/options.png', 189, 58, 2);
    this.load.spritesheet('instructionsBtn', 'assets/images/buttons/instructions.png', 189, 58, 2);
    this.load.spritesheet('creditsBtn', 'assets/images/buttons/credits.png', 189, 58, 2);
  },

  create: function(){

    // Cria texto "MENU INICIAL"
    this.createText();

    ZacEsquilo.play_btn = this.game.add.button(this.game.world.centerX, 120, 'playBtn', this.startGame, this, 1, 0);
    ZacEsquilo.options_btn = this.game.add.button(this.game.world.centerX, 210, 'optionsBtn', this.configOptions, this, 1, 0);
    ZacEsquilo.instructions_btn = this.game.add.button(this.game.world.centerX, 300, 'instructionsBtn', this.instructions, this, 1, 0);
    ZacEsquilo.credits_btn = this.game.add.button(this.game.world.centerX, 390, 'creditsBtn', this.credits, this, 1, 0);

    ZacEsquilo.play_btn.anchor.setTo(0.5, 0);
    ZacEsquilo.options_btn.anchor.setTo(0.5, 0);
    ZacEsquilo.instructions_btn.anchor.setTo(0.5, 0);
    ZacEsquilo.credits_btn.anchor.setTo(0.5, 0);

    if(ZacEsquilo.config.oneSwitchActive === true){
      var oneswitchmanager = new ZacEsquilo.OneSwitchManager([
        ZacEsquilo.play_btn,
        ZacEsquilo.options_btn,
        ZacEsquilo.instructions_btn,
        ZacEsquilo.credits_btn,
      ], ZacEsquilo.config.oneSwitchSpeed, this.game);
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
  },

  credits: function() {
    this.state.start('Credits');
  }
};
