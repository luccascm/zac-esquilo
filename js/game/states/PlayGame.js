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
    this.game.stage.backgroundColor = '#808080';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Jogador
    this.zac = new ZacEsquilo.Player(this.game.world.centerX/ZacEsquilo.config.tileSize, this.game.world.height/ZacEsquilo.config.tileSize, 5, 0.15, 'char', this.game);

    //Inimigos
    this.enemiesGroup = this.game.add.group(); // Add multiplas instancias da mesma sprite
    //this.enemiesGroup.add(this.enemy)
    // this.game.rnd.integerInRange(min, max) // random position
    this.enemies = [
      new ZacEsquilo.Enemy(20, this.game.world.height/ZacEsquilo.config.tileSize - 1, 3, 0.15, 'car1', this.game, 'left'),
      new ZacEsquilo.Enemy(15, this.game.world.height/ZacEsquilo.config.tileSize - 1 , 3, 0.15, 'car1', this.game, 'left'),
      new ZacEsquilo.Enemy(2, this.game.world.height/ZacEsquilo.config.tileSize - 2, 5, 0.15, 'car2', this.game, 'right'),
      new ZacEsquilo.Enemy(10, this.game.world.height/ZacEsquilo.config.tileSize - 2, 5, 0.15, 'car2', this.game, 'right')
      ];
    for (var i = 0; i < this.enemies.length; i++){
      this.enemiesGroup.add(this.enemies[i]);
    }
    // this.enemiesGroup.addMultiple(this.enemies);

    // Tilemap
    // this.map = this.add.tilemap('map'); // Preloaded tilemap
    // this.map.addTilesetImage('tileset1'); // Preloaded tileset
    // // this.map.addTilesetImage('tileset2'); // Preloaded tileset
    // this.layer = this.map.createLayer('Tile Layer 1'); // This is the default name of the first layer in Tiled
    // this.layer.resizeWorld(); // Sets the world size to match the size of this layer.
    // this.map.setCollisionBetween(0, 100); // If you use 'collide' function with the layer, then the tiles from the first (ID 0) tile till the 100th element will collide with the other sprite
  },

  update: function(){
    this.zac.update();
    for (var i = 0; i < this.enemies.length; i++){
      this.enemies[i].update();
      //this.enemiesGroup.getAt(i).update();
    }
    // this.enemiesGroup.forEach(update(), this)
    this.game.physics.arcade.collide(this.zac, this.enemies[0]);
  }
};
