const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = 800;
canvas.height = 500;
let gameWidth;
let playerPoints = 0;
let aiPoints = 0;
const startSpeed = 2;
let multiplayer = true;
const difficult = 0.3;

const keyboard = e => {
  console.log(e.keyCode)
  if (e.keyCode === 38) {
    playerPaddle.moveUp(collisionObjects);
  } else if (e.keyCode === 40) {
    playerPaddle.moveDown(collisionObjects);
  }
  if (multiplayer) {
    if (e.keyCode === 104)
      aiPaddle.moveUp(collisionObjects);
    else if (e.keyCode === 98)
      aiPaddle.moveDown(collisionObjects);
  }

}

const ballMove = ballsGame => {
  ballsGame.forEach(ballGame => {
    ballGame.move(collisionObjects);
  })
}

const updateGameWindow = () => {
  gameWidth = canvas.width;
  aiPaddle.positionX = canvas.width - 30;
}

const clearScreen = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height)

}


class Paddle {
  constructor(width, height, color, positionX, positionY) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.speed = 5;
    this.middleHeight = height / 2;
  }

  moveUp() {
    this.positionY -= this.speed;
  }

  moveDown() {
    this.positionY += this.speed;
  }
}

class Ball {
  constructor(size, color, positionX, positionY) {
    this.width = size;
    this.height = size;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.middleHeight = size / 2;
    this.speedX = startSpeed;
    this.speedY = startSpeed;
    this.directionX = true; //true -> right
    this.directionY = true; //true -> down
  }

  resetBall() {
    if (Math.round(Math.random()))
      this.directionX = !this.directionX;
    if (Math.round(Math.random()))
      this.directionY = !this.directionY;
    this.speedX = startSpeed;
    this.speedY = startSpeed;
    this.positionX = canvas.width / 2 - this.width / 2;
    this.positionY = canvas.height / 2 - this.height / 2;
  }


  move(collisionObjects) {
    let collision = 0;
    const ballLeft = this.positionX;
    const ballRight = this.positionX + this.width;
    const ballTop = this.positionY;
    const ballBottom = this.positionY + this.height;

    if (this.directionX && this.directionY) {
      for (let i = 0; i < collisionObjects.length; i++) {
        let objectLeft = collisionObjects[i].positionX;
        let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
        let objectTop = collisionObjects[i].positionY;
        let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;

        if (this === collisionObjects[i])
          continue;
        // else if (((objectLeft <= ballLeft && ballLeft <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight)) && ((objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom))) {
        //   this.directionX = !this.directionX;
        //   break;
        // }

        if ((ballLeft < objectRight && ((objectLeft <= ballLeft + this.speedX && ballLeft + this.speedX <= objectRight) || (objectLeft <= ballRight + this.speedX && ballRight + this.speedX <= objectRight))) && (ballTop < objectBottom && ((objectTop <= ballTop + this.speedY && ballTop + this.speedY <= objectBottom) || (objectTop <= ballBottom + this.speedY && ballBottom + this.speedY <= objectBottom)))) {
          collision = 1;
          break;
        } else if (ballBottom + this.speedY > canvas.height) {
          collision = 2;
          break;
        } else if (ballRight + this.speedX > canvas.width) {
          collision = 3;
          playerPoints++;
          break;
        }

      }

    } else if (this.directionX && !this.directionY) {

      for (let i = 0; i < collisionObjects.length; i++) {
        let objectLeft = collisionObjects[i].positionX;
        let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
        let objectTop = collisionObjects[i].positionY;
        let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;

        if (this === collisionObjects[i])
          continue;
        //  else if (((objectLeft <= ballLeft && ballLeft <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight)) && ((objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom))) {
        //   this.directionX = !this.directionX;
        //   break;
        // }

        if ((ballLeft < objectRight && ((objectLeft <= ballLeft + this.speedX && ballLeft + this.speedX <= objectRight) || (objectLeft <= ballRight + this.speedX && ballRight + this.speedX <= objectRight))) && (ballBottom > objectTop && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom - this.speedY && ballBottom - this.speedY <= objectBottom)))) {
          collision = 1;
          break;
        } else if (ballTop - this.speedY < 0) {

          collision = 2;
          break;
        } else if (ballRight + this.speedX > canvas.width) {
          collision = 3;
          playerPoints++;
          break;
        }
      }

    } else if (!this.directionX && this.directionY) {

      for (let i = 0; i < collisionObjects.length; i++) {
        let objectLeft = collisionObjects[i].positionX;
        let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
        let objectTop = collisionObjects[i].positionY;
        let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;

        if (this === collisionObjects[i])
          continue;
        // else if (((objectLeft <= ballLeft && ballLeft <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight)) && ((objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom))) {
        //   this.directionX = !this.directionX;
        //   break;
        // }

        if ((ballRight > objectLeft && ((objectLeft <= ballLeft - this.speedX && ballLeft - this.speedX <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight))) && ((ballTop < objectBottom && (objectTop <= ballTop + this.speedY && ballTop + this.speedY <= objectBottom) || (objectTop <= ballBottom + this.speedY && ballBottom + this.speedY <= objectBottom)))) {
          collision = 1;
          break;
        } else if (ballBottom + this.speedY > canvas.height) {
          collision = 2;
          break;
        } else if (ballLeft - this.speedX < 0) {
          collision = 3;
          aiPoints++;
          break;
        }
      }

    } else {

      for (let i = 0; i < collisionObjects.length; i++) {
        let objectLeft = collisionObjects[i].positionX;
        let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
        let objectTop = collisionObjects[i].positionY;
        let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;

        if (this === collisionObjects[i])
          continue;
        // else if (((objectLeft <= ballLeft && ballLeft <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight)) && ((objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom))) {
        //   this.directionX = !this.directionX;
        //   break;
        // }

        if ((ballRight > objectLeft && ((objectLeft <= ballLeft - this.speedX && ballLeft - this.speedX <= objectRight) || (objectLeft <= ballRight && ballRight <= objectRight))) && (ballBottom > objectTop && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom - this.speedY && ballBottom - this.speedY <= objectBottom)))) {
          collision = 1;
          break;
        } else if (ballTop - this.speedY < 0) {

          collision = 2;
          break;
        } else if (ballLeft - this.speedX < 0) {
          collision = 3;
          aiPoints++;
          break;
        }
      }
    }

    if (collision) {
      if (Math.round(Math.random())) {
        this.speedX += difficult + (Math.round(Math.random()) / 10);
      } else {
        this.speedY += difficult + (Math.round(Math.random()) / 10);
      }
      if (collision == 1) {

        this.directionX = !this.directionX;

        if (Math.round(Math.random())) {
          this.directionY = !this.directionY;
        }
      } else if (collision == 2) {

        this.directionY = !this.directionY;

      } else {
        this.resetBall();
      }

    } else {
      if (this.directionX)
        this.positionX += this.speedX;
      else
        this.positionX -= this.speedX;
      if (this.directionY)
        this.positionY += this.speedY;
      else
        this.positionY -= this.speedY;
    }
  }
}



const drawObject = (collisionObjects, contex) => {
  collisionObjects.forEach(collisionObject => {
    contex.fillStyle = collisionObject.color;
    contex.fillRect(collisionObject.positionX, collisionObject.positionY, collisionObject.width, collisionObject.height);
  });
}

const collisionObjects = [];
const ballsGame = [];


const playerPaddle = new Paddle(20, 120, 'green', 10, 50);
const aiPaddle = new Paddle(20, 120, 'red', canvas.width - 30, 250);
const ball1 = new Ball(15, 'white', canvas.width / 2 - 4, canvas.height / 2 - 4);

collisionObjects.push(playerPaddle, aiPaddle, ball1);
ballsGame.push(ball1);

const run = () => {
  if (gameWidth !== canvas.width) {
    updateGameWindow();
  }
  clearScreen();
  ballMove(ballsGame);
  drawObject(collisionObjects, ctx);
}


window.addEventListener('keydown', keyboard)
let timer = setInterval(run, 1000 / 60);