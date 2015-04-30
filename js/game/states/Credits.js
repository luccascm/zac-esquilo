ZacEsquilo.Credits = function() {};

ZacEsquilo.Credits.prototype = {
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
      ], ZacEsquilo.config.oneSwitchSpeed, this.game);
      oneswitchmanager.start();
    }
  },

  createText: function() {
    this.fontStyleTitle = { font: "30px Revalia", fill: "#330033", align: "left"};
    this.fontStyleSubtitle = { font: "25px Revalia", fill: "#330033", align: "left"};
    this.fontStyleOptions = { font: "25px Bubblegum Sans", fill: "#330033", align: "left"};

    this.creditsTitle = this.game.add.text(20, 30, "Créditos", this.fontStyleTitle);
    this.creditsTitle.anchor.setTo(0);

    this.developedByText = this.game.add.text(this.game.world.centerX, 140, "Desenvolvido por:", this.fontStyleSubtitle);
    this.gameDeveloperText = this.game.add.text(this.game.world.centerX, 170, "Lucas Medeiros", this.fontStyleOptions);

    this.developedByText.wordWrap = true;
    this.developedByText.wordWrapWidth = this.game.world.width - 20;
    this.developedByText.anchor.setTo(0.5);

    this.gameDeveloperText.wordWrap = true;
    this.gameDeveloperText.wordWrapWidth = this.game.world.width - 20;
    this.gameDeveloperText.anchor.setTo(0.5);

    this.colaboratorsText = this.game.add.text(this.game.world.centerX, 230, "Colaboradores:", this.fontStyleSubtitle);
    var gameColaborators = "Letícia Rocha \n Flávio Coutinho \n Yuri Bolivar \n Bruno Machado";
    this.gameColaboratorsText = this.game.add.text(this.game.world.centerX, 250, gameColaborators, this.fontStyleOptions);

    this.colaboratorsText.wordWrap = true;
    this.colaboratorsText.wordWrapWidth = this.game.world.width - 20;
    this.colaboratorsText.anchor.setTo(0.5);

    this.gameColaboratorsText.wordWrap = true;
    this.gameColaboratorsText.wordWrapWidth = this.game.world.width - 20;
    this.gameColaboratorsText.anchor.setTo(0.5, 0);

  },

  backToMenu: function(){
    this.state.start('MainMenu');
  }
}
