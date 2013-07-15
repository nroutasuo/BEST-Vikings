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
    {name: "area01_level_tiles",  	type:"image", src: "data/img/map/area01_level_tiles.png"},
	{name: "area01_level_tiles2",  	type:"image", src: "data/img/map/area01_level_tiles2.png"},
	{name: "metatiles32x32",  		type:"image", src: "data/img/map/metatiles32x32.png"},
	{name: "64VIK",  				type:"image", src: "data/img/map/64VIK.png"},
	{name: "DECOR", 				type:"image", src: "data/img/map/DECOR.png"},
	{name: "kangaroo", 				type:"image", src: "data/img/sprite/kangaroo.png"},
	{name: "area01_level_tiles3", type:"image", src: "data/img/map/area01_level_tiles3.png"},
  {name: "aussie2", type:"image", src: "data/img/map/aussie2.png"},
  {name: "moreaussie", type:"image", src: "data/img/map/moreaussie.png"},
    // the main player spritesheet
    {name: "player",     type:"image", src: "data/img/sprite/player.png"},
    // the parallax background
    {name: "norwayBackground",         type:"image", src: "data/img/norwayBackground.png"},
    {name: "magicBackground",          type:"image", src: "data/img/magicBackground.png"},
    	{name: "australiaBackground",         type:"image", src: "data/img/australiaBackground.png"},
    {name: "screen_bg",       type:"image", src: "data/img/screenbackground.png"}, 
    // the spinning coin spritesheet
    {name: "item",  type:"image", src: "data/img/sprite/item.png"},
    // our enemty entity
    {name: "bunny",       type:"image", src: "data/img/sprite/bunny.png"},
    {name: "lives-helmet", type:"image", src: "data/img/gui/helmet.png"},
    {name: "title_screen",       type:"image", src: "data/img/valhalla.png"}, 
    {name: "scores",       type:"image", src: "data/img/snow.png"},          
    {name: "sound-imgOn", type:"image", src: "data/img/gui/soundOn.png"},
    {name: "sound-imgOff", type:"image", src: "data/img/gui/soundOff.png"},
    /*
     * Maps.
     */
    {name: "lvl1",              type: "tmx",  src: "data/map/lvl1.tmx"},
	{name: "lvl2",              type: "tmx",  src: "data/map/lvl2.tmx"},
	{name: "lvl3",              type: "tmx",  src: "data/map/lvl3.tmx"},
    {name: "testlvl",           type: "tmx",  src: "data/map/testLvl.tmx"},
   {name: "lvl4",              type: "tmx",  src: "data/map/lvl4.tmx"}, 
  {
    name: "32x32_font",
    type: "image",
    src: "data/img/font/32x32_font.png"
},

  {
    name: "24x24_font",
    type: "image",
    src: "data/img/font/24x24_font.png"
},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */	
	
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
	 */
	
	  {name: "collect", type: "audio", src: "data/sfx/", channel : 1},
    {name: "bunnyDeath", type: "audio", src: "data/sfx/", channel : 2},       
   // {name: "kangDeath", type: "audio", src: "data/sfx/", channel : 3},
    {name: "playerDeath", type: "audio", src: "data/sfx/", channel : 4},
    {name: "lostLife", type: "audio", src: "data/sfx/", channel : 5},
    {name: "longJump", type: "audio", src: "data/sfx/", channel : 6},
    {name: "shortJump", type: "audio", src: "data/sfx/", channel : 7}
    //{name: "dst-inertexponent",  type: "audio", src: "data/sfx/", channel : 1}

];
