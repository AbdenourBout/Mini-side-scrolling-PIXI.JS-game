import Player from "./player.js";
import Enemy from "./enemy.js";
import Bullet from "./bullet.js";
let app;

        let bgBack;
        let bgFront;
        let bgMiddle;


        let keys = {};
        
        let bullets = [];
        
        let player;
        let enemy;
        let enemySpeed = 2;

        let bgX = 0;
        let bgSpeed = 1;


        window.onload = function () {
            app = new PIXI.Application({
                width: 800,
                height: 600,
                backgroundColor: 0x000000
            });
            document.querySelector("#gameDiv").appendChild(app.view);

            app.stage.interactive = true;
            


            window.addEventListener("keydown", keysDown);
            window.addEventListener("keyup", keysUp);


            app.loader.baseUrl = "img";
            app.loader
                .add("bgBack", "back.png")
                .add("bgMiddle", "middle.png")
                .add("bgFront", "front.png")
                .add("player", "player.png")
                .add("enemy", "enemy.png")
                .add("bullet", "bullet.png");


            app.loader.onComplete.add(initLevel);
            app.loader.load();


            // app.ticker.app(gameLoop);

        }

        function initLevel() {
            

            bgBack = createBg(app.loader.resources["bgBack"].texture);
            bgMiddle = createBg(app.loader.resources["bgMiddle"].texture);
            bgFront = createBg(app.loader.resources["bgFront"].texture);
            player = new Player(app.loader.resources["player"].texture);
            enemy = new Enemy(app.loader.resources["enemy"].texture);
            console.log( enemy);
            
            app.stage.addChild(enemy);
            app.stage.addChild(player);
            document.querySelector("#gameDiv ").addEventListener("pointerdown", ()=>{
                let bul=new Bullet(app.loader.resources["bullet"].texture,player.x,player.y);
                bullets.push(bul);
                app.stage.addChild(bul);
                console.log(bullets);
                console.log(bul.x);
                
                
                
                });
            app.ticker.add(gameLoop);
        }

        function keysDown(e) {
            console.log(e.keyCode);
            keys[e.keyCode] = true;
        }

        function keysUp(e) {
            keys[e.keyCode] = false;
        }


        function gameLoop(delta) {
            updateBg();
            enemy.move();
            updateBullets(delta);

            //keysDiv.innerHTML = JSON.stringify(keys);
            // console.log(player);

            if (keys["90"] == true) {
                console.log("player");
                player.y -= 5;
            }



            if (keys["83"] == true)
                player.y += 5;

            if (keys["68"] == true)
                player.x += 5;

            if (keys["81"] == true)
                player.x -= 5;






        }

        function createBg(texture) {
            let tiling = new PIXI.TilingSprite(texture, 800, 600);
            tiling.position.set(0, 0);
            app.stage.addChild(tiling);

            return tiling;
        }

        function updateBg() {
            bgX = (bgX - bgSpeed);
            bgFront.tilePosition.x = bgX;
            bgMiddle.tilePosition.x = bgX / 2;
            bgBack.tilePosition.x = bgX / 4;
        }

        
        function updateBullets(delta) {


            for (let i = 0; i < bullets.length; i++) {

                bullets[i].move();

                if (bullets[i].x > enemy.x && bullets[i].x < enemy.x + 32 &&
                    bullets[i].y > enemy.y && bullets[i].y < enemy.y + 32) {
                    app.stage.removeChild(enemy);
                    console.log("dead");
                    
                    //enemy= new Enemy(app.loader.resources["enemy"].texture);
                    app.stage.addChild(enemy);
                }
                
                if (bullets[i].x > 800) {
                    bullets[i].dead = true;
                }
            }


            for (let i = bullets.length-1; i > 0; i--) {
                if (bullets[i].dead) {
                    app.stage.removeChild(bullets[i]);
                    bullets.splice(i, 1);
                }
            }
        }
