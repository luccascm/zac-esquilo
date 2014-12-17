ZacEsquilo.Instructions = function() {};

ZacEsquilo.Instructions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";
    // this.load.spritesheet('back', 'assets/images/voltar.png', 189, 58, 2);
  },

  create: function() {
    this.createText();
    ZacEsquilo.back = this.game.add.button(window.innerWidth - 289, window.innerHeight - 100, 'back', this.backToMenu, this, 1, 0);

    // instanciar um oneswitchmanager
    var oneswitchmanager = new ZacEsquilo.OneSwitchManager([
      ZacEsquilo.back,
    ], 2, this.game);
    oneswitchmanager.start();
  },

  createText: function() {
    this.fontStyleTitle = { font: "30px Revalia", fill: "#330033", align: "center"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "center"};

    ZacEsquilo.optionsTitle = this.game.add.text(20, 60, "Instruções", this.fontStyleTitle);

    var gameObjective = "O objetivo do jogo é levar o esquilo Zac de um lado ao outro passando por vários obstáculos.";
    gameObjective += "\n Zac morre se cair na água ou se for atingido por um automóvel.";
    gameObjective += "\n Os troncos de madeira sustentam o peso de Zac e podem o auxiliar na travessia do rio.";
    gameObjective += "\n Os automóveis sempre se movimentam na mesma direção, com velocidade constante.";
    ZacEsquilo.gameObjective = this.game.add.text(50, 160, gameObjective, this.fontStyleOptions);
    ZacEsquilo.gameObjective.wordWrap = true;
    ZacEsquilo.gameObjective.wordWrapWidth = window.innerWidth - 50;

    var accessibleModeInstructions = "Utilize o botão configurado (o padrão é a barra de espaço) para movimentar Zac.";
    accessibleModeInstructions += "\n Pressionar o botão configurado movimenta Zac para uma das 4 direções.";
    accessibleModeInstructions += "\n A escolha da direção é feita automaticamente, de forma a efetivar o alcance do objetivo e evitar a morte do personagem.";
    accessibleModeInstructions += "\n Pressione o botão duas vezes, rapidamente, para pausar o jogo.";

    var normalModeInstructions = "Utilize as teclas configuradas (setas direcionais, por padrão) para movimentar Zac nas 4 direções.";
    normalModeInstructions = "Utilize as teclas de pausar (tecla p, por padrão) para pausar o jogo.";
  },

  backToMenu: function(){
    this.state.start('MainMenu');
  }
}
