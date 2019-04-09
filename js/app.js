let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 300;
//
const marioPic = new Image();
marioPic.src = "img/marioSmall.png"

const enemyPic = new Image();
enemyPic.src = "img/enemies.png"

const groundPic = new Image();
groundPic.src = "img/blocks.png"

const castlePic = new Image();
castlePic.src = "img/bg-1-1.png"



let gameLive = true;
let worldNumber = 2;

let player = {
  x: 10,
  y: 0,
  xVelo: 0,
  yVelo: 0,
  w: 32,
  h: 72,
  hAndPic: 70,
  jumping: true
}

const world = {
  ground: 240,
  x: 0,
  y: 260,
  w: canvas.width,
  h: 5,
}

const stage3 = {
  ground: 240,
  x: 0,
  y: 280,
  w: 400,
  h: 5,
}


const highGround = {
  x: 480,
  y: 180,
  w: 120,
  h: 5
}

class Ground {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

class Enemy {
  constructor(x,y,w,h,speed){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
  }
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
    player.yVelo -= 30;
    player.jumping = true;
  }
  if (control.left) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(marioPic,0,72,36,72,player.x, player.y, player.w, player.h);
    player.xVelo -= 0.5;
  }
  if (control.right) {
    player.xVelo += 0.5;
  }
}

const world1 = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const small1 = new Tube(670, 225, 50, 50)

  ctx.drawImage(castlePic,0,0,600,300,0,0,900,400)

  ctx.drawImage(marioPic,0,144,36,72,player.x, player.y, player.w, player.h);

  ctx.drawImage(enemyPic,0,0,29,29,enemy1.x,enemy1.y,enemy1.w,enemy1.h);
  ctx.fillStyle = 'brown';
  // ctx.fillRect(small1.x,small1.y,small1.w,small1.h)

  ctx.fillStyle = 'brown';
  // ctx.fillRect(480, 180, 120, 5)

  if(collision(player, small1)){
    if((player.x + player.w) < small1.x && (player.y + player.h) > small1.y){
      player.x = small1.x - player.w
    } else if(player.x < small1.x && player.y > small1.y){
      player.x = small1.x - player.w
    } else if(player.y < small1.y){
      player.y = small1.y - player.h;
      if(player.yVelo > 0){
        player.jumping = false
      }
    }else if(player.x > small1.x && player.y > small1.y){
      player.x = small1.x + small1.w
    }
  }


  if(collision(player, enemy1)){
    gameLive = false;
  }

  if(collision(player, highGround)){
    player.y = highGround.y - 60;
    player.yVelo *= 0.7;
    if(player.yVelo > 0){
      player.jumping = false
    }
  }

  enemy1.x += enemy1.speed
  if(enemy1.x <= 200){
    enemy1.x = 200;
    enemy1.speed *= -1
  } else if (enemy1.x >= 650){
    enemy1.x = 650;
    enemy1.speed *= -1
  }
}

const world2 = () => {
  const front = new Tube(15 ,203, 50, 60)
  const small2 = new Tube(203, 180, 50, 80)
  const medium2 = new Tube(465, 180, 50, 88)

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(castlePic,600,0,600,300,0,0,900,400)


  ctx.drawImage(marioPic,0,144,36,72,player.x, player.y, player.w, player.h);

  ctx.drawImage(enemyPic,0,0,29,29,enemy2.x,enemy2.y,enemy2.w,enemy2.h);


  ctx.fillStyle = 'green'
  // ctx.fillRect(front.x,front.y,front.w,front.h)

  ctx.fillStyle = 'green'
  // ctx.fillRect(medium2.x,medium2.y,medium2.w,medium2.h)

  if(collision(player, enemy2)){
    gameLive = false;
  }

  if(collision(player, front)){
    if(player.x < front.x && player.y > front.y){
      player.x = front.x - player.w
    }
    else if(player.y < front.y){
      player.y = front.y - player.hAndPic;
      if(player.yVelo > 0){
        player.jumping = false
      }
    }
    else if(player.x > front.x && player.y > front.y){
      player.x = front.x + front.w
    }
  }

  if(collision(player, small2)){
    if(player.x < small2.x && player.y > small2.y){
      player.x = small2.x - player.w
    }
    else if(player.y < small2.y){
      player.y = small2.y - player.hAndPic;
      if(player.yVelo > 0){
        player.jumping = false
      }
    }
    else if(player.x > small2.x && player.y > small2.y){
      player.x = small2.x + small2.w
    }
  }

  if(collision(player, medium2)){
    if(player.x < medium2.x && player.y > medium2.y){
      player.x = medium2.x - player.w
    }
    if(player.y < medium2.y){
      player.y = medium2.y - player.hAndPic;
      if(player.yVelo > 0){
        player.jumping = false
      }
    }
    if(player.x > medium2.x && player.y > medium2.y){
      player.x = medium2.x + medium2.w
    }
  }

  enemy2.x += enemy2.speed
  if(enemy2.x <= 250){
    enemy2.x = 250;
    enemy2.speed *= -1
  } else if (enemy2.x >= 450){
    enemy2.x = 450;
    enemy2.speed *= -1
  }
}

const world3 = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const high1 = new Ground (47, 180, 74, 5)
  const high2 = new Ground (119, 95, 193, 3)
  const high3 = new Ground (383, 95, 95, 1)
  const high4 = new Ground (600, 180, 50, 1)
  ctx.drawImage(castlePic,1200,0,600,300,0,0,900,400)

  ctx.drawImage(marioPic,0,144,36,72,player.x, player.y, player.w, player.h);


  ctx.drawImage(enemyPic,0,0,29,29,enemy3.x,enemy3.y,enemy3.w,enemy3.h);

  ctx.fillStyle = 'brown';
  ctx.fillRect(world.x, world.y, world.w, world.h,)

  ctx.fillStyle = 'brown';
  ctx.fillRect(high1.x, high1.y, high1.w, high1.h,)

  ctx.fillStyle = 'brown';
  ctx.fillRect(high2.x, high2.y, high2.w, high2.h,)
  ctx.fillStyle = 'brown';
  ctx.fillRect(high3.x, high3.y, high3.w, high3.h,)
  ctx.fillStyle = 'brown';
  ctx.fillRect(high4.x, high4.y, high4.w, high4.h,)

  if(collision(player, enemy2)){
    if(player.y + player.h < enemy2.y){
      console.log('hit')
    }
  }

  if(collision(player, high1)){
    player.y = high1.y - 60;
    player.yVelo *= 0.7;
    if(player.yVelo > 0){
      player.jumping = false
    }
  }
  if(collision(player, high2)){
    player.y = high2.y - 60;
    player.yVelo *= 0.7;
    if(player.yVelo > 0){
      player.jumping = false
    }
  }

  //
  // if(isCollision(player, high4)){
  //   player.yVelo *= 0.7
  //   player.y = high4.y - 60
  //   if(player.yVelo > 0){
  //     player.jumping = false;
  //   }
  // }

  if(collision(player, high3)){
    player.yVelo *= 0.7
    player.y = high3.y - 60
    if(player.yVelo > 0){
      player.jumping = false;
    }
  }



  enemy2.x += enemy2.speed
  if(enemy2.x <= 200){
    enemy2.x = 200;
    enemy2.speed *= -1
  } else if (enemy2.x >= 450){
    enemy2.x = 450;
    enemy2.speed *= -1
  }

}

const world4 = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(castlePic,2000,0,600,300,0,0,900,400)
  ctx.drawImage(marioPic,0,144,36,72,player.x, player.y, player.w, player.h);
}
const world5 = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(castlePic,2700,0,600,300,0,0,900,400)
  ctx.drawImage(marioPic,0,144,36,72,player.x, player.y, player.w, player.h);

}

const drawImage = () => {
  if(worldNumber === 0) {
    world1()
  }
  else if (worldNumber === 1) {
    world2()
  }
  else if (worldNumber === 2){
    world3()
  }
  else if (worldNumber === 3){
    update()
    world4()
  }
  else if (worldNumber === 4) {
    world5()
  }
}


const update = () => {
  if(collision(player, world)){
    player.y = world.y - 50;
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
    player.x = -32;
  }

  if(player.y > canvas.heigh){
    gameLive = false;
  }


  update()
  keyControl()
  drawImage()


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

// const isCollision = (rect1, rect2) => {
//  if(rect1.y + rect1.h > rect2.y) {return false};
//  return true;
// }

// const isCollision = (rect1, rect2) => {
//   if(rect1.x > (rect2.x + rect2.w)){ return false}
//   if((rect1.x + rect1.w) < rect2.x){return false}
//   if(rect1.y > (rect2.y + rect2.h)){ return false}
//   if((rect1.y + rect1.h) < rect2.y){return false}
//   return true;
// }

const enemy1 = new Enemy(200, 240, 35, 35, 1.5)
const enemy2 = new Enemy(250, 240, 35, 35, 1.5)
const enemy3 = new Enemy(200, 240, 35, 35, 2)
document.addEventListener('keydown', control.keyListiner)
document.addEventListener('keyup', control.keyListiner)
loop()



// if(collision(player, small1)){
//   if(player.x + player.w < Math.floor(small1.x + player.w)){
//      player.x = small1.x - player.w
//   }else if(Math.floor(player.y + player.h) < Math.floor(small1.y + player.h)){
//     player.y = small1.y - player.h;
//     if(player.yVelo > 0){
//       player.jumping = false
//     }
//   }else if(player.x > Math.floor(small1.x + small1.w) && player.y + player.w > small1.y){
//     player.x = small1.x + small1.w
//   }
// }
