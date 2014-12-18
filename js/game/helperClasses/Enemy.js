ZacEsquilo.Enemy = function(tileX, tileY, speed, scale, spriteKey, game, direction){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
  // outros params
  this.direction = direction;
  this.sprite.animations.add('mover')
  this.sprite.animations.play('mover', 5, true);
}

ZacEsquilo.Enemy.prototype = Object.create(ZacEsquilo.Entity.prototype);

ZacEsquilo.Enemy.prototype.update = function(){
  if(!this.ismoving){
    this.move(this.direction); //direction
  }
  if (this.x >= this.game.world.width){
    this.x = this.tileX;
  }
  if (this.x < 0){
    this.x = this.game.world.width + this.tileX;
  }

  ZacEsquilo.Entity.prototype.update.call(this);
  // Funcao update para enemy
}
