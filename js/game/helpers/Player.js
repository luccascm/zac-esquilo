ZacEsquilo.Player = function(tileX, tileY, speed, scale, spriteKey, game, enemiesGroup, friendsGroup, winnerTilesGroup, waterGroup){
  this.init(tileX, tileY, speed, scale, spriteKey, game);

  // outros params
  this.sprite.body.moves = true;
  this.won = false;
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

  // sons
  this.frogger_hop = this.game.add.audio('frogger_hop', 1, false);
  this.frogger_run_down = this.game.add.audio('frogger_run_down', 1, false);
  this.frogger_drown = this.game.add.audio('frogger_drown', 1, false);
  this.frogger_win_game = this.game.add.audio('frogger_win_game', 1, false);

  this.restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);

  // this.game.physics.arcade.overlap(this.sprite, this.enemiesGroup, this.playerHit, null, this);
  // this.game.physics.arcade.overlap(this.sprite, this.friendsGroup, this.playerCarried, null, this);
  // CollideWorldBounds está fazendo o player travar quando vai pro limite do cenario. Porque?!?!?
  // this.sprite.body.collideWorldBounds = true;
};

ZacEsquilo.Player.prototype = Object.create(ZacEsquilo.Entity.prototype);

ZacEsquilo.Player.prototype.chooseKey = function(key){}

ZacEsquilo.Player.prototype.update = function(){
  if(!this.ismoving && !this.won){
    this.speed = ZacEsquilo.config.playerSpeed;

    if (this.cursors.up.isDown){
      this.frogger_hop.play();
      this.move('up');
    }
    if (this.cursors.right.isDown){
      this.frogger_hop.play();
      this.move('right');
    }
    if (this.cursors.down.isDown){
      this.frogger_hop.play();
      this.move('down');
    }
    if (this.cursors.left.isDown){
      this.frogger_hop.play();
      this.move('left');
    }
  }

  ZacEsquilo.Entity.prototype.update.call(this);
  this.game.physics.arcade.overlap(this.sprite, this.enemiesGroup, this.playerHit, null, this);
  this.game.physics.arcade.overlap(this.sprite, this.friendsGroup, this.playerCarried, this.process, this);
  this.game.physics.arcade.overlap(this.sprite, this.winnerTilesGroup, this.winLevel, null, this);
  this.game.physics.arcade.overlap(this.sprite, this.waterGroup, this.playerDrown, null, this);
};

ZacEsquilo.Player.prototype.playerHit = function(player, enemy){
  if(this.ismoving){ return; }
  else if ( !this.game.physics.arcade.overlap(this.sprite, this.friendsGroup) ){
    this.frogger_run_down.play();
    console.log('atropelado');
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
      this.game.state.start('Scoreboard');
    }
  }
};

ZacEsquilo.Player.prototype.resetSpeed = function(){
  this.speed = this.speed;
},

ZacEsquilo.Player.prototype.playerCarried = function(player, friend){
  player.isSafe = true;
  friend.entity.carry(player.entity);
};

ZacEsquilo.Player.prototype.playerDrown = function(player, friend){
  if(this.ismoving){ return; }
  else if ( !this.game.physics.arcade.overlap(this.sprite, this.friendsGroup) && !this.game.physics.arcade.overlap(this.sprite, this.winnerTilesGroup) ){
    this.frogger_drown.play();
    console.log('afogado');
    player.kill();

    // -1 vida
    ZacEsquilo.config.playerLives = ZacEsquilo.config.playerLives - 1;
    if(ZacEsquilo.config.playerLives > 0){
      player.reset((this.initialtileX * ZacEsquilo.config.tileSize), (this.initialtileY * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2));
      this.abortMovement();
    }
    else{
      this.game.state.start('Scoreboard');
    }
  }

};

ZacEsquilo.Player.prototype.winLevel = function(player, winnerTile){
  if (player.y == winnerTile.y){
    this.frogger_win_game.play();
    this.winScreen();
    // winnerTile.kill();
    return;
  }
  // this.game.state.start("Scoreboard");
}

ZacEsquilo.Player.prototype.winScreen = function(){
  this.game.physics.arcade.overlap(this.sprite, this.winnerTilesGroup, '', null, this);
  // this.game.pause();
  this.sprite.body.moves = true;
  this.sprite.body.immovable = true;
  this.won = true;
  console.log(this.sprite);
  console.log(this);
  
  this.restartKey.onDown.add(this.restartGame,this);

  this.fontStyle = { font: "40px Bubblegum Sans", fill: "#fff", align: "center"};
  this.scoreText = this.game.add.text(this.game.world.centerX, 100, "Parabéns! Você ajudou Zac a voltar para a floresta e venceu o jogo!", this.fontStyle);
  this.scoreText.anchor.setTo(0.5);
  this.scoreText.wordWrap = true;
  this.scoreText.wordWrapWidth = this.game.world.width - 30;

  this.playAgainText = this.game.add.text(this.game.world.centerX, 200, "Pressione espaço para jogar novamente", this.fontStyle);
  this.playAgainText.anchor.setTo(0.5);
  this.playAgainText.wordWrap = true;
  this.playAgainText.wordWrapWidth = this.game.world.width - 30;
  
  // this.game.paused = true;
}

ZacEsquilo.Player.prototype.restartGame = function(key){
  // this.game.paused = false;
  this.game.state.start('Boot');
}