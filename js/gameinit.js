var gameinit = function(game){
};

gameinit.prototype = {
    create: function(){

      this.game.Leben = new Leben();
      this.game.Leben.setLeben(100);
      this.game.Hunger = new Hunger();
      this.game.Hunger.setHunger(100);
      this.game.state.start("TheGame");
    }
};
