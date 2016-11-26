# rpgmaker-optimization

RPG Maker MV plugin optimizing core engine performance

This plugin exchanges various elements of core RPG Maker engine with
quicker counterparts. No functionality is lost or gained.

It improves FPS (most visible on mobile platforms and netbooks) and reduces
battery usage.

Plugin is FREE to use in both FREE and COMMERCIAL products. No guarantee,
implied or otherwise, is given. Attribution required in reasonable place
(credits). 

## Usage

* Download `KODERA_optimization.js` into `js/plugins` directory.
* Add `KODERA_optimization.js` in plugin manager (`F10`)

## Effects on mobile devices

Plugin was made to enable deployment of RPG Maker games to mid-range mobile
devices. My reference devices were Samsung GT-I9300 (galaxy S3) and MyPhone
Q10 Premium. Both devices shown improvement in framerate from 20% (idle map)
to 500% (combat animations).

Your experience may wary depending on devices and plugins used and general
structure of game.

## Recomendations

I recommend  updating PIXI.js rendering engine to 4.1.1. You can get this
release here: https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.1.1/pixi.min.js
PIXI.js 4.2.2 is not compatible with RPG Maker just yet.
