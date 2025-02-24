Oxygen = function (game) {
  this.alive = true;
  this.game = game;
  this.oxyAn = false;
};

Oxygen.prototype = {

    /**
    * The Game Objects Oxygen value. This is a handy property for setting and manipulating Oxygen on a Game Object.
    *
    * It can be used in combination with the `damage` method or modified directly.
    *
    * @property {number} oxygen
    * @default
    */
    oxygen: 100,

    /**
    * The Game Objects maximum Oxygen value. This works in combination with the `heal` method to ensure
    * the Oxygen value never exceeds the maximum.
    *
    * @property {number} maxOxygen
    * @default
    */
    maxOxygen: 100,
    lowOxygen:   0,

    /**
    * Damages the Game Object. This removes the given amount of Oxygen from the `Oxygen` property.
    *
    * If Oxygen is taken below or is equal to zero then the `kill` method is called.
    *
    * @member
    * @param {number} amount - The amount to subtract from the current `Oxygen` value.
    * @return {Phaser.Sprite} This instance.
    */
    damage: function (amount) {


        if (this.alive)
        {
            this.oxygen -= amount;
            if (this.oxygen <= this.lowOxygen)
            {
              this.oxygen = this.lowOxygen;
                this.game.Leben.damage(5);
            }
        }

        return this;

    },

    /**
    * Sets the Oxygen property of the Game Object to the given amount.
    * Will never exceed the `maxOxygen` value.
    *
    * @member
    * @param {number} amount - The amount to set the `Oxygen` value to. The total will never exceed `maxOxygen`.
    * @return {Phaser.Sprite} This instance.
    */
    setOxygen: function (amount) {

        this.oxygen = amount;

        if (this.oxygen > this.maxOxygen)
        {
            this.oxygen = this.maxOxygen;
        }

        return this;

    },

    getOxygen: function () {

        return this.oxygen;

    },

    /**
    * Refill the Game Object. This adds the given amount of Oxygen to the `Oxygen` property.
    *
    * @member
    * @param {number} amount - The amount to add to the current `Oxygen` value. The total will never exceed `maxOxygen`.
    * @return {Phaser.Sprite} This instance.
    */
    refill: function (amount) {

        if (this.alive)
        {
            this.oxygen += amount;

            if (this.oxygen > this.maxOxygen)
            {
                this.oxygen = this.maxOxygen;
            }
        }

        return this;

    },
    usk: function(bool){
      if(bool=="1"){
        //console.log("Oxy");
        this.stop();
      }
      else {
        //console.log("NoOxy");
        this.start();
      }
    },

    updateCounter: function(){
      this.damage(1);
    },
    start: function(){
      this.oxyAn = true;
      this.timerEvents=this.game.time.events.loop(Phaser.Timer.SECOND,  this.updateCounter, this);
    },
    stop:function(){
      this.oxyAn = false;
      this.game.time.events.remove(this.timerEvents);
    }

};
