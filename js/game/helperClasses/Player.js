ZacEsquilo.Player = function(tileX, tileY, speed, scale, spriteKey, game, enemiesGroup){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
  
  // outros params
  this.enemiesGroup = enemiesGroup;
  // this.physics.arcade.enable(player); // Enabling arcade physics on player sprite
  
  // Cria cursor para teclas direcionais automaticamente
  this.cursors = this.game.input.keyboard.createCursorKeys();

  // Camera will follow the player
  this.game.camera.follow(this.sprite);

  // this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

  // CollideWorldBounds está fazendo o player travar quando vai pro limite do cenario. Porque?!?!?
  // this.sprite.body.collideWorldBounds = true;
}

ZacEsquilo.Player.prototype = Object.create(ZacEsquilo.Entity.prototype);

ZacEsquilo.Player.prototype.chooseKey = function(key){}

ZacEsquilo.Player.prototype.update = function(){
  if(!this.ismoving){
    if (this.cursors.up.isDown){
      this.move('up');
    }
    if (this.cursors.right.isDown){
      this.move('right');
    }
    if (this.cursors.down.isDown){
      this.move('down');
    }
    if (this.cursors.left.isDown){
      this.move('left');
    }
  }
  ZacEsquilo.Entity.prototype.update.call(this);
  // this.game.physics.arcade.collide(this.sprite, this.enemiesGroup, this.playerHit, null, this);
  this.game.physics.arcade.overlap(this.sprite, this.enemiesGroup, this.playerHit, null, this);
},

ZacEsquilo.Player.prototype.playerHit = function(){
  console.log('player hit');
  this.sprite.kill();
}
