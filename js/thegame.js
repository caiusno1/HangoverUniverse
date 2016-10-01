/**
 * Created by Schlag on 01.07.2016
 */
var thegame = function(game){
    rotateDirection = 1;
    isShielded = false;
    isBoosted = false;
    var invisWall;
    var player;
};

thegame.prototype = {

    create : function(){
        //Bounds-Rechteck
        var bounds = new Phaser.Rectangle(350, 100, 1400, 900);

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
          walls = this.game.add.group();
          walls.enableBody = true;

          invisWall = walls.create(bounds.x, bounds.y, 'unknownTile');
          invisWall.scale.setTo(100, 5);
          invisWall.body.width = 200;
          invisWall.body.height = 10;
          invisWall.body.immovable = true;
        //this.createCustomBounds(bounds.x, bounds.y, bounds.width, bounds.height);
        player.body.collideWorldBounds = true;
    },


    //Update Function - durchgehend kontinuierlich aufgerufen vom Spiel
    update: function () {
        this.game.physics.arcade.collide(player, walls);

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

      createCustomBounds : function(x, y, width, height)
      {
      },

      render : function()
      {
        this.game.debug.body(invisWall);
        this.game.debug.body(player);
      }

};
