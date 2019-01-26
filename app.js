/// <reference path="phaser/typescript/phaser.d.ts"/>
var SimpleGame = /** @class */ (function () {
    function SimpleGame() {
        var _this = this;
        this.game = new Phaser.Game(240, 135, Phaser.CANVAS, 'content', {
            preload: function () { _this.preload(); },
            create: function () { _this.create(); },
            update: function () { _this.update(); },
            render: function () { _this.render(); }
        });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('fullscreen', 'assets/fullscreen.png');
        this.game.load.image('framedpicture', 'assets/ship.png');
        this.game.load.image('background', 'assets/house.png');
        this.game.load.bitmapFont('pixelfont', 'assets/carrier_command.png', 'assets/carrier_command.xml');
    };
    SimpleGame.prototype.create = function () {
        var _this = this;
        // Background
        var background = this.game.add.sprite(0, 0, 'background');
        background.anchor.set(0);
        // Fullscreen button
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        var fullscreen_button = this.game.add.button(this.game.world.width - 5, 5, 'fullscreen', function () {
            console.log("Fullscreen pressed");
            _this.toggle_fullscreen();
        });
        fullscreen_button.anchor.setTo(1, 0);
        fullscreen_button.scale = new Phaser.Point(0.5, 0.5);
        //this.time = this.game.add.text(3, 3, "");
        //this.time.scale = new Phaser.Point(0.3, 0.3);
        this.time = this.game.add.bitmapText(3, 3, 'pixelfont', 'Drag me around !', 7);
        this.picture = this.game.add.sprite(90, 100, 'framedpicture');
        this.picture.anchor = new Phaser.Point(1, 1);
        this.picture.scale = new Phaser.Point(0.2, 0.2);
        this.picturedowntween = this.game.add.tween(this.picture).to({ y: 130 }, 400, Phaser.Easing.Quadratic.In);
        this.game.input.onDown.add(SimpleGame.prototype.tap, this);
    };
    SimpleGame.prototype.update = function () {
        var hours = this.game.time.totalElapsedSeconds() / 1;
        var minutes = Math.floor((hours % 1) * 60);
        var days = Math.floor(hours / 24);
        hours = Math.floor(hours % 24);
        var hours_0 = "";
        var minutes_0 = "";
        if (hours < 10) {
            hours_0 = "0";
        }
        if (minutes < 10) {
            minutes_0 = "0";
        }
        this.time.text = "Tag " + days + " um " + hours_0 + hours + ":" + minutes_0 + minutes;
    };
    SimpleGame.prototype.render = function () {
    };
    SimpleGame.prototype.tap = function () {
        if (this.game.input.x < this.picture.x) {
            this.picturedowntween.start();
        }
    };
    SimpleGame.prototype.toggle_fullscreen = function () {
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        }
        else {
            this.game.scale.startFullScreen(false);
        }
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
