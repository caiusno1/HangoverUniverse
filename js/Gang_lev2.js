/**
 * Created by Schlag on 01.07.2016
 */
var Gang_lev2 = function(game){
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
var bookImgKeinZutritt = undefined;
Gang_lev2.id = "Gang2_lev";
Gang_lev2.doors = ["DoorHorizontal180GangLeft","DoorHorizontal180GangTopFirst","DoorHorizontal180GangTopSecond","DoorHorizontal180GangRight"];

Gang_lev2.prototype = {


    create : function(){
        bounds = new Phaser.Rectangle(350, 400, 1250, 300);

        this.eventList=[];
        //Steuerung und Physik reinladen
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //BackgroundTile hinzufuegen
        bgTileSprite = this.game.add.tileSprite(1920, 1130, 1920, 1080, 'bgTutGang');
        bgTileSprite.angle=180;
        //Sprite hinzufuegen und auf Spieler setzen
        player = this.game.add.sprite(200,500,'playerRocket');

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
        player.animations.play('right');

        //Player mit Physics
        this.game.physics.arcade.enable(player);

        //Player Initialwerte
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        player.body.width = 50;
        player.body.height = 50;

        if(this.game.spawnposition)
        {
            player.position.x=this.game.spawnposition.x;
            player.position.y=this.game.spawnposition.y;
        }

        //Particle Dirtline
        emitter1 = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);
        emitter1.makeParticles( [ 'turbine1', 'turbine2'] );

        //Bounds-Rechteck
        /*var graphics = this.game.add.graphics(bounds.x, bounds.y);
        graphics.lineStyle(4, 0xffd900, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);
*/

        //Worldbounds
        player.body.collideWorldBounds = true;
        this.eventList =  this.cache.getJSON('Gang_lev2').events;
        //this.registerevent(changeRoomBackDoor,350,480,100,200,"back");
        //this.registerevent(changeRaumVorrat,600,650,200,100,"vorrat");
        //this.registerevent(changeRaumLebenserhaltung,1100,650,200,100,"Lebenserhaltung");


        debugEvents(this);

        //Book KeinZutritt
        //this.registerevent(showBookKeinZutritt,1500,510,100,150,"test");

        //ComHUD
        this.game.Hud.start();
        this.game.Hunger.start();
        this.game.Oxygen.usk(this.cache.getJSON('Gang_lev2').sauerstoff);
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


    //Update Function - durchgehend kontinuierlich aufgerufen vom Spiel
    update: function () {

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
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.A) || this.left)
      {
          if(player.x>=(bounds.x+30))
            player.x=player.x-5;
          if(this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
            player.animations.play('topLeft');
          } else if(this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
            player.animations.play('bottomLEft');
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
        if(debugcounter==100)
        {
            console.log(player.x+"/"+player.y);
            debugcounter=0;
        }

        this.askevent();
        this.game.Hud.updateHud();
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
      //var graphics=this.game.add.graphics(x,y);
      //graphics.lineStyle(4,0xffd900,1);
      //graphics.drawRect(0,0,width,height);
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
function changeRoomBackDoor(self,sender)
{
  self.game.spawnposition={x:1600,y:400};
  self.game.state.start("TheGame");

}
function changeRaumVorrat(self,sender)
{
  self.game.spawnposition={x:1330,y:1490};
  self.game.state.start("Vorrat_lev");
}
function changeRaumLebenserhaltung(self,sender)
{
  self.game.spawnposition={x:1775,y:1650};
  self.game.state.start("Lebenserhaltung_lev");
}
function showBookKeinZutritt(self,sender)
{
  if (!bookImgKeinZutritt) {
    //book Image
    bookImgKeinZutritt = self.game.add.sprite(self.game.world.centerX,0,"bookImgKeinZutritt",this);
  }
  else {
    bookImgKeinZutritt.destroy();
    bookImgKeinZutritt = undefined;
  }
}
