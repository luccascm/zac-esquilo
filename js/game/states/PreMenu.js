ZacEsquilo.PreMenu = function() {};

ZacEsquilo.PreMenu.prototype = {
  preload: function(){
    this.load.spritesheet('oneSwitchOn', 'assets/images/buttons/teclaUnica.png', 256, 58, 2);
    this.load.spritesheet('oneSwitchOff', 'assets/images/buttons/modoTradicional.png', 256, 58, 2);
  },

  create: function(){
    // Botoes de seléção de modo one switch
    ZacEsquilo.switch_on = this.game.add.button(this.game.world.centerX/2, this.game.world.centerY + 50, 'oneSwitchOn', this.playOneSwitchOn, this, 1, 0);
    ZacEsquilo.switch_off = this.game.add.button(this.game.world.centerX + this.game.world.centerX/2 , this.game.world.centerY + 50, 'oneSwitchOff', this.playOneSwitchOff, this, 1, 0);
    ZacEsquilo.switch_on.anchor.setTo(0.5);
    ZacEsquilo.switch_off.anchor.setTo(0.5);

    // Funcao que cria o texto explicativo
    this.createText();

    // Listener (over, out) para botões de seleção de modo
    if (ZacEsquilo.config.oneSwitchActive){
      ZacEsquilo.switch_on.onInputOver.add(this.over,this);
      ZacEsquilo.switch_on.onInputOut.add(this.out,this);
      ZacEsquilo.switch_off.onInputOver.add(this.over,this);
      ZacEsquilo.switch_off.onInputOut.add(this.out,this);
    }
    else{
      ZacEsquilo.switch_on.onInputOver.add(null,this);
      ZacEsquilo.switch_on.onInputOut.add(null,this);
      ZacEsquilo.switch_off.onInputOver.add(null,this);
      ZacEsquilo.switch_off.onInputOut.add(null,this);
    }

    if (ZacEsquilo.config.music){
      ZacEsquilo.soundtrack = this.game.add.audio('main_theme', 0.3, true);
      ZacEsquilo.soundtrack.play();
    }

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
    var up_arrow = String.fromCharCode(24);
    this.switch_question = "É possível jogar este jogo utilizando apenas uma tecla ou do modo tradicional ( \u2191 \u2192 \u2193 \u2190 )";
    this.switch_question += "\n Escolha qual o modo desejado utilizando a";

    this.spacebarStyle = { font: "30px Comic Sans", fill: "#000088"};
    this.spacebar_string = "[ BARRA DE ESPAÇO ]" ;
    this.spacebarText = this.game.add.text(this.game.world.centerX, 210, this.spacebar_string, this.spacebarStyle);
    this.spacebarText.anchor.setTo(0.5, 0);
    this.spacebarText.fontWeight = "bold";
    this.spacebarText.setShadow(3, 1, 'rgba(0,0,0,0.4)', 2);

    this.fontStyle = { font: "25px Sigmar One", fill: "#330033", align: "center"};

    ZacEsquilo.switch_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2, this.switch_question, this.fontStyle);
    ZacEsquilo.switch_text.anchor.setTo(0.5);
    ZacEsquilo.switch_text.wordWrap = true;
    ZacEsquilo.switch_text.wordWrapWidth = this.game.world.width - 20;
  },

  over: function() {
    if (ZacEsquilo.config.oneSwitchActive){
      event.stopPropagation();
    }
  },

  out: function() {
  },

  // Inicia MainMenu com modo one switch ativado
  playOneSwitchOn: function() {
    this.state.start('MainMenu');
  },

  // Inicia MainMenu com modo one switch desativado
  playOneSwitchOff: function() {
    ZacEsquilo.mouse_events.disabled = true;
    ZacEsquilo.config.oneSwitchActive = false;
    this.state.start('MainMenu');
  }
};