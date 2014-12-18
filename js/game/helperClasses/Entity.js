ZacEsquilo.Entity = function(tileX, tileY, speed, scale, spriteKey, game){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
}

ZacEsquilo.Entity.prototype = {
  init: function(tileX, tileY, speed, scale, spriteKey, game){
    this.tileX = tileX;
    this.tileY = tileY;
    this.speed = speed;
    this.scale = scale;
    this.sprite = game.add.sprite(tileX * 30, tileY * 30, spriteKey); // 30 = tileSize
    this.sprite.scale.x = this.sprite.scale.y = scale;
    this.sprite.anchor.setTo(0.5);
    this.ismoving = false;
    this.game = game;
  },

  move: function(direction){
    // Checar se pode movimentar nessa direcao (pode estar no final do cenario)
    // Se puder mover
    this.ismoving = true;
    // Calcular de acordo com a direction (case)
    // up
    switch(direction){
      case 'up':
        this.desiredTileX = this.tileX;
        this.desiredTileY = this.tileY - 1;
        this.desiredX = this.sprite.x;
        this.desiredY = this.sprite.y - 30;
    }

  },

  update: function(){
    if (this.ismoving){
      // Checar em qual direçao - comparar desiredTile com tile
      if (this.desiredTileY - this.tileY != 0){
        this.sprite.y += this.speed * (this.desiredTileY - this.tileY);
        if (this.sprite.y == this.desiredY){
          this.ismoving = false;
          this.tileY = this.desiredTileY;
        }
      }
      if (this.desiredTileX - this.tileX != 0){
        this.sprite.x += this.speed * (this.desiredTileX - this.tileX);
        if (this.sprite.x == this.desiredX){
          this.ismoving = false;
          this.tileX = this.desiredTileX;
        }
      }
    }
  }
}