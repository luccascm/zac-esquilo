ZacEsquilo.Friend = function(tileX, tileY, speed, scale, spriteKey, game, direction){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
  // outros params
  this.direction = direction;
  this.sprite.animations.add('mover')
  this.sprite.animations.play('mover', 5, true);
}

ZacEsquilo.Friend.prototype = Object.create(ZacEsquilo.Entity.prototype);

ZacEsquilo.Friend.prototype.update = function(){
  if(!this.ismoving){
    this.move(this.direction); //direction
  }
  if (this.sprite.x >= this.game.world.width){
    this.sprite.x = this.tileX;
  }
  if (this.sprite.x < 0){
    this.sprite.x = this.game.world.width + this.tileX;
  }

  ZacEsquilo.Entity.prototype.update.call(this);
  // Funcao update para Friend
}
