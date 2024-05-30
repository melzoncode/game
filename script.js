const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let basket = { x: canvas.width / 2 - 20, y: canvas.height - 20, width: 40, height: 10 };
let objects = [];
let score = 0;
let gameOver = false;

function drawBasket() {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawObjects() {
    ctx.fillStyle = '#FF0000';
    objects.forEach(object => {
        ctx.beginPath();
        ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

function updateObjects() {
    for (let i = 0; i < objects.length; i++) {
        objects[i].y += objects[i].dy;
        if (objects[i].y + objects[i].radius > basket.y &&
            objects[i].x > basket.x &&
            objects[i].x < basket.x + basket.width) {
            objects.splice(i, 1);
            score++;
        } else if (objects[i].y + objects[i].radius > canvas.height) {
            gameOver = true;
        }
    }
}

function addObject() {
    let x = Math.random() * (canvas.width - 20) + 10;
    let radius = 10;
    let dy = 2;
    objects.push({ x, y: -radius, radius, dy });
}

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        if (basket.x < canvas.width - basket.width) {
            basket.x += 7;
        }
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        if (basket.x > 0) {
            basket.x -= 7;
        }
    }
}

function draw() {
    if (gameOver) {
        ctx.font = '24px Arial';
        ctx.fillStyle = '#FF0000';
        ctx.fillText('Game Over', canvas.width / 2 - 60, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 60, canvas.height / 2 + 30);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawObjects();
    drawScore();
    updateObjects();
    requestAnimationFrame(draw);
}

document.addEventListener('keydown', keyDownHandler);
setInterval(addObject, 1000);
draw();
