/**
 * Created by Schlag on 01.07.2016
 */
var thegame = function(game) {
    rotateDirection = 1;
    isShielded = false;
    isBoosted = false;
    eventList=[];
    var lifebar, hungerbar, oxygenbar;
    var bounds;
    var lebenText, hungerText, oxygenText;
};
var style = { font: "20px Roboto", fill: "#FFFFFF", align: "center", stroke:"black",strokeThickness: 3 };

thegame.prototype = {

    create : function() {
        //Bounds-Rechteck
        bounds = new Phaser.Rectangle(350, 250, 1300, 650);

        this.eventList=[];
        //Steuerung und Physik reinladen
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //BackgroundTile hinzufuegen
        bgTileSprite = this.game.add.tileSprite(0, 0, 1920, 1080, 'bgStage');

        //Sprite hinzufuegen und auf Spieler setzen
        player = this.game.add.sprite(400,850,'playerRocket');

        //Auto Animation hinzufuegen
        player.animations.add('down', [0], 10);
        player.animations.add('bottomRight', [1], 10);
        player.animations.add('topRight', [2], 10);
        player.animations.add('right', [3], 10);
        player.animations.add('up', [4], 10);
        player.animations.add('bottomLeft', [5], 10);
        player.animations.add('left', [6], 10);
        player.animations.add('topLeft', [7], 10);

        //Auto Animation hinzufuegen
        player.animations.play('right');

        //Player mit Physics
        this.game.physics.arcade.enable(player, Phaser.Physics.ARCADE);

        //Player Initialwerte
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        player.body.width = 50;
        player.body.height = 50;

        if(this.game.spawnposition)
        {
            player.x=this.game.spawnposition.x;
            player.y=this.game.spawnposition.y;
        }

        //Particle Dirtline
        /*emitter1 = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);
        emitter1.makeParticles( [ 'turbine1', 'turbine2'] );
        emitter1.minRotation = 0;
        emitter1.maxRotation = 90;
        emitter1.minParticleSpeed.set(0, -100);
        emitter1.maxParticleSpeed.set(0, -100);
        emitter1.start(false, 1500, 200, 0);*/

        //Bounds-Rechteck(test)
        var graphics = this.game.add.graphics(bounds.x, bounds.y);
        graphics.lineStyle(4, 0xffd900, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);

        //Worldbounds
        player.body.collideWorldBounds = true;
        //this.eventList =  this.cache.getJSON('spawn_lev').events;
        this.registerevent(changeRoomToGang1,1425,270,200,200,"test");
        //this.debugEvents();
        //hud
        this.hud();
        this.game.Hunger.start();
    },


    //Update Function - durchgehend kontinuierlich aufgerufen vom Spiel
    update: function () {
        if(this.game.input.keyboard.isDown(Phaser.KeyCode.W))
        {
          if(player.y>=(bounds.y+30))
            player.y = player.y-5;
          if(this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
            player.animations.play('topLeft');
          } else if(this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
            player.animations.play('topRight');
          } else {
            player.animations.play('up');
          }
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.S))
        {
            if(player.y<=(bounds.y+bounds.height-30))
              player.y=player.y+5;
            if(this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
              player.animations.play('bottomLeft');
            } else if(this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
              player.animations.play('bottomRight');
            } else {
              player.animations.play('down');
            }
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.A))
        {
            if(player.x>=(bounds.x+30))
              player.x=player.x-5;
            if(this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
              player.animations.play('topLeft');
            } else if(this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
              player.animations.play('bottomLeft');
            } else {
              player.animations.play('left');
            }
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.D))
        {
            if(player.x<=(bounds.x+bounds.width-30))
              player.x=player.x+5;
            if(this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
              player.animations.play('topRight');
            } else if(this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
              player.animations.play('bottomRight');
            } else {
              player.animations.play('right');
            }
        }
        debugcounter=debugcounter+1;
        if(debugcounter==100)
        {
            console.log(player.x+"/"+player.y);
            debugcounter=0;
        }

        this.askevent();
        this.updateHud();

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
      lifebar = this.game.add.sprite(this.game.world.width-900,this.game.world.height-60,"lifebar",this);
      hungerbar = this.game.add.sprite(this.game.world.width-600,this.game.world.height-60,"hungerbar",this);
      oxygenbar = this.game.add.sprite(this.game.world.width-300,this.game.world.height-60,"oxygenbar",this);

      heartImg = this.game.add.sprite(this.game.world.width-960,this.game.world.height-60,"heartImg",this);
      hungerImg = this.game.add.sprite(this.game.world.width-660,this.game.world.height-60,"hungerImg",this);
      oxygenImg = this.game.add.sprite(this.game.world.width-360,this.game.world.height-60,"oxygenImg",this);

      lebenText = this.game.add.text(this.world.width-810, this.game.world.height-47, this.game.Leben.getLeben(),style);
      hungerText = this.game.add.text(this.world.width-510, this.game.world.height-47, this.game.Hunger.getHunger(),style);
      oxygenText = this.game.add.text(this.world.width-210, this.game.world.height-47, this.game.Oxygen.getOxygen(),style);
    },

    updateHud: function () {
      lifebar.width=this.game.Leben.getLeben()*2;
      hungerbar.width=this.game.Hunger.getHunger()*2;
      oxygenbar.width=this.game.Oxygen.getOxygen()*2;

      lebenText.destroy();
      lebenText = this.game.add.text(this.world.width-810, this.game.world.height-47, this.game.Leben.getLeben(),style);
      hungerText.destroy();
      hungerText = this.game.add.text(this.world.width-510, this.game.world.height-47, this.game.Hunger.getHunger(),style);
      oxygenText.destroy();
      oxygenText = this.game.add.text(this.world.width-210, this.game.world.height-47, this.game.Oxygen.getOxygen(),style);
    },

    registerevent: function(callbackfn,x,y,width,height,sender){
      newevent={"x":x,"y":y,"width":width,"height":height,"sender":sender,"callbackfn":callbackfn};
      var graphics=this.game.add.graphics(0,0);
      graphics.lineStyle(4,0xffd900,1);
      graphics.drawRect(x,y,width,height);
      this.eventList.push(newevent);

    },
    askevent: function()
    {
      var self=this;
      this.eventList.forEach(function(element){
        if(player.x>=element.x &&
           player.x<=element.x+element.width &&
           player.y>=element.y &&
           player.y<=element.y+element.height)
        {
            if(self.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR))
            {
                eval(element.callbackfn)(self,element.sender);
            }
        }
      })
    },
    debugEvents: function()
    {
      var self=this;
      var graphics=self.game.add.graphics(0,0);
      graphics.lineStyle(4,0xffd900,1);
      this.eventList.forEach(function(element){
        graphics.drawRect(element.x,element.y,element.width,element.height);
      });

    },

};
function changeRoomToGang1(self,sender)
{
  self.game.spawnposition={x:460,y:510};
  self.game.state.start("Gang_lev");
}
