let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')


let height = canvas.height
let width = canvas.width

let colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

let ballCount = 12   
let ballSize = 20    

let stringLength = 10   // Affects how fast the balls move from side to side
let lengthIncrease = 0.1   // Difference in string length between balls 

let ballY = 50        // Y position of first ball
let yIncrease = 40    // separation between balls 

let xOffset = width / 2    // move balls to center of canvas 
let xScaleUp = ( width * 0.8 / 2 )  // occupy about 80% of the width

let speed = 0.006  // Adjustable by user 

let speedSlider = document.querySelector('#speed')
speedSlider.value = speed 
speedSlider.addEventListener('input', function() {
    speed = Number(this.value)
})


class Ball {
    constructor(stringLength, startY, startX, color) {
        this.stringLength = stringLength
        this.color = color 
        this.y = startY
        this.x = startX || 0 
    }

    move(time) {
        this.x = Math.sin(time * this.stringLength) * xScaleUp
    }
}

let balls = []
let time = 0

// Create balls 
for (let x = 0; x < ballCount; x++) {
    let colourIndex = x % colours.length
    let ball = new Ball(stringLength, ballY, 0, colours[colourIndex])
    stringLength += lengthIncrease
    ballY += yIncrease 
    balls.push(ball)
}

// Recursive timeout to move balls 
function tick() {
    setTimeout( () => {
        time += speed    // affects ball position
        moveBalls()
        tick()
    }, 30)
}


function moveBalls() {
   
    // Draw black rectangle to clear canvas
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 1000, 1000)

    balls.forEach( ball => {
        ball.move(time)
    })
   
    balls.forEach( ball => {
        draw(ball)
    })
}

function draw(ball) {
    ctx.fillStyle = ball.color
    ctx.beginPath()
    ctx.arc(ball.x + xOffset, ball.y, ballSize, 0, 6.3)
    ctx.fill()   
}

tick()  // Go!