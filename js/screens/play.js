game.PlayScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
      // stuff to reset on state change
      // load a level
      me.levelDirector.loadLevel("area01");
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	  ; // TODO
	}
});
