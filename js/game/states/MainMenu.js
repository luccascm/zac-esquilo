ZacEsquilo.MainMenu = function(game){
  ZacEsquilo.menuTitleText = null;
  ZacEsquilo.forestBg = null ;
};

ZacEsquilo.MainMenu.prototype = {
  preload: function(){
    // this.game.stage.backgroundColor = "#FFB631";
    ZacEsquilo.forestBg = this.game.add.tileSprite(0, 0, this.game.width, this.game.world.height, 'forestBackground');
    this.background = ZacEsquilo.forestBg;

    // this.background.height = this.game.height;
    this.background.autoScroll(-100, 0);
    this.preloadChar = this.add.sprite(30, 30, 'zacStart');
  },

  create: function(){
    this.preloadChar.scale.x = 0.5;
    this.preloadChar.scale.y = 0.50;
    this.createText();
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
  }
};