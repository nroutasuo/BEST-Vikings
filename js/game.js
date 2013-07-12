
/* Game namespace */

  function addHighScore(name, score) 
  {
      var scores = localStorage.getItem("highscores");
      scores = JSON.parse(scores);
      if(scores == null) scores = new Array();
      scores.push({name: name, score: score});
      var ordered = scores.sort(function(a,b){return b.score - a.score});
      // to do deletete 11th element
      var new_scores = ordered.slice(0,5);
      localStorage.setItem("highscores",JSON.stringify(new_scores));
      
      /*
      console.log("display: ");
      console.log(localStorage.getItem("highscores",JSON.stringify(new_scores)));
      */  
  }

var game = {
    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 640, 480, true)) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
		
		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
     
        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {
    
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.SCORE, new game.ScoresScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.READY, new game.NewgameScreen());
        me.state.set(me.state.GAMEOVER, new game.GameoverScreen());
        me.entityPool.add("player", game.PlayerEntity);
 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.Z,     "hi-jump", true);
        
         // set a global fading transition for the screen
        me.state.transition("fade", "#000000", 250);
        
        // Start the game.
        me.state.change(me.state.MENU);
    },
    
    // Handle avatar death (called from player update)
     "handleDeath" : function(player) {
        score = me.game.HUD.getItemValue("score");
        addHighScore(game.player_name, score);
        player.alive=false;
        player.visible = false;
        me.state.change(me.state.GAMEOVER, score);
}
};
/* the in game stuff*/

