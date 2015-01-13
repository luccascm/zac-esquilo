ZacEsquilo.Player = function(tileX, tileY, speed, scale, spriteKey, game, enemiesGroup, friendsGroup){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
  
  // outros params
  this.enemiesGroup = enemiesGroup;
  // this.physics.arcade.enable(player); // Enabling arcade physics on player sprite
  
  // Cria cursor para teclas direcionais automaticamente
  this.cursors = this.game.input.keyboard.createCursorKeys();

  // Camera will follow the player
  this.game.camera.follow(this.sprite);

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
  this.game.physics.arcade.overlap(this.sprite, this.friendsGroup, this.playerCarried, null, this);
},

ZacEsquilo.Player.prototype.playerHit = function(){
  // todo: reset de vidas nao está certo
  console.log('player hit');
  this.sprite.kill();
  // -1 vida
  ZacEsquilo.config.playerLives = ZacEsquilo.config.playerLives - 1;
  // todo: Player nao 'renasce' na posicao original
  // this.sprite.reset(this.game.math.snapToFloor(this.game.world.centerX, ZacEsquilo.config.tileSize) / ZacEsquilo.config.tileSize, 10 );
  this.sprite.revive();
  
  if (ZacEsquilo.config.playerLives <= 0) {
    this.game.state.start("Scoreboard");
    ZacEsquilo.config.playerLives = 3;
  }
},

ZacEsquilo.Player.prototype.playerCarried = function(){
  // todo: Como saber com qual elemento do grupo teve o overlap - Ideia: Funcao foreach da classe tilemap
  // this.sprite.x = this.friendsGroup.get 
}
