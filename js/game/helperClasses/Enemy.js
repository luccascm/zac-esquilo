ZacEsquilo.Enemy = function(tileX, tileY, speed, scale, spriteKey, game){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
  // outros params
  // direction
  // animation
  // this.sprite.animations.add()
  // this.sprite.animations.play()
}

ZacEsquilo.Enemy.prototype = Object.create(ZacEsquilo.Entity.prototype);

ZacEsquilo.Enemy.prototype.update = function(){
  if(!this.ismoving){
    this.move('up'); //direction
  }
  ZacEsquilo.Entity.prototype.update.call(this);
  // Funcao update para enemy
}