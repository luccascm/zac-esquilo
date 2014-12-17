ZacEsquilo.PlayGame = function(){

};

ZacEsquilo.PlayGame.prototype = {
  create: function(){
    this.game.stage.backgroundColor = '#808080';
    // Jogador
    this.zac = this.add.sprite(this.game.world.centerX, window.innerHeight - 50, 'char');
    this.zac.scale.x = 0.3;
    this.zac.scale.y = 0.3;
    this.zac.anchor.setTo(0.5);
    // Animar se modo acessiver estiver ativado
    if(ZacEsquilo.config.oneSwitchActive){
      this.zac.animations.add('andar');
      this.zac.animations.play('andar', 5, true);
    }


    //Inimigos
    this.car1 = this.add.sprite(0, window.innerHeight - 110, 'car1');
    this.car1.scale.x = 0.3;
    this.car1.scale.y = 0.3;
    this.car1.anchor.setTo(0, 1);
    this.car1.animations.add('mover');
    this.car1.animations.play('mover', 5, true);

    this.car2 = this.add.sprite(window.innerWidth, window.innerHeight - 170, 'car2');
    this.car2.scale.x = 0.3;
    this.car2.scale.y = 0.3;
    this.car2.anchor.setTo(1);
    this.car2.animations.add('mover');
    this.car2.animations.play('mover', 5, true);

  },

  update: function(){
    this.car1.x += 5;
    this.car2.x -= 5;
    if (this.car1.x > window.innerWidth){
      this.car1.x = 0;
    }
    if(this.car2.x < 0){
      this.car2.x = window.innerWidth + 1;
    }
    if (ZacEsquilo.config.oneSwitchActive){
      this.zac.x += 3;
      if (this.zac.x > window.innerWidth){
        // this.zac.x = window.innerWidth;
        this.zac.x -= 3;
      }
      // if (this.zac.x = window.innerWidth){
      //   this.zac.x -= 3;
      // }
      // if (this.zac.x < 0){
      //   this.zac.x = 0;
      // }
      // if (this.zac.x = 0){
      //   this.zac.x += 3;
      // }
    }
  }
};
