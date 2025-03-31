// /* micropolisJS. Adapted by Graeme McCutcheon from Micropolis.
//  *
//  * This code is released under the GNU GPL v3, with some additional terms.
//  * Please see the files LICENSE and COPYING for details. Alternatively,
//  * consult http://micropolisjs.graememcc.co.uk/LICENSE and
//  * http://micropolisjs.graememcc.co.uk/COPYING
//  *
//  */

import { Config } from './config'
import { SplashScreen } from './splashScreen';
import { TileSet } from './tileSet';
// import { TileSetURI } from './tileSetURI';
import { TileSetSnowURI } from './tileSetSnowURI';

// /*
//  *
//  * Our task in main is to load the tile image, create a TileSet from it, and then tell the SplashScreen to display
//  * itself. We will never return here.
//  *
//  */


// var tileSet
let fallbackImage: HTMLImageElement
let snowTileSet: TileSet;


const onTilesLoaded = function () {
    var snowTiles = $<HTMLImageElement>('#snowtiles')[1];
    snowTileSet = new TileSet(snowTiles, onAllTilesLoaded, onFallbackTilesLoaded);
};


const onAllTilesLoaded = function () {
    // Kick things off properly
    var sprites = $<HTMLImageElement>('#sprites')[0];
    if (sprites.complete) {
        $('#loadingBanner').css('display', 'none');
        new SplashScreen(tileSet, snowTileSet, sprites);
    } else {
        window.setTimeout(onAllTilesLoaded, 0);
    }
};


// // XXX Replace with an error dialog
const onFallbackError = function () {
    fallbackImage.onload = fallbackImage.onerror = null;
    alert('Failed to load tileset!');
};


const onFallbackSnowLoad = function () {
    fallbackImage.onload = fallbackImage.onerror = null;
    snowTileSet = new TileSet(fallbackImage, onAllTilesLoaded, onFallbackError);
};


const onFallbackTilesLoaded = function () {
    fallbackImage = new Image();
    fallbackImage.onload = onFallbackSnowLoad;
    fallbackImage.onerror = onFallbackError;
    fallbackImage.src = TileSetSnowURI;
};


// var onFallbackLoad = function() {
//   fallbackImage.onload = fallbackImage.onerror = null;
//   tileSet = new TileSet(fallbackImage, onFallbackTilesLoaded, onFallbackError);
// };


// var tileSetError = function() {
//   // We might be running locally in Chrome, which handles the security context of file URIs differently, which makes
//   // things go awry when we try to create an image from a "tainted" canvas (one we've painted on). Let's try creating
//   // the tileset by URI instead
//   fallbackImage = new Image();
//   fallbackImage.onload = onFallbackLoad;
//   fallbackImage.onerror = onFallbackError;
//   fallbackImage.src = TileSetURI;
// };


// // Check for debug parameter in URL
Config.debug = window.location.search.slice(1).split('&').some((param) => param.trim().toLowerCase() === 'debug=1');


var tiles = $<HTMLImageElement>('#tiles')[0];

const tileSetError = () => {
    console.log('error');
}

const tileSet = new TileSet(tiles, onTilesLoaded, tileSetError);
console.log(tileSet);

// var snowtiles = $('#snowtiles')[1];
