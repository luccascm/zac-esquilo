ZacEsquilo.OneSwitchManager = function(options, interval){
  this.options = options;
  this.interval = interval;
  this.timer = this.game.time.create(false);
  this.timer.loop(interval, this.changeState(), this);
  this.selected = 0;
};

ZacEsquilo.OneSwitchManager.prototype = {
  start: function(){
    this.timer.start();

    // associar o this.oneSwitchPressed a um evento de teclado 
     
  },
  
  stop: function(){
    // this.time.stop();
  },
  
  changeState: function(){
    // armazenar o item atualmente selecionado: var previouslySelctd = this.selected;
    // atualizar variavel selected
    this.selected += ((this.selected + 1) % options.length);
    // recuperar o item da lista options com o indice this.selected

    // definir o frame desse item para o frame selecionado

    // recuperar o item da lista options com indice previouslySelected

    // definir o frame desse item para o frame que nao esta selecionado


  },

  oneSwitchPressed: function() {
    // recuperar o item da lista que esta selecionado

    // executar a acao de clique desse botao (acredito que o phaser possibilite que voce chame button.click())
  }
};
