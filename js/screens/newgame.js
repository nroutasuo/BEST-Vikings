game.NewgameScreen = me.ScreenObject.extend({
    
    // Set player name in init and reuse if possible on reset
    init: function() {
        this.parent(true);
        this.player_name = "";
        this.title = null;
    },

    onResetEvent: function() {
        this.startlevel = arguments[0];
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
		me.input.bindKey(me.input.KEY.ENTER, "continue", true);
        
        // Background
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("screen_bg");
        }
        
        // General key bindings
        this.focus = true;
        window.addEventListener('keypress', this.onKeyPress.bind(this));
    },
	
	onDestroyEvent: function() {
        // unbind stuff
        this.focus = false;
		me.input.unbindKey(me.input.KEY.ENTER);
        this.font = null;
    },

    update: function() {
        if(this.player_name.length > 2) {
            if (me.input.isKeyPressed('continue')) {
                me.state.change(me.state.PLAY, this.startlevel, this.player_name);
            }
        }
        return true;
    },

    draw : function(context) {
		context.drawImage(this.title, 0, 0);
        this.font.draw(context, "ENTER PLAYER NAME:", 30, 100);
        this.player_name = this.player_name.toUpperCase();
        this.font.draw(context, this.player_name, 30, 140);
        if(this.player_name.length > 2) {
            this.font.draw(context, "PRESS ENTER", 30, 240);
            this.font.draw(context, "TO CONTINUE", 30, 280);
        }
   },

    // General key press event handler
    onKeyPress : function(e)  {
        if (!this.focus) {
            return;
        }
        
        // Special character codes (such as backspace)
         console.log("char: " + e.charCode);
        var l = this.player_name.length;
         console.log(e.keyCode);
        switch(e.keyCode) {
        case 8:
        case 46:
            this.player_name = this.player_name.substr(0, l-1);
            break;
        default:
            if(this.player_name.length < 15) {
                var newChar = String.fromCharCode(e.charCode);
                this.player_name = this.player_name + newChar;
            }
        }
    },

});