const cardFront = document.getElementById('card-drawing-front')
const drawing = cardFront.getContext('2d')


const lightDirection = 2.4
const shadowLength = 5

const grayPalette = [
    '#f0f0f0',
    '#ebebeb',
    '#e5e5e5',
    '#e0e0e0',
    '#dbdbdb',
    '#d5d5d5',
    '#d0d0d0',
    '#cbcbcb',
    '#c5c5c5',
    '#c0c0c0',
    '#bbbbbb',
    '#b5b5b5',
    '#b0b0b0',
    '#ababab',
    '#a5a5a5',
    '#a0a0a0',
    '#9b9b9b',
    '#959595',
    '#909090',
    '#8b8b8b',
    '#858585',
    '#808080',
    '#7b7b7b',
    '#757575',
    '#707070',
    '#6b6b6b',
    '#656565',
    '#606060',
    '#5b5b5b',
    '#555555',
    '#505050',
    '#4b4b4b',
    '#454545',
    '#404040',
    '#3b3b3b',
    '#353535',
    '#303030',
]



function defaultShadow() {
    drawing.shadowOffsetX = Math.cos(lightDirection) * shadowLength
    drawing.shadowOffsetY = Math.sin(lightDirection) * shadowLength
    drawing.shadowBlur = 4
    drawing.shadowColor = '#0007'
}



function drawPolygon(points, color = '#000', shadow = false, filter = 'none') {
    drawing.fillStyle = color
    if (shadow) {
        drawing.shadowColor = '#0007'
    }
    else {
        drawing.shadowColor = 'transparent'
    }

    drawing.filter = filter

    drawing.beginPath()
    drawing.moveTo(points[0][0], points[0][1])

    points.forEach(point => {
        drawing.lineTo(point[0], point[1])
    })

    drawing.closePath()
    drawing.fill()
}



function drawPolygon2(x, y, rotation, scale, points, color = '#000', shadow = false, filter = 'none') {
    drawing.fillStyle = color
    if (shadow) {
        drawing.shadowColor = '#0007'
    }
    else {
        drawing.shadowColor = 'transparent'
    }

    drawing.filter = filter

    drawing.beginPath()
    drawing.moveTo(x + Math.cos(rotation + points[0][0]) * points[0][1] * scale, y + Math.sin(rotation + points[0][0]) * points[0][1] * scale)

    points.forEach(point => {
        drawing.lineTo(x + Math.cos(rotation + point[0]) * point[1] * scale, y + Math.sin(rotation + point[0]) * point[1] * scale)
    })

    drawing.closePath()
    drawing.fill()
}



function gradient(points, colors) {
    const gradient = drawing.createLinearGradient(points[0], points[1], points[2], points[3])

    colors.forEach(color => {
        gradient.addColorStop(color[0], color[1])
    })

    return gradient
}






drawing.fillStyle = grayPalette[22]
drawing.fillRect(0, 0, cardFront.width, cardFront.height)//background color of the whole card

drawing.restore()

drawing.fillStyle = grayPalette[25]

drawing.strokeStyle = '#000'
drawing.lineWidth = 2
drawing.filter = 'none'



drawing.fillStyle = grayPalette[10]
drawPolygon([[60, 400], [452, 400], [482, 430], [482, 644], [452, 674], [60, 674], [30, 644], [30, 430]], grayPalette[10])



drawing.textAlign = 'center'

function writeCurved(x, y, distance, initialAngle, steps, letters, font) {
    drawing.save()

    drawing.font = font
    drawing.fillStyle = 'black'
    drawing.translate(x, y)
    drawing.rotate(initialAngle)

    steps.forEach((step, index) => {
        drawing.rotate(step)
        drawing.fillText(letters[index], 0, distance)
    })

    drawing.restore()
}




//region Frame

const image = document.getElementById('shadow-demon')

defaultShadow()

drawing.fillStyle = grayPalette[27]
drawing.beginPath()
drawing.moveTo(446, 370)
drawing.lineTo(66, 370)
drawing.lineTo(66, 180)
drawing.arc(287, 220, 225, 3.33, 4.55)
drawing.arc(226, 220, 225, 4.8, 6.1)
drawing.closePath()
drawing.fill()

drawing.save()

drawing.fillStyle = grayPalette[14]
drawing.beginPath()
drawing.moveTo(436, 360)
drawing.lineTo(76, 360)
drawing.lineTo(76, 180)
drawing.arc(292, 220, 220, 3.33, 4.55)
drawing.arc(220, 220, 220, 4.8, 6.1)
drawing.closePath()
drawing.fill()
drawing.clip()
// drawing.drawImage(image, 0, 0, 646, 701,   76, 0, 360, 360)//image of the character

drawing.restore()




//region Name Banner

drawPolygon2(139, 416, 2.6, 1, [[0, 60], [0.3, 90], [1.57, 28], [-1.57, 28], [-0.3, 90]], '#e6d899', true)
drawPolygon2(139, 416, 2.6, 1, [[1.57, 28], [-1.57, 28], [0, 40]], '#a69c6c', true)

drawPolygon2(381, 420, 0.54, 1, [[0, 60], [0.3, 90], [1.57, 28], [-1.57, 28], [-0.3, 90]], '#e6d899', true)
drawPolygon2(381, 420, 0.54, 1, [[1.57, 28], [-1.57, 28], [0, 40]], '#a69c6c', true)

drawing.fillStyle = '#e6d899'

drawing.beginPath()
drawing.arc(256, 690, 350, 4.2, 5.25)
drawing.arc(256, 740, 340, 5.2, 4.25, true)
drawing.closePath()
drawing.fill()

drawing.shadowColor = 'transparent'


//name of the character written on the banner
writeCurved(256, 724, -345, -0.2, [0, 0.07, 0.07, 0.08, 0.05, 0.05, 0.06], ['(', 'e', 'm', 'p', 't', 'y', ')', 'e', 'm', 'o', 'n', 't'], '40px serif')






//region Status Simbols

drawPolygon2(260, 510, 0, 1, [[-0.3, 60], [0.3, 60], [0.78, 31], [1.27, 60], [1.87, 60], [2.35, 31], [2.84, 60], [3.44, 60], [3.92, 31], [4.41, 60], [5.01, 60], [5.49, 31]], '#ff353560')//health translucid icon

drawPolygon2(120, 590, 0, 1, [[0.58, 45], [1.57, 45], [2.55, 45], [3.72, 45], [4.71, 45], [5.69, 45]], '#ffbb0060')//mana cost translucid icon

drawPolygon2(380, 570, 1.1, 1, [[0, 75], [0.2, 63], [1.57, 14], [1.57, 32], [1.7, 38], [1.9, 33], [2.55, 15], [2.9, 34], [2.8, 40], [3.14, 44], [-2.8, 40], [-2.9, 34], [-2.55, 15], [-1.9, 33], [-1.7, 38], [-1.57, 32], [-1.57, 14], [-0.2, 63]], '#13a40060')//attack translucid icon

const font = new FontFace('cloisterblack', 'url(./fonts/cloister-black.ttf)')

font.load().then(loadedFont => {//colored numbers of the card status values: health, attack and mana cost
    document.fonts.add(loadedFont)

    drawing.fillStyle = '#ffbb00'
    drawing.font = '100px cloisterblack'
    drawing.fillText('0', 120, 620)

    drawing.fillStyle = '#ff3535'
    drawing.font = '150px cloisterblack'
    drawing.fillText('0', 260, 550)

    drawing.fillStyle = '#13a400'
    drawing.font = '100px cloisterblack'
    drawing.fillText('0', 395, 620)
})