/**
 * Created by Schlag on 01.07.2016
 */
var Gang_lev = function(game){
    rotateDirection = 1;
    isShielded = false;
    isBoosted = false;
    var lifebar, hungerbar;
    var lebenText, hungerText;
};

Gang_lev.prototype = {


    create : function(){
        this.eventList=[];
        //Steuerung und Physik reinladen
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //BackgroundTile hinzufuegen
        bgTileSprite = this.game.add.tileSprite(0, 0, 1920, 1080, 'bgTutGang');
        //Sprite hinzufuegen und auf Spieler setzen
        player = this.game.add.sprite(this.game.world.centerX-500,this.game.world.height-600,'playerRocket');

        //Auto Animation hinzufuegen
        player.animations.add('default', [0, 1, 2, 3], 10, true);

        //Auto Animation hinzufuegen
        player.animations.play('default');

        //Player mit Physics
        this.game.physics.arcade.enable(player);

        //Player Initialwerte
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        player.body.width = 50;
        player.body.height = 50;

        //Particle Dirtline
        emitter1 = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);
        emitter1.makeParticles( [ 'turbine1', 'turbine2'] );

        //Worldbounds
        player.body.collideWorldBounds = true;
        this.eventList =  this.cache.getJSON('Gang_lev');
        this.registerevent(changeRoomBackDoor,400,400,100,200,"back");
        this.debugEvents();

        //hud
        this.hud();
        this.updateHud();
    },


    //Update Function - durchgehend kontinuierlich aufgerufen vom Spiel
    update: function () {

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.W))
        {
            player.y=player.y-5;
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.S)) {
            player.y=player.y+5;
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
            player.x=player.x-5;
        }
        if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
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


      lebenText = this.game.add.text(this.world.width-510, this.game.world.height-47, this.game.Leben.getLeben(),style);
      hungerText = this.game.add.text(this.world.width-210, this.game.world.height-47, this.game.Hunger.getHunger(),style);
    },

    updateHud: function () {
      lifebar.width=this.game.Leben.getLeben()*2;
      hungerbar.width=this.game.Hunger.getHunger()*2;

      lebenText.destroy();
      lebenText = this.game.add.text(this.world.width-510, this.game.world.height-47, this.game.Leben.getLeben(),style);
      hungerText.destroy();
      hungerText = this.game.add.text(this.world.width-210, this.game.world.height-47, this.game.Hunger.getHunger(),style);
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
      this.eventList.forEach(function(element){
        var graphics=self.game.add.graphics(element.x,element.y);
        graphics.lineStyle(4,0xffd900,1);
        graphics.drawRect(0,0,element.width,element.height);
      });

    }



};
function changeRoomBackDoor(self,sender)
{
  self.game.state.start("TheGame");
}
