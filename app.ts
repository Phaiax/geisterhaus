/// <reference path="phaser/typescript/phaser.d.ts"/>

class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(240, 135, Phaser.CANVAS, 'content', { 
            preload: () => { this.preload() },
            create: () => { this.create() },
            update: () => { this.update() },
            render: () => { this.render() }  });
        
    }

    game: Phaser.Game;
    fx: Phaser.Sound;
    bmd: Phaser.BitmapData;
    picture: Phaser.Sprite;
    picturedowntween: Phaser.Tween;
    time: Phaser.BitmapText;
    tag: Phaser.Sprite;
    n8: Phaser.Sprite;

    preload() {
        this.game.load.image('fullscreen', 'assets/fullscreen.png');
        this.game.load.image('framedpicture', 'assets/ship.png');
        this.game.load.image('foreground', 'assets/foreground.png');
        this.game.load.image('tag', 'assets/tagBG.png');
        this.game.load.image('n8', 'assets/n8BG.png');
        this.game.load.bitmapFont('pixelfont', 'assets/carrier_command.png', 'assets/carrier_command.xml');
        this.game.load.audio('sound_pic_faellt', 'assets/sound/bildfaellt.mp3');
    }


    create() {


        this.fx = this.game.add.audio('sound_pic_faellt');




        this.tag = this.game.add.sprite(0, 0, 'tag');
        this.tag.z = 5;
        this.tag.visible = false;

        this.n8 =  this.game.add.sprite(0, 0, 'n8');
        this.tag.z = 6;
        this.tag.visible = false;

        this.picture = this.game.add.sprite(90, 100, 'framedpicture');
        this.picture.anchor = new Phaser.Point(1, 1);
        this.picture.scale = new Phaser.Point(1,1);
        this.picturedowntween = this.game.add.tween(this.picture).to( { y: 125 }, 400, Phaser.Easing.Quadratic.In);
        this.picture.z = 1;

        // Background
        var foreground = this.game.add.sprite(0, 0, 'foreground');
        foreground.anchor.set(0);
        foreground.z = 0;

        // Fullscreen button
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        var fullscreen_button = this.game.add.button(this.game.world.width-5, 5, 'fullscreen', () => {
            console.log("Fullscreen pressed");
            this.toggle_fullscreen();
        });
        fullscreen_button.anchor.setTo(1, 0);
        fullscreen_button.scale = new Phaser.Point(0.5, 0.5);

        //this.time = this.game.add.text(3, 3, "");
        //this.time.scale = new Phaser.Point(0.3, 0.3);
        this.time = this.game.add.bitmapText(3, 3, 'pixelfont','Drag me around !', 7);




        this.game.input.onDown.add(SimpleGame.prototype.tap, this);
        

        this.beginTag();
    }

    update() {
        var hours = this.game.time.totalElapsedSeconds() / 1;
        var minutes = Math.floor((hours % 1) * 60);
        var days = Math.floor(hours / 24);
        hours = Math.floor(hours % 24);
        var hours_0 = "";
        var minutes_0 = "";
        if (hours < 10) { hours_0 = "0"; }
        if (minutes < 10) { minutes_0 = "0"; }
        this.time.text = "Tag " + days + " um " + hours_0 + hours + ":" + minutes_0 + minutes;
        if (hours >= 8 && hours <= 20)
            this.beginTag();
        else
            this.beginN8(); 
        
    }

    beginTag()
    {
        this.tag.visible = true;
        this.n8.visible = false;
    }

    beginN8()
    {
        this.tag.visible = false;
        this.n8.visible = true;
    }

    render() {

    }

    picHasFallen : boolean;

    tap() {
        if (!this.picHasFallen && this.game.input.x < this.picture.x) {
            this.picHasFallen = true;
            this.fx.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                this.picturedowntween.start();
            }, this);
        }
    }

    toggle_fullscreen() {
        if (this.game.scale.isFullScreen)
        {
            this.game.scale.stopFullScreen();
        }
        else
        {
            this.game.scale.startFullScreen(false);
        }
    }

}

window.onload = () => {

    var game = new SimpleGame();

};