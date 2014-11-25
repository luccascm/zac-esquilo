var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', ZacEsquilo.Boot);
game.state.add('Preloader', ZacEsquilo.Preload);
game.state.add('PreMenu', ZacEsquilo.PreMenu);
game.state.add('MainMenu', ZacEsquilo.MainMenu);

game.state.start('Boot');
