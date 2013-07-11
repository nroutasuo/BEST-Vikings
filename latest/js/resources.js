game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
     // 1. level tileset  
    /**
     * Graphics.
     */
    // our level tileset
    {name: "area01_level_tiles",  type:"image", src: "data/img/map/area01_level_tiles.png"},
    // the main player spritesheet
    {name: "player",     type:"image", src: "data/img/sprite/player.png"},
    // the parallax background
    {name: "area01_bkg0",         type:"image", src: "data/img/area01_bkg0.png"},
    {name: "area01_bkg1",         type:"image", src: "data/img/area01_bkg1.png"},
    // the spinning coin spritesheet
    {name: "item",  type:"image", src: "data/img/sprite/item.png"},
    // our enemty entity
    {name: "bunny",       type:"image", src: "data/img/sprite/bunny.png"},
     
     
    /*
     * Maps.
     */
    {name: "lvl1",              type: "tmx",  src: "data/map/lvl1.tmx"},    
  {
    name: "32x32_font",
    type: "image",
    src: "data/img/font/32x32_font.png"
}

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */	
	
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
	 */

];
