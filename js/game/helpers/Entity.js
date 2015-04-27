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
      
      // if (enemy.entity.tileY == player.entity.tileY - 1){
      //   if (enemy.entity.direction == 'left'){
      //     if (enemy.entity.tileX > player.entity.tileX + 1 || enemy.entity.tileX <= player.entity.tileX) 
      //       return false;
      //     else
      //       return true;
      //   }
      //   if (enemy.entity.direction == 'right'){
      //     if (enemy.entity.tileX < player.entity.tileX - 1 || enemy.entity.tileX >= player.entity.tileX)
      //       return false;
      //     else
      //       return true;
      //   }
      // }
      
      if (enemy.entity.tileY == Math.floor(player.entity.tileY) - 1){
        // if (enemy.entity.tileX == Math.floor(player.entity.tileX)) return true;
        if (enemy.x >= player.x - ZacEsquilo.config.tileSize + (ZacEsquilo.config.tileSize/2) && enemy.x <= player.x + ZacEsquilo.config.tileSize + (ZacEsquilo.config.tileSize/2) ) return true;        
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

  sideDanger: function(player, enemiesGroup, friendsGroup){
    for (var i = 0; i < enemiesGroup.length; i++){
      enemy = enemiesGroup.children[i];
      if (enemy.entity.tileY == Math.floor(player.entity.tileY)){
        if (enemy.entity.tileX == Math.floor(player.entity.tileX) + 1 && enemy.entity.direction == 'left'){ return true; }
        if (enemy.entity.tileX == Math.floor(player.entity.tileX) - 1 && enemy.entity.direction == 'right'){ return true; }
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
      if (friend.entity.tileY == Math.floor(player.entity.tileY) - 1){
        if (player.x >= friend.x - (friend.width/2) && player.x <= friend.x + (friend.width/2) ) return true; 
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
  },

  autoMove: function(player, enemiesGroup, friendsGroup){
    // var enemy = enemiesGroup.children[0];
    // var friend = friendsGroup.children[0];
    console.log( ZacEsquilo.map.getTile(ZacEsquilo.obj_layer.getTileX(player.x), ZacEsquilo.obj_layer.getTileY(player.y), 'objectsLayer') );
    if ( this.hasEnemyUp(player, enemiesGroup) ){
      if (this.sideDanger(player, enemiesGroup, friendsGroup) ){ return 'down'; }
      else return enemy.entity.direction;
    }
    else if (player.entity.tileY == 6 && !this.hasFriendUp(player, friendsGroup)){
      if (Math.floor(player.entity.tileX) > 2) return 'left';
      else return 'right';
    }
    else if ( player.entity.tileY == 6 && this.hasFriendUp(player, friendsGroup) ) return 'up';
    // else if ( player.entity.tileY < 6 && ( this.hasFriendUp(player,friendsGroup) ||  ) )
    else return 'up';
  },

  teleport: function(tileX) {
    this.tileX = tileX;
    this.sprite.x = tileX * ZacEsquilo.config.tileSize;
    // this.desiredX = this.sprite.x + ZacEsquilo.config.tileSize;
    // this.desiredTileX = 1;

  }
}