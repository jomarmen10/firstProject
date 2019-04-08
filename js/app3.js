let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 300;
//
let marioPic = new Image();
marioPic.src = "img/marioSmall.png"

let enemyPic = new Image();
enemyPic.src = "img/enemies.png"

let groundPic = new Image();
groundPic.src = "img/blocks.png"



let gameLive = true;
let worldNumber = 0;

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
  w: canvas.width,
  h: 5,
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

class Tube {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
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

const world1 = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(marioPic,0,144,36,72,player.x, player.y, player.w, player.h);

  ctx.drawImage(enemyPic,0,0,29,29,enemy.x,enemy.y,enemy.w,enemy.h);

  ctx.fillStyle = 'brown';
  ctx.fillRect(world.x, world.y, world.w, world.h,)

  ctx.fillStyle = 'brown';
  ctx.fillRect(200, 150, 250, 10)

  if(collision(player, enemy)){
    gameLive = false;
  }

  if(collision(player, highGround)){
    player.y = highGround.y - 60;
    player.yVelo *= 0.7;
    if(player.yVelo > 0){
      player.jumping = false
    }
  }

  enemy.x += enemy.speed
  if( enemy.x <= 200){
    enemy.x = 200;
    enemy.speed *= -1
  } else if (enemy.x >= 450){
    enemy.x = 450;
    enemy.speed *= -1
  }
}

const world2 = () => {

  const small2 = new Tube(200, 200, 60, 80)
  const medium2 = new Tube(400, 160, 60, 120)

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(marioPic,0,144,36,72,player.x, player.y, player.w, player.h);

  ctx.fillStyle = 'green'
  ctx.fillRect(small2.x,small2.y,small2.w,small2.h)

  ctx.fillStyle = 'green'
  ctx.fillRect(medium2.x,medium2.y,medium2.w,medium2.h)

  ctx.fillStyle = 'brown';
  ctx.fillRect(world.x, world.y, world.w, world.h,)

  if(collision(player, small2)){
    if(player.x < small2.x && player.y > small2.y){
      player.x = small2.x - player.w
    }
    if(player.y < small2.y){
      player.y = small2.y - player.h;
      if(player.yVelo > 0){
        player.jumping = false
      }
    }
    if(player.x > small2.x && player.y > small2.y){
      player.x = small2.x + small2.w
    }
  }

  if(collision(player, medium2)){
    if(player.x < medium2.x && player.y > medium2.y){
      player.x = medium2.x - player.w
    }
    if(player.y < medium2.y){
      player.y = medium2.y - player.h;
      if(player.yVelo > 0){
        player.jumping = false
      }
    }
    if(player.x > medium2.x && player.y > medium2.y){
      player.x = medium2.x + medium2.w
    }
  }

}

const world3 = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.fillStyle = 'brown';
  ctx.fillRect(world.x, world.y, world.w, world.h,)
}



const drawImage = () => {
  if(worldNumber === 0) {
    world1()
  }
  else if (worldNumber === 1) {
    world2()
  }
  else if (world3 === 2){
    world3()
  }
}


const update = () => {

  if(collision(player, world)){
    player.y = world.y - 60;
    player.yVelo *= 0.7;
    if(player.yVelo > 0){
      player.jumping = false
    }
  }

}

const loop = () => {

  player.yVelo += 1.2
  player.x += player.xVelo;
  player.y += player.yVelo;
  player.xVelo *= 0.9;
  player.yVelo *= 0.9;

  if(player.x < 0){
    player.x = 0
  } else if (player.x > canvas.width){
    worldNumber++
    player.x = -40;
  }

  if(player.y > canvas.height){
    gameLive = false;
  }
  update()
  keyControl()
  drawImage()
  collision(player, enemy)
  collision(player, highGround)

  if(gameLive){
    requestAnimationFrame(loop)
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
