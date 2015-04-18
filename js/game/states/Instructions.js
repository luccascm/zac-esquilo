ZacEsquilo.Instructions = function() {};

ZacEsquilo.Instructions.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#FFB631";
    // this.load.spritesheet('back', 'assets/images/voltar.png', 189, 58, 2);
  },

  create: function() {
    this.createText();
    ZacEsquilo.back = this.game.add.button(this.game.world.width -10 , this.game.world.height - 10, 'back', this.backToMenu, this, 1, 0);
    ZacEsquilo.back.anchor.setTo(1);

    // instanciar um oneswitchmanager
    if(ZacEsquilo.config.oneSwitchActive === true){
      var oneswitchmanager = new ZacEsquilo.OneSwitchManager([
        ZacEsquilo.back,
      ], 2, this.game);
      oneswitchmanager.start();
    }
  },

  createText: function() {
    this.fontStyleTitle = { font: "30px Revalia", fill: "#330033", align: "left"};
    this.fontStyleSubtitle = { font: "25px Revalia", fill: "#330033", align: "left"};
    this.fontStyleOptions = { font: "20px Bubblegum Sans", fill: "#330033", align: "left"};

    this.instructionsTitle = this.game.add.text(20, 30, "Instruções", this.fontStyleTitle);

    var gameObjectiveText = "* O objetivo do jogo é levar o esquilo Zac de um lado ao outro passando por vários obstáculos.";
    gameObjectiveText += "\n * Zac morre se cair na água ou se for atingido por um automóvel.";
    gameObjectiveText += "\n * Os troncos de madeira sustentam o peso de Zac e podem o auxiliar na travessia do rio.";
    gameObjectiveText += "\n * Os automóveis se movimentam sempre na mesma direção, com velocidade constante.";
    this.gameObjective = this.game.add.text(20, 80, gameObjectiveText, this.fontStyleOptions);
    this.gameObjective.wordWrap = true;
    this.gameObjective.wordWrapWidth = this.game.world.width - 20;
    this.gameObjective.anchor.setTo(0);

    this.accessibleModeTitle = this.game.add.text(20, 200, "Modo Acessível (Botão único)", this.fontStyleSubtitle);
    this.accessibleModeTitle.wordWrap = true;
    this.accessibleModeTitle.wordWrapWidth = this.game.world.width - 20;

    var accessibleModeInstructionsText = "* Utilize a barra de espaço para movimentar Zac.";
    accessibleModeInstructionsText += "\n * Pressioná-la movimenta Zac para uma das 4 direções.";
    accessibleModeInstructionsText += "\n * A escolha da direção é feita automaticamente, de forma a efetivar o alcance do objetivo e evitar a morte do personagem.";
    this.accessibleModeInstructions = this.game.add.text(20, 245, accessibleModeInstructionsText, this.fontStyleOptions);
    this.accessibleModeInstructions.wordWrap = true;
    this.accessibleModeInstructions.wordWrapWidth = this.game.world.width;

    this.normalModeTitle = this.game.add.text(20, 360, "Modo Normal", this.fontStyleSubtitle);
    this.normalModeTitle.wordWrap = true;
    this.normalModeTitle.wordWrapWidth = this.game.world.width - 20;

    var normalModeInstructionsText = "* Utilize as setas direcionais para movimentar Zac nas 4 direções.";
    // normalModeInstructionsText += "\n * Utilize a tecla P para pausar o jogo.";
    this.normalModeInstructions = this.game.add.text(20, 400, normalModeInstructionsText, this.fontStyleOptions);
    this.normalModeInstructions.wordWrap = true;
    this.normalModeInstructions.wordWrapWidth = this.game.world.width - 20;
  },

  backToMenu: function(){
    this.state.start('MainMenu');
  }
}
