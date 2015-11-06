ZacEsquilo.PlayGame = function(){

};

ZacEsquilo.PlayGame.prototype = {
  preload: function(){
    this.game.stage.backgroundColor = '#fff';
    ZacEsquilo.config.playerLives = 3;
    this.game.load.image('tileset_sprites50', 'assets/tilemaps/tiles/tileset_sprites50.png');

    // Carregando tilemap
    this.game.load.tilemap('map-1', 'assets/tilemaps/maps/json/tilemap1-50-complete2.json', null, Phaser.Tilemap.TILED_JSON);

    // Carregando tiles para objects
    this.game.load.image('land', 'assets/tilemaps/tiles/land.png');
    this.game.load.image('water', 'assets/tilemaps/tiles/water2.png');
    this.game.load.image('grass', 'assets/tilemaps/tiles/grass2.png');
    this.game.load.image('street_dash', 'assets/tilemaps/tiles/street_dash.png');
    this.game.load.image('street_clear', 'assets/tilemaps/tiles/street_clear.png');

    this.game.load.image('lifeHeart', 'assets/images/sprites/others/heart.png');

    ZacEsquilo.soundtrack.stop();

    // Button para jogar caso device = mobile
    if (!this.game.device.desktop){ this.load.spritesheet('mobile_button', 'assets/images/buttons/button-round-a.png', 64, 64, 2); }
  },

  create: function(){
    this.game.stage.backgroundColor = '#808080';



    //Criando tilemap
    this.map = this.game.add.tilemap('map-1');
    ZacEsquilo.map = this.game.add.tilemap('map-1');
    this.map = this.game.add.tilemap('map-1');
    ZacEsquilo.map = this.game.add.tilemap('map-1');
    this.map.addTilesetImage('tileset_sprites50');
    ZacEsquilo.map.addTilesetImage('tileset_sprites50');
    this.map.addTilesetImage('land');
    ZacEsquilo.map.addTilesetImage('land');
    this.map.addTilesetImage('water');
    ZacEsquilo.map.addTilesetImage('water2');
    this.map.addTilesetImage('grass');
    ZacEsquilo.map.addTilesetImage('grass2');

    // Criando layers
    // layer background
    this.bg_layer = this.map.createLayer('backgroundLayer');
    ZacEsquilo.bg_layer = ZacEsquilo.map.createLayer('backgroundLayer');
    ZacEsquilo.obj_layer = ZacEsquilo.map.createLayer('objectsLayer');
    // this.bg_layer.resizeWorld();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // WinnerTiles group
    this.winnerTilesGroup = this.game.add.group();
    this.winnerTilesGroup.enableBody = true;
    this.winnerTilesGroup.physicsBodyType = Phaser.Physics.ARCADE;

    // Water group
    this.waterGroup = this.game.add.group();
    this.waterGroup.enableBody = true;
    this.waterGroup.physicsBodyType = Phaser.Physics.ARCADE;

    // Street group
    this.streetGroup = this.game.add.group();
    this.streetGroup.enableBody = true;
    this.streetGroup.physicsBodyType = Phaser.Physics.ARCADE;

    // Layer objetos
    this.map.createFromObjects('objectsLayer', 1, 'land', 0, true, false);
    this.map.createFromObjects('objectsLayer', 2, 'street_dash', 0, true, false, this.streetGroup);
    this.map.createFromObjects('objectsLayer', 3, 'street_clear', 0, true, false, this.streetGroup);
    this.map.createFromObjects('objectsLayer', 4, 'water', 0, true, false, this.waterGroup);
    this.map.createFromObjects('objectsLayer', 5, 'grass', 0, true, false, this.winnerTilesGroup);

    //Enemies
    this.enemiesGroup = this.game.add.group();
    this.enemiesGroup.enableBody = true;
    this.enemiesGroup.physicsBodyType = Phaser.Physics.ARCADE;

    this.enemies = [
      new ZacEsquilo.Enemy(1, this.game.world.height/ZacEsquilo.config.tileSize - 2, 1, 0.85, 'mini_truck2', this.game, 'left'),
      new ZacEsquilo.Enemy(8, this.game.world.height/ZacEsquilo.config.tileSize - 2 , 1, 0.85, 'mini_truck2', this.game, 'left'),
      new ZacEsquilo.Enemy(2, this.game.world.height/ZacEsquilo.config.tileSize - 3, 1, 0.85, 'conversivel', this.game, 'left'),
      new ZacEsquilo.Enemy(12, this.game.world.height/ZacEsquilo.config.tileSize - 3, 1, 0.85, 'mini_truck2', this.game, 'left'),
      new ZacEsquilo.Enemy(7, this.game.world.height/ZacEsquilo.config.tileSize - 3, 1, 0.85, 'conversivel', this.game, 'left'),
      new ZacEsquilo.Enemy(4, this.game.world.height/ZacEsquilo.config.tileSize - 4, 1, 0.85, 'mini_car', this.game, 'right'),
      new ZacEsquilo.Enemy(12, this.game.world.height/ZacEsquilo.config.tileSize - 4, 1, 0.85, 'truck', this.game, 'right')
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
      new ZacEsquilo.Friend(2, this.game.world.height/ZacEsquilo.config.tileSize - 6, 1, 1, 'log1', this.game, 'right'),
      new ZacEsquilo.Friend(8, this.game.world.height/ZacEsquilo.config.tileSize - 6 , 1, 1, 'log1', this.game, 'right'),
      new ZacEsquilo.Friend(5, this.game.world.height/ZacEsquilo.config.tileSize - 7, 2, 1, 'log2', this.game, 'left'),
      new ZacEsquilo.Friend(10, this.game.world.height/ZacEsquilo.config.tileSize - 7, 2, 1, 'log1', this.game, 'left'),
      new ZacEsquilo.Friend(4, this.game.world.height/ZacEsquilo.config.tileSize - 8, 3, 1, 'log2', this.game, 'right'),
      new ZacEsquilo.Friend(9, this.game.world.height/ZacEsquilo.config.tileSize - 8, 3, 1, 'log2', this.game, 'right')
      ];

    for (var i = 0; i < this.friends.length; i++){
      this.friendsGroup.add(this.friends[i].sprite);
    }

    // Jogador
    this.zac = new ZacEsquilo.Player(Math.ceil(this.game.world.centerX/ZacEsquilo.config.tileSize), this.game.world.height/ZacEsquilo.config.tileSize - 1, 5, 0.9, 'zac-sprite', this.game, this.enemiesGroup, this.friendsGroup, this.winnerTilesGroup, this.waterGroup);

    // Indicador de vidas
    this.lifeTextStyle = { font: "20px Sigmar One", fill: "#330033", align: "left"};
    this.lifeIndicatorText = this.game.add.text(10, this.game.world.height - 40, "Vidas: ", this.lifeTextStyle);

    ZacEsquilo.life1 = this.game.add.sprite(100, this.game.world.height-40, 'lifeHeart');
    ZacEsquilo.life2 = this.game.add.sprite(150, this.game.world.height-40, 'lifeHeart');
    ZacEsquilo.life3 = this.game.add.sprite(200, this.game.world.height-40, 'lifeHeart');

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
