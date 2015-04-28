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

    ZacEsquilo.config.gameHeight = this.game.world.height;
    ZacEsquilo.config.gameWidth = this.game.world.width;

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
    if(this.ismoving || this.won){ return; }
    // if ( direction == 'left' && this.desiredTileX < 0 ){ this.desiredTileX = 14; this.teleport(this.game.world.width / ZacEsquilo.config.tileSize + 1); }
    // else if ( direction == 'right' && this.desiredTileX > 14 ){ this.desiredTileX = 0; this.teleport(-1); }
    // Se puder mover
    else{
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

  // enemy.entity.tileY
  hasEnemyUp: function(player, enemiesGroup){
    for (var i = 0; i < enemiesGroup.length; i++){
      enemy = enemiesGroup.children[i];
      enemy_left_border = enemy.x - (enemy.width/2);
      enemy_right_border = enemy.x + (enemy.width/2);
      player_left_border = player.x - (player.width/2);
      player_right_border = player.x + (player.width/2);
      // if (enemy.entity.tileY == player.entity.tileY - 1){
      //   if (enemy.entity.direction == 'left'){
      //     if (enemy.entity.tileX == player.entity.tileX + 1 ) return true;
      //   }
        
      //   if (enemy.entity.direction == 'right'){
      //     if (enemy.entity.tileX == player.entity.tileX - 1 ) return true;
      //   }
      // }
      
      if (enemy.entity.tileY == Math.floor(player.entity.tileY) - 1){
        // if (enemy.entity.tileX == Math.floor(player.entity.tileX)) return true;
        if (enemy.entity.direction == 'left'){
          if ( enemy_left_border <= player_right_border + ZacEsquilo.config.tileSize && enemy_right_border >= player_left_border - (ZacEsquilo.config.tileSize/5) ) return true;
        }

        else if (enemy.entity.direction == 'right'){
          if ( enemy_right_border >= player_left_border - ZacEsquilo.config.tileSize && enemy_right_border <= player_right_border + (ZacEsquilo.config.tileSize/5) ) return true;
        }
        // if (enemy.x + (enemy.width/2) >= player.x + ZacEsquilo.config.tileSize + (ZacEsquilo.config.tileSize/2) && enemy.x <= player.x - ZacEsquilo.config.tileSize - (ZacEsquilo.config.tileSize/2) ) return true;        
        // if (enemy.entity.direction == 'left'){
        //   if (enemy.entity.tileX == Math.floor(player.entity.tileX) + 1 ) return true;
        // }
        
        // if (enemy.entity.direction == 'right'){
        //   if (enemy.entity.tileX == Math.floor(player.entity.tileX) - 1 ) return true;
        // }
      }
    }
    return false;
      // console.log(enemiesGroup.children[i]);
  },

  // hasEnemyLeft: function(player, enemiesGroup){
  //   for (var i = 0; i < enemiesGroup.length; i++){
  //     enemy = enemiesGroup.children[i];
  //     if (enemy.entity.tileY == Math.floor(player.entity.tileY)){
  //       // if (enemy.entity.tileX == Math.floor(player.entity.tileX) + 1 && enemy.entity.direction == 'left'){ return true; }
  //       if (enemy.entity.tileX == Math.floor(player.entity.tileX) - 1 && enemy.entity.direction == 'right'){ return true; }
  //     }
  //   }
  //   return false;
  // },

  // hasEnemyRight: function(player, enemiesGroup){
  //   for (var i = 0; i < enemiesGroup.length; i++){
  //     enemy = enemiesGroup.children[i];
  //     if (enemy.entity.tileY == Math.floor(player.entity.tileY)){
  //       if (enemy.entity.tileX == Math.floor(player.entity.tileX) + 1 && enemy.entity.direction == 'left'){ return true; }
  //       // if (enemy.entity.tileX == Math.floor(player.entity.tileX) - 1 && enemy.entity.direction == 'right'){ return true; }
  //     }
  //   }
  //   return false;    
  // },

  sideDanger: function(player, enemiesGroup){
    for (var i = 0; i < enemiesGroup.length; i++){
      enemy = enemiesGroup.children[i];
      enemy_left_border = enemy.x - (enemy.width/2);
      enemy_right_border = enemy.x + (enemy.width/2);
      player_left_border = player.x - (player.width/2);
      player_right_border = player.x + (player.width/2);
      if (enemy.entity.tileY == Math.floor(player.entity.tileY)){
        if (enemy_left_border <= player.x + ZacEsquilo.config.tileSize && enemy_right_border >= player_left_border - (ZacEsquilo.config.tileSize) && enemy.entity.direction == 'left'){ return true; }
        if (enemy_left_border >= player.x - ZacEsquilo.config.tileSize && enemy_right_border <= player_left_border + (ZacEsquilo.config.tileSize) && enemy.entity.direction == 'right'){ return true; }
      }
    }
    return false;
    // for (var j = 0; j < friendsGroup.length; j++){
    //   friend = friendsGroup.children[j];
    //   if (friend.entity.tileY == Math.floor(player.entity.tileY)){
    //     if ( friend.entity.tileX )
    //   }
    // }
  },

  hasFriendUp: function(player, friendsGroup){
    for (var i = 0; i < friendsGroup.length; i++){
      friend = friendsGroup.children[i];
      friend_left_border = friend.x - (friend.width/2);
      friend_right_border = friend.x + (friend.width/2);
      player_left_border = player.x - (player.width/2);
      player_right_border = player.x + (player.width/2);
      if (friend.entity.tileY == Math.floor(player.entity.tileY) - 1){
        if (friend.entity.direction == 'left'){
          if ( player_left_border >= friend_left_border && player_right_border <= friend_right_border ) return true;
        }

        else if (friend.entity.direction == 'right'){
          if ( player_right_border <= friend_right_border && player_left_border >= friend_left_border ) return true;
        }
        // if (player.x >= friend.x - (friend.width/2) && player.x <= friend.x + (friend.width/2) ) return true; 
        // console.log('fx: ' + friend.entity.tileX);
        // console.log('fw: ' + friend.width);
        // if ( friend.entity.tileX == Math.floor(player.entity.tileX) ) return true;
        
        // if (friend.entity.direction == 'left'){
        //   if (friend.entity.tileX == Math.floor(player.entity.tileX) + 1 ) return true;
        // }
        
        // if (friend.entity.direction == 'right'){
        //   if (friend.entity.tileX == Math.floor(player.entity.tileX) - 1 ) return true;
        // }
      }
    }
    return false;
  },

  hasWaterUp: function(player, waterGroup){
    for (var i = 0; i < waterGroup.length; i++){
      water = waterGroup.children[i];
      water_left_border = water.x;
      water_right_border = water.x + water.width;
      player_left_border = player.x - (player.width/2);
      player_right_border = player.x + (player.width/2);
      if (water.y == 200) console.log('water: '+ water.x + ',' + water.y);
      if ( (player.y + player.height/2 - ZacEsquilo.config.tileSize) <= water.y + water.height ) {
        if (player.x >= water_left_border && player.x <= water_right_border ) {
          console.log('true');
          return true;
        }
      }
    }
    return false;
  },

  hasWinnerTileUp: function(player, winnerTilesGroup){
    for (var i = 0; i < winnerTilesGroup.length; i++){
      winner = winnerTilesGroup.children[i];
      winner_left_border = winner.x;
      winner_right_border = winner.x + winner.width;
      player_left_border = player.x - (player.width/2);
      player_right_border = player.x + (player.width/2);
      if ( (player.y + player.height/2 - ZacEsquilo.config.tileSize) <= winner.y + winner.height ) {
        if (player.x >= winner_left_border && player.x <= winner_right_border ) {
          return true;
        }
      }
    }
    return false;
  },

  moveOverFriend: function(player, friendsGroup){
    for (var i = 0; i < friendsGroup.length; i++){
      friend = friendsGroup.children[i];
      friend = friendsGroup.children[i];
      friend_left_border = friend.x - (friend.width/2);
      friend_right_border = friend.x + (friend.width/2);
      player_left_border = player.x - (player.width/2);
      player_right_border = player.x + (player.width/2);
      if ( friend.entity.tileY == Math.floor(player.entity.tileY) ){
        if ( player.x - ZacEsquilo.config.tileSize >= friend_left_border ) return 'left';
        else if ( player.x + ZacEsquilo.config.tileSize <= friend_right_border ) return 'right';
      }
    }
    return 'down';
  },

  autoMove: function(player, enemiesGroup, friendsGroup, waterGroup, winnerTilesGroup){
    var player_left_border = player.x - (player.width/2);
    var player_right_border = player.x + (player.width/2);
    var player_can_go_left, player_can_go_right;
    if (player_left_border - ZacEsquilo.config.tileSize >= 0)
      player_can_go_left = true;
    else player_can_go_left = false;
    // Se tiver friend em cima vai para cima
    if ( this.hasFriendUp(player, friendsGroup) ){ return 'up'; }

    // Se nao tiver friend mas tiver tile de vitoria em cima vai pra cima
    else if ( this.hasWinnerTileUp(player, winnerTilesGroup) ){ return 'up'; }
    
    // Se nao tiver friend e tiver enemy em cima vai para um dos lados ou para baixo
    else if ( this.hasEnemyUp(player, enemiesGroup) ){
      if ( this.sideDanger(player, enemiesGroup) ) return 'down';
      else{
        if ( player.x - ZacEsquilo.config.tileSize >= 0 ) return 'left';
        else return 'right';
      } 
    }
    
    // Se nao tiver friend nem eneny em cima mas tiver agua em cima vai para um dos lados ou para baixo
    else if ( this.hasWaterUp(player, waterGroup) && player.entity.tileY == 6){
      if (player_left_border - ZacEsquilo.config.tileSize >= 0 && player_can_go_left){
        return 'left';
      }
      else{
        player_can_go_left = false;
        player_can_go_right = true;
        if (player_right_border + ZacEsquilo.config.tileSize >= ZacEsquilo.config.gameWidth && player_can_go_right){
          player_can_go_left = true;
          player_can_go_right = false;
          return 'left';
        } 
        return 'right';

      }
    }
    
    // Se nao tiver friend nem enemy mas tiver agua e nao tiver tile de vitoria vai para um dos lados ou para baixo
    else if ( this.hasWaterUp(player, waterGroup) && !this.hasWinnerTileUp(player, winnerTilesGroup) ){
      return this.moveOverFriend(player, friendsGroup);
    }

    // Se nao tiver friend nem enemy nem agua vai para cima
    else return 'up';
    // var enemy = enemiesGroup.children[0];
    // var friend = friendsGroup.children[0];
    // console.log( ZacEsquilo.map.getTile(ZacEsquilo.obj_layer.getTileX(player.x), ZacEsquilo.obj_layer.getTileY(player.y), 'objectsLayer') );
    // if ( this.hasEnemyUp(player, enemiesGroup) || this.hasWaterUp(player, waterGroup) ){
    //   if (this.sideDanger(player, enemiesGroup, friendsGroup) ){ return 'down'; }
    //   else return enemy.entity.direction;
    // }

    // else if ( this.hasFriendUp(player, friendsGroup) ) return 'up';

    // else if ( !this.hasEnemyUp(player, enemiesGroup) && this.hasWaterUp(player, waterGroup)){
    //   for (var f = 0; f < friendsGroup.length; f++){
    //     friend = friendsGroup.children[f];
    //     if (friend.entity.tileY == Math.floor(player.entity.tileY)){
    //       if (player.x - 50 >= friend.x - (friend.width/2) ) return 'left';
    //       else if ( player.x + 50 <= friend.x + (friend.width/2) ) return 'right';
    //       else return 'up';
    //     }
    //   }
    // }

    // else if (player.entity.tileY == 6 && !this.hasFriendUp(player, friendsGroup)){
    //   if (Math.floor(player.entity.tileX) > 2) return 'left';
    //   else return 'right';
    // }
    
    // else if ( player.entity.tileY == 6 && this.hasFriendUp(player, friendsGroup) ) return 'up';

    // else return 'up';
  },

  teleport: function(tileX) {
    this.tileX = tileX;
    this.sprite.x = tileX * ZacEsquilo.config.tileSize;
    // this.desiredX = this.sprite.x + ZacEsquilo.config.tileSize;
    // this.desiredTileX = 1;

  }
}