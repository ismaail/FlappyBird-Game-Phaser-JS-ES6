import Phaser from 'phaser';

/**
 * Class Bird
 */
export default class extends Phaser.Sprite {
    /**
     * Class Constructor
     *
     * @param {Phaser.Game} game
     * @param {number} x
     * @param {number} y
     * @param {string} asset
     */
    constructor({game, x, y, asset}) {
        super(game, x, y, asset);

        this.anchor.setTo(0.5, 0.5);

        this.velocity = 0;
        this.rotation = 0;
        this.gravity = 15;
        this._jump = 300;
        this.ceil = (this.height / 2) + 4;

        game.input.onTap.add(() => this.jump());

        this.fly();
    }

    /**
     * Fly animation
     */
    fly() {
        this.animations.add('fly');
        this.animations.play('fly', 15, true);
    }

    /**
     * Makes the bird "flap" and jump
     */
    jump() {
        this.body.velocity.y = -this._jump;
    }

    /**
     * Sprite Update
     */
    update() {
        this.body.velocity.y += this.gravity;

        if (this.body.velocity.y >= this._jump) {
            this.rotation = Math.min(Math.PI/2, this.rotation + 0.3);
        } else {
            this.rotation = -0.3;
        }

        // Prevent from going up out of the screen
        if (this.y <= this.ceil) {
            this.y = this.ceil;
        }
    }
}
