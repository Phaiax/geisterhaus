/// <reference path="phaser/typescript/phaser.d.ts"/>

class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'content', { 
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render  });
    }

    game: Phaser.Game;
    bmd: Phaser.BitmapData;
    sprite: Phaser.Sprite;
    text: Phaser.Text;

    preload() {
        this.game.load.image('arrow', 'assets/ship.png');
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);

        //	Enable p2 physics
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.game.stage.backgroundColor = '#124184';

        this.bmd = this.game.add.bitmapData(800, 600);
        this.bmd.context.fillStyle = '#ffffff';

        var bg = this.game.add.sprite(0, 0, this.bmd);

        this.game.physics.p2.gravity.y = 100;
        this.game.physics.p2.restitution = 0.8;

        this.sprite = this.game.add.sprite(32, 450, 'arrow');

        this.game.physics.p2.enable(this.sprite);

        this.sprite.body.fixedRotation = true;

        this.text = this.game.add.text(20, 20, 'click to the left / right of the ship', { fill: '#ffffff', font: '14pt Arial' });

        this.game.input.onDown.add(SimpleGame.prototype.launch, this);



    }

    update() {

    }

    render() {

    }

    launch() {
        if (this.game.input.x < this.sprite.x)
        {
            this.sprite.body.velocity.x = -200;
            this.sprite.body.velocity.y = -200;
        }
        else
        {
            this.sprite.body.velocity.x = 200;
            this.sprite.body.velocity.y = -200;
        }
    }

}

window.onload = () => {

    var game = new SimpleGame();

};