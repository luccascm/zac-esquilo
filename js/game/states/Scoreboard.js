// This example uses the Phaser 2.2.2 framework

// Copyright © 2015 Michael Dobekidis
// Licensed under the terms of the MIT License
var reg = {};
ZacEsquilo.Scoreboard = function(game) { this.reg = {}; };

ZacEsquilo.Scoreboard.prototype = {
  preload: function(){},

  create: function(){
    this.reg.modal = new gameModal(this.game);
    this.createModals();
    this.showModal1();
  },

  createModals: function(){
    this.reg.modal.createModal({
      type:"modal1",
      includeBackground: true,
      modalCloseOnInput: true,
      itemsArr: [
        {
          type: "text",
          content: "Simple Text with Modal background, \n nothing fancy here...",
          fontFamily: "Luckiest Guy",
          fontSize: 38,
          color: "0xFEFF49",
          offsetY: -50,
          stroke: "0x000000",
          strokeThickness: 5
        }
      ]
    });
  },

  showModal1: function(){
    reg.modal.showModal("modal1");
  }

}