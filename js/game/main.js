var game = new Phaser.Game(ZacEsquilo.config.tileSize * 15, ZacEsquilo.config.tileSize * 11, Phaser.AUTO, '', true);
// var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', true);

game.state.add('Boot', ZacEsquilo.Boot);
game.state.add('Preloader', ZacEsquilo.Preload);
game.state.add('PreMenu', ZacEsquilo.PreMenu);
game.state.add('MainMenu', ZacEsquilo.MainMenu);
game.state.add('ConfigOptions', ZacEsquilo.ConfigOptions);
game.state.add('ConfigKeys', ZacEsquilo.ConfigKeys);
game.state.add('Instructions', ZacEsquilo.Instructions);
game.state.add('PlayGame', ZacEsquilo.PlayGame);
game.state.add('GameOver', ZacEsquilo.GameOver);

game.state.start('Boot');
