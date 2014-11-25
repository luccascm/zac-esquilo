ZacEsquilo.PreMenu = function() {};

ZacEsquilo.PreMenu.prototype = {
  preload: function(){
    this.load.spritesheet('oneSwitchOn', 'assets/images/accessible-mode-on.png', 188, 59, 2);
    this.load.spritesheet('oneSwitchOff', 'assets/images/accessible-mode-off.png', 188, 59, 2);
  },

  create: function(){
    var switchOn = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'oneSwitchOn');
    var switchOff = this.game.add.sprite(this.game.world.centerX , this.game.world.centerY, 'oneSwitchOff');

    // this.switchOn.animations.add('over');
    // this.switchOn.animations.play('over', 20, true);

    this.createText();
  },

  createText: function() {
    ZacEsquilo.switchText = null;

    // this.fontStyle = { font: "20px Arial", fill: "#330033", align: "center"};
    this.fontStyle = { font: "25px Sigmar One", fill: "#330033", align: "center"};

    var switchQuestion = "O modo de jogo acessível (One Switch) está ativado. \n Pressione a barra de espaço para \n selecionar a opção desejada. "

    ZacEsquilo.switchText = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2, switchQuestion, this.fontStyle);
    ZacEsquilo.switchText.anchor.setTo(0.5);
  }
};