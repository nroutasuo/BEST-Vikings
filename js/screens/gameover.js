game.GameoverScreen = me.ScreenObject.extend({

   init: function() {
        this.parent(true);
        this.title = null;
   },

   onResetEvent: function() {
        this.score = arguments[0];
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
		me.input.bindKey(me.input.KEY.ENTER, "continue", true);
        
        // Background
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("screen_bg");
        }
    },
	
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
        this.font = null;
   },


   update: function() {
        if (me.input.isKeyPressed('continue')) {
            me.state.change(me.state.MENU);
        }
        return true;
    },

   draw : function(context) {
		context.drawImage(this.title, 0, 0);
        this.font.draw(context, "GAME OVER", 30, 100);
        // time = Math.round(me.timer.getTime() / 200);
        score = me.game.score;
        
        this.font.draw(context, "YOUR SCORE: " + this.score, 30, 140);

        this.font.draw(context, "PRESS ENTER", 30, 200);
        this.font.draw(context, "TO CONTINUE", 30, 240);

   }

});