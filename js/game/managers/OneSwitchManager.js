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
    this.timer1.timer.start();

    // associar o this.oneSwitchPressed a um evento de teclado 
     
  },
  
  stop: function(){
    // this.time.stop();
  },
  
  changeState: function(){
    // armazenar o item atualmente selecionado: var previouslySelctd = this.selected;
    var previouslySelected = this.selected;
    console.log("prev-s: " + previouslySelected);
    console.log("opt-l: "+this.options.length);
    console.log("this.selected before: "+this.selected);
    // atualizar variavel selected
    this.selected   = ((this.selected + 1) % this.options.length);
    console.log("this.selected after: "+this.selected);

    // recuperar o item da lista options com o indice this.selected
    var curr_item = this.options[this.selected];
    console.log("curr-s: " + curr_item.key);
    
    // definir o frame desse item para o frame selecionado
    curr_item.frame = (curr_item. frame + 1) % 2;
    console.log("curr_frame: " + curr_item.frame);
    
    // recuperar o item da lista options com indice previouslySelected
    var prev_item = this.options[previouslySelected];
    console.log("prev: " + prev_item.key);
    
    // definir o frame desse item para o frame que nao esta selecionado
    prev_item.frame = ((prev_item.frame + 1) % 2);
    console.log("prev_frame: " + prev_item.frame);
  },

  oneSwitchPressed: function() {
    // recuperar o item da lista que esta selecionado

    // executar a acao de clique desse botao (acredito que o phaser possibilite que voce chame button.click())
  }
};
