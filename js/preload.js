/**
 * Created by Schlag on 01.07.2016
 */

var preload = function(game){
};

preload.prototype = {
    preload: function(){

        //Loadingbar
        var loadingBar = this.add.sprite(this.world.centerX,this.world.centerY,"loading");
        this.load.json("spawn_lev","js/spawn_lev.json");
        this.load.json("Gang_lev","js/Gang_lev.json");
        this.load.json("Gang_lev2","js/Gang_lev2.json");
        this.load.json("Vorrat_lev","js/Vorrat_lev.json");
        this.load.json("Lebenserhaltung_lev","js/Lebenserhaltung_lev.json");

        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        //backgrounds tiles etc vorladen
        this.game.load.image("bgTitleScreen","assets/background/background_titlescreen.png");
        this.game.load.image("bgDeathScreen","assets/background/background_deathscreen.png");
        this.game.load.image("bgStage", "assets/background/bgSpawn.png");
        this.game.load.image("bgTutGang","assets/background/bgTutGang.png");
        this.game.load.image("bgVorrat","assets/background/bgVorrat.png");
        this.game.load.image("bgLebenserhaltung","assets/background/bgLebenserhaltung.png");

        this.game.load.spritesheet("replay", "assets/background/button_replay.png",230,130);
        this.game.load.spritesheet("play", "assets/background/button_play.png",200,200);

        this.game.load.spritesheet("mute","assets/background/button_mute.png",50,50);
        this.game.load.spritesheet("pause","assets/background/button_pause.png",50,50);
        this.game.load.image("unpause","assets/background/view_unpause.png");

        //this.game.load.image("tutorial","assets/background/tutorial.png");
        this.game.load.spritesheet("tutshow","assets/background/button_tutorial.png",230,130);

        this.game.load.image("life","assets/background/lifeIcon.png");
        this.game.load.image("highscore","assets/background/view_highscore.png");
        this.game.load.image("highscoreingame","assets/background/view_highscore_ig.png");
        this.game.load.image("lifebg","assets/background/view_lifes.png");


        //Player-Enemy-Powerups
        this.game.load.spritesheet("playerRocket","assets/player/char_8in1_astronaut.png",100,100,8);

        this.game.load.spritesheet("enemyMine", "assets/enemies/mine.png",48,48);
        this.game.load.spritesheet("enemyBomb", "assets/enemies/alienbomb.png",48,48);

        this.game.load.spritesheet("powerShield", "assets/powerups/schild.png", 32, 32);
        this.game.load.spritesheet("powerBoost", "assets/powerups/boost.png", 32, 32);

        //Particles
        this.game.load.image("turbine1", "assets/particles/turbinesprite1.png");
        this.game.load.image("turbine2", "assets/particles/turbinesprite2.png");

        this.game.load.image("boost1", "assets/particles/boostsprite1.png");
        this.game.load.image("boost2", "assets/particles/boostsprite2.png");
        this.game.load.image("boost3", "assets/particles/boostsprite3.png");

        this.game.load.image("explodeMine", "assets/particles/mineCollision.png");
        this.game.load.image("explodeBomb", "assets/particles/bombCollision.png");

        this.game.load.image("fire1", "assets/particles/fire1.png");
        this.game.load.image("fire2", "assets/particles/fire2.png");
        this.game.load.image("fire3", "assets/particles/fire3.png");

        //HUD
        this.game.load.image("lifebar", "assets/hud/lifebar.png");
        this.game.load.image("hungerbar", "assets/hud/hungerbar.png");
        this.game.load.image("oxygenbar", "assets/hud/oxygenbar.png");
        this.game.load.image("heartImg", "assets/hud/heartImg.png");
        this.game.load.image("hungerImg", "assets/hud/hungerImg.png");
        this.game.load.image("oxygenImg", "assets/hud/oxygenImg.png");

        //Books
        this.game.load.image("bookImgLebenserhaltungsraum", "assets/background/bookImgLebenserhaltungsraum.png");
        this.game.load.image("bookImgKeinZutritt", "assets/background/bookImgKeinZutritt.png");

        this.game.load.image("eventHintImg", "assets/background/eventHintImg.png");

        //Mobile
        this.game.load.image("btn_up", "assets/mobile/btn_up.png");
        this.game.load.image("btn_down", "assets/mobile/btn_down.png");
        this.game.load.image("btn_left", "assets/mobile/btn_left.png");
        this.game.load.image("btn_right", "assets/mobile/btn_right.png");
        this.game.load.image("btn_interact", "assets/mobile/btn_interact.png");

        //Audio
        //GameTitle / GameOver Background Sound
        this.game.load.audio('sound_bgloop', ['assets/sounds/loop_menu.mp3','assets/sounds/loop_menu.ogg']);
        this.game.load.audio('sound_bgloop2', ['assets/sounds/loop_level1.mp3','assets/sounds/loop_level1.ogg']);

        //ButtonClick Sound
        this.game.load.audio('sound_buttonclick', ["assets/sounds//buttonsound.mp3","assets/sounds/buttonsound.ogg"]);
    },
    create: function(){
        if(unittest)
            this.game.state.start("GameInit");
        else
            this.game.state.start("GameTitle");
    }
};
