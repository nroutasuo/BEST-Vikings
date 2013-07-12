// This class represents the screen where the user can select a level

game.TitleScreen = me.ScreenObject.extend(
{
   init: function()
   {
      // pass true to the parent constructor
      // as we draw our progress bar in the draw function
      this.parent(true);
      this.title = null;
      // this.logo = new me.Font('century gothic', 32, 'white');

   },
   onResetEvent: function() {
		me.input.bindKey(me.input.KEY.A, "Level1", true);
		me.input.bindKey(me.input.KEY.B, "Level2", true);
		me.input.bindKey(me.input.KEY.SPACE, "Scores", true);
		
		if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("title_screen");
 
        }
	},
	
	 onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.SPACE);
   },


   // make sure the screen is only refreshed on load progress
   update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('Level1')) {
            me.state.change(me.state.READY, 1);
        } else if (me.input.isKeyPressed('Level2')) {
            window.levelNumber=2;
            me.state.change(me.state.READY, 2);
        } else if (me.input.isKeyPressed('Scores')) {
            me.state.change(me.state.SCORE, 2); //Scores
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
	
   }
});
