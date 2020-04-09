window.onload = function () {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  document.addEventListener('keydown', keyPress)

  setInterval(game, 1000 / 250)

  const stage = {
    color: '#FFFFFF',
    x: 0,
    y: 0,
    w: 800,
    h: 600
  }
  const player = {
    color: '#4a97c7',
    x: 400,
    y: 300,
    w: 10,
    h: 10
  }
  const food = {
    color: 'orange',
    x: random(stage.w),
    y: random(stage.h),
    w: 5,
    h: 5
  }

  let vel = 1;
  let velX = 0;
  let velY = 0;

  function keyPress(event) {
    switch (event.keyCode) {
      case 37: // left
        velX = -vel
        velY = 0
        break

      case 38: // up
        velX = 0
        velY = -vel
        break

      case 39: // right
        velX = vel
        velY = 0
        break

      case 40: // down
        velX = 0
        velY = vel
        break

      default:
        break
    }
  }

  function random(multiplier) {
    return Math.random() * multiplier
  }

  function move() {
    player.x = player.x + velX;
    player.y = player.y + velY
    if (player.x >= stage.w) {
      velX = -vel
    } else if (player.y >= stage.h) {
      velY = -velY
    } else if (player.y <= 0) {
      velY = vel
    } else if (player.x <= 0) {
      velX = vel
    }
  }

  function game() {
    // STAGE
    ctx.fillStyle = stage.color;
    ctx.fillRect(stage.x, stage.y, stage.w, stage.h)

    // PLAYER
    ctx.fillStyle = player.color;
    ctx.beginPath()
    ctx.ellipse(player.x, player.y, player.w, player.h, 0, 90, 90, false)
    ctx.fill()
    ctx.fillStyle = 'black'
    ctx.lineWidth = 4
    ctx.stroke()

    //FOOD
    ctx.fillStyle = food.color;
    ctx.beginPath()
    ctx.ellipse(food.x, food.y, food.w, food.h, 0, 90, 90, false)
    ctx.fill()

    move()

    if (food.x >= (player.x - player.w) && food.x <= (player.x + player.w) && food.y >= (player.y - player.h) && food.y <= (player.y + player.h)) {
      food.x = random(stage.w)
      food.y = random(stage.h)
      player.w = player.w + (food.w * 2 / player.w)
      player.h = player.h + (food.h * 2 / player.h)
    }

  }

  game()
}
