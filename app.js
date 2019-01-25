/// <reference path="phaser/typescript/phaser.d.ts"/>
var SimpleGame = /** @class */ (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('arrow', 'assets/ship.png');
    };
    SimpleGame.prototype.create = function () {
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
        this.ship = this.game.add.sprite(32, 450, 'arrow');
        this.ship.scale = new Phaser.Point(0.6, 0.6);
        this.game.physics.p2.enable(this.ship);
        this.ship.body.fixedRotation = true;
        this.text = this.game.add.text(20, 20, 'click to the left / right of the ship', { fill: '#ffffff', font: '14pt Arial' });
        this.game.input.onDown.add(SimpleGame.prototype.launch, this);
    };
    SimpleGame.prototype.update = function () {
    };
    SimpleGame.prototype.render = function () {
    };
    SimpleGame.prototype.launch = function () {
        if (this.game.input.x < this.ship.x) {
            this.ship.body.velocity.x = -200;
            this.ship.body.velocity.y = -200;
        }
        else {
            this.ship.body.velocity.x = 200;
            this.ship.body.velocity.y = -200;
        }
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
