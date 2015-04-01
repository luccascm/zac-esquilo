ZacEsquilo.PreMenu = function() {};

ZacEsquilo.PreMenu.prototype = {
  preload: function(){
    this.load.spritesheet('oneSwitchOn', 'assets/images/buttons/accessibleOn.png', 189, 58, 2);
    this.load.spritesheet('oneSwitchOff', 'assets/images/buttons/accessibleOff.png', 189, 58, 2);
  },

  create: function(){
    // Botoes de seléção de modo one switch
    ZacEsquilo.switch_on = this.game.add.button(this.game.world.centerX - 250, this.game.world.centerY, 'oneSwitchOn', this.playOneSwitchOn, this, 1, 0);
    ZacEsquilo.switch_off = this.game.add.button(this.game.world.centerX + 150 , this.game.world.centerY, 'oneSwitchOff', this.playOneSwitchOff, this, 1, 0);

    // Funcao que cria o texto explicativo
    this.createText();

    // Listener (over, out) para botões de seleção de modo
    ZacEsquilo.switch_on.onInputOver.add(this.over,this);
    ZacEsquilo.switch_on.onInputOut.add(this.out,this);

    ZacEsquilo.switch_off.onInputOver.add(this.over,this);
    ZacEsquilo.switch_off.onInputOut.add(this.out,this);

    soundtrack = this.game.add.audio('main_theme');
    soundtrack.play();

    // Define botão switch_on como selecionado a priori
    this.game.time.events.add(200, function(){
      ZacEsquilo.switch_on;
    }, this);

    // Instancia um oneswitchmanager
    var oneswitchmanager = new ZacEsquilo.OneSwitchManager([
      ZacEsquilo.switch_on,
      ZacEsquilo.switch_off
    ], 2, this.game);
    oneswitchmanager.start();
  },

  createText: function() {
    ZacEsquilo.switch_text = null;
    this.switch_question = "O modo de jogo acessível (One Switch) está ativado. \n Pressione a barra de espaço para \n selecionar a opção desejada. "

    // this.fontStyle = { font: "20px Arial", fill: "#330033", align: "center"};
    this.fontStyle = { font: "25px Sigmar One", fill: "#330033", align: "center"};


    ZacEsquilo.switch_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2, this.switch_question, this.fontStyle);
    ZacEsquilo.switch_text.anchor.setTo(0.5);
    ZacEsquilo.switch_text.wordWrap = true;
    ZacEsquilo.switch_text.wordWrapWidth = this.game.world.width - 20;
  },

  over: function() {
  },

  out: function() {
  },

  // Inicia MainMenu com modo one switch ativado
  playOneSwitchOn: function() {
    this.state.start('MainMenu');
  },

  // Inicia MainMenu com modo one switch desativado
  playOneSwitchOff: function() {
    ZacEsquilo.config.oneSwitchActive = false;
    this.state.start('MainMenu');
  }
};
