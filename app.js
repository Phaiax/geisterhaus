/// <reference path="phaser/typescript/phaser.d.ts"/>
var m = 5;
var SimpleGame = /** @class */ (function () {
    function SimpleGame() {
        var _this = this;
        this.day = 1;
        this.picHasFallen = false;
        this.knocks = 0;
        var config = {
            width: 240 * m,
            height: 135 * m,
            renderer: Phaser.CANVAS,
            antialias: false,
            parent: 'content',
            state: {
                preload: function () { _this.preload(); },
                create: function () { _this.create(); },
                update: function () { _this.update(); },
                render: function () { _this.render(); }
            }
        };
        this.game = new Phaser.Game(config);
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('fullscreen', 'assets/scaled/fullscreen.png');
        this.game.load.image('framedpicture', 'assets/scaled/ship.png');
        this.game.load.image('foreground', 'assets/scaled/foreground.png');
        this.game.load.image('grl', 'assets/scaled/grl.png');
        this.game.load.image('tag', 'assets/scaled/tagBG.png');
        this.game.load.image('n8', 'assets/scaled/n8BG.png');
        this.game.load.image('kaffee', 'assets/scaled/kaffee.png');
        this.game.load.image('ghost', 'assets/scaled/ghost.png');
        this.game.load.bitmapFont('pixelfont', 'assets/carrier_command.png', 'assets/carrier_command.xml');
        this.game.load.bitmapFont('pixelfont2', 'assets/carrier_command2.png', 'assets/carrier_command.xml');
        this.game.load.audio('sound_pic_faellt', 'assets/sound/bildfaellt.mp3');
        this.game.load.audio('sound_morgen_nacht', 'assets/sound/gutenmorgengutenacht.mp3');
        this.game.load.audio('sound_knock', 'assets/sound/knock.mp3');
        this.game.load.audio('sound_aufhaengen', 'assets/sound/bildaufhaengen.mp3');
        this.game.load.audio('sound_kaffeeneu', 'assets/sound/kaffee.mp3');
        this.game.load.audio('sound_kaffeefliegt', 'assets/sound/kaffeefliegt.mp3');
        this.game.load.audio('sound_story', 'assets/sound/story.mp3');
    };
    SimpleGame.prototype.tag1Bildhaengen = function () {
        // position girl in the beginning to the door
        this.picture.position = new Phaser.Point(200 * m + 20 * m, 130 * m);
        this.grl.position = new Phaser.Point(206 * m + 10 * m, 122 * m);
        this.picture.visible = true;
        this.grl.visible = true;
        // let her with the bild walk to the bild haeng position
        this.bildWirdgehaengt.chain(this.bildWirdgehaengt2);
        this.bildWirdgehaengt2.chain(this.bildWirdgehaengt3);
        this.grlCarryBild.start();
        this.bildWirdgehaengt.start();
        //after. position bild on correct position
        // play sound?
        this.fxaufhaengen.play();
    };
    SimpleGame.prototype.tag2KaffeemachineStellen = function () {
        this.kaffee.position = new Phaser.Point(200 * m + 20 * m, 110 * m);
        this.grl.position = new Phaser.Point(206 * m + 10 * m, 122 * m);
        this.kaffee.visible = true;
        this.grl.visible = true;
        // let her with the bild walk to the bild haeng position
        this.kaffeebewegung.chain(this.kaffeestellen);
        this.kaffeestellen.chain(this.bildWirdgehaengt3);
        this.grlCarryKaffee.start();
        this.kaffeestellen.start();
        this.kaffeebewegung.start();
        //after. position bild on correct position
        // play sound?
        this.fxkaffeeneu.play();
    };
    SimpleGame.prototype.create = function () {
        var _this = this;
        this.fxbildfaellt = this.game.add.audio('sound_pic_faellt');
        this.fxaufhaengen = this.game.add.audio('sound_aufhaengen');
        this.fxknock = this.game.add.audio('sound_knock');
        this.fxgutenmorgen = this.game.add.audio('sound_morgen_nacht');
        this.fxgutenmorgen.addMarker('morgen1', 0.046, 0.871);
        this.fxgutenmorgen.addMarker('morgen2', 1.126, 0.894);
        this.fxgutenmorgen.addMarker('morgen3', 2.218, 0.580);
        this.fxgutenmorgen.addMarker('morgen4', 2.926, 1.382);
        this.fxgutenmorgen.addMarker('nacht1', 4.540, 0.848);
        this.fxgutenmorgen.addMarker('nacht2', 5.303, 0.720);
        this.fxgutenmorgen.addMarker('nacht3', 6.455, 0.940);
        this.fxgutenmorgen.addMarker('nacht4', 7.588, 0.789);
        this.fxgutenmorgen.addMarker('nacht5', 8.382, 1.045);
        this.fxgutenmorgen.addMarker('nacht6', 9.764, 1.881);
        this.fxkaffeefliegt = this.game.add.audio('sound_kaffeefliegt');
        this.fxkaffeeneu = this.game.add.audio('sound_kaffeeneu');
        this.fxstory = this.game.add.audio('sound_story');
        this.tag = this.game.add.sprite(0, 0, 'tag');
        this.tag.z = 5;
        this.tag.visible = false;
        this.n8 = this.game.add.sprite(0, 0, 'n8');
        this.tag.z = 6;
        this.tag.visible = false;
        this.grl = this.game.add.sprite(100 * m, 122 * m, 'grl');
        this.grl.anchor = new Phaser.Point(1, 1);
        this.grl.scale = new Phaser.Point(1, 1);
        this.grl.visible = false;
        this.picture = this.game.add.sprite(90 * m, 100 * m, 'framedpicture');
        this.picture.anchor = new Phaser.Point(1, 1);
        this.picture.scale = new Phaser.Point(1, 1);
        this.picturedowntween = this.game.add.tween(this.picture).to({ y: 125 * m }, 400, Phaser.Easing.Quadratic.In);
        this.pictureerasetween = this.game.add.tween(this.picture).to({ alpha: 0 }, 800, Phaser.Easing.Quadratic.In);
        this.picturedowntween.chain(this.pictureerasetween);
        this.picture.visible = false;
        this.kaffee = this.game.add.sprite(90 * m, 100 * m, 'kaffee');
        this.kaffee.anchor = new Phaser.Point(1, 1);
        this.kaffee.scale = new Phaser.Point(1, 1);
        this.kaffee.visible = false;
        var foreground = this.game.add.sprite(0, 0, 'foreground');
        foreground.anchor.set(0);
        foreground.z = 0;
        this.ghost = this.game.add.sprite(30 * m, 30 * m, 'ghost');
        this.ghost.anchor = new Phaser.Point(1, 1);
        this.ghost.scale = new Phaser.Point(1, 1);
        this.ghostTweenR = this.game.add.tween(this.ghost).to({ x: 200 * m }, 1500, Phaser.Easing.Quadratic.InOut);
        this.ghostTweenL = this.game.add.tween(this.ghost).to({ x: 30 * m }, 1500, Phaser.Easing.Quadratic.InOut);
        this.ghostTweenR.chain(this.ghostTweenL);
        this.ghostTweenR.start();
        this.ghost.z = 1;
        // Fullscreen button
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        var fullscreen_button = this.game.add.button(this.game.world.width - 5 * m, 5 * m, 'fullscreen', function () {
            console.log("Fullscreen pressed");
            _this.toggle_fullscreen();
        });
        fullscreen_button.anchor.setTo(1, 0);
        fullscreen_button.scale = new Phaser.Point(0.5, 0.5);
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(0.5, 0.5);
        //this.time = this.game.add.text(3, 3, "");
        //this.time.scale = new Phaser.Point(0.3, 0.3);
        this.time = this.game.add.bitmapText(3 * m, 3 * m, 'pixelfont', 'Drag me around !', 7 * m);
        this.winlosetxt = this.game.add.bitmapText(60 * m, 65 * m, 'pixelfont2', '', 30 * m);
        this.game.input.onDown.add(SimpleGame.prototype.tap, this);
        this.grlCarryBild = this.game.add.tween(this.grl).to({ x: 90 * m }, 1500, Phaser.Easing.Quadratic.InOut);
        this.bildWirdgehaengt = this.game.add.tween(this.picture).to({ x: 90 * m }, 1500, Phaser.Easing.Quadratic.InOut);
        this.bildWirdgehaengt2 = this.game.add.tween(this.picture).to({ y: 92 * m }, 800, Phaser.Easing.Quadratic.InOut);
        this.bildWirdgehaengt3 = this.game.add.tween(this.grl).to({ x: 215 * m }, 2000, Phaser.Easing.Sinusoidal.InOut);
        this.grlCarryKaffee = this.game.add.tween(this.grl).to({ x: 65 * m }, 1500, Phaser.Easing.Quadratic.InOut);
        this.kaffeebewegung = this.game.add.tween(this.kaffee).to({ x: 65 * m }, 1500, Phaser.Easing.Quadratic.InOut, false, 0, 0, false);
        this.kaffeestellen = this.game.add.tween(this.kaffee).to({ x: 45 * m, y: 93 * m }, 1500, Phaser.Easing.Quadratic.InOut, false, 0, 0, false).from({ x: 65 * m });
        this.bildWirdgehaengt3 = this.game.add.tween(this.grl).to({ x: 215 * m }, 2000, Phaser.Easing.Sinusoidal.InOut);
        this.kaffeedowntween = this.game.add.tween(this.kaffee).to({ x: 200 * m, y: 125 * m }, 300, Phaser.Easing.Exponential.In);
        this.kaffeeerasetween = this.game.add.tween(this.kaffee).to({ alpha: 0 }, 800, Phaser.Easing.Quadratic.In);
        this.kaffeedowntween.chain(this.kaffeeerasetween);
    };
    SimpleGame.prototype.update = function () {
        if (!this.gameover) {
            var hours = (this.game.time.totalElapsedSeconds() / 1) + 5;
            var minutes = Math.floor((hours % 1) * 60);
            this.day = Math.floor((hours - 8) / 24) + 1;
            hours = Math.floor(hours % 24);
            var hours_0 = "";
            var minutes_0 = "";
            if (hours < 10) {
                hours_0 = "0";
            }
            if (minutes < 10) {
                minutes_0 = "0";
            }
            this.time.text = "Tag " + this.day + " um " + hours_0 + hours + ":" + minutes_0 + minutes;
            if (hours >= 8 && hours <= 20)
                this.beginTag();
            else
                this.beginN8();
            if (this.ghost.position.x < 31 * m)
                this.ghostTweenR.start();
            if (this.day == 1 && hours == 13 && !this.kaffeeaufgestellt) {
                //this.tag1Bildhaengen();
                this.kaffeeaufgestellt = true;
                this.tag2KaffeemachineStellen();
            }
            if (this.day == 2 && hours == 13 && !this.bildIstAufgehaengt) {
                this.bildIstAufgehaengt = true;
                this.tag1Bildhaengen();
            }
        }
    };
    SimpleGame.prototype.beginTag = function () {
        if (!this.isDay) {
            this.isDay = true;
            this.tag.visible = true;
            this.n8.visible = false;
            this.ghost.visible = false;
            var morgensounds = ['morgen1', 'morgen3', 'morgen2', 'morgen4'];
            this.fxgutenmorgen.play(morgensounds[this.day % morgensounds.length]);
            this.grl.position = new Phaser.Point(206 * m + 10 * m, 122 * m);
            this.grl.visible = true;
            if (this.day == 3)
                this.checkWinLose();
        }
    };
    SimpleGame.prototype.beginN8 = function () {
        if (this.isDay) {
            this.isDay = false;
            this.tag.visible = false;
            this.n8.visible = true;
            this.ghost.visible = true;
            var nachtsounds = ['nacht1', 'nacht2', 'nacht3', 'nacht4', 'nacht5', 'nacht6'];
            this.fxgutenmorgen.play(nachtsounds[this.day % nachtsounds.length]);
            this.grl.position = new Phaser.Point(206 * m + 10 * m, 122 * m);
            this.grl.visible = false;
        }
    };
    SimpleGame.prototype.checkWinLose = function () {
        if (this.picHasFallen == true && this.kaffeehasfallen == true) {
            this.winlosetxt.text = "WIN!";
            this.gameover = true;
        }
        else {
            this.winlosetxt.text = "LOSE!";
            this.gameover = true;
        }
    };
    SimpleGame.prototype.render = function () {
    };
    SimpleGame.prototype.tap = function () {
        var _this = this;
        var pictureHit = this.picture.getBounds().contains(this.game.input.x, this.game.input.y);
        if (!this.isDay && this.bildIstAufgehaengt && pictureHit && !this.picHasFallen) {
            this.knocks += 1;
            this.fxknock.play();
            console.log(this.knocks);
            if (this.knocks == 10 && !this.picHasFallen) {
                this.picHasFallen = true;
                this.fxbildfaellt.play();
                this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                    _this.picturedowntween.start();
                }, this);
            }
        }
        if (!this.isDay && this.day >= 1 && this.kaffeeaufgestellt) {
            this.fxkaffeefliegt.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                _this.kaffeedowntween.start();
            }, this);
            this.kaffeehasfallen = true;
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
