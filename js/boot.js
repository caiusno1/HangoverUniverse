/**
 * Created by Schlag on 01.07.2016
 */
var boot = function(game){
};

boot.prototype = {
    preload: function(){
        this.game.load.image("loading","assets/background/loading.png");

    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        //this.scale.setScreenSize();
        this.game.state.start("Preload");
        //sleep(20000);
        //document.getElementsByTagName("video").innerHtml="";;
    }
};


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
