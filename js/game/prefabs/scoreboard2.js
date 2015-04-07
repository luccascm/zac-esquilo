ZacEsquilo.Scoreboard2 = function(game){
  Phaser.Group.call(this, game);
}

ZacEsquilo.Scoreboard2.prototype = Object.create(Phaser.Group.prototype);
ZacEsquilo.Scoreboard2.prototype.constructor = ZacEsquilo.Scoreboard2;

ZacEsquilo.Scoreboard2.prototype.show = function(){
  var bmd, background, scoreText, playAgainText;

  bmd = this.game.add.bitmapData(this.game.width, this.game.height);
  bmd.ctx.fillStyle = '#000';  
  bmd.ctx.fillRec(0, 0, this.game.width, this.game.height);

  background = this.game.add.sprite(0, 0, bmd);
  background.alpha = 0.5;

  this.add(background);

  this.y = this.game.height;

  this.fontStyle = { font: "40px Bubblegum Sans", fill: "#fff", align: "center"};
  scoreText = this.game.add.text(this.game.world.centerX, 100, "Parabéns! Você ajudou Zac a voltar para a floresta e venceu o jogo!", this.fontStyle);
  scoreText.anchor.setTo(0.5);
  scoreText.wordWrap = true;
  scoreText.wordWrapWidth = this.game.world.width - 30;

  playAgainText = this.game.add.text(this.game.world.centerX, 200, "Pressione espaço para jogar novamente", this.fontStyle);
  playAgainText.anchor.setTo(0.5);
  playAgainText.wordWrap = true;
  playAgainText.wordWrapWidth = this.game.world.width - 30;

  this.add(scoreText);
  this.add(playAgainText);


  this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);

  this.restartKey.onDown.addOnce(this.restartGame,this);


};

ZacEsquilo.Scoreboard2.prototype.restartGame = function(){
  this.game.state.start('Boot', true, false);
};