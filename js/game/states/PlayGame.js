ZacEsquilo.PlayGame = function(){

};

ZacEsquilo.PlayGame.prototype = {
  create: function(){
    this.zac = this.add.sprite(this.game.world.centerX, this.game.world, 'char');
    this.zac.scale.x = 0.3;
    this.zac.scale.y = 0.3;
    this.zac.anchor.setTo(0.5);
  }
};
