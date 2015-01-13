ZacEsquilo.Scoreboard = function(){
  var score, scoreText, playAgainText;
};

ZacEsquilo.Scoreboard.prototype = {
  create: function(){
    this.game.stage.backgroundColor = "#eaeaea";
    this.createTexts();
  },

  createText: function(){
    ZacEsquilo.scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 20, "Pontos: ");
  }
}