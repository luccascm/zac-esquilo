ZacEsquilo.Entity = function(tileX, tileY, speed, scale, spriteKey, game){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
}

ZacEsquilo.Entity.prototype = {
  init: function(tileX, tileY, speed, scale, spriteKey, game){
    this.tileX = tileX;
    this.tileY = tileY;
    this.speed = speed;
    this.scale = scale;
    this.game = game;
    frame = 0;
    // Phaser.Sprite.call(this, game, (tileX * ZacEsquilo.config.tileSize) - ZacEsquilo.config.tileSize / 2, (tileY * ZacEsquilo.config.tileSize) - ZacEsquilo.config.tileSize / 2, spriteKey, frame);
    this.sprite = game.add.sprite((tileX * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2), (tileY * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2), spriteKey);
    this.sprite.scale.setTo(scale);
    this.sprite.anchor.setTo(0.5);
    this.ismoving = false;
    this.game.physics.arcade.enableBody(this.sprite);
    this.sprite.body.allowGravity = false;
  },

  move: function(direction){
    // Checar se pode movimentar nessa direcao (pode estar no final do cenario)
    // Se puder mover
    this.ismoving = true;
    switch(direction){
      case 'up':
        this.desiredTileX = this.tileX;
        this.desiredTileY = this.tileY - 1;
        this.desiredX = this.sprite.x;
        this.desiredY = this.sprite.y - ZacEsquilo.config.tileSize;
        break;

      case 'down':
        this.desiredTileX = this.tileX;
        this.desiredTileY = this.tileY + 1;
        this.desiredX = this.sprite.x;
        this.desiredY = this.sprite.y + ZacEsquilo.config.tileSize;
        break;

      case 'left':
        this.desiredTileX = this.tileX - 1;
        this.desiredTileY = this.tileY;
        this.desiredX = this.sprite.x - ZacEsquilo.config.tileSize;
        this.desiredY = this.sprite.y;
        break;

      case 'right':
        this.desiredTileX = this.tileX + 1;
        this.desiredTileY = this.tileY;
        this.desiredX = this.sprite.x + ZacEsquilo.config.tileSize;
        this.desiredY = this.sprite.y;
        break;

      default:
        alert('Use as teclas das setas direcionais para movimentar o personagem');
        break;
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
