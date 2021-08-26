export default class Score extends PIXI.Text {
    constructor(x,y) {
        
       
        super(x+" 0",y);
        this.score = 0;
        
        //console.log("bullets"+bullets);
        //app.stage.addChild(this);
    }
    updateScore(){
        this.score++;
        this.text = "Score : "+this.score;
    }
}