ZacEsquilo.GameOver = function(game) { this.scoreText = null; };

ZacEsquilo.GameOver.prototype = {
  preload: function(){
    this.restartKey = this.input.keyboard.addKey(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);
    if (!this.game.device.desktop){ this.load.spritesheet('mobile_button', 'assets/images/buttons/button-round-a.png', 64, 64, 2); }

  },

  create: function(){
    this.tela_gameover = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'forestBackground');
    this.tela_gameover.anchor.setTo(0.5, 0);
    this.game.add.tween(this.tela_gameover).to( { y: 0 }, 2000, Phaser.Easing.Linear.None, true);

    this.preload_char = this.add.sprite(30, this.game.world.height - 190, 'zacStart');
    this.preload_char.scale = 0.4;

    this.createText();

    this.restartKey.onDown.add(this.restartGame,this);

    if (!this.game.device.desktop){
      ZacEsquilo.mobile_button = this.game.add.button(this.game.world.centerX , this.game.world.height - 20, 'mobile_button', this.restartGame, this, 2, 1, 0);
      ZacEsquilo.mobile_button.fixedToCamera = true;
      ZacEsquilo.mobile_button.anchor.setTo(1);
    }

  },

  createText: function(){
    this.fontStyle = { font: "60px Bubblegum Sans", fill: "#fff", align: "center"};
    this.fontStyle_small = { font: "30px Bubblegum Sans", fill: "#fff", align: "center"};
    this.scoreText = this.game.add.text(this.game.world.centerX, 100, "Game Over!!", this.fontStyle);
    this.scoreText.anchor.setTo(0.5);
    this.scoreText.wordWrap = true;
    this.scoreText.wordWrapWidth = this.game.world.width - 30;

    if (!this.game.device.desktop){
      this.playAgainText = this.game.add.text(this.game.world.centerX, 200, "Pressione o botão A para voltar ao menu principal", this.fontStyle_small);
    }
    else{
      this.playAgainText = this.game.add.text(this.game.world.centerX, 200, "Pressione espaço para voltar ao menu principal", this.fontStyle_small);
    }
    this.playAgainText.anchor.setTo(0.5);
    this.playAgainText.wordWrap = true;
    this.playAgainText.wordWrapWidth = this.game.world.width - 30;

  },

  update: function(){

  },

  restartGame: function(key){
    this.game.state.start('Boot');
  }

}