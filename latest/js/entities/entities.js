var counter = 1;
var multiple_collisions_flag=false;

/*----------------
 a Coin entity
------------------------ */
game.CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
   
    onCollision : function ()
{
    // do something when collected
 
    // give some score
       me.game.HUD.updateItemValue("score", 250);
 
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
        settings.spritewidth = 32;
		settings.spriteheight = 32;
        tmp = 80;
         
        // call the parent constructor
        this.parent(x, y, settings);
 
        this.startY = y;
        this.endY = y + settings.height - settings.spriteheight;
        // size of sprite
 
        // make him start from the right
        this.pos.y = y + settings.height - settings.spriteheight;
        this.walkLeft = true;
 
        // walking & jumping speed
        this.setVelocity(1, 3);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
 
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
              
              this.visible = false;
        }
              
        
       // else {
        //    if (this.alive) console.log("first time idiot: " + counter++);
            
         //  }
    },
 
    // manage the enemy movement
        update: function() {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;
 
        if (this.alive) {
            if (this.walkLeft && this.pos.y <= this.startY) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.y >= this.endY) {
                this.walkLeft = true;
            }
            // make it walk
           // this.flipX(this.walkLeft);
            this.vel.y += (this.walkLeft) ? -this.accel.y * me.timer.tick : this.accel.y * me.timer.tick;
                 
        } else {
            this.vel.y = 0;
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
    /*-------------------
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 15);
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },
 
   /* -----
update the player pos
------ */
update: function() {
    
    // force the timer to update
    me.game.HUD.updateItemValue("timer");

    if (this.alive == false) {
                              //console.log("YOU DIED");
                               if(this.visible == true) {this.visible=false;//flicker(45);
               console.log("YOU DIED");
               }
                             }
    
    if (me.input.isKeyPressed('left'))
    {
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
    }
    else
    {
        this.vel.x = 0;
    }
    if (me.input.isKeyPressed('jump'))
    {  
        if (!this.jumping && !this.falling)
        {
            // set current vel to the maximum defined value
            // gravity will then do the rest
            this.vel.y = -this.maxVel.y * me.timer.tick;
            // set the jumping flag
            this.jumping = true;
        }
    }
 
 
    // check & update player movement
    this.updateMovement();
 
    // check for collision
    var res = me.game.collide(this);
 
    if (res && !multiple_collisions_flag) {
        // if we collide with an enemy
        if (res.obj.type == me.game.ENEMY_OBJECT) {
            // check if we jumped on it
            if ((res.y > 0) && ! this.jumping) {
                // bounce (force jump)
                this.falling = false;
                this.vel.y = -this.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.jumping = true;
 
            } else {
                if(multiple_collisions_flag==false){
                if(counter>2) this.alive=false;
                else this.renderable.flicker(20);
                console.log("dying for: " + counter++ + "time.");
                multiple_collisions_flag=true;
                }
                // let's flicker in case we touched an enemy
            }
        }
    }
    if(!res) multiple_collisions_flag=false;
 
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

/*--------------
a score HUD Item
--------------------- */
 
game.ScoreObject = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
    },
 
    /* -----
 
    draw our score
 
    ------ */
    draw: function(context, x, y) {
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

me.entityPool.add("player", game.PlayerEntity);
me.entityPool.add("item", game.CoinEntity);
me.entityPool.add("enemy", game.BunnyEnemyEntity);
//me.entityPool.add("ScoreObject", game.ScoreObject);
// TODO