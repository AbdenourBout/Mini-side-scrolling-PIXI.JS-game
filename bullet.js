export default class Bullet extends PIXI.Sprite {
    constructor(texture,playerX,playerY) {
        super(texture);
        this.anchor.set(0.5);

        this.dead = false;
        this.x = playerX;
        this.y = playerY;
        this.speed = 20;

        
        
        
    }
    move() {
        this.x += this.speed;
    }
}
