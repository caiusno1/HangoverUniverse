/**
 * Created by Schlag on 01.07.2016
 */
var Vorrat_lev = function(game){
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

Vorrat_lev.id = "Vorrat_lev";
Vorrat_lev.doors = ["DoorVorratBot"];

var style = { font: "20px Roboto", fill: "#FFFFFF", align: "center", stroke:"black",strokeThickness: 3 };
var eventHintImg = undefined;

Vorrat_lev.prototype = {

    create : function(){
        //Bounds-Rechteck
        bounds = new Phaser.Rectangle(1200, 250, 700, 1300);

        this.eventList=[];
        this.fire = true;
        //Steuerung und Physik reinladen
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //BackgroundTile hinzufuegen
        var imggroup=this.game.add.group();
        bgTileSprite = this.game.add.image(0, 0,'bgVorrat');
        bgTileSprite.x=1000;
        imggroup.add(bgTileSprite);

        //Bounds-Rechteck(test)
        var graphics = this.game.add.graphics(bounds.x, bounds.y);

        //Sprite hinzufuegen und auf Spieler setzen
        player = this.game.add.sprite(1330,1490,'playerRocket');
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

        //FEUER!!!!
        this.emitter1 = this.game.add.emitter(800, 400, 400);
        this.emitter1.makeParticles(['fire1', 'fire2' ,'fire3']);
        this.emitter1.gravity = -300;
        this.emitter1.maxRotation = 90;
        this.emitter1.setAlpha(0.8, 0, 3000);
        this.emitter1.setScale(1, 0.5, 1, 1);
        this.emitter1.start(false, 600, 100);

        //Worldbounds
        player.body.collideWorldBounds = false;
        //this.eventList =  this.cache.getJSON('Vorrat_lev');
        this.registerevent(changeRoom,1280,1430,1460-1280,1525-1430,"DoorVorratBot");
        this.registerevent(essenTrigger,1280,425,1425-1280,615-425,"test");
        this.registerevent(todDurchFeuer,1000, 590, 1710-1355+600, 905-845+300, "tod");

        this.game.Hud.start();
        this.game.Hunger.start();
        this.game.Oxygen.usk(this.cache.getJSON('Vorrat_lev').sauerstoff);
        this.game.Leben.healing();
        CreationDebug();

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


    //Update Function - durchgehend kontinuierlich aufgerufen vom Spiel
    update: function () {
      if(this.cache.getJSON('Vorrat_lev').sauerstoff=='0') {
        this.fire = false;
        if(this.emitter1 && this.emitter1.on)
          this.emitter1.on = false;
      }
        if(this.game.input.keyboard.isDown(Phaser.KeyCode.W) || this.up)
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
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.A) ||this.left)
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
        eventHintImgCounter=eventHintImgCounter+1;
        if(eventHintImgCounter >= 10) {
          showEventHint(self, false);
          eventHintImgCounter = 0;
        }

        this.askevent();
        this.game.Hud.updateHud();
        UpdateDebug(this);

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
            if(self.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR) ||self.interact)
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
            if(element.sender == "tod") {
              eval(element.callbackfn)(self,element.sender);
            }
        }
      })
    }
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
function essenTrigger(self,sender)
{
  self.game.Hunger.eat(50);
}
function todDurchFeuer(self, sender)
{
  if(self.fire)
    self.game.Leben.damage(1);
}
