ZacEsquilo.OneSwitchManager = function(options, interval, game){
  this.options = options;
  this.interval = interval;
  this.game = game;
  // this.timer1 = this.game.time.create(false);
  this.timer1 = this.game.time.events.loop(Phaser.Timer.SECOND * this.interval, this.changeState, this);
  this.selected = 0;
};

ZacEsquilo.OneSwitchManager.prototype = {
  // selected: 0,
  start: function(){
    // Seta o frame do primeiro item para 1
    this.options[0].frame = 1;
    this.timer1.timer.start();

    // associar o this.oneSwitchPressed a um evento de teclado
    var key = this.game.input.keyboard.addKey(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);
    key.onDown.add(this.oneSwitchPressed, this);
  },

  stop: function(){
    // this.time.stop();
  },

  changeState: function(){

    // armazenar o item atualmente selecionado: var previouslySelctd = this.selected;
    var previouslySelected = this.selected;

    this.selected   = ((this.selected + 1) % this.options.length);

    // recuperar o item da lista options com o indice this.selected
    var curr_item = this.options[this.selected];

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
