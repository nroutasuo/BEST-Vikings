// This class represents the screen where the user can select a level
game.ScoresScreen = me.ScreenObject.extend(
{
   init: function()
   {
      // pass true to the parent constructor
      // as we draw our progress bar in the draw function
      this.parent(true);
      this.title = null;
      this.scores = null;
		this.font = null;
		this.right_font = null;
   },
   onResetEvent: function() {
   	this.font = new me.BitmapFont("32x32_font", 32);
   	this.font.set("Arial", 1, "white");
		me.input.bindKey(me.input.KEY.SPACE, "Back", true);
		
		if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("scores");
        }
        var scores = localStorage.getItem("highscores");
		this.scores = JSON.parse(scores);
	},
	
	 onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.SPACE);
   },


   // make sure the screen is only refreshed on load progress
   update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('Back')) {
            me.state.change(me.state.MENU); //Go back home
        }
        return true;
    },

   // on destroy event
   onDestroyEvent : function ()
   {
      // "nullify" all fonts
      this.logo = null;
   },

   //	draw function
   draw : function(context) 
   {

		context.drawImage(this.title, 0, 0);
		if(this.scores != null) {
			for (var x = 0; x < this.scores.length; x++) {
				var name = this.scores[x].name.toUpperCase();
				var score = this.scores[x].score;
				this.font.draw(context, name, 250, 100+x*50);
				this.font.draw(context, score, 100, 100+x*50);
			}
		this.font.draw(context, "PRESS SPACE TO GO", 30, 400);
    	
		}
	
   }
});