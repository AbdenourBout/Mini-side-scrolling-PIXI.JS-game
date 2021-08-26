export default class Health extends PIXI.Text {
    constructor(x,y) {
        
       
        super(x+" 0",y);
        this.score = 0;
        
        //console.log("bullets"+bullets);
        //app.stage.addChild(this);
    }
    updateHealth(){
        this.score++;
        this.text = "Health : "+this.score;
    }
}