/**
 * Created by Schlag on 01.07.2016
 */
var thegame = function(game){
    rotateDirection = 1;
    isShielded = false;
    isBoosted = false;
    var lifebar, hungerbar;
    var life = 100;
    var maxLife = 100;
    var alive = true;
    var bounds;
};

thegame.prototype = {

    create : function(){
        //Bounds-Rechteck
        bounds = new Phaser.Rectangle(350, 100, 1400, 900);

        //Steuerung und Physik reinladen
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //BackgroundTile hinzufuegen
        bgTileSprite = this.game.add.tileSprite(0, 0, 1920, 1080, 'bgStage');

        //Sprite hinzufuegen und auf Spieler setzen
        player = this.game.add.sprite(this.game.world.centerX,this.game.world.height-200,'playerRocket');

        //Auto Animation hinzufuegen
        player.animations.add('default', [0, 1, 2, 3], 10, true);

        //Auto Animation hinzufuegen
        player.animations.play('default');

        //Player mit Physics
        this.game.physics.arcade.enable(player, Phaser.Physics.ARCADE);

        //Player Initialwerte
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        player.body.width = 50;
        player.body.height = 50;

        //Particle Dirtline
        emitter1 = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);
        emitter1.makeParticles( [ 'turbine1', 'turbine2'] );

        //Bounds-Rechteck(test)
        var graphics = this.game.add.graphics(bounds.x, bounds.y);
        graphics.lineStyle(4, 0xffd900, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);

        //Worldbounds
        player.body.collideWorldBounds = true;

        eventList =  this.cache.getJSON('eventls');
        //this.registerevent(this.testEventHandler,1600,200,200,200,"test");
        alert(eventList);
        this.debugEvents();

        //hud
        this.hud();
    },


    //Update Function - durchgehend kontinuierlich aufgerufen vom Spiel
    update: function () {

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.W))
        {
          if(player.angle != 0)
            player.angle = 0;
          if(player.y>=(bounds.y+30))
            player.y = player.y-5;
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
            if(player.angle != 180)
              player.angle = 180;
            if(player.y<=(bounds.y+bounds.height-30))
              player.y=player.y+5;
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
            if(player.angle != 270)
              player.angle = 270;
            if(player.x>=(bounds.x+30))
              player.x=player.x-5;
            this.damage(1);
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
            if(player.angle != 90)
              player.angle = 90;
            if(player.x<=(bounds.x+bounds.width-30))
              player.x=player.x+5;
        }
        debugcounter=debugcounter+1;
        if(debugcounter==100)
        {
            console.log(player.x+"/"+player.y);
            debugcounter=0;
        }

        this.askevent();


        //Bei Mouseclick/Touchklick das Player-Movement Dash mit Partikel Effekt
        /*if (this.game.input.activePointer.leftButton.isDown)
        {
                this.particleDirtLine();
                this.dash();
        }

        //Sonst durchgehend Player rotieren
        else
            this.rotatePlayer();
      */
    },

    hud: function() {
      //Lifebar Image
      lifebar = this.game.add.sprite(this.game.world.width-600,this.game.world.height-60,"lifebar",this);
      hungerbar = this.game.add.sprite(this.game.world.width-300,this.game.world.height-60,"hungerbar",this);
    },

    damage: function (amount) {

        if (this.alive)
        {
            this.life -= amount;

            if (this.life <= 0)
            {
                this.kill();
            }
        }

        lifebar.width = this.life;
        console.log(this.life);
        return this;

    },

    setLife: function (amount) {

        this.life = amount;

        if (this.life > this.maxLife)
        {
            this.life = this.maxLife;
        }

        lifebar.width = life;
        return this;

    },

    getLife: function () {

        return this.life;

    },

    heal: function (amount) {

        if (this.alive)
        {
            this.life += amount;

            if (this.life > this.maxLife)
            {
                this.life = this.maxLife;
            }
        }

        lifebar.width = life;
        return this;

    },

    //Player-Rotation
    rotatePlayer : function()
    {
        player.angle +=rotationSpeed * rotateDirection;

    },

    //Player nach vorne Gas Geben 'DASH'
    dash : function()
    {
        player.angle +=0 ;
        this.game.physics.arcade.velocityFromAngle(player.angle + 90, playerDashSpeed, player.body.velocity);
    },

    //PartikelSystem für Player-Dirtlines hinter sich her ziehen
    particleDirtLine : function()
    {
        var px = player.angle;
        var py = player.angle;

        emitter1.minParticleSpeed.set(px,py);
        emitter1.maxParticleSpeed.set(px,py);

        emitter1.x = player.x;
        emitter1.y = player.y;

        emitter1.start(true, playerParticleLifetime,null,playerParticleAmount);
    },
    registerevent: function(callbackfn,x,y,width,height,sender){
      newevent={"x":x,"y":y,"width":width,"height":height,"sender":sender,"callbackfn":callbackfn};
      var graphics=this.game.add.graphics(x,y);
      graphics.lineStyle(4,0xffd900,1);
      graphics.drawRect(0,0,width,height);
      eventList.push(newevent);

    },
    askevent: function()
    {
      var self=this;
      eventList.forEach(function(element){
        if(player.x>=element.x &&
           player.x<=element.x+element.width &&
           player.y>=element.y &&
           player.y<=element.y+element.height)
        {
            if(self.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR))
            {
                eval(element.callbackfn)(element.sender);
            }
        }
      })
    },
    changeRoom: function()
    {
    },
    debugEvents: function()
    {
      var self=this;
      eventList.forEach(function(element){
        var graphics=self.game.add.graphics(element.x,element.y);
        graphics.lineStyle(4,0xffd900,1);
        graphics.drawRect(0,0,element.width,element.height);
      });

    },

};
function testEventHandler()
{
  alert("Hallo");
}
