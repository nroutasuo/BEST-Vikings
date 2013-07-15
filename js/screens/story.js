game.StoryScreen = me.ScreenObject.extend({

   init: function() {
        this.parent(true);
        this.title = null;
        this.story = "";
        this.story += "This is the story of Eirik. Eirik is the most timid viking the Norse lands ever saw.!".toUpperCase();
        this.story += "When Eirik came to die, his hope was to enter Valhalla, like his fathers before him. But the gates stayed closed to him because he was not brave enough.!".toUpperCase();
        this.story += "Eirik was told to kill a thousand earthling creatures. As Eirik couldn't use a sword, he was also given a horny helmet that made the creatures around Eirik unceasingly jump, making his job much easier: he only had to stand under the jumping animal to kill him with the horns.".toUpperCase();
        this.scrollertween = null;
        this.duration = 22000;
        this.scroll_end = -1300;
   },

   onResetEvent: function() {
        if(this.font == null) {
            this.font = new me.BitmapFont("24x24_font", 24);
            this.font.set("left");
        }
        
        this.scrollerpos = 400;
        this.scrollertween = new me.Tween(this).to({
            scrollerpos: this.scroll_end
        }, this.duration).onComplete(this.scrollover.bind()).start();
        
		me.input.bindKey(me.input.KEY.ENTER, "continue", true);
        
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("screen_bg");
        }
    },
	
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
        this.font = null;
        this.title = null;
        this.scrollertween.stop();
   },

    // some callback for the tween objects
    scrollover: function() {
        if(this.scrollerpos >= this.scroll_end || this.scrollertween == null) {
            me.state.change(me.state.MENU);
        } else {
            // reset to default value
            this.scrollerpos = 0;
            this.scrollertween.to({
                scrollerpos: this.scroll_end
            }, this.duration).onComplete(this.end).start();
        }
    },

   update: function() {
        if (this.part > this.last_part || me.input.isKeyPressed('continue')) {
            me.state.change(me.state.MENU);
        }
        return true;
    },

   draw : function(context) {
		context.drawImage(this.title, 0, 0);    
        var line_h = 47;
        var text = this.story;
        curr_line = "";
        line_w = 0;
        line_n = 0;
        var y_pos = 0;
        for(i = 0; i < text.length; i++) {
            if(y_pos >= me.video.getHeight() - 160) {
                curr_line = "";
                break;
            }
            y_pos = this.scrollerpos + 30 + line_n*line_h;
            curr_char = text[i];
            curr_line += curr_char;
            if(/\s/.test(curr_char) && curr_line.length < 2) continue;
            line_w = this.font.measureText(context, curr_line).width;
            if((line_w > 375 && /\s/.test(text[i])) || line_w > 485) {
                this.font.draw(context, curr_line, 65, y_pos);
                curr_line = "";
                line_n++;
            } else if(/!/.test(curr_char)) {
                curr_line = curr_line.substring(0, curr_line.length-1);
                this.font.draw(context, curr_line, 65, y_pos);
                curr_line = "";
                line_n++;
                line_n++;
            }
        }
        this.font.draw(context, curr_line, 65, y_pos);
   }

});