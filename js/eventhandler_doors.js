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
    // Part for Worldgeneration
  }
}
