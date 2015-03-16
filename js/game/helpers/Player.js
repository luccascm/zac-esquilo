ZacEsquilo.Player = function(tileX, tileY, speed, scale, spriteKey, game, enemiesGroup, friendsGroup, winnerTilesGroup){
  this.init(tileX, tileY, speed, scale, spriteKey, game);

  // outros params
  this.enemiesGroup = enemiesGroup;
  this.friendsGroup = friendsGroup;
  this.winnerTilesGroup = winnerTilesGroup;
  // this.physics.arcade.enable(player); // Enabling arcade physics on player sprite

  // Cria cursor para teclas direcionais automaticamente
  this.cursors = this.game.input.keyboard.createCursorKeys();

  // Camera will follow the player
  this.game.camera.follow(this.sprite);

  // this.game.physics.arcade.overlap(this.sprite, this.enemiesGroup, this.playerHit, null, this);
  // this.game.physics.arcade.overlap(this.sprite, this.friendsGroup, this.playerCarried, null, this);
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
  this.game.physics.arcade.overlap(this.sprite, this.enemiesGroup, this.playerHit, null, this);
  this.game.physics.arcade.overlap(this.sprite, this.friendsGroup, this.playerCarried, this.process, null, this);
  this.game.physics.arcade.overlap(this.sprite, this.winnerTilesGroup, this.winLevel, null, this);

},

ZacEsquilo.Player.prototype.playerHit = function(player, enemy){
  // todo: reset de vidas nao está certo
  console.log('player hit');
  this.sprite.kill();
  // -1 vida
  ZacEsquilo.config.playerLives = ZacEsquilo.config.playerLives - 1;
  console.log(ZacEsquilo.config.playerLives);
  if(ZacEsquilo.config.playerLives > 0)
    this.sprite.reset((this.initialtileX * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2), (this.initialtileY * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2))
  else{
    this.sprite.kill();
    this.game.state.start('MainMenu');
  }

  // if (ZacEsquilo.config.playerLives <= 0) {
  //   this.game.state.start("Scoreboard");
  //   ZacEsquilo.config.playerLives = 3;
  // }
},

ZacEsquilo.Player.prototype.playerCarried = function(player, friend){
  console.log('a');
  player.x -= friend.x;
  player.y -= friend.y;
  friend.addChild(player);
  player.tileX = friend.tileX;
  // se o friend tem o child nao chama mais. usar process
  // todo: Como saber com qual elemento do grupo teve o overlap - Ideia: Funcao foreach da classe tilemap
  // this.sprite.x = this.friendsGroup.get
},

ZacEsquilo.Player.prototype.process = function(player, friend){
  return player.parent != friend;
}

ZacEsquilo.Player.prototype.winLevel = function(player, winnerTile){
  console.log('reach winnerTile');
}

// if player.parent == friend
// if friend.childs.lengh > 0
//  return false;
// else
//   true
