Leben = function (game) {
  this.alive = true;
  this.game = game;
};

Leben.prototype = {

    /**
    * The Game Objects Hunger value. This is a handy property for setting and manipulating Hunger on a Game Object.
    *
    * It can be used in combination with the `damage` method or modified directly.
    *
    * @property {number} leben
    * @default
    */
    leben: 100,

    /**
    * The Game Objects maximum Hunger value. This works in combination with the `heal` method to ensure
    * the Hunger value never exceeds the maximum.
    *
    * @property {number} maxLeben
    * @default
    */
    maxLeben: 100,

    /**
    * Damages the Game Object. This removes the given amount of Hunger from the `Hunger` property.
    *
    * If Hunger is taken below or is equal to zero then the `kill` method is called.
    *
    * @member
    * @param {number} amount - The amount to subtract from the current `Hunger` value.
    * @return {Phaser.Sprite} This instance.
    */
    damage: function (amount) {

        if (this.alive)
        {
            this.leben -= amount;
            if (this.leben <= 0)
            {
                this.game.state.start("GameOver");

            }
        }

        return this;

    },

    /**
    * Sets the Hunger property of the Game Object to the given amount.
    * Will never exceed the `maxHunger` value.
    *
    * @member
    * @param {number} amount - The amount to set the `Hunger` value to. The total will never exceed `maxHunger`.
    * @return {Phaser.Sprite} This instance.
    */
    setLeben: function (amount) {

        this.leben = amount;

        if (this.leben > this.maxLeben)
        {
            this.leben = this.maxLeben;
        }

        return this;

    },

    getLeben: function () {

        return this.leben;

    },

    /**
    * Heal the Game Object. This adds the given amount of Hunger to the `Hunger` property.
    *
    * @member
    * @param {number} amount - The amount to add to the current `Hunger` value. The total will never exceed `maxHunger`.
    * @return {Phaser.Sprite} This instance.
    */
    heal: function (amount) {

        if (this.alive)
        {
            this.leben += amount;

            if (this.leben > this.maxLeben)
            {
                this.leben = this.maxLeben;
            }
        }

        return this;

    },

    healing: function(){
      if(this.game.Hunger.getHunger()>=80){
        this.game.Leben.start();
      }
      else{
        this.game.Leben.stop();
      }
    },



    updateCounter: function(){
      this.heal(1);
    },
    start: function(){
      this.timerEvents=this.game.time.events.loop(Phaser.Timer.SECOND*4,  this.updateCounter, this);
    },
    stop:function(){
      this.game.time.events.remove(this.timerEvents);
    }

};
