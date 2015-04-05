// This example uses the Phaser 2.2.2 framework

// Copyright © 2015 Michael Dobekidis
// Licensed under the terms of the MIT License
ZacEsquilo.Scoreboard = function(game) { this.scoreText = null; };

ZacEsquilo.Scoreboard.prototype = {
  preload: function(){
    this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'forestBackground');
    
    this.restartKey = this.input.keyboard.addKey(Phaser.Keyboard[ZacEsquilo.config.oneSwitchKey]);

  },

  create: function(){
    this.preload_char = this.add.sprite(30, this.game.world.height - 190, 'zacStart');
    this.preload_char.scale = 0.4;

    this.createText();

    this.restartKey.onDown.add(this.restartGame,this);
    // this.reg.modal = new gameModal(this.game);
    // this.createModals();
    // this.showModal1();
  },

  createText: function(){
    this.fontStyle = { font: "25px Bubblegum Sans", fill: "#fff", align: "center"};
    this.scoreText = this.game.add.text(this.game.world.centerX, 100, "Parabéns! Você ajudou Zac a voltar para a floresta e venceu o jogo!", this.fontStyle);
    this.scoreText.anchor.setTo(0.5);
    this.scoreText.wordWrap = true;
    this.scoreText.wordWrapWidth = this.game.world.width - 30;

    this.playAgainText = this.game.add.text(this.game.world.centerX, 200, "Pressione espaço para jogar novamente", this.fontStyle);
    this.playAgainText.anchor.setTo(0.5);
    this.playAgainText.wordWrap = true;
    this.playAgainText.wordWrapWidth = this.game.world.width - 30;

  },

  update: function(){
    
  },

  restartGame: function(key){
    this.game.state.start('Boot');
  }
  // createModals: function(){
  //   this.reg.modal.createModal({
  //     type:"modal1",
  //     includeBackground: true,
  //     modalCloseOnInput: true,
  //     itemsArr: [
  //       {
  //         type: "text",
  //         content: "Parabéns!! Você ajudou Zac a voltar para a floresta e venceu o jogo!",
  //         fontFamily: "Luckiest Guy",
  //         fontSize: 38,
  //         color: "0xFEFF49",
  //         offsetY: -50,
  //         stroke: "0x000000",
  //         strokeThickness: 5
  //       }
  //     ]
  //   });
  // },

  // showModal1: function(){
  //   this.reg.modal.showModal("modal1");
  // }

}