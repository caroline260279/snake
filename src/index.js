import "./style.scss";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gridElem = 10; //50*30
const snake = [
    [19, 14],
    [18, 14],
    [17, 14],
];
let width = 50;
let height = 30;

let apple = [8, 8];
let direction = "e";
const speed = 1000 / 4;

const drawMap = () => {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, gridElem * width, gridElem * height);
};

const drawSnake = () => {
    ctx.fillStyle = "green";
    for (let body of snake) {
        ctx.fillRect(
            body[0] * gridElem,
            body[1] * gridElem,
            gridElem,
            gridElem
        );
    }
};

const drawApple = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
};

const generateApple = () => {
    const [x, y] = [
        Math.trunc(Math.random() * width),
        Math.trunc(Math.random() * height),
    ];
    for (let body of snake) {
        if (body[0] === x && body[1] === y) {
            return generateApple();
        }
    }
    apple = [x, y];
};

const modifSnakePosition = () => {
    let head;
    switch (direction) {
        case "e": {
            head = [snake[0][0] + 1, snake[0][1]];
            break;
        }
        case "o": {
            head = [snake[0][0] - 1, snake[0][1]];
            break;
        }
        case "n": {
            head = [snake[0][0], snake[0][1] - 1];
            break;
        }
        case "s": {
            head = [snake[0][0], snake[0][1] + 1];
            break;
        }
        default: {
        }
    }
    snake.unshift(head);
    if (head[0] === apple[0] && head[1] === apple[1]) {
        // Générer une nouvelle pomme :
        generateApple();
    } else {
        snake.pop();
    }
};
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight": {
            direction = "e";
            break;
        }
        case "ArrowLeft": {
            direction = "o";
            break;
        }
        case "ArrowUp": {
            direction = "n";
            break;
        }
        case "ArrowDown": {
            direction = "s";
            break;
        }
    }
});
const gameover = () => {
    if (
        snake[0][0] > width - 1 ||
        snake[0][0] < 0 ||
        snake[0][1] > height - 1 ||
        snake[0][1] < 0
    ) {
        return true;
    } else {
        const [head, ...body] = snake;
        for (let bodyElem of body) {
            if (bodyElem[0] === head[0] && bodyElem[1] === head[1]) {
                return true;
            }
        }
    }
    return false;
};

drawMap();
drawSnake();
drawApple();

const move = () => {
    modifSnakePosition();

    if (!gameover()) {
        drawMap();
        drawSnake();
        drawApple();
        setTimeout(() => {
            requestAnimationFrame(move);
        }, speed);
    } else {
        alert("Perdu!!");
    }
};

requestAnimationFrame(move);
