Hud = function (game) {
  var lifebar, hungerbar, oxygenbar;
  var lebenText, hungerText, oxygenText;
  this.game = game;
};

Hud.prototype = {
  start: function () {
    lifebar = this.game.add.sprite(this.game.world.width-900,this.game.world.height-60,"lifebar",this);
    hungerbar = this.game.add.sprite(this.game.world.width-600,this.game.world.height-60,"hungerbar",this);
    oxygenbar = this.game.add.sprite(this.game.world.width-300,this.game.world.height-60,"oxygenbar",this);

    heartImg = this.game.add.sprite(this.game.world.width-960,this.game.world.height-60,"heartImg",this);
    hungerImg = this.game.add.sprite(this.game.world.width-660,this.game.world.height-60,"hungerImg",this);
    oxygenImg = this.game.add.sprite(this.game.world.width-360,this.game.world.height-60,"oxygenImg",this);

    lebenText = this.game.add.text(this.game.world.width-810, this.game.world.height-47, this.game.Leben.getLeben(),style);
    hungerText = this.game.add.text(this.game.world.width-510, this.game.world.height-47, this.game.Hunger.getHunger(),style);
    oxygenText = this.game.add.text(this.game.world.width-210, this.game.world.height-47, this.game.Oxygen.getOxygen(),style);
  },

  updateHud: function () {
    lifebar.width=this.game.Leben.getLeben()*2;
    hungerbar.width=this.game.Hunger.getHunger()*2;
    oxygenbar.width=this.game.Oxygen.getOxygen()*2;

    lebenText.destroy();
    lebenText = this.game.add.text(this.game.world.width-810, this.game.world.height-47, this.game.Leben.getLeben(),style);
    hungerText.destroy();
    hungerText = this.game.add.text(this.game.world.width-510, this.game.world.height-47, this.game.Hunger.getHunger(),style);
    oxygenText.destroy();
    oxygenText = this.game.add.text(this.game.world.width-210, this.game.world.height-47, this.game.Oxygen.getOxygen(),style);
  }
};
