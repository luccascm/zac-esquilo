ZacEsquilo.Entity = function(tileX, tileY, speed, scale, spriteKey, game){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
}

ZacEsquilo.Entity.prototype = {
  init: function(tileX, tileY, speed, scale, spriteKey, game){
    this.tileX = tileX;
    this.tileY = tileY;
    this.speed = speed;
    this.scale = scale;
    this.initialtileX = tileX;
    this.initialtileY = tileY;
    this.game = game;
    frame = 0;
    // Phaser.Sprite.call(this, game, (tileX * ZacEsquilo.config.tileSize) - ZacEsquilo.config.tileSize / 2, (tileY * ZacEsquilo.config.tileSize) - ZacEsquilo.config.tileSize / 2, spriteKey, frame);
    this.sprite = game.add.sprite((tileX * ZacEsquilo.config.tileSize), (tileY * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2), spriteKey);
    // this.sprite = game.add.sprite((tileX * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2), (tileY * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2), spriteKey);
    this.sprite.scale.setTo(scale);
    this.sprite.anchor.setTo(0.5);

    if (ZacEsquilo.config.oneSwitchActive === false) { this.cursors = this.game.input.keyboard.createCursorKeys(); }
    else{
      this.game.input.keyboard.addKeyCapture(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);
      this.key = this.game.input.keyboard.addKey(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);
    }

    this.ismoving = false;

    this.game.physics.arcade.enable(this.sprite); // Enabling arcade physics on player sprite
    this.game.physics.arcade.enableBody(this.sprite);
    this.sprite.body.allowGravity = false;
    this.sprite.entity = this;
  },

  abortMovement: function(){
    console.log('para ae doidao!');
    this.ismoving = false;
  },

  move: function(direction){
    // Checar se pode movimentar nessa direcao (pode estar no final do cenario)
    // Se puder mover
    if(this.ismoving || this.won){ return; }
    this.ismoving = true;
    switch(direction){
      case 'up':
        this.desiredTileX = this.tileX;
        this.desiredTileY = this.tileY - 1;
        this.desiredX = this.sprite.x;
        this.desiredY = this.sprite.y - ZacEsquilo.config.tileSize;
        // this.movePlayer(0,-1);
        break;

      case 'down':
        this.desiredTileX = this.tileX;
        this.desiredTileY = this.tileY + 1;
        this.desiredX = this.sprite.x;
        this.desiredY = this.sprite.y + ZacEsquilo.config.tileSize;
        // this.movePlayer(0,1);
        break;

      case 'left':
        this.desiredTileX = this.tileX - 1;
        this.desiredTileY = this.tileY;
        this.desiredX = this.sprite.x - ZacEsquilo.config.tileSize;
        this.desiredY = this.sprite.y;
        // this.movePlayer(-1,0);
        break;

      case 'right':
        this.desiredTileX = this.tileX + 1;
        this.desiredTileY = this.tileY;
        this.desiredX = this.sprite.x + ZacEsquilo.config.tileSize;
        this.desiredY = this.sprite.y;
        // this.movePlayer(1,0);
        break;

      default:
        alert('Use as teclas das setas direcionais para movimentar o personagem');
        break;
    }

  },

  update: function(){
    var incrementX,
        incrementY,
        exceededRight,
        exceededLeft;

    if (this.ismoving){
      // Checar em qual direçao - comparar desiredTile com tile
      if (this.desiredTileY - this.tileY != 0){
        incrementY = this.speed * (this.desiredTileY - this.tileY);
        this.sprite.y += incrementY;
        if (this.sprite.y == this.desiredY){
          this.ismoving = false;
          this.tileY = this.desiredTileY;
        }
      }
      if (this.desiredTileX - this.tileX != 0){
        // quantas unidades andar para a direita (se positivo) ou para esquerda
        // (se negativo)
        incrementX = this.speed * (this.desiredTileX - this.tileX);

        // se a entity está à direita de onde deseja ir
        exceededRight = this.sprite.x >= this.desiredX;

        // se a entity está à esquerda de onde deseja ir
        exceededLeft = this.sprite.x <= this.desiredX;

        // movimenta para a direita ou esquerda
        this.sprite.x += incrementX;

        // se está indo para direita E já passou da hora de parar
        //  OU está indo para esquerda E já passou da hora de parar
        if ((incrementX > 0 && exceededRight) ||
            (incrementX < 0 && exceededLeft)) {
          // interrompe o movimento
          this.ismoving = false;
          this.tileX = this.desiredTileX;
        }
      }
    }
  },

  hasEnemyUp: function(player, enemiesGroup){
    for (var i = 0; i < enemiesGroup.length; i++){
      enemy = enemiesGroup.children[i];
      if (enemy.y == player.y - 50){
        if ( enemy.x <= player.x + 50 && enemy.x > player.x - 50) {
          console.log('ex: '+enemy.x);
          console.log('px: '+player.x);
          return true;
        }
        else{
          return false;
        }
      }
    }
      // console.log(enemiesGroup.children[i]);
  }
}
