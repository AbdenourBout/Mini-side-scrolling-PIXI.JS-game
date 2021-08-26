import Score from "./score.js";
import Health from "./health.js";
export default class Hud extends PIXI.Text {
    constructor() {
        
        super();
        this.scoretext = new PIXI.Text('Score: 0',{fontFamily : 'Arial', fontSize: 40, fill : 0xfff, align : 'center'});
        this.healthtext = new PIXI.Text('Health: 10',{fontFamily : 'Arial', fontSize: 40, fill : 0xfff, align : 'center'});
        this.healthtext.x = 600;
        this.score; 
      //  this.health;
        this.count= 0;
        this.health= 10;
        //console.log("bullets"+bullets);
        //app.stage.addChild(this);
    }
    addText(){
      
    }
    updateScore(){
        this.count++;
        this.scoretext.text = "Score : "+this.count;
    }

    updateHealth(){
        this.health--;
        this.healthtext.text = "Health : "+this.health;
    }
}