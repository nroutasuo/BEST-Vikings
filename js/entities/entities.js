var counter = 1;
var multiple_collisions_flag=false;
var score_coin = 10;
var score_enemy = 100;
var score_time = 1;

/*----------------
 a Coin entity
------------------------*/
game.CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
   
    onCollision : function () {
    
    me.audio.play("jump");
    // give some score
        me.game.HUD.updateItemValue("score", score_coin); 
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }
    
 
});

/* --------------------------
an enemy Entity
------------------------ */
game.BunnyEnemyEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "bunny";
        settings.spritewidth = 32; // not sure
        this.spritewidth = settings.spritewidth;
        
        // call the parent constructor
        this.parent(x, y, settings);
        this.startX = x;
        this.endX = this.startX + settings.width;
 
        // make him start from the right, check if he should stay still
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
        this.bouncewidth = 180;
        this.noWalk = this.endX - this.startX - settings.spritewidth < this.bouncewidth;

        // walking & jumping speed
        this.gravity = 0.6;
        this.setFriction(0,0.3);
        this.setVelocity(1, 25);
        this.setMaxVelocity(4, 15);
        
        this.collidable = true;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
 
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && this.pos.y < obj.pos.y && !obj.renderable.flickering)  {
            console.log(obj.renderable.flickering);
            console.log("Enemy killed. Player Y=" + obj.pos.y  + " < " + this.pos.y);
            
            this.alive = false;
            this.visible = false;
            me.game.HUD.updateItemValue("score", score_enemy); 
        }
    },
 
    // manage the enemy movement
    update: function() {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;
        
        // Check when to turn around, walk (x axis movement)
        if (this.alive && !this.noWalk) {
            // only change direction on ground
            if(!this.jumping && !this.falling) {
                /* Code to find out exact jump with w current settings 
                console.log(this.lastjump + " - " + this.pos.x + " = " + Math.abs(this.lastjump - this.pos.x));
                this.lastjump = this.pos.x;
                */
                var turnmargin = this.spritewidth/2 + this.bouncewidth;
                if (this.walkLeft && this.pos.x - turnmargin <= this.startX) {
                    this.walkLeft = false;
                } else if (!this.walkLeft && this.pos.x + turnmargin >= this.endX) {
                    this.walkLeft = true;
                }
            }            
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
        
        // Handle jump (y axis movement)
        if (!this.jumping && !this.falling) {
            // set current vel to the maximum defined value
            // gravity will then do the rest
            this.vel.y = -this.maxVel.y * me.timer.tick;
            // set the jumping flag
            this.jumping = true;
        }
         
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});

/* --------------------------
an enemy Entity
------------------------ */
game.KangarooEnemyEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "kangaroo";
        settings.spritewidth = 64; // not sure
        settings.spriteheight = 64; // not sure
        
        this.spritewidth = settings.spritewidth;
        
        // call the parent constructor
        this.parent(x, y, settings);
        this.startX = x;
        this.endX = this.startX + settings.width;
 
        // make him start from the right, check if he should stay still
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
        this.bouncewidth = 180;
        this.noWalk = this.endX - this.startX - settings.spritewidth < this.bouncewidth;

        // walking & jumping speed
        this.gravity = 0.6;
        this.setFriction(0,0.3);
        this.setVelocity(1, 25);
        this.setMaxVelocity(4, 15);
        
        this.collidable = true;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
 
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && this.pos.y < obj.pos.y && !obj.renderable.flickering)  {
            console.log(obj.renderable.flickering);
            console.log("Enemy killed. Player Y=" + obj.pos.y  + " < " + this.pos.y);
            
            this.alive = false;
            this.visible = false;
            me.game.HUD.updateItemValue("score", score_enemy); 
        }
    },
 
    // manage the enemy movement
    update: function() {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;
        
        // Check when to turn around, walk (x axis movement)
        if (this.alive && !this.noWalk) {
            // only change direction on ground
            if(!this.jumping && !this.falling) {
                /* Code to find out exact jump with w current settings 
                console.log(this.lastjump + " - " + this.pos.x + " = " + Math.abs(this.lastjump - this.pos.x));
                this.lastjump = this.pos.x;
                */
                var turnmargin = this.spritewidth/2 + this.bouncewidth;
                if (this.walkLeft && this.pos.x - turnmargin <= this.startX) {
                    this.walkLeft = false;
                } else if (!this.walkLeft && this.pos.x + turnmargin >= this.endX) {
                    this.walkLeft = true;
                }
            }            
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
        
        // Handle jump (y axis movement)
        if (!this.jumping && !this.falling) {
            // set current vel to the maximum defined value
            // gravity will then do the rest
            this.vel.y = -this.maxVel.y * me.timer.tick;
            // set the jumping flag
            this.jumping = true;
        }
         
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});



game.PlayerEntity = me.ObjectEntity.extend({
 
    // constructor
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 15);
        this.setMaxVelocity(3, 15);
        this.lives = 3;
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); 
    },
 
    // update player pos etc
    update: function() {
    
        // force the timer to update
        me.game.HUD.updateItemValue("timer");
        
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        }
        else if (me.input.isKeyPressed('right'))
        {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        
       // Handle jump and high jump
        var is_jump = me.input.isKeyPressed('jump');
        var is_high_jump = me.input.isKeyPressed('hi-jump');
        if(is_high_jump) is_jump = true;
        
        if (is_jump) {
            if(!this.jumping && !this.falling) {        
                this.setVelocity(this.maxVel.x, 12);
                if(is_high_jump) 
                    this.setVelocity(this.maxVel.x, 18);
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                this.jumping = true;
            }
        }

        // check & update player movement
        this.updateMovement();
     
 
     
        // check for collision
        var res = me.game.collide(this);
        
        //  if(res)
        //console.log("2}}} obj: " + res.obj.x + " ,res: " + res)
     
        if (res && !multiple_collisions_flag) {
            // if we collide with an enemy
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                // check if we jumped on it
              /*  if ((res.y > 0) && ! this.jumping) {
                    // bounce (force jump)
                    this.falling = false;
                    this.vel.y = -this.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    this.jumping = true;
     
                } */
                
                
                    if(this.pos.y <= res.obj.pos.y && !this.renderable.flickering){
                    console.log("Player killed. Enemy Y=" + res.obj.pos.y  + " <= " + this.pos.y);
                    
                    
                   //console.log("just a test: " + this.angleToPoint(res.obj));
                    
                    //this.collidable=false; 
                    
                    //console.log(res);
                    this.lives--;
                    console.log(this.alive);
                    if(this.lives <= 0 || !this.alive) {
                        game.handleDeath(this);
                    }                        
                    else this.renderable.flicker(20);
                     
                    // TO DO NOW
                    
                    me.game.HUD.updateItemValue("lives", -1);
                    multiple_collisions_flag=true;
                }
                // let's flicker in case we touched an enemy
                
            }
        }
         if(!res) multiple_collisions_flag=false;   // should remember last enemy collided with - small probability of error but still
     
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    } 
});

// Score HUD Item (raw score in raw_score and score including time in this.value)
game.ScoreObject = me.HUD_Item.extend({

    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
        this.timevalue = 0;
    },
    
    // Draw the score on the HUD, update score on time
    draw: function(context, x, y) {
        var newtimevalue = - me.game.HUD.getItemValue("timer")*score_time;
        this.value = this.value - this.timevalue + newtimevalue;
        this.timevalue = newtimevalue;
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
 
});

// Timer HUD item (keeps track of and displays level time)
game.LevelTimerObject = me.HUD_Item.extend({
    
    init: function(x, y) {
        this.parent(x, y, 0);
        this.start_time = me.timer.getTime();
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
    },
    
    // Draw the timer
    draw: function(context, x, y) {        
        this.curr_time = me.timer.getTime();
        this.value = this.curr_time - this.start_time;
        this.value = Math.round(this.value / 1000);
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
 
});

// Sharp rock entity
game.SharpRockEntity = me.ObjectEntity.extend({
    
    onCollision : function (res, obj) {
        game.handleDeath(obj);
        this.collidable = false;
    }
    
}); // sharp rock

// HUD Item to show lives left
game.LivesObject = me.HUD_Item.extend({
    
    init: function(x, y) {
        this.parent(x, y, 0);
        this.value = 3;
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
        this.image = me.loader.getImage("lives-helmet");
    },
    
    draw: function(context, x, y) {
        for (var i=0; i<this.value; i++) {
            context.drawImage(this.image, this.pos.x + x - i*45 - this.image.width/2, this.pos.y + y);
        }
        // this.font.draw(context, this.value, this.pos.x + x - 50, this.pos.y + y);
    }
});


// Entity pool
me.entityPool.add("player", game.PlayerEntity);
me.entityPool.add("item", game.CoinEntity);
me.entityPool.add("enemy", game.BunnyEnemyEntity);
me.entityPool.add("kangaroo", game.KangarooEnemyEntity);
me.entityPool.add("sharpRock", game.SharpRockEntity);
