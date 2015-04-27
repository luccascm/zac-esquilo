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
    this.move(this.direction);
  }

  // Reset sprite ao sair da tela
  if (this.sprite.x > this.game.world.width){
    if (this.direction == 'right'){ this.sprite.kill(); this.sprite.reset(0, (this.initialtileY * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2)); }
  }
  if (this.sprite.x < 0){
    if (this.direction == 'left'){ this.sprite.kill(); this.sprite.reset(this.game.world.width + this.sprite.width, (this.initialtileY * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2)); }
  }

  ZacEsquilo.Entity.prototype.update.call(this);
  // Funcao update para enemy
}
