//=============================================================================
// KODERA_optimization.js
//=============================================================================

/*:
 * @plugindesc 1.0.1 Speed up core RPG Maker engine
 * @author Mariusz 'koder' Chwalba
 *
 * @help This plugin exchanges various elements of core RPG Maker engine with
 * quicker counterparts. No functionality is lost or gained.
 * 
 * It improves FPS (most visible on mobile platforms and netbooks) and reduces
 * battery life.
 * 
 * Plugin is FREE to use in both FREE and COMMERCIAL products. No guarantee,
 * implied or otherwise, is given. Attribution required in reasonable place
 * (credits). 
 */

(function () {

    Sprite.prototype.update = function () {
        var l = this.children.length;
        for (var i = 0; i < l; i++) {
            var child = this.children[i];
            if (child.update) {
                child.update();
            }
        };
    };
    Tilemap.prototype.update = function () {
        this.animationCount++;
        this.animationFrame = Math.floor(this.animationCount / 30);
        var l = this.children.length;
        for (var i = 0; i < l; i++) {
            var child = this.children[i];
            if (child.update) {
                child.update();
            }
        }
        for (var i = 0; i < this.bitmaps.length; i++) {
            if (this.bitmaps[i]) {
                this.bitmaps[i].touch();
            }
        }
    };
    TilingSprite.prototype.update = function () {
        var l = this.children.length;
        for (var i = 0; i < l; i++) {
            var child = this.children[i];
            if (child.update) {
                child.update();
            }
        }
    };
    Window.prototype.update = function () {
        if (this.active) {
            this._animationCount++;
        }
        var l = this.children.length;
        for (var i = 0; i < l; i++) {
            var child = this.children[i];
            if (child.update) {
                child.update();
            }
        }
    };
    WindowLayer.prototype.update = function () {
        var l = this.children.length;
        for (var i = 0; i < l; i++) {
            var child = this.children[i];
            if (child.update) {
                child.update();
            }
        }
    };
    Weather.prototype._updateAllSprites = function () {
        var maxSprites = Math.floor(this.power * 10);
        while (this._sprites.length < maxSprites) {
            this._addSprite();
        }
        while (this._sprites.length > maxSprites) {
            this._removeSprite();
        }
        var l = this._sprites.length;
        for (var i = 0; i < l; i++) {
            var sprite = this._sprites[i];
            this._updateSprite(sprite);
            sprite.x = sprite.ax - this.origin.x;
            sprite.y = sprite.ay - this.origin.y;
        }
    };
    Scene_Base.prototype.updateChildren = function () {
        var i;
        var l = this.children.length;
        for (i = 0; i < l; i++) {
            var child = this.children[i];
            if (child.update) {
                child.update();
            }
        }
    };

    Scene_ItemBase.prototype.applyItem = function () {
        var action = new Game_Action(this.user());
        action.setItemObject(this.item());
        var ita = this.itemTargetActors();
        for (var i = 0; i < ita.length; i++) {
            var target = ita[i];
            for (var i = 0; i < action.numRepeats(); i++) {
                action.apply(target);
            }
        };
        action.applyGlobal();
    };
    Sprite_Animation.prototype.updateFrame = function () {
        if (this._duration > 0) {
            var frameIndex = this.currentFrameIndex();
            this.updateAllCellSprites(this._animation.frames[frameIndex]);
            for (var i = 0; i < this._animation.timings; i++) {
                var timing = this._animation.timings[i];
                if (timing.frame === frameIndex) {
                    this.processTimingData(timing);
                }
            };
        }
    };
    Spriteset_Map.prototype.createCharacters = function () {
        this._characterSprites = [];
        var events = $gameMap.events()
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            this._characterSprites.push(new Sprite_Character(event));
        }
        var vehicles = $gameMap.vehicles();
        for (var i = 0; i < vehicles.length; i++) {
            var vehicle = vehicles[i];
            this._characterSprites.push(new Sprite_Character(vehicle));
        };
        var followers = $gamePlayer.followers()._data;
        for (var i = followers.length - 1; i >= 0; i--) {
            var follower = followers[i];
            this._characterSprites.push(new Sprite_Character(follower));
        }
        this._characterSprites.push(new Sprite_Character($gamePlayer));
        for (var i = 0; i < this._characterSprites.length; i++) {
            this._tilemap.addChild(this._characterSprites[i]);
        }
    };

})();

