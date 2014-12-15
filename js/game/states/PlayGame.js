ZacEsquilo.PlayGame = function(){

};

ZacEsquilo.PlayGame.prototype = {
  create: function(){
    this.zac = this.add.sprite(this.game.world.centerX, 5, 'char');
    this.zac.scale.x = 0.5;
    this.zac.scale.y = 0.5;
    this.zac.anchor.setTo(0.5);
  }
};
