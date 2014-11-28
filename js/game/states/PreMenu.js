ZacEsquilo.PreMenu = function() {};

ZacEsquilo.PreMenu.prototype = {
  preload: function(){
    this.load.spritesheet('oneSwitchOn', 'assets/images/accessible-mode-on.png', 188, 59, 2);
    this.load.spritesheet('oneSwitchOff', 'assets/images/accessible-mode-off.png', 188, 59, 2);
  },

  create: function(){
    ZacEsquilo.switchOn = this.game.add.button(this.game.world.centerX - 250, this.game.world.centerY, 'oneSwitchOn', this.actionOnClick, this, 1, 0);
    ZacEsquilo.switchOff = this.game.add.button(this.game.world.centerX + 150 , this.game.world.centerY, 'oneSwitchOff', this.actionOnClick, this, 1, 0);

    this.createText();
    
    ZacEsquilo.switchOn.onInputOver.add(this.over,this);
    ZacEsquilo.switchOn.onInputOut.add(this.out,this);

    this.game.time.events.add(1000, function() { ZacEsquilo.switchOn.frame = 1; }, this);
    

    ZacEsquilo.switchOff.onInputOver.add(this.over,this);
    ZacEsquilo.switchOff.onInputOut.add(this.out,this);
    
    
    this.game.time.events.add(500, function(){
      ZacEsquilo.switchOn;
    }, this);


    // instanciar um oneswitchmanager
    // var oneswitchmanager = new ZacEsquilo.OneSwitchManager([
    //   ZacEsquilo.switchOn,
    //   ZacEsquilo.switchOff
    // ], 2000);
    // oneswitchmanager.start();
  },

  createText: function() {
    ZacEsquilo.switchText = null;

    // this.fontStyle = { font: "20px Arial", fill: "#330033", align: "center"};
    this.fontStyle = { font: "25px Sigmar One", fill: "#330033", align: "center"};

    var switchQuestion = "O modo de jogo acessível (One Switch) está ativado. \n Pressione a barra de espaço para \n selecionar a opção desejada. "

    ZacEsquilo.switchText = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2, switchQuestion, this.fontStyle);
    ZacEsquilo.switchText.anchor.setTo(0.5);
  },

  over: function() {
    console.log('button over');
  },

  out: function() {
    console.log('button out');
  },

  actionOnClick: function() {
    this.state.start('MainMenu');
    console.log('button click');
  }
};