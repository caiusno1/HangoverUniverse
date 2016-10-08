var WorldGenerator = function(Spawn,Stages){
      this.SpawnStage=Spawn;
      this.Stages=Stages;
      this.DoorMapping=[];
      this.Rooms=[];
};

WorldGenerator.prototype = {
  createWorld: function(RoomsCount){
    var CurrentRoom={"roomname":"spawn","doors":["DoorSpawnRight"],"stage":this.SpawnStage};
    this.Rooms.push(CurrentRoom);
    var currentDoors=[];
    CurrentRoom.doors.forEach(function(element){
      currentDoors.push({"room":CurrentRoom,"id":element})
    });
    var counterForUniqueName=0;
    var counter=0;
    while(this.Rooms.length<=RoomsCount)
    {
          var possibleStages=this.Stages;
          if(currentDoors.length==1)
          {
              possibleStages=this.__GetAllElementsContainsWord(this.Stages,"Gang");
          }
          //possibleStages=this.__shuffle(possibleStages);
          var currentDoor=currentDoors.shift();
          var connectStage=possibleStages[this.__getRandomInt(0,possibleStages.length-1)];
          if(currentDoor.id.includes("Right"))
          {
            var connectedDoor=this.__GetElementContainsWord(connectStage.doors,"Left")
            while (!connectedDoor) {
                connectStage=possibleStages[this.__getRandomInt(0,possibleStages.length-1)];
                connectedDoor=this.__GetElementContainsWord(connectStage.doors,"Left")
            }
            var self=this;
            var createdRoom={"roomname":("room"+counter),"doors":connectStage.doors,"stage":connectStage};
            connectStage.doors.forEach(function(element){
              if(!element.includes("Left"))
                currentDoors.push({"room":createdRoom,"id":element})
            });
            this.Rooms.push(createdRoom);
            this.DoorMapping.push({"Item1":currentDoor,"Item2":{"id":connectedDoor,"room":createdRoom}});
          }
          else if (currentDoor.id.includes("Top")) {
            var connectedDoor=this.__GetElementContainsWord(connectStage.doors,"Bot")
            while (!connectedDoor) {
                connectStage=possibleStages[this.__getRandomInt(0,possibleStages.length-1)];
                connectedDoor=this.__GetElementContainsWord(connectStage.doors,"Bot")
            }
            var self=this;
            var createdRoom={"roomname":("room"+counter),"doors":connectStage.doors,"stage":connectStage};
            connectStage.doors.forEach(function(element){
              if(!element.includes("Bot"))
                currentDoors.push({"room":createdRoom,"id":element})
            });
            this.Rooms.push(createdRoom);
            this.DoorMapping.push({"Item1":currentDoor,"Item2":{"id":connectedDoor,"room":createdRoom}});
          }
          else if (currentDoor.id.includes("Bot")) {
            var connectedDoor=this.__GetElementContainsWord(connectStage.doors,"Top")
            while (!connectedDoor) {
                connectStage=possibleStages[this.__getRandomInt(0,possibleStages.length-1)];
                connectedDoor=this.__GetElementContainsWord(connectStage.doors,"Top")
            }
            var self=this;
            var createdRoom={"roomname":("room"+counter),"doors":connectStage.doors,"stage":connectStage};
            connectStage.doors.forEach(function(element){
              if(!element.includes("Top"))
                currentDoors.push({"room":createdRoom,"id":element})
            });
            this.Rooms.push(createdRoom);
            this.DoorMapping.push({"Item1":currentDoor,"Item2":{"id":connectedDoor,"room":createdRoom}});
          }
          counter++;
      }
      return {"Spawn":this.SpawnStage,"rooms":this.Rooms,"DoorMappings":this.DoorMapping};
  },
  __getRandomInt: function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max+1);
  return Math.floor(Math.random() * (max - min)) + min;
  },
  __CountDoors: function(doorsDict)
  {
    var counter = 0;
    dict.forEach(function(element){
      if(element.doors)
      {
        element.doors.forEach(function(){
          counter++;
        })
      }
    });
    return counter;
  },
  __GetElementContainsWord: function(list,word)
  {
    for(key in list)
    {
      if(list[key].includes(word))
      {
        return list[key];
      }
    }
    return undefined;
  },
  __GetAllElementsContainsWord: function(list,element){
    var retlist=[];
    for(key in list)
    {
      if(list[key].id.includes(element))
      {
        retlist.push(list[key]);
      }
    }
    return retlist;
  },
  __shuffle: function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
}
