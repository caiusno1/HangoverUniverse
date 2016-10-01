var gameinit = function(game){
};

gameinit.prototype = {
    create: function() {

      this.game.Leben = new Leben(this.game);
      this.game.Leben.setLeben(100);
      this.game.Hunger = new Hunger(this.game);
      this.game.Hunger.setHunger(100);
      this.game.Oxygen = new Oxygen(this.game);
      this.game.Oxygen.setOxygen(100);
      this.game.Hunger.start();
      this.game.Hud = new Hud(this.game);
      this.game.state.start("TheGame");


    }
};
