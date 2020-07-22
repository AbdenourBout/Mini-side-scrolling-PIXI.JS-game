let app;
        let bgBack;
        let bgFront;
        let bgMiddle;


        let keys = {};
        let keysDiv;
        let bullets = [];
        let bulletSpeed = 10;
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
            player = createPlayer(app.loader.resources["player"].texture);
            enemy = new Enemy();
            document.querySelector("#gameDiv ").addEventListener("pointerdown", ()=>{new Bullet();});
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


        class Enemy extends PIXI.Sprite {
            constructor(name = "none", hp = 100, speed = 5) {
                super(app.loader.resources["enemy"].texture);
                this.anchor.set(0.5);
                this.name = name;
                this.hp = hp;
                this.x = 700;
                this.y = 50;
                this.speed = speed;
                app.stage.addChild(this);
            }
            status() {
                return this.name + " has " + this.hp + "hit points";
            }

            move() {
                if (this.y < 0 || this.y > 600)
                    this.speed = -this.speed;
                this.y += this.speed;
            }
        }

        class Bullet extends PIXI.Sprite {
            constructor() {
                super(app.loader.resources["bullet"].texture);
                this.anchor.set(0.5);

                this.dead = false;
                this.x = player.x;
                this.y = player.y;
                this.speed = 20;

                bullets.push(this);
                console.log("bullets"+bullets);
                app.stage.addChild(this);
            }
            move() {
                this.x += this.speed;
            }
        }


        class Player extends PIXI.Sprite {
            constructor() {
                super(app.loader.resources["player"].texture);
                this.anchor.set(0.5);

                this.x = 80;
                this.y = app.view.height / 2;
                this.speed = 20;

                
                console.log("bullets"+bullets);
                app.stage.addChild(this);
            }
            
        }




        function createPlayer(texture) {
            console.log("player");

            let player = new Player();
            console.log("player" + player);
            
            console.log("player" + player.x);

            
            return player;

        }
       


        function fireBullet() {
            console.log("click!");

            let bullet = new Bullet(player.x, player.y);

            console.log(bullet.position.x);
            

        }

        function updateBullets(delta) {


            for (let i = 0; i < bullets.length; i++) {

                bullets[i].move();

                if (bullets[i].x > enemy.x && bullets[i].x < enemy.x + 32 &&
                    bullets[i].y > enemy.y && bullets[i].y < enemy.y + 32) {
                    app.stage.removeChild(enemy);
                }
                console.log(bullets[i].speed);
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
