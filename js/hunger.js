Hunger = function (game) {
  this.alive = true;
  this.game = game;

};

Hunger.prototype = {

    /**
    * The Game Objects Hunger value. This is a handy property for setting and manipulating Hunger on a Game Object.
    *
    * It can be used in combination with the `damage` method or modified directly.
    *
    * @property {number} hunger
    * @default
    */
    hunger: 100,

    /**
    * The Game Objects maximum Hunger value. This works in combination with the `heal` method to ensure
    * the Hunger value never exceeds the maximum.
    *
    * @property {number} maxHunger
    * @default
    */
    maxHunger: 100,
    lowHunger:0,

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
            this.hunger -= amount;
            if (this.hunger <= 20 && this.hunger>0)
            {
                this.game.Leben.damage(1);
            }
            else if (this.hunger <= this.lowHunger)
            {
                this.hunger = this.lowHunger;
                this.game.Leben.damage(4);
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
    setHunger: function (amount) {

        this.hunger = amount;

        if (this.hunger > this.maxHunger)
        {
            this.hunger = this.maxHunger;
        }

        return this;

    },

    getHunger: function () {

        return this.hunger;

    },

    /**
    * Heal the Game Object. This adds the given amount of Hunger to the `Hunger` property.
    *
    * @member
    * @param {number} amount - The amount to add to the current `Hunger` value. The total will never exceed `maxHunger`.
    * @return {Phaser.Sprite} This instance.
    */
    eat: function (amount) {

        if (this.alive)
        {
            this.hunger += amount;

            if (this.hunger > this.maxHunger)
            {
                this.hunger = this.maxHunger;
            }
        }

        return this;

    },

    updateCounter: function(){
      this.damage(1);
    },
    start: function(){
      this.timerEvents=this.game.time.events.loop(Phaser.Timer.SECOND*5,  this.updateCounter, this);
    },
    stop:function(){
      this.game.time.events.remove(this.timerEvents);
    }

};
