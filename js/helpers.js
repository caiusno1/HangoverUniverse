var debugcounter = 0;

function CreationDebug(self)
{
  if(enabledebug)
  {
      debugEvents(self);
      debugRoom(self);
  }
}

function UpdateDebug(self)
{
  if(enabledebug)
  {
      trackPlayerPosition(self);
  }
}

function debugEvents(self)
{
    var graphics=self.game.add.graphics(0,0);
    graphics.lineStyle(4,0xffd900,1);
    self.eventList.forEach(function(element){
      graphics.drawRect(element.x,element.y,element.width,element.height);
    });
}

function trackPlayerPosition(self)
{
    debugcounter=debugcounter+1;
    eventHintImgCounter=eventHintImgCounter+1;
    if(debugcounter==100)
    {
        console.log(player.x+"/"+player.y);
        debugcounter=0;
    }
}
function debugRoom(self)
{
  if(self.game.room)
    console.log("Room: "+self.game.room.roomname+ ",Stage: "+self.game.room.stage.id);
  else {
    console.log("Room not set yet");
  }
}
