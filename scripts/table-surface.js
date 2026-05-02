const tableCanvas = document.getElementById('game-table')
const drawing = tableCanvas.getContext('2d')

const pallete = [
    '#ffd6a1',
    '#ffca85',//base color
    '#d1a66f',//shadow (upper half) of the crack gap
    '#efbf80',//brighter lower half of the crack gap
    '#ffd6a0',//color of the down cracks
    '#ffddb1',//color of the upper cracks
]

const basePallete = [
    'rgb(255, 222, 153)',
    'rgb(255, 217, 148)',
    'rgb(255, 212, 143)',
    'rgb(255, 207, 138)',
    'rgb(255, 202, 133)',//base
    'rgb(255, 197, 128)',
    'rgb(255, 192, 123)',
    'rgb(255, 187, 118)',
    'rgb(255, 182, 113)',
]

const middleX = tableCanvas.width / 2
const middleY = tableCanvas.height / 2
const lightDirection = 2.4


const pattern = drawing.createLinearGradient(0, tableCanvas.height, tableCanvas.width, 0)
pattern.addColorStop(0, pallete[1])
pattern.addColorStop(1, pallete[0])
drawing.fillStyle = pallete[1]

drawing.fillRect(0, 0, tableCanvas.width, tableCanvas.height)//base table background



let horizontalPosition = 5
let globalAngle = Math.PI

function drawLineRandomPattern(size, amplitude, pointsDistance) {//irregular cracks along the middle line
    let angle = globalAngle
    let randomDistance = Math.round(Math.random() * amplitude)

    drawing.beginPath()
    drawing.moveTo(horizontalPosition + Math.cos(angle) * (randomDistance + size), middleY + Math.sin(angle) * (randomDistance + size))
    
    while (angle < globalAngle + 3.141) {
        drawing.lineTo(horizontalPosition + Math.cos(angle) * (randomDistance + size), middleY + Math.sin(angle) * (randomDistance + size))
        
        angle += Math.random() * pointsDistance
        randomDistance = Math.round(Math.random() * amplitude)
    }
    
    drawing.lineTo(horizontalPosition + Math.cos(globalAngle + Math.PI) * (randomDistance + size), middleY + Math.sin(globalAngle + Math.PI) * (randomDistance + size))
    drawing.closePath()
    drawing.fill()
}

function drawRandomPolygon(positionX, positionY, color, size, amplitude, pointsDistance, lighting) {
    let angle = Math.random() * pointsDistance
    let randomDistance = Math.round(Math.random() * amplitude)
    let calculatedPoints = []

    while (angle < 6.283) {
        calculatedPoints.push([angle, randomDistance])

        randomDistance = Math.round(Math.random() * amplitude)
        angle += Math.random() * pointsDistance
    }

    drawing.fillStyle = color
    drawing.beginPath()
    drawing.moveTo(positionX + Math.cos(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size), positionY + Math.sin(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size))
    
    calculatedPoints.forEach(point => {
        drawing.lineTo(positionX + Math.cos(point[0]) * (point[1] + size), positionY + Math.sin(point[0]) * (point[1] + size))
    })
    
    drawing.closePath()
    drawing.fill()
    
    if (lighting) {
        drawing.save()
        drawing.fillStyle = '#fff6'
        drawing.filter = 'blur(2px)'
        drawing.clip()
        drawing.beginPath()
        
        drawing.moveTo(
            positionX + Math.cos(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size) + Math.cos(lightDirection + Math.PI) * 4,
            positionY + Math.sin(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size) + Math.sin(lightDirection + Math.PI) * 4
        )
        
        calculatedPoints.forEach(point => {
            drawing.lineTo(positionX + Math.cos(point[0]) * (point[1] + size) + Math.cos(lightDirection + Math.PI) * 4, positionY + Math.sin(point[0]) * (point[1] + size) + Math.sin(lightDirection + Math.PI) * 4)
        })
        
        drawing.lineTo(
            positionX + Math.cos(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size) + Math.cos(lightDirection + Math.PI) * 4,
            positionY + Math.sin(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size) + Math.sin(lightDirection + Math.PI) * 4
        )
        
        drawing.arc(positionX, positionY, size + amplitude + 20, calculatedPoints[0][0], calculatedPoints[0][0] - Math.PI * 2, true)
        
        drawing.closePath()
        drawing.fill()



        drawing.fillStyle = '#4446'
        drawing.beginPath()

        drawing.moveTo(
            positionX + Math.cos(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size) + Math.cos(lightDirection) * 4,
            positionY + Math.sin(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size) + Math.sin(lightDirection) * 4
        )

        calculatedPoints.forEach(point => {
            drawing.lineTo(positionX + Math.cos(point[0]) * (point[1] + size) + Math.cos(lightDirection) * 4, positionY + Math.sin(point[0]) * (point[1] + size) + Math.sin(lightDirection) * 4)
        })

        drawing.lineTo(
            positionX + Math.cos(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size) + Math.cos(lightDirection) * 4,
            positionY + Math.sin(calculatedPoints[0][0]) * (calculatedPoints[0][1] + size) + Math.sin(lightDirection) * 4
        )

        drawing.arc(positionX, positionY, size + amplitude + 20, calculatedPoints[0][0], calculatedPoints[0][0] - Math.PI * 2, true)

        drawing.closePath()
        drawing.fill()
        drawing.restore()
    }
}

drawing.filter = 'blur(10px)'

for (let i = 0; i < 10; i++) {
    drawRandomPolygon(Math.random() * tableCanvas.width, Math.random() * tableCanvas.height, basePallete[0], 10, 100, 1)
}

drawing.filter = 'blur(7px)'

for (let i = 0; i < 30; i++) {
    drawRandomPolygon(Math.random() * tableCanvas.width, Math.random() * tableCanvas.height, basePallete[1], 20, 15, 2)
}

drawing.filter = 'blur(5px)'

for (let i = 0; i < 100; i++) {
    drawRandomPolygon(Math.random() * tableCanvas.width, Math.random() * tableCanvas.height, basePallete[2], 30, 30, 1)
}

drawing.filter = 'blur(2px)'

for (let i = 0; i < 150; i++) {
    drawRandomPolygon(Math.random() * tableCanvas.width, Math.random() * tableCanvas.height, basePallete[3], 10, 40, 2)
}

drawing.filter = 'blur(4px)'

for (let i = 0; i < 50; i++) {
    drawRandomPolygon(Math.random() * tableCanvas.width, Math.random() * tableCanvas.height, basePallete[5], 8, 20, 1)
}






drawing.fillStyle = pallete[5]
drawing.filter = 'blur(1.4px)'

for (let index = 0; index < 128; index++) {
    drawLineRandomPattern(8, 10, 2)
    horizontalPosition += 10
}

globalAngle += Math.PI
horizontalPosition = 5

for (let index = 0; index < 128; index++) {
    drawLineRandomPattern(8, 10, 2)
    horizontalPosition += 10
}

drawing.strokeStyle = pallete[2]//dark upper side of the line
drawing.lineWidth = 6
drawing.filter = 'blur(1px)'
drawing.beginPath()
drawing.moveTo(0, middleY)
drawing.lineTo(tableCanvas.width, middleY)
drawing.stroke()

drawing.strokeStyle = pallete[3]//bright down side of the line
drawing.lineWidth = 3
drawing.filter = 'blur(1.5px)'
drawing.beginPath()
drawing.moveTo(0, middleY + 2)
drawing.lineTo(tableCanvas.width, middleY + 2)
drawing.stroke()