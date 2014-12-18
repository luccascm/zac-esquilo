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
    this.zac = new ZacEsquilo.Player(this.game.world.centerX / 30, 1, 1, 0.2, 'char', this.game);

    //Inimigos
    this.enemies = [
      new ZacEsquilo.Enemy(this.game.world.width/30, this.game.height/30 + 30, 2, 0.15, 'car1', this.game, 'left'),
      new ZacEsquilo.Enemy((this.game.world.width/30) + 6, this.game.height/30 + 60 , 2, 0.15, 'car1', this.game, 'left'),
      new ZacEsquilo.Enemy(1, this.game.height/30 + 30, 2, 0.15, 'car2', this.game, 'right')
      ];

    // Tilemap
    // this.map = this.add.tilemap('map'); // Preloaded tilemap
    // this.map.addTilesetImage('tileset1'); // Preloaded tileset
    // // this.map.addTilesetImage('tileset2'); // Preloaded tileset
    // this.layer = this.map.createLayer('Tile Layer 1'); // This is the default name of the first layer in Tiled
    // this.layer.resizeWorld(); // Sets the world size to match the size of this layer.
    // this.map.setCollisionBetween(0, 100); // If you use 'collide' function with the layer, then the tiles from the first (ID 0) tile till the 100th element will collide with the other sprite
  },

  update: function(){

    for (var i = 0; i < this.enemies.length; i++){
      this.enemies[i].update();
    }
    this.zac.update();
  }
};
