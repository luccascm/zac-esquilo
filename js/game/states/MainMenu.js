ZacEsquilo.MainMenu = function(game){
  ZacEsquilo.menuTitleText = null;
  ZacEsquilo.forestBg = null ;
};

ZacEsquilo.MainMenu.prototype = {
  preload: function(){
    // this.game.stage.backgroundColor = "#FFB631";
    ZacEsquilo.forestBg = this.game.add.tileSprite(0, this.game.world.height - 602, this.game.width, this.game.world.height, 'forestBackground');

    this.background = ZacEsquilo.forestBg;

    this.background.autoScroll(-100, 0);
    this.preloadChar = this.add.sprite(30, this.game.world.height - 190, 'zacStart');

    this.load.spritesheet('playBtn', 'assets/images/play.png', 189, 58, 2);
    this.load.spritesheet('optionsBtn', 'assets/images/options.png', 189, 58, 2);
    this.load.spritesheet('instructionsBtn', 'assets/images/instructions.png', 189, 58, 2);
  },

  create: function(){
    this.game.stage.backgroundColor = '#2aacc1';
    this.preloadChar.scale.x = 0.5;
    this.preloadChar.scale.y = 0.5;
    this.createText();

    ZacEsquilo.playBtn = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 150, 'playBtn', this.startGame, this, 1, 0);
    ZacEsquilo.optionsBtn = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'optionsBtn', this.configOptions, this, 1, 0);
    ZacEsquilo.instructionsBtn = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 150, 'instructionsBtn', this.instructions, this, 1, 0);

    var oneswitchmanager = new ZacEsquilo.OneSwitchManager([
      ZacEsquilo.playBtn,
      ZacEsquilo.optionsBtn,
      ZacEsquilo.instructionsBtn
    ], 2, this.game);
    oneswitchmanager.start();
  },

  createText: function(){
    ZacEsquilo.menuTitleText = this.game.add.text(this.game.world.centerX + 70, 50, "MENU PRINCIPAL");
    ZacEsquilo.menuTitleText.anchor.setTo(0.5);

    ZacEsquilo.menuTitleText.font = 'Revalia';
    ZacEsquilo.menuTitleText.fontSize = 60;

    //  x0, y0 - x1, y1
    grd = ZacEsquilo.menuTitleText.context.createLinearGradient(0, 0, 0, ZacEsquilo.menuTitleText.canvas.height);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');
    ZacEsquilo.menuTitleText.fill = grd;

    ZacEsquilo.menuTitleText.align = 'center';
    ZacEsquilo.menuTitleText.stroke = '#000000';
    ZacEsquilo.menuTitleText.strokeThickness = 2;
    ZacEsquilo.menuTitleText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    ZacEsquilo.menuTitleText.inputEnabled = true;
    ZacEsquilo.menuTitleText.input.enableDrag();
    ZacEsquilo.switchText.wordWrap = true;
    ZacEsquilo.switchText.wordWrapWidth = window.innerWidth - 20;
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
