game.PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        // load a level
   game.player_name = arguments[1];

  if(arguments[0] == 1)
    me.levelDirector.loadLevel("lvl3");
  else if(arguments[0] == 2)
    me.levelDirector.loadLevel("lvl4");

        me.game.addHUD(0, 0, 640, 608);
 
      
    
      //sound.setTransparency("#FF00FF");
      me.game.HUD.addItem("soundButton", new game.SoundObject (10, 26));
                  
     // me.game.add((new SoundButton(10,45)),this.z);
 
        // add a new HUD item
        me.game.HUD.addItem("score", new game.ScoreObject(590, 548));
        me.game.HUD.addItem("timer", new game.LevelTimerObject(40, 548));
        me.game.HUD.addItem("lives", new game.LivesObject(580, 25));
        // make sure everything is in the right order
        me.game.sort();
        
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.Z,     "hi-jump", true);
        me.input.bindKey(me.input.KEY.S,     "sound", true);        
 
    },
 
    /* ---
 
    action to perform when game is finished (state change)
 
    --- */
    onDestroyEvent: function() {
        // remove the HUD
        me.game.disableHUD();
    }
});
