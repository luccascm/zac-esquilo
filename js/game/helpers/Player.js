ZacEsquilo.Player = function(tileX, tileY, speed, scale, spriteKey, game, enemiesGroup, friendsGroup, winnerTilesGroup, waterGroup){
  this.init(tileX, tileY, speed, scale, spriteKey, game);

  // outros params
  this.sprite.body.moves = true;
  this.sprite.enableBody = true;
  this.sprite.body.collideWorldBounds = true;
  this.sprite.animations.add('walk-left', [0,3,3,3,3,0]);
  this.sprite.animations.add('walk-right', [0,1,1,1,1,0]);
  this.sprite.animations.add('walk-up', [0,2,2,2,2,0]);
  this.sprite.animations.add('walk-down', [0,2,2,2,0]);
  ZacEsquilo.config.won = false;
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
  if(ZacEsquilo.config.soundEffect){
    this.frogger_hop = this.game.add.audio('frogger_hop', 1, false);
    this.frogger_run_down = this.game.add.audio('frogger_run_down', 1, false);
    this.frogger_drown = this.game.add.audio('frogger_drown', 1, false);
    this.frogger_win_game = this.game.add.audio('frogger_win_game', 1, false);
  }

  this.restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);
  this.movePlayerKey = this.game.input.keyboard.addKey(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);

  // this.game.physics.arcade.overlap(this.sprite, this.enemiesGroup, this.playerHit, null, this);
  // this.game.physics.arcade.overlap(this.sprite, this.friendsGroup, this.playerCarried, null, this);
  // CollideWorldBounds está fazendo o player travar quando vai pro limite do cenario. Porque?!?!?
  // this.sprite.body.collideWorldBounds = true;
};

ZacEsquilo.Player.prototype = Object.create(ZacEsquilo.Entity.prototype);

ZacEsquilo.Player.prototype.chooseKey = function(key){}

ZacEsquilo.Player.prototype.update = function(){
  if(!this.ismoving && !ZacEsquilo.config.won){
    this.speed = ZacEsquilo.config.playerSpeed;

    if (ZacEsquilo.config.oneSwitchActive === false){
      if (this.cursors.up.isDown){
        if(ZacEsquilo.config.soundEffect){ this.frogger_hop.play(); }
        this.sprite.animations.play('walk-up', 15, false);
        this.move('up');
      }
      if (this.cursors.right.isDown){
        if(ZacEsquilo.config.soundEffect){ this.frogger_hop.play(); }
        this.sprite.animations.play('walk-right', 15, false);
        this.move('right');
      }
      if (this.cursors.down.isDown){
        if(ZacEsquilo.config.soundEffect){ this.frogger_hop.play(); }
        this.sprite.animations.play('walk-down', 15, false);
        this.move('down');
      }
      if (this.cursors.left.isDown){
        if(ZacEsquilo.config.soundEffect){ this.frogger_hop.play(); }
        this.sprite.animations.play('walk-left', 15, false);
        this.move('left');
      }
    }

    else{
      this.key.onDown.add(this.oneSwitchMove, this);
      // if (this.movePlayerKey.isDown){
      //   for (e in this.enemiesGroup){
      //     console.log('ex: '+ e);
      //   }
      // }
    }
  }

  ZacEsquilo.Entity.prototype.update.call(this);
  this.game.physics.arcade.overlap(this.sprite, this.enemiesGroup, this.playerHit, null, this);
  this.game.physics.arcade.overlap(this.sprite, this.friendsGroup, this.playerCarried, this.process, this);
  this.game.physics.arcade.overlap(this.sprite, this.winnerTilesGroup, this.winLevel, null, this);
  this.game.physics.arcade.overlap(this.sprite, this.waterGroup, this.playerDrown, null, this);
};


// ZacEsquilo.Player.prototype.oneSwitchMove = function(player, enemiesGroup){
//   for (e in enemiesGroup){
//     console.log('ex: '+e.x);
//   }
//   this.move('up');
// }

ZacEsquilo.Player.prototype.oneSwitchMove = function(){
  console.log( this.hasEnemyUp(this.sprite, this.enemiesGroup) );
  console.log( this.hasFriendUp(this.sprite, this.friendsGroup) );
  this.move(this.autoMove(this.sprite, this.enemiesGroup, this.friendsGroup, this.waterGroup));

  // ok para inimigos
  // if( this.hasEnemyUp(this.sprite, this.enemiesGroup) && Math.floor(this.sprite.entity.tileX) > 1 )
  //   this.move('left');
  // else if ( Math.floor(this.sprite.entity.tileX) <= 1)
  //   this.move('right');
  // else
  //   this.move('up');

};

ZacEsquilo.Player.prototype.playerHit = function(player, enemy){
  if(this.ismoving){ return; }
  else if ( !this.game.physics.arcade.overlap(this.sprite, this.friendsGroup) ){
    if(ZacEsquilo.config.soundEffect){ this.frogger_run_down.play(); }
    console.log('atropelado');
    player.kill();
    this.resetTileCoordinates();

    // Animação de morte suavizada
    // this.game.time.events.add(20, function() {
    //   this.game.add.tween(player).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    // }, this);


    // -1 vida
    if (ZacEsquilo.config.playerLives == 3){ ZacEsquilo.life3.kill(); this.resetTileCoordinates(); }
    if (ZacEsquilo.config.playerLives == 2){ ZacEsquilo.life2.kill(); this.resetTileCoordinates(); }
    if (ZacEsquilo.config.playerLives == 1){ ZacEsquilo.life1.kill(); this.resetTileCoordinates(); }
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
      this.gameOverScreen();
      // this.game.state.start('GameOver');
    }
  }
};

ZacEsquilo.Player.prototype.playerCarried = function(player, friend){
  player.isSafe = true;
  friend.entity.carry(player.entity);
};

ZacEsquilo.Player.prototype.playerDrown = function(player, friend){
  if(this.ismoving){ return; }
  else if ( !this.game.physics.arcade.overlap(this.sprite, this.friendsGroup) && !this.game.physics.arcade.overlap(this.sprite, this.winnerTilesGroup) ){
    if(ZacEsquilo.config.soundEffect){ this.frogger_drown.play(); }
    console.log('afogado');
    player.kill();
    this.resetTileCoordinates();

    // -1 vida
    ZacEsquilo.config.playerLives = ZacEsquilo.config.playerLives - 1;
    if(ZacEsquilo.config.playerLives > 0){
      player.reset((this.initialtileX * ZacEsquilo.config.tileSize), (this.initialtileY * ZacEsquilo.config.tileSize) - (ZacEsquilo.config.tileSize / 2));
      this.abortMovement();
    }
    else{
      // this.game.state.start('GameOver');
      this.gameOverScreen();
    }
  }

};

ZacEsquilo.Player.prototype.winLevel = function(player, winnerTile){
  // scoreboard.show(this.score)
  if (player.y == winnerTile.y){
    if(ZacEsquilo.config.soundEffect){ this.frogger_win_game.play(); }
    // var scoreboard = new ZacEsquilo.Scoreboard2(this.game);
    this.winScreen();
    // winnerTile.kill();
    return;
  }
  // this.game.state.start("Scoreboard");
};

ZacEsquilo.Player.prototype.winScreen = function(){
  this.tela_Vitoria = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'win-bg');
  this.tela_Vitoria.anchor.setTo(0.5, 0);

  this.game.physics.arcade.overlap(this.sprite, this.winnerTilesGroup, '', null, this);
  // this.game.pause();
  this.sprite.body.moves = true;
  this.sprite.body.immovable = true;
  ZacEsquilo.config.won = true;

  this.restartKey.onDown.add(this.restartGame,this);

  this.fontStyle = { font: "40px Bubblegum Sans", fill: "#fff", align: "center"};
  this.scoreText = this.game.add.text(this.game.world.centerX, 100, "Parabéns! Você ajudou Zac a voltar para a floresta e venceu o jogo!", this.fontStyle);
  this.scoreText.anchor.setTo(0.5);
  this.scoreText.wordWrap = true;
  this.scoreText.wordWrapWidth = this.game.world.width - 30;

  this.playAgainText = this.game.add.text(this.game.world.centerX, 200, "Pressione a barra de espaço para jogar novamente", this.fontStyle);
  this.playAgainText.anchor.setTo(0.5);
  this.playAgainText.wordWrap = true;
  this.playAgainText.wordWrapWidth = this.game.world.width - 30;

  this.game.add.tween(this.tela_Vitoria).to( { y: 0 }, 2000, Phaser.Easing.Linear.None, true);
  // this.game.paused = true;
};

ZacEsquilo.Player.prototype.gameOverScreen = function(){
  this.tela_gameover = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'forestBackground');
  this.tela_gameover.anchor.setTo(0.5, 0);

  this.game.physics.arcade.overlap(this.sprite, this.winnerTilesGroup, '', null, this);
  // this.game.pause();
  this.sprite.body.moves = true;
  this.sprite.body.immovable = true;
  ZacEsquilo.config.won = true;

  this.restartKey.onDown.add(this.restartGame,this);

  this.fontStyle = { font: "40px Bubblegum Sans", fill: "#fff", align: "center"};
  this.scoreText = this.game.add.text(this.game.world.centerX, 100, "Game Over!!", this.fontStyle);
  this.scoreText.anchor.setTo(0.5);
  this.scoreText.wordWrap = true;
  this.scoreText.wordWrapWidth = this.game.world.width - 30;

  this.playAgainText = this.game.add.text(this.game.world.centerX, 200, "Pressione a barra de espaço para jogar novamente", this.fontStyle);
  this.playAgainText.anchor.setTo(0.5);
  this.playAgainText.wordWrap = true;
  this.playAgainText.wordWrapWidth = this.game.world.width - 30;

  this.game.add.tween(this.tela_gameover).to( { y: 0 }, 2000, Phaser.Easing.Linear.None, true);
  // this.game.paused = true;
};

ZacEsquilo.Player.prototype.restartGame = function(key){
  // this.game.paused = false;
  this.game.state.start('MainMenu');
};

ZacEsquilo.Player.prototype.resetTileCoordinates = function(){
  this.sprite.entity.tileY = 10;
  this.sprite.entity.tileX = 8;
};