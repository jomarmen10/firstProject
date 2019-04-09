// const canvas = $('#canvas')
// const ctx = canvas[0].getContext('2d')

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;
//
let marioPic = new Image();
marioPic.src = "img/marioSmall.png"

let enemyPic = new Image();
enemyPic.src = "img/enemies.png"



let gameLive = true;

let player = {
  x: 10,
  y: 0,
  xVelo: 0,
  yVelo: 0,
  w: 32,
  h: 72,
  jumping: true
}

const world = {
  ground: 240,
  x: 0,
  y: 280,
  w: 300,
  h: 5,
}

const woldSpace = {
  ground: 240,
  x: 400,
  y: 280,
  w: 200,
  h: 5
}

const highGround = {
  x: 200,
  y: 150,
  w: 250,
  h: 10
}

const enemy = {
  x: 200,
  y: 255,
  w: 35,
  h: 35,
  gravity: 0,
  speed: 2
}

let control = {

  left: false,
  right: false,
  up: false,
  keyListiner(e){
    let keyState = (e.type === 'keydown')?true:false;
    switch (e.keyCode) {
      case 37:
        control.left = keyState;
        break;
      case 32:
        control.up = keyState;
        break;
      case 39:
          control.right = keyState;
        break;
    }
  }
}


const keyControl = () => {
  if (control.up && player.jumping === false) {
    player.yVelo -= 35;
    player.jumping = true;
  }
  if (control.left) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(marioPic,0,72,36,72,player.x, player.y, player.w, player.h);
    player.xVelo -= 0.5;
  }
  if (control.right) {
    player.xVelo += 0.5;
  }
}

const drawImage = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(marioPic,0,144,36,72,player.x, player.y, player.w, player.h);

    ctx.drawImage(enemyPic,0,0,29,29,enemy.x,enemy.y,enemy.w,enemy.h);

    ctx.fillStyle = 'brown';
    ctx.fillRect(world.x, world.y, world.w, world.h,)

    ctx.fillStyle = 'brown';
    ctx.fillRect(woldSpace.x, woldSpace.y, canvas.width, woldSpace.h,)

    ctx.fillStyle = 'brown';
    ctx.fillRect(200, 150, 250, 10)


}



const update = () => {

  // if(collision(player, enemy)){
  //   gameLive = false;
  // }

  // if(collision(player, highGround)){
  //   player.y = highGround.y - 60;
  //   player.yVelo *= 0.7;
  //   if(player.yVelo > 0){
  //     player.jumping = false
  //   }
  // }

  if(collision(player, woldSpace)){
    player.y = woldSpace.y - 60;
  }

  if(collision(player, world)){
    player.y = world.y - 60;
    player.yVelo *= 0.7;
    if(player.yVelo > 0){
      player.jumping = false
    }
  }


  // enemy.x += enemy.speed
  if( enemy.x <= 200){
    enemy.x = 200;
    enemy.speed *= -1;
  } else if (enemy.x >= 450){
    enemy.x = 450;
    enemy.speed *= -1;
  }
}

const loop = () => {

  player.yVelo += 1.2;
  player.x += player.xVelo;
  player.y += player.yVelo;
  player.xVelo *= 0.9;
  player.yVelo *= 0.9;

  if(player.x < -40){
    player.x = 600;
  } else if (player.x > 600){
    player.x = -40;
  }

  if(player.y > world.y){
    gameLive = false;
  }
  update();
  keyControl();
  drawImage();
  collision(player, enemy);
  collision(player, highGround);

  if(gameLive){
    requestAnimationFrame(loop);
  }
}
const collision = (rect1, rect2) =>{
  return rect1.x < rect2.x + rect2.w &&
  rect1.x + rect1.w > rect2.x &&
  rect1.y < rect2.y + rect2.h &&
  rect1.y + rect1.h > rect2.y;
}

document.addEventListener('keydown', control.keyListiner)
document.addEventListener('keyup', control.keyListiner)
loop()
