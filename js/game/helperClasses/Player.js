ZacEsquilo.Player = function(tileX, tileY, speed, scale, spriteKey, game){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
  // outros params
  this.cursors = this.game.input.keyboard.createCursorKeys();
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
  this.game.physics.arcade.overlap(this, ZacEsquilo.Entity.prototype, this.playerHit, null, this);
  ZacEsquilo.Entity.prototype.update.call(this);
},

ZacEsquilo.Player.prototype.playerHit = function(){
  console.log('player hit');
}