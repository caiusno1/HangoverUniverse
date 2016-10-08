function changeRoom(self,sender)
{
  if(tutorial)
  {
    switch(sender)
    {
      case "DoorSpawnRight":
        self.game.spawnposition={x:460,y:510};
        self.game.state.start("Gang_lev");
        break;
      case "DoorHorizontalGangLeft":
        self.game.spawnposition={x:1600,y:400};
        self.game.state.start("TheGame");
        break;
      case "DoorHorizontalGangTopFirst":
        self.game.spawnposition={x:1330,y:1490};
        self.game.state.start("Vorrat_lev");
        break;
      case "DoorHorizontalGangTopSecond":
        self.game.spawnposition={x:1775,y:1650};
        self.game.state.start("Lebenserhaltung_lev");
        break;
      case "DoorVorratBot":
        self.game.spawnposition={x:600,y:450};
        self.game.state.start("Gang_lev");
        break;
      case "DoorLifeSupportBot":
        self.game.spawnposition={x:1100,y:450};
        self.game.state.start("Gang_lev");
        break;
      case "DoorHorizontalGangRight":
        showBookKeinZutritt(self, sender);
        break;
    }

  }
  else{
    var connectedDoor=getConnectedDoor(self,sender);
    if(connectedDoor)
    {
        self.game.room=connectedDoor.room;
        self.game.spawnposition=connectedDoor.room.stage.doors2pos[connectedDoor.id];
        self.game.state.start(connectedDoor.room.stage.id);
    }
  }
}

function getConnectedDoor(self,sender){
  if(self.game.room)
  {
    var currentDoor={"room":self.game.room,"id":sender};
  }
  else {
    var CurrentRoom={"roomname":"spawn","doors":["DoorSpawnRight"],"stage":World.SpawnStage};
    var currentDoor={"room":CurrentRoom,"id":sender};
  }
  var doorsDict=World.DoorMappings;
  var returnVal=undefined;
  doorsDict.forEach(function(element){
      if(element.Item1.room.roomname===currentDoor.room.roomname && element.Item1.id===currentDoor.id)
      {
          returnVal=element.Item2;
          return;
      }
      else if (element.Item2.room.roomname===currentDoor.room.roomname && element.Item2.id===currentDoor.id) {
          returnVal=element.Item1;
          return;
      }
  });
  return returnVal;
}
