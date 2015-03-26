ZacEsquilo.Friend = function(tileX, tileY, speed, scale, spriteKey, game, direction){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
  // outros params
  this.direction = direction;
  this.sprite.animations.add('mover')
  this.sprite.animations.play('mover', 5, true);
}

ZacEsquilo.Friend.prototype = Object.create(ZacEsquilo.Entity.prototype);

ZacEsquilo.Friend.prototype.update = function(){
  if(!this.ismoving){
    this.move(this.direction); //direction
  }
  if (this.sprite.x >= this.game.world.width){
    this.sprite.x = this.tileX;
  }
  if (this.sprite.x < 0){
    this.sprite.x = this.game.world.width + this.tileX;
  }

  var prevX = this.sprite.x,
      prevY = this.sprite.y;

  ZacEsquilo.Entity.prototype.update.call(this);

  if (this.carrying) {
    // if (this.carrying.sprite.y == this.sprite.y){
    //   this.carrying.speed = this.speed;
    //   this.carrying.move(this.direction);
    // } 
    if (this.carrying.sprite.y == this.sprite.y){
      var diff = (this.sprite.x - prevX);
      this.carrying.sprite.x += diff;
      console.log('diff ' , diff);
      
    } 
    // this.carrying.sprite.x += (this.sprite.x - prevX);
    // console.log(this.carrying.sprite.x);
    // this.carrying.sprite.y += (this.sprite.y - prevY);
    // this.carrying.speed = ZacEsquilo.config.playerSpeed;
    this.carrying = null;
  }
  // Funcao update para Friend
};


ZacEsquilo.Friend.prototype.carry = function(entity){
  this.carrying = entity;
  // entity.abortMovement();
};