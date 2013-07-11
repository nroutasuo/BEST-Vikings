game.PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        // load a level
        me.levelDirector.loadLevel("lvl1");
 
        // add a default HUD to the game mngr
        me.game.addHUD(0, 430, 640, 60);
 
        // add a new HUD item
        me.game.HUD.addItem("score", new game.ScoreObject(620, 10));
        me.game.HUD.addItem("timer", new game.LevelTimerObject(10, 10));
         
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
