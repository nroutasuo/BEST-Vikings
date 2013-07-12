game.PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        // load a level
   game.player_name = arguments[1];

  if(arguments[0] == 1)
    me.levelDirector.loadLevel("lvl3");
  else if(arguments[0] == 2)
    me.levelDirector.loadLevel("lvl4");

        me.game.addHUD(0, 0, 640, 480);
 
        // add a new HUD item
        me.game.HUD.addItem("score", new game.ScoreObject(620, 438));
        me.game.HUD.addItem("timer", new game.LevelTimerObject(10, 438));
        me.game.HUD.addItem("lives", new game.LivesObject(620, 10));
        // make sure everything is in the right order
        me.game.sort();
 
    },
 
    /* ---
 
    action to perform when game is finished (state change)
 
    --- */
    onDestroyEvent: function() {
        // remove the HUD
        me.game.disableHUD();
    }
});
