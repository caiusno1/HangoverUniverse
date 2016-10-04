function debugEvents(self)
{
  if(enabledebug)
  {
    var graphics=self.game.add.graphics(0,0);
    graphics.lineStyle(4,0xffd900,1);
    self.eventList.forEach(function(element){
      graphics.drawRect(element.x,element.y,element.width,element.height);
    });
  }
}
