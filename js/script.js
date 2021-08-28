import Player from "./player.js";
import Enemy from "./enemy.js";
import Bullet from "./bullet.js";
import Hud from "./hud.js";
import Ebullet from "./ebullet.js";

const bgsound = PIXI.sound.Sound.from({
    url: 'music.mp3',
    volume: 0.1
});
const fx = PIXI.sound.Sound.from({
    url: 'pew.mp3',
    volume: 0.25
});
bgsound.volume = 0.25;
bgsound.play();
let app;

let bgBack;
let bgFront;
let bgMiddle;
let hud;


let keys = {};

let bullets = [];
let enemybullets = [];

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
    hud = new Hud();
    hud.addText();
    console.log(enemy);

    app.stage.addChild(enemy);
    app.stage.addChild(player);
    app.stage.addChild(hud.scoretext);
    app.stage.addChild(hud.healthtext);
    document.querySelector("#gameDiv ").addEventListener("pointerdown", () => {
        let bul = new Bullet(app.loader.resources["bullet"].texture, player.x, player.y);
        bullets.push(bul);
        fx.play();
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
    updateEnemybullets();

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
            bullets[i].y + 12 > enemy.y && bullets[i].y < enemy.y + 32) {
            app.stage.removeChild(enemy);
            hud.updateScore();
            console.log("dead");
            bullets[i].dead = true;
            enemy = new Enemy(app.loader.resources["enemy"].texture);
            app.stage.addChild(enemy);
        }

        if (bullets[i].x > 800) {
            bullets[i].dead = true;
        }
    }


    for (let i = bullets.length - 1; i > 0; i--) {
        if (bullets[i].dead) {
            app.stage.removeChild(bullets[i]);
            bullets.splice(i, 1);
        }
    }
}


function updateEnemybullets() {
    //console.log(enemybullets.length+" Esize");
    if (enemy.y % 100 == 0) {
        let bul = new Ebullet(app.loader.resources["bullet"].texture, enemy.x, enemy.y);
        // console.log("enemy bul"+ bul);
        enemybullets.push(bul);
        app.stage.addChild(bul);
        // console.log(enemybullets);
        // console.log(bul.x);


    }

    for (let i = 0; i < enemybullets.length; i++) {

        enemybullets[i].move();

        if (enemybullets[i].x > player.x && enemybullets[i].x < player.x + 32 &&
            enemybullets[i].y + 12 > player.y && enemybullets[i].y < player.y + 32) {

            hud.updateHealth();
            console.log("dead");
            enemybullets[i].dead = true;


        }

        if (enemybullets[i].x < 0) {
            enemybullets[i].dead = true;
        }


    }

    for (let i = enemybullets.length - 1; i >= 0; i--) {
        if (enemybullets[i].dead) {
            app.stage.removeChild(enemybullets[i]);
            enemybullets.splice(i, 1);
        }
    }

}