'use strict';
// (function() {})();


var app = angular.module('app');

app.directive('game', ['$timeout', function ($timeout) {
  return {
    restrict: 'ACE',
    require: 'ngModel',
    templateUrl: 'html/game.html',
    link: function (scope, elm, attrs, ngModel) {

      var test;

      scope.init = function () {
        scope.firstTile   = null;
        scope.secondTile  = null;
        scope.canPick     = true;
        scope.mfTimeout   = 1000;

        scope.renderer = new PIXI.autoDetectRenderer(640, 480, {'transparent': false});
        scope.renderer.backgroundColor = 0xB9F6CA;

        elm.html(scope.renderer.view);

        scope.stage = new PIXI.Container();

        PIXI.loader.add('tiles', 'img/tiles.json').load(scope.loadResources);
      };


      scope.loadResources = function (loader, resources) {
        // choose 24 random tile images
        var chosenTiles = new Array();
        var iii = 0, jjj, kkk;


        while (iii < 48) {
          var randomValue = _.random(0, 43);

          if (_.indexOf(chosenTiles, randomValue) === -1){
            chosenTiles.push(randomValue, randomValue);
            iii += 2;
          }
        }


        // shuffle the chosen tiles
        for (iii=0; iii<96; iii++){
          var from  = _.random(0, 47);
          var to    = _.random(0, 47);
          var tmp   = chosenTiles[from];

          chosenTiles[from] = chosenTiles[to];
          chosenTiles[to]   = tmp;
        }


        // // place down tiles
        // for (iii = 0; iii < 8; iii++) {
        //   for (jjj = 0; jjj < 6; jjj++) {
        //     kkk = iii * 6 + jjj;

        //     var tile = new PIXI.Sprite(resources['tiles'].textures[chosenTiles[kkk]]);

        //     tile.buttonMode   = true;
        //     tile.interactive  = true;
        //     tile.isSelected   = false;
        //     // tile.tint         = 0x000000;
        //     tile.alpha        = 0.5;
        //     // tile.mfVal        = chosenTiles[kkk]
        //     tile.position.x   = 7 + iii * 80;
        //     tile.position.y   = 7 + jjj * 80;

        //     tile.innerId = kkk;

        //     // tile.touchstart = 

        //     tile.mousedown = function (event) {
        //       var id = event.target.innerId;

        //       console.log('Hello', 'World', '!');

        //       this.alpha = 1;

        //       // if (_.isUndefined(id)) {
        //       //   console.log('error', 1);
        //       // }
        //       // else {
        //         // scope.interact(id);
        //       // }

        //       // scope.stage.children[12].alpha = 1;
        //     };


        //     scope.stage.addChild(tile);
        //   }
        // }


        test = new PIXI.Sprite(resources['tiles'].textures[chosenTiles[0]]);


        test.buttonMode  = true;
        test.interactive = true;
        test.alpha       = 0.3;


        test.mousedown = function (event) {
          console.log('mousedown');
          test.alpha = 1;
        }

        // console.log('debug', test.mousedown);

        // test.mousedown = scope.qsd;



        scope.stage.addChild(test);


        // document.addEventListener('mousedown', scope.onDocumentMouseMove, false);


        scope.animate();

      }


      scope.qsd = function (hello) {
        console.log('qsd', hello);
        test.alpha = 1;
        hello.target.alpha = 1;
      }


      // scope.interact = function (id) {
      //   var item = scope.stage.children[id];

      //   if (_.isUndefined(item)) {
      //     console.log('error', 2);
      //     return false;
      //   }

      //   scope.stage.children[id].alpha = 1;
      //   return true;
      // }


      scope.animate = function () {
        // scope.aze.alpha = 1;

        // requestAnimationFrame(scope.animate);
        scope.render();
      }

      scope.render = function () {
        // scope.tiles.rotation += 0.01;

        scope.renderer.render(scope.stage);
      }

      scope.init();

    }
  };
}]);






var definition = function () {
  // first tile picked up by the player
  var firstTile=null;

  // second tile picked up by the player
  var secondTile=null;

  // can the player pick up a tile?
  var canPick=true;

  // // create an new instance of a pixi stage with a grey background
  // var stage = new PIXI.Stage(0x888888);

  // // create a renderer instance width=640 height=480
  // var renderer = PIXI.autoDetectRenderer(640,480);

  // importing a texture atlas created with texturepacker
  var tileAtlas = ["images.json"];

  // create a new loader
  var loader = new PIXI.AssetLoader(tileAtlas);

  // create an empty container
  var gameContainer = new PIXI.DisplayObjectContainer();

  // add the container to the stage
  stage.addChild(gameContainer);

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  // use callback
  loader.onComplete = onTilesLoaded;

  //begin load
  loader.load();
}





function onTilesLoaded(){
  // choose 24 random tile images
  var chosenTiles=new Array();

  // while(chosenTiles.length<48){
  //   var candidate=Math.floor(Math.random()*44);
  //   if(chosenTiles.indexOf(candidate)==-1){
  //     chosenTiles.push(candidate,candidate)
  //   }     
  // }

  // // shuffle the chosen tiles
  // for(i=0;i<96;i++){
  //   var from = Math.floor(Math.random()*48);
  //   var to = Math.floor(Math.random()*48);
  //   var tmp = chosenTiles[from];
  //   chosenTiles[from]=chosenTiles[to];
  //   chosenTiles[to]=tmp;
  // }

  // place down tiles
  for(i=0;i<8;i++){
    for(j=0;j<6;j++){
      // new sprite
      var tile = PIXI.Sprite.fromFrame(chosenTiles[i*6+j]);
      // buttonmode+interactive = acts like a button
      tile.buttonMode=true;
      tile.interactive = true;
      // is the tile selected?
      tile.isSelected=false;
      // set a tile value
      tile.theVal=chosenTiles[i*6+j]
      // place the tile
      tile.position.x = 7+i*80;
      tile.position.y = 7+  j*80;
      // paint tile black
      tile.tint = 0x000000;
      // set it a bit transparent (it will look grey)
      tile.alpha=0.5;
      // add the tile
      gameContainer.addChild(tile);
      // mouse-touch listener
      tile.mousedown = tile.touchstart = function(data) {
        // can I pick a tile?
        if(canPick) {
             // is the tile already selected?
          if(!this.isSelected){
            // set the tile to selected
            this.isSelected = true;
            // show the tile
                this.tint = 0xffffff;
            this.alpha = 1;
            // is it the first tile we uncover?
            if(firstTile==null){
              firstTile=this
            }
            // this is the second tile
            else{
              secondTile=this
              // can't pick anymore
              canPick=false;
              // did we pick the same tiles?
              if(firstTile.theVal==secondTile.theVal){
                // wait a second then remove the tiles and make the player able to pick again
                setTimeout(function(){
                  gameContainer.removeChild(firstTile);
                  gameContainer.removeChild(secondTile);
                  firstTile=null;
                  secondTile=null;
                  canPick=true;
                },1000);
              }
              // we picked different tiles
              else{
                // wait a second then cover the tiles and make the player able to pick again
                setTimeout(function(){
                  firstTile.isSelected=false
                  secondTile.isSelected=false
                  firstTile.tint = 0x000000;
                  secondTile.tint = 0x000000;
                  firstTile.alpha=0.5;
                  secondTile.alpha=0.5;
                  firstTile=null;
                  secondTile=null;
                  canPick=true  
                },1000);
              }
            } 
          }
        }
      }
    }
  } 
  requestAnimFrame(animate);
}


function animate() {
  requestAnimFrame(animate);
  renderer.render(stage);
}












//   function () {
          //     var that = this;

          //     // console.log('tile 2', scope.tiles[kkk]);
          //     console.log('tile 3', that);


          //     scope.tiles[kkk].alpha = 1.0;

          //     scope.tiles[kkk].position.y = 0;



          //     // if (scope.canPick) {
          //     //   if (!that.isSelected) {
          //     //     that.isSelected = true;
          //     //     // tile.tint       = 0xffffff;
          //     //     // tile.alpha      = 1.0;


          //     //     // console.log(tile.alpha);



          //     //     // if (scope.firstTile === null) {
          //     //     //   scope.firstTile = that;

          //     //     //   console.log('wxc');
          //     //     // }
          //     //     // else {
          //     //     //   scope.secondTile  = that;
          //     //     //   scope.canPick     = false;

          //     //     //   console.log('sdf');

          //     //     //   if (scope.firstTile.mfVal === scope.secondTile.mfVal) {


          //     //     //     setTimeout(function () {

          //     //     //       console.log('aze');

          //     //     //       scope.stage.removeChild(scope.firstTile);
          //     //     //       scope.stage.removeChild(scope.secondTile);

          //     //     //       scope.firstTile = null;
          //     //     //       scope.secondTile = null;

          //     //     //       scope.canPick = true;

          //     //     //       // gameContainer.removeChild(firstTile);
          //     //     //       // gameContainer.removeChild(secondTile);
          //     //     //       // firstTile=null;
          //     //     //       // secondTile=null;
          //     //     //       // canPick=true;

          //     //     //     }, scope.mfTimeout);

          //     //     //   }
          //     //     //   else {

          //     //     //     setTimeout(function () {

          //     //     //       console.log('qsd');


          //     //     //       scope.firstTile.isSelected = false
          //     //     //       scope.secondTile.isSelected = false

          //     //     //       scope.firstTile.tint = 0x000000; 
          //     //     //       scope.secondTile.tint = 0x000000;
                        
          //     //     //       scope.firstTile.alpha = 0.5;
          //     //     //       scope.secondTile.alpha = 0.5;

          //     //     //       scope.firstTile = null;
          //     //     //       scope.secondTile = null;

          //     //     //       scope.canPick = true;

          //     //     //       // firstTile.isSelected=false
          //     //     //       // secondTile.isSelected=false
          //     //     //       // firstTile.tint = 0x000000;
          //     //     //       // secondTile.tint = 0x000000;
          //     //     //       // firstTile.alpha=0.5;
          //     //     //       // secondTile.alpha=0.5;
          //     //     //       // firstTile=null;
          //     //     //       // secondTile=null;
          //     //     //       // canPick=true;

          //     //     //     }, scope.mfTimeout);

          //     //     //   }

          //     //     // }

          //     //   }
          //     // }
          //   }