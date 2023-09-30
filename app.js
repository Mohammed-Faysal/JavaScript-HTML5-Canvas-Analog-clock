var canvas = document.getElementById("canvas")

var ctx = canvas.getContext("2d")

var radius = canvas.height / 2
ctx.translate(radius, radius)
radius = radius * 0.90

drawClock()

function drawClock(){
    drawFace(ctx, radius)
    drawNumbers(ctx, radius)
    drawTime(ctx, radius)
}


function drawFace(ctx, radius){

    const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
    grad.addColorStop(0, '#333')
    grad.addColorStop(0.5, 'white')
    grad.addColorStop(1, '#333')

    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()

    ctx.strokeStyle = grad
    ctx.lineWidth = radius * 0.1
    ctx.stroke()


    for(let sec = 0; sec < 60; sec++){
        let ang = (sec * Math.PI) / 30
        let x1 = (radius * 0.9) * Math.sin(ang)
        let y1 = -(radius * 0.9) * Math.cos(ang)
        let x2, y2

        if(sec % 5 === 0){
            // Marks at 5s intervals (5s, 10s, 15s, 20s, 25s etc.)
            x2 = (radius * 0.85) * Math.sin(ang)
            y2 = -(radius * 0.85) * Math.cos(ang)
            ctx.strokeStyle = 'red'
            ctx.lineWidth = radius * 0.02
        }
        else{
            x2 = (radius * 0.89) * Math.sin(ang)
            y2 = -(radius * 0.89) * Math.cos(ang)
            ctx.strokeStyle = '#333'
            ctx.lineWidth = radius * 0.02
        }

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
    }


    ctx.beginPath()
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI)
    ctx.fillStyle = '#333'
    ctx.fill()
}


function drawNumbers(ctx, radius){
    ctx.font = radius * 0.17 + "px CustomFont"  // Font size and font family
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    ctx.fillStyle = "blue"

    for(let num = 1; num < 13; num++){
        let ang = num * Math.PI / 6
        ctx.rotate(ang)
        ctx.translate(0, -radius * 0.75) // Adjust this value to move the numbers inside the circle.
        ctx.rotate(-ang)
        ctx.fillText(num.toString(), 0, 0)
        ctx.rotate(ang)
        ctx.translate(0, radius * 0.75) // Adjust this value to move the numbers inside the circle.
        ctx.rotate(-ang)
    }
}


function drawTime(ctx, radius){
    const now = new Date()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()


    //hour
    hour = hour % 12
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60))
    drawHand(ctx, hour, radius*0.5, radius*0.07, "#333")

    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60))
    drawHand(ctx, minute, radius*0.71, radius*0.07, "#333")

    //second
    second = (second*Math.PI/30)
    drawHand(ctx, second, radius*0.9, radius*0.02, "red")
}



function drawHand(ctx, pos, length, width, color){
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.lineCap = "round"
    ctx.moveTo(0, 0)
    ctx.rotate(pos)
    ctx.strokeStyle = color
    ctx.lineTo(0, -length)
    ctx.stroke()
    ctx.rotate(-pos)


    ctx.beginPath()
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI)
    ctx.fillStyle = "red"
    ctx.fill()
}

setInterval(drawClock, 1000)