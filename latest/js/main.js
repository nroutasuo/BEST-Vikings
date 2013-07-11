/* ---
 
   callback when everything is loaded
     
   ---  */
     
"loaded" : function ()
{
   // set the "Play/Ingame" Screen Object
   me.state.set(me.state.PLAY, game.PlayScreen());
     
   // add our player entity in the entity pool
   me.entityPool.add("player", game.PlayerEntity);         
   // enable the keyboard
   me.input.bindKey(me.input.KEY.LEFT,  "left");
   me.input.bindKey(me.input.KEY.RIGHT, "right");
   me.input.bindKey(me.input.KEY.X,     "jump", true);
      
   // start the game
   me.state.change(me.state.PLAY);
}