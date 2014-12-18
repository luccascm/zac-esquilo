ZacEsquilo.Player = function(tileX, tileY, speed, scale, spriteKey, game){
  this.init(tileX, tileY, speed, scale, spriteKey, game);
  // outros params
  //config teclas
}

ZacEsquilo.Player.prototype = Object.create(ZacEsquilo.Entity.prototype);

ZacEsquilo.Player.prototype.chooseKey = function(key){}

ZacEsquilo.Player.prototype.update = function(){
  // if keyup.isdonw this.move(up)
  ZacEsquilo.Entity.prototype.update.call(this);
}

