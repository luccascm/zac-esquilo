ZacEsquilo.PlayGame = function(){

};

ZacEsquilo.PlayGame.prototype = {
  preload: function(){
    ZacEsquilo.config.playerLives = 3;

    // Carregando tilemap
    this.game.load.tilemap('map-1', 'assets/tilemaps/maps/tilemap1-50-incomplete.json', null, Phaser.Tilemap.TILED_JSON);

    // Carregando tiles para objects
    this.game.load.image('land', 'assets/tilemaps/tiles/land.png');
    this.game.load.image('water', 'assets/tilemaps/tiles/water.png');
    this.game.load.image('grass', 'assets/tilemaps/tiles/grass.png');
    this.game.load.image('tileset_sprites', 'assets/tilemaps/tiles/tileset_sprites50.png');


  },

  create: function(){
    this.game.stage.backgroundColor = '#808080';

    //Criando tilemap
    this.map = this.game.add.tilemap('map-1');
    this.map.addTilesetImage('tileset_sprites');
    this.map.addTilesetImage('land');
    this.map.addTilesetImage('water');
    this.map.addTilesetImage('grass');

    // Criando layers
    this.bg_layer = this.map.createLayer('backgroundLayer');
    this.bg_layer.resizeWorld();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // WinnerTiles group
    this.winnerTilesGroup = this.game.add.group();
    this.winnerTilesGroup.enableBody = true;

    //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
    this.map.createFromObjects('objectsLayer', 5, 'grass', 0, true, false, this.winnerTilesGroup);

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    // this.map.addTilesetImage('tileset_sprites50', 'tileset');

    // todo: pegar esses valores do json (tamanho e nome)
    // this.map.width = 15;
    // this.map.height = 10;

    // Criando layer background
    // this.backgroundLayer = this.map.createLayer('backgroundLayer');
    // this.backgroundLayer.resizeWorld();

    // Criando layer objects

    // todo: getIndex de tile especifico

    //Enemies
    this.enemiesGroup = this.game.add.group();
    this.enemiesGroup.enableBody = true;
    this.enemiesGroup.physicsBodyType = Phaser.Physics.ARCADE;

    this.enemies = [
      new ZacEsquilo.Enemy(2, this.game.world.height/ZacEsquilo.config.tileSize - 1, 2, 0.20, 'car1', this.game, 'right'),
      new ZacEsquilo.Enemy(10, this.game.world.height/ZacEsquilo.config.tileSize - 1 , 2, 0.20, 'car1', this.game, 'right'),
      new ZacEsquilo.Enemy(5, this.game.world.height/ZacEsquilo.config.tileSize - 2, 5, 0.20, 'car2', this.game, 'left'),
      new ZacEsquilo.Enemy(10, this.game.world.height/ZacEsquilo.config.tileSize - 2, 5, 0.20, 'car2', this.game, 'left'),
      new ZacEsquilo.Enemy(4, this.game.world.height/ZacEsquilo.config.tileSize - 3, 5, 0.20, 'car1', this.game, 'right'),
      new ZacEsquilo.Enemy(9, this.game.world.height/ZacEsquilo.config.tileSize - 3, 5, 0.20, 'car1', this.game, 'right'),
      new ZacEsquilo.Enemy(14, this.game.world.height/ZacEsquilo.config.tileSize - 3, 5, 0.20, 'car1', this.game, 'right')
      ];

    for (var i = 0; i < this.enemies.length; i++){
      this.enemiesGroup.add(this.enemies[i].sprite);
    }

    //Friends
    this.friendsGroup = this.game.add.group();
    this.friendsGroup.enableBody = true;
    this.friendsGroup.physicsBodyType = Phaser.Physics.ARCADE;
    // this.game.rnd.integerInRange(min, max) // random position


    this.friends = [
      new ZacEsquilo.Friend(2, this.game.world.height/ZacEsquilo.config.tileSize - 5, 1, 1, 'wood', this.game, 'right'),
      new ZacEsquilo.Friend(8, this.game.world.height/ZacEsquilo.config.tileSize - 5 , 1, 1, 'wood', this.game, 'right'),
      new ZacEsquilo.Friend(5, this.game.world.height/ZacEsquilo.config.tileSize - 6, 5, 1, 'wood', this.game, 'left'),
      new ZacEsquilo.Friend(10, this.game.world.height/ZacEsquilo.config.tileSize - 6, 5, 1, 'wood', this.game, 'left'),
      new ZacEsquilo.Friend(4, this.game.world.height/ZacEsquilo.config.tileSize - 7, 3, 1, 'wood', this.game, 'right'),
      new ZacEsquilo.Friend(9, this.game.world.height/ZacEsquilo.config.tileSize - 7, 3, 1, 'wood', this.game, 'right')
      ];

    for (var i = 0; i < this.friends.length; i++){
      this.friendsGroup.add(this.friends[i].sprite);
    }

    // Jogador
    this.zac = new ZacEsquilo.Player(this.game.world.centerX/ZacEsquilo.config.tileSize, this.game.world.height/ZacEsquilo.config.tileSize, 5, 0.20, 'char', this.game, this.enemiesGroup, this.friendsGroup, this.winnerTilesGroup);


  },

  update: function(){
    this.zac.update();
    for (var i = 0; i < this.enemies.length; i++){
      this.enemies[i].update();
      // this.enemiesGroup.getAt(i).update();
    }
    for (var i = 0; i < this.friends.length; i++){
      this.friends[i].update();
      // this.enemiesGroup.getAt(i).update();
    }
  }
};
