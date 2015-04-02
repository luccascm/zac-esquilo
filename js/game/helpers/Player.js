ZacEsquilo.Player = function(tileX, tileY, speed, scale, spriteKey, game, enemiesGroup, friendsGroup, winnerTilesGroup, waterGroup){
  this.init(tileX, tileY, speed, scale, spriteKey, game);

  // outros params
  this.enemiesGroup = enemiesGroup;
  this.friendsGroup = friendsGroup;
  this.winnerTilesGroup = winnerTilesGroup;
  this.waterGroup = waterGroup;
  // this.physics.arcade.enable(player); // Enabling arcade physics on player sprite

  // // Cria cursor para teclas direcionais automaticamente
  // this.cursors = this.game.input.keyboard.createCursorKeys();

  // Camera will follow the player
  this.game.camera.follow(this.sprite);
  this.isSafe = false;

  // this.game.physics.arcade.overlap(this.sprite, this.enemiesGroup, this.playerHit, null, this);
  // this.game.physics.arcade.overlap(this.sprite, this.friendsGroup, this.playerCarried, null, this);
  // CollideWorldBounds está fazendo o player travar quando vai pro limite do cenario. Porque?!?!?
  // this.sprite.body.collideWorldBounds = true;
};

ZacEsquilo.Player.prototype = Object.create(ZacEsquilo.Entity.prototype);

ZacEsquilo.Player.prototype.chooseKey = function(key){}

ZacEsquilo.Player.prototype.update = function(){
  if(!this.ismoving){
    this.speed = ZacEsquilo.config.playerSpeed;

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
  this.game.physics.arcade.overlap(this.sprite, this.friendsGroup, this.playerCarried, this.process, this);
  this.game.physics.arcade.overlap(this.sprite, this.winnerTilesGroup, this.winLevel, null, this);
  this.game.physics.arcade.overlap(this.sprite, this.waterGroup, this.playerHit, null, this);
};

ZacEsquilo.Player.prototype.playerHit = function(player, enemy){
  if(this.ismoving){ return; }
  else if ( !this.game.physics.arcade.overlap(this.sprite, this.friendsGroup) ){
    console.log('morreu');
    player.kill();
    // Animação de morte suavizada
    // this.game.time.events.add(20, function() {
    //   this.game.add.tween(player).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    // }, this);

    // -1 vida
    ZacEsquilo.config.playerLives = ZacEsquilo.config.playerLives - 1;
    if(ZacEsquilo.config.playerLives > 0){
      // Animação de reset suavizada
      player.reset((this.initialtileX * ZacEsquilo.config.tileSize), (this.initialtileY * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2));
      // this.game.time.events.add(20, function() {
      //   this.game.add.tween(player).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
      // }, this);
      this.abortMovement();
    }
    else{
      // player.kill();
      this.game.state.start('MainMenu');
    }
  }

  else{
    console.log('ufa!');
    // this.abortMovement();
  }

};

ZacEsquilo.Player.prototype.resetSpeed = function(){
  this.speed = this.speed;
},

ZacEsquilo.Player.prototype.playerCarried = function(player, friend){
  player.isSafe = true;
  // console.log('carregado');

  friend.entity.carry(player.entity);

};

ZacEsquilo.Player.prototype.playerDrown = function(player, friend){
  if( !this.game.physics.arcade.overlap(this.sprite, this.friendsGroup) )
    console.log('a');
  if (player.isSafe )
    console.log('b');

};

ZacEsquilo.Player.prototype.winLevel = function(player, winnerTile){
  console.log('reach winnerTile');
  this.game.state.start("Scoreboard");
}