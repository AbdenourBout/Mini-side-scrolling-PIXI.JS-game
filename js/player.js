export default class Player extends PIXI.Sprite {
    constructor(x) {
        super(x);
        //this.anchor.set(0.5);

        this.x = 80;
        this.y = 600 / 2;
        this.speed = 20;

        
        //console.log("bullets"+bullets);
        //app.stage.addChild(this);
    }
    
}