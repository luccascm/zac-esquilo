ZacEsquilo.PlayGame = function(){

};

ZacEsquilo.PlayGame.prototype = {
  preload: function(){
    // Tilemap
    this.load.image('tileset1', 'assets/images/level1-example.png'); // loading the tileset image
    this.load.image('tileset2', 'assets/images/forest-bg-small.jpg'); // loading the tileset image
    this.load.tilemap('map', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON); // loading the tilemap file

  },
  
  create: function(){
    // this.game.stage.backgroundColor = '#808080';
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

    // tileX, tileY, speed, scale, spriteKey, game
    this.enemies = [
      new ZacEsquilo.Enemy(44/2, 12, 2, 0.15, 'car1', this.game),
      new ZacEsquilo.Enemy(44/2, 10, 2, 0.15, 'car1', this.game),
      new ZacEsquilo.Enemy(44/2, 8, 2, 0.15, 'car1', this.game)
      ];
    // c.move('up');
    // window.setInterval(function(){
    //   c.move('up');
    // }, 1000);

    // Tilemap
    // this.map = this.add.tilemap('map'); // Preloaded tilemap
    // this.map.addTilesetImage('tileset1'); // Preloaded tileset
    // // this.map.addTilesetImage('tileset2'); // Preloaded tileset
    // this.layer = this.map.createLayer('Tile Layer 1'); // This is the default name of the first layer in Tiled
    // this.layer.resizeWorld(); // Sets the world size to match the size of this layer.
    // this.map.setCollisionBetween(0, 100); // If you use 'collide' function with the layer, then the tiles from the first (ID 0) tile till the 100th element will collide with the other sprite
  },

  update: function(){
    this.car1.x += 5;
    this.car2.x -= 10;
    if (this.car1.x > window.innerWidth){
      this.car1.x = 0;
    }
    if(this.car2.x < 0){
      this.car2.x = window.innerWidth + 1;
    }
    for (var i = 0; i < this.enemies.length; i++){
      this.enemies[i].update();
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
