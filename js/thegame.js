/**
 * Created by Schlag on 01.07.2016
 */
var thegame = function(game) {
    rotateDirection = 1;
    isShielded = false;
    isBoosted = false;
    eventList=[];
    var bounds;
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

        //Bounds-Rechteck(test)
        var graphics = this.game.add.graphics(bounds.x, bounds.y);
        graphics.lineStyle(4, 0xffd900, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);
        graphics.drawRect(500, 300, 200, 100);
        //Worldbounds
        player.body.collideWorldBounds = true;
        //this.eventList =  this.cache.getJSON('spawn_lev').events;
        this.registerevent(changeRoomToGang1,1425,270,200,200,"test");
        //this.debugEvents();
        this.game.Hud.start();
        this.game.Hunger.start();
        this.game.Oxygen.usk(this.cache.getJSON('spawn_lev').sauerstoff);
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
        this.game.Hud.updateHud();
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
