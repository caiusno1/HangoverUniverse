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
    up = false;
    down = false;
    right = false;
    left = false;
    interact = false;
};
var bookIsFrontLebenserhaltungsraum = false;
var bookImgLebenserhaltungsraum = undefined;
var eventHintImg = undefined;
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
        /*graphics.lineStyle(4, 0xffd900, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);
*/
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
        this.registerevent(changeRoomToGang3,1650,1460,225,250,"test");
        debugEvents(this);

        //this.registerevent(showBook,800,750,200,200,"test");

        //Book Lebenserhaltungsraum
        this.registerevent(showBookLebenserhaltungsraum,1750,500,100,130,"test");
        this.registerevent(sauerstoffAnAus,1400,300,200,200,"test");

        //Nur ein Key (TEST 1/2)
        //var key = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        //key.onDown = this.onSpacePress;

        this.game.Hud.start();
        this.game.Hunger.start();
        this.game.Oxygen.usk(this.cache.getJSON('Lebenserhaltung_lev').sauerstoff);
        this.game.Leben.healing();

        if(this.game.device.desktop == true) {
          return;
        }
        else {
          // load touch buttons here
          //alert("MOBIL");
          var btn_up_key = this.game.add.button(200, this.game.height-475, 'btn_up', this.actionOnClick, this, 2, 1, 0);
          btn_up_key.onInputDown.add(btn_up_down, this);
          btn_up_key.onInputUp.add(btn_up_up, this);
          var btn_down = this.game.add.button(200, this.game.height-225, 'btn_down', this.actionOnClick, this, 2, 1, 0);
          btn_down.onInputDown.add(btn_down_down, this);
          btn_down.onInputUp.add(btn_down_up, this);
          var btn_left = this.game.add.button(50, this.game.height-350, 'btn_left', this.actionOnClick, this, 2, 1, 0);
          btn_left.onInputDown.add(btn_left_down, this);
          btn_left.onInputUp.add(btn_left_up, this);
          var btn_right = this.game.add.button(350, this.game.height-350, 'btn_right', this.actionOnClick, this, 2, 1, 0);
          btn_right.onInputDown.add(btn_right_down, this);
          btn_right.onInputUp.add(btn_right_up, this);
          var btn_interact = this.game.add.button(1700, this.game.height-350, 'btn_interact', this.interact, this, 2, 1, 0);
          btn_interact.onInputDown.add(btn_interact_down, this);
          btn_interact.onInputUp.add(btn_interact_up, this);
        }
    },

    //Nur ein Key (TEST 2/2)
    /*onSpacePress: function () {
      //eval(element.callbackfn)(self,element.sender);
      //showBook(self, element.sender);
    },*/

    //Update Function - durchgehend kontinuierlich aufgerufen vom Spiel
    update: function () {

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.W) ||this.up)
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
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.S) || this.down)
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
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.A) || this.left)
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
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.D) || this.right)
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
        eventHintImgCounter=eventHintImgCounter+1;
        if(debugcounter==100)
        {
            console.log(player.x+"/"+player.y);
            debugcounter=0;
        }
        if(eventHintImgCounter >= 10) {
          showEventHint(self, false);
          eventHintImgCounter = 0;
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
      //var graphics=this.game.add.graphics(0,0);
      //graphics.lineStyle(4,0xffd900,1);
      //graphics.drawRect(x,y,width,height);
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
            showEventHint(self, true);
            if(self.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR) || self.interact)
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
function btn_up_down() {
  //alert("up down");
  this.up = true;
}
function btn_up_up() {
  //alert("up up");
  this.up = false;
}
function btn_down_down() {
  //alert("up down");
  this.down = true;
}
function btn_down_up() {
  //alert("up up");
  this.down = false;
}
function btn_right_down() {
  //alert("up down");
  this.right = true;
}
function btn_right_up() {
  //alert("up up");
  this.right = false;
}
function btn_left_down() {
  //alert("up down");
  this.left = true;
}
function btn_left_up() {
  //alert("up up");
  this.left = false;
}
function btn_interact_up() {
  this.interact = false;
}
function btn_interact_down() {
  this.interact = true;
}
function changeRoomToGang3(self,sender)
{
  self.game.spawnposition={x:1100,y:450};
  self.game.state.start("Gang_lev");
}
function showEventHint(self, toShow) {
  if (toShow) {
    //Event Image
    if (!eventHintImg) {
      eventHintImg = self.game.add.sprite(self.game.world.width-50,self.game.world.height-50,"eventHintImg",this);
    }
  }
  else {
    if (eventHintImg) {
      eventHintImg.destroy();
      eventHintImg = undefined;
    }
  }
}
function showBookLebenserhaltungsraum(self,sender)
{
  if (!bookImgLebenserhaltungsraum) {
    //book Image
    bookImgLebenserhaltungsraum = self.game.add.sprite(self.game.world.centerX,0,"bookImgLebenserhaltungsraum",this);
    bookIsFrontLebenserhaltungsraum = true;
  }
  else {
    bookImgLebenserhaltungsraum.destroy();
    bookIsFrontLebenserhaltungsraum = false;
    bookImgLebenserhaltungsraum = undefined;
  }
}
function sauerstoffAnAus(self, sender) {
    self.cache.getJSON('Vorrat_lev').sauerstoff = 0;
}
