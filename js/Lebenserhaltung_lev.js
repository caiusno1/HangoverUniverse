/**
 * Created by Schlag on 01.07.2016
 */
var Lebenserhaltung_lev = function(game){
    rotateDirection = 1;
    isShielded = false;
    isBoosted = false;
    eventList=[];
    var bounds;
    flag_alreadydown=false;
};
var bookIsFront = false;
var bookImgLebenserhaltungsraum = undefined;
var style = { font: "20px Roboto", fill: "#FFFFFF", align: "center", stroke:"black",strokeThickness: 3 };

Lebenserhaltung_lev.prototype = {

    create : function(){
        //Bounds-Rechteck
        bounds = new Phaser.Rectangle(1450, 300, 450, 1350);

        this.eventList=[];
        //Steuerung und Physik reinladen
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //BackgroundTile hinzufuegen
        var imggroup=this.game.add.group();
        bgTileSprite = this.game.add.image(0, 0,'bgLebenserhaltung');
        bgTileSprite.x=1000;
        imggroup.add(bgTileSprite);

        //Bounds-Rechteck(test)
        var graphics = this.game.add.graphics(bounds.x, bounds.y);

        //Sprite hinzufuegen und auf Spieler setzen
        player = this.game.add.sprite(1600, 2000,'playerRocket');
        imggroup.add(player);
        imggroup.add(graphics);
        imggroup.scale.setTo(0.5,0.5);
        graphics.lineStyle(4, 0xffd900, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);

        //Auto Animation hinzufuegen
        player.animations.add('left', [0], 10);
        player.animations.add('down', [1], 10);
        player.animations.add('bottomRight', [2], 10);
        player.animations.add('topRight', [3], 10);
        player.animations.add('topLeft', [4], 10);
        player.animations.add('up', [5], 10);
        player.animations.add('bottomLeft', [6], 10);
        player.animations.add('right', [7], 10);

        //Auto Animation hinzufuegen
        player.animations.play('up');

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
        emitter1 = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);
        emitter1.makeParticles( [ 'turbine1', 'turbine2'] );

        //Worldbounds
        //this.eventList =  this.cache.getJSON('Lebenserhaltung_lev');
        this.registerevent(changeRoomToGang3,1720,1460,1820-1720,1570-1460,"test");
        //this.debugEvents();

        this.game.Hud.start();
        //this.registerevent(showBook,800,750,200,200,"test");

        //Book Lebenserhaltungsraum
        this.registerevent(showBook,1750,500,100,130,"test");

        //Nur ein Key (TEST 1/2)
        //var key = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        //key.onDown = this.onSpacePress;
        this.game.Oxygen.usk(this.cache.getJSON('Lebenserhaltung_lev').sauerstoff);
        this.game.Hunger.start();
    },

    //Nur ein Key (TEST 2/2)
    /*onSpacePress: function () {
      //eval(element.callbackfn)(self,element.sender);
      //showBook(self, element.sender);
    },*/

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
        this.game.Hud.updateHud();

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
                if (this.flag_alreadydown == false) {
                  eval(element.callbackfn)(self,element.sender);
                  this.flag_alreadydown = true;
                }
            }
            else {
              if (this.flag_alreadydown == true) {
                this.flag_alreadydown = false;
              }

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
function changeRoomToGang3(self,sender)
{
  self.game.spawnposition={x:1100,y:400};
  self.game.state.start("Gang_lev");
}
function showBook(self,sender)
{
  if (!bookImgLebenserhaltungsraum) {
    //book Image
    bookImgLebenserhaltungsraum = self.game.add.sprite(self.game.world.centerX,0,"bookImgLebenserhaltungsraum",this);
    bookIsFront = true;
  }
  else {
    bookImgLebenserhaltungsraum.destroy();
    bookIsFront = false;
    bookImgLebenserhaltungsraum = undefined;
  }
}
