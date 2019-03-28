const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = 800;
canvas.height = 500;


class Paddle {
    constructor(width, height, color, positionX, positionY) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = 3;
        this.middleHeight = height / 2;
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
        this.speedX = 2;
        this.speedY = 2;
        this.directionX = true; //true -> right
        this.directionY = true; //true -> down
    }
}

const drawObject = (collisionObjects, contex) => {
    collisionObjects.forEach(collisionObject => {
        contex.fillStyle = collisionObject.color;
        contex.fillRect(collisionObject.positionX, collisionObject.positionY, collisionObject.width, collisionObject.height);
    });
}

const collisionObjects = [];


const playerPaddle = new Paddle(20, 120, 'green', 10, 50);
const aiPaddle = new Paddle(20, 120, 'red', canvas.width - 30, 50);
const ball1 = new Ball(15, 'white', canvas.width / 2 - 4, canvas.height / 2 - 4);

collisionObjects.push(playerPaddle, aiPaddle, ball1);