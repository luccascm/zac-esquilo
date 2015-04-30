ZacEsquilo.OneSwitchManager = function(options, interval, game, soundEffect){
  this.options = options;
  this.interval = interval;
  this.game = game;
  
  this.selected = 0;
  if (ZacEsquilo.config.soundEffects){
    this.soundEffect = soundEffect;
  }
  else{
    this.soundEffect = false;
  }
};

ZacEsquilo.OneSwitchManager.prototype = {
  // selected: 0,
  start: function(){
    // Seta opcao freezeFrames para true
    for (var i = 0; i < this.options.length; i++){ this.options[i].freezeFrames = true; }

    // Seta o frame do primeiro item para 1
    this.options[0].frame = 1;
    this.timer1 = this.game.time.events.loop(Phaser.Timer.SECOND * this.interval, this.changeState, this);
    this.timer1.timer.start();

    // associar o this.oneSwitchPressed a um evento de teclado
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);
    this.key = this.game.input.keyboard.addKey(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);
    this.key.onDown.add(this.oneSwitchPressed, this);
  },

  stop: function(){
    this.timer1.timer.remove(this.timer1);
    this.key.onDown.remove(this.oneSwitchPressed, this);
  },

  changeState: function(){
    // armazenar o item atualmente selecionado: var previouslySelctd = this.selected;
    var previouslySelected = this.selected;

    this.selected   = ((this.selected + 1) % this.options.length);

    // recuperar o item da lista options com o indice this.selected
    var curr_item = this.options[this.selected];

    if (this.soundEffect){
      this.switch_option_sound = this.game.add.audio('switch_option', 2, false);
      this.switch_option_sound.play();
    }

    // definir o frame desse item para o frame selecionado
    curr_item.frame = (curr_item. frame + 1) % 2;

    // recuperar o item da lista options com indice previouslySelected
    var prev_item = this.options[previouslySelected];

    // definir o frame desse item para o frame que nao esta selecionado
    prev_item.frame = ((prev_item.frame + 1) % 2);
  },

  oneSwitchPressed: function() {
    // recuperar o item da lista que esta selecionado
    var sel_item = this.options[this.selected];

    // executar a acao de clique desse botao (acredito que o phaser possibilite que voce chame button.click())
    sel_item.events.onInputUp.dispatch(sel_item, null);

  }
};
