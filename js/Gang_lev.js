/**
 * Created by Schlag on 01.07.2016
 */
var Gang_lev = function(game){
    rotateDirection = 1;
    isShielded = false;
    isBoosted = false;
    eventList=[];
    var bounds;
    flag_alreadydown=false;
};
var bookImgKeinZutritt = undefined;

Gang_lev.prototype = {


    create : function(){
        bounds = new Phaser.Rectangle(350, 400, 1250, 300);

        this.eventList=[];
        //Steuerung und Physik reinladen
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //BackgroundTile hinzufuegen
        bgTileSprite = this.game.add.tileSprite(0, 0, 1920, 1080, 'bgTutGang');
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
        //this.eventList =  this.cache.getJSON('Gang_lev');
        this.registerevent(changeRoomBackDoor,350,400,100,200,"back");
        this.registerevent(changeRaumVorrat,600,400,200,100,"vorrat");
        this.registerevent(changeRaumLebenserhaltung,1100,400,200,100,"Lebenserhaltung");


        //this.debugEvents();

        //Book KeinZutritt

        //ComHUD
        this.game.Hud.start();
        this.game.Hunger.start();
        this.game.Oxygen.usk(this.cache.getJSON('Gang_lev').sauerstoff);
        this.game.Leben.healing();
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
            player.animations.play('bottomLEft');
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
      this.eventList.forEach(function(element){
        var graphics=self.game.add.graphics(element.x,element.y);
        graphics.lineStyle(4,0xffd900,1);
        graphics.drawRect(0,0,element.width,element.height);
      });

    }



};
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
