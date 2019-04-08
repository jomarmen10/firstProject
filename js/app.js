/*----- constants -----*/
let gameLive = true;

const world = {
  gravity: 0.2,
  drag: 0.999,
  groundDrag: 0.9,
  ground: 150,
}

const player = {
  mario: true,
  lives: 3,
  coins: 0,
  speedX: 2,
  x: 10,
  y: 200,
  w: 50,
  h: 50,
  xVelocity: 0,
  yVelocity: 0,
  isMovingRight: false,
  isMovingLeft: false,
  isJumping: false
}

const enemy = {
  x: 200,
  y: 200,
  w: 50,
  h: 50,
  speed: 2
}

const ground = {
  x: 0,
  y: 250,
  w: 500,
  h: 30
}

const highGround = {
  x: 200,
  y: 180,
  w: 250,
  h: 20
}

/*----- app's state (variables) -----*/



/*----- cached element references -----*/
const canvas = $('#canvas')
const ctx = $('#canvas')[0].getContext('2d')
/*----- event listeners -----*/
$(document).on('keydown', (e)=>{
  if(e.which === 39){
    console.log('right')
    player.isMovingRight = true;
  } else if (e.which === 37){
    console.log('left')
    player.isMovingLeft = true;
  } else if(e.which === 38){
    console.log('jump')
    // player.y -= 40
    // player.isJumping = true;
    // setTimeout(function(){
    //   player.y = 200;
    // }, 1000)
    jumping()
  }
})

const jumping = () => {
  // player.yVelocity -=20;
  player.isJumping = true;
  player.yVelocity += 1.5
  player.y += player.yVelocity;
  player.x += player.xVelocity;
  player.yVelocity *= 0.9;
  player.xVelocity *= 0.9;
}


$(document).on('keyup', (e)=>{
  if(e.which === 39){
    player.isMovingRight = false;
  } else if (e.which === 37){
   player.isMovingLeft = false;
 } else if(e.which === 38){
   player.y = 200;
   player.isJumping = false;
 }
})

/*----- functions -----*/


const update = () => {
  if(player.isMovingRight){
    player.x += player.speedX;
  } else if (player.isMovingLeft){
    player.x -= player.speedX
  } else if (player.isJumping){
    player.y -= player.speedX
  }

  if(checkCollision(player, enemy)){
    gameLive = false;
    console.log('collision')
    player.lives--;
    if(player.lives > 0){
      player.x = 10;
      player.y = 200;
      respawn()
    }
  }
  enemy.x += enemy.speed
  if( enemy.x <= 200){
    console.log('ene')
    enemy.x = 200;
    enemy.speed *= -1
  } else if (enemy.x >= 450){
    enemy.x = 450;
    enemy.speed *= -1
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<groundCollision
  if(groundCollision(player, highGround)){
    console.log('groundHIT')
    player.y = highGround.y + highGround.h
  }
}


// const movePlayer  = () => {
//   console.log("hi")
//   player.isMovingRight = true;
// }
// const stopPlayer = () => {
//   player.isMovingRight = false;
// }

// canvas.on('click', (e)=>{
//   console.log(e.which)
// })
// canvas.addEventListener("click", movePlayer);
// canvas.addEventListener("mouseup", stopPlayer);

const respawn = () => {
  console.log('respawn')
  ctx.clearRect(0, 0, 500, 300)
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = 'green'
  ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
  gameLive = true;
}

const draw = () => {
  ctx.clearRect(0, 0, 500, 300);
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = 'green';
  ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
  ctx.fillStyle = 'brown';
  ctx.fillRect(ground.x, ground.y, ground.w, ground.h);
  ctx.fillStyle = 'brown';
  ctx.fillRect(highGround.x, highGround.y, highGround.w, highGround.h);

}
const checkCollision = (rect1, rect2) =>{
  return rect1.x < rect2.x + rect2.w &&
  rect1.x + rect1.w > rect2.x &&
  rect1.y < rect2.y + rect2.h &&
  rect1.y + rect1.h > rect2.y;
}

const groundCollision = (rect1, rect2) =>{
  return rect1.x < rect2.x + rect2.w &&
  rect1.x + rect1.w > rect2.x &&
  rect1.y < rect2.y + rect2.h &&
  rect1.y + rect1.h > rect2.y;
}





const play = () =>{
  // console.log("hello")
  update()
  draw()
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<invoke groundCollision
  groundCollision(player, highGround)
  checkCollision(player, enemy)
  if(gameLive){
    // requestAnimationFrame(play)
  }
}
play()
