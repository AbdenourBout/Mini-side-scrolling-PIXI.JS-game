export default class Ebullet extends PIXI.Sprite {
    constructor(texture,enemyX,enemyY) {
        super(texture);
        //this.anchor.set(0.5);

        this.dead = false;
        this.x = enemyX;
        this.y = enemyY;
        this.speed = 10;
        

        
        
        
    }
    move() {
        this.x -= this.speed;
    }
}
