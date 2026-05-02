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

function drawPolygon(points, color, shadow, filter) {
    drawing.fillStyle = color
    if (shadow) {
        drawing.shadowColor = '#0007'
    }
    else {
        drawing.shadowColor = 'transparent'
    }
    if (filter) {
        drawing.filter = filter
    }
    else {
        drawing.filter = 'none'
    }

    drawing.beginPath()
    drawing.moveTo(points[0][0], points[0][1])

    points.forEach(point => {
        drawing.lineTo(point[0], point[1])
    })

    drawing.closePath()
    drawing.fill()
}

function drawPolygon2(x, y, rotation, points, color, shadow, filter) {
    drawing.fillStyle = color
    if (shadow) {
        drawing.shadowColor = '#0007'
    }
    else {
        drawing.shadowColor = 'transparent'
    }
    if (filter) {
        drawing.filter = filter
    }
    else {
        drawing.filter = 'none'
    }

    drawing.beginPath()
    drawing.moveTo(x + Math.cos(rotation + points[0][0]) * points[0][1], y + Math.sin(rotation + points[0][0]) * points[0][1])

    points.forEach(point => {
        drawing.lineTo(x + Math.cos(rotation + point[0]) * point[1], y + Math.sin(rotation + point[0]) * point[1])
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






drawing.beginPath()//base format of the card (rounded rectangle)
drawing.moveTo(30, 10)
drawing.lineTo(cardFront.width - 30, 10)
drawing.arcTo(cardFront.width - 10, 10, cardFront.width - 10, 30, 20)
drawing.lineTo(cardFront.width - 10, cardFront.height - 60)
drawing.arcTo(cardFront.width - 10, cardFront.height - 10, cardFront.width - 30, cardFront.height - 10, 20)
drawing.lineTo(30, cardFront.height - 10)
drawing.arcTo(10, cardFront.height - 10, 10, cardFront.height - 30, 20)
drawing.lineTo(10, 30)
drawing.arcTo(10, 10, 30, 10, 20)
drawing.closePath()
drawing.save()
drawing.clip()

drawing.fillStyle = grayPalette[18]
drawing.fillRect(0, 0, cardFront.width, cardFront.height)//background color of the whole card

const upGradient = drawing.createLinearGradient(30, 0, cardFront.width - 10, 0)
upGradient.addColorStop(0, grayPalette[20])
upGradient.addColorStop(1, grayPalette[18])
drawing.fillStyle = upGradient
drawing.fillRect(10, 10, cardFront.width - 10, 30)//outer upper face with lighting gradient

const sideGradient = drawing.createLinearGradient(0, 10, 0, cardFront.height - 10)
sideGradient.addColorStop(0, grayPalette[18])
sideGradient.addColorStop(1, grayPalette[20])
drawing.fillStyle = sideGradient
drawing.fillRect(cardFront.width - 40, 10, 40, cardFront.height)//outer right face with lighting gradient

drawing.fillStyle = grayPalette[27]
drawing.fillRect(10, 40, 30, cardFront.height)//outer left face
drawing.fillRect(10, cardFront.height - 40, cardFront.width - 50, 40)//outer down face

drawing.fillStyle = grayPalette[22]
drawing.fillRect(42, 42, cardFront.width - 82, cardFront.height - 82)//inner filling

drawing.restore()

drawing.fillStyle = grayPalette[25]
drawing.fillRect(cardFront.width - 72, 42, 30, cardFront.height - 82)//inner right face
drawing.fillRect(42, 42, cardFront.width - 82, 30)//inner upper face

drawing.fillStyle = grayPalette[23]
drawing.beginPath()//inner down face
drawing.moveTo(42, cardFront.height - 72)
drawing.lineTo(42, cardFront.height - 42)
drawing.lineTo(cardFront.width - 42, cardFront.height - 42)
drawing.lineTo(cardFront.width - 72, cardFront.height - 72)
drawing.closePath()
drawing.fill()

drawing.beginPath()//inner left face
drawing.moveTo(42, 42)
drawing.lineTo(42, cardFront.height - 42)
drawing.lineTo(72, cardFront.height - 42)
drawing.lineTo(72, 72)
drawing.closePath()
drawing.fill()

drawing.strokeStyle = '#000'
drawing.lineWidth = 2
drawing.filter = 'none'


drawing.filter = 'blur(2.5px)'
const topLighting = drawing.createLinearGradient(cardFront.width - 40, 40, 40, cardFront.height - 40)//lighting of the top edge of the border
topLighting.addColorStop(0, grayPalette[12])
topLighting.addColorStop(1, grayPalette[17])
drawing.fillStyle = topLighting
drawing.beginPath()
drawing.moveTo(40, 40)
drawing.lineTo(cardFront.width - 40, 40)
drawing.lineTo(cardFront.width - 40, cardFront.height - 40)
drawing.lineTo(40, cardFront.height - 40)
drawing.lineTo(40, 40)
drawing.lineTo(45, 45)
drawing.lineTo(45, cardFront.height - 45)
drawing.lineTo(cardFront.width - 45, cardFront.height - 45)
drawing.lineTo(cardFront.width - 45, 45)
drawing.lineTo(45, 45)
drawing.closePath()
drawing.fill()
drawing.filter = 'none'


drawing.fillStyle = grayPalette[14]
drawing.fillRect(90, 82, 340, 240)//upper and right faces of the outer elevation of the character frame

drawing.fillStyle = grayPalette[26]
drawing.fillRect(82, 90, 340, 240)//down and left faces of the outer elevation of the character frame

drawing.fillStyle = grayPalette[16]
drawing.fillRect(90, 90, 332, 232)//top of the character frame border

drawing.fillStyle = grayPalette[10]
drawing.fillRect(81, 354, 350, 270)//bright rectangle below the character frame to write the info/status of the character



const image = document.getElementById('giant-serpent')
drawing.drawImage(image, 0, 100, 525, 540, 106, 106, 300, 200)//image of the character


drawPolygon([[106, 106], [406, 106], [406, 306], [414, 314], [414, 98], [98, 98]], grayPalette[26])//inner up and right faces of the frame
drawPolygon([[106, 106], [98, 98], [98, 314], [414, 314], [406, 306], [106, 306]], grayPalette[18])//inner down and left faces of the frame

//small pointed corners of the character frame
drawPolygon2(422, 322, 1.57, [[1.57, 15], [0, 0], [5.5, 20], [0.6, 10]], grayPalette[26])//down right pointed corner
drawPolygon2(422, 322, 1.57, [[0, 0], [3.14, 15], [4.1, 10], [5.5, 20]], grayPalette[10])

drawPolygon2(90, 322, 3.14, [[1.57, 15], [0, 0], [5.5, 20], [0.6, 10]], grayPalette[24])//down left pointed corner
drawPolygon2(90, 322, 3.14, [[0, 0], [3.14, 15], [4.1, 10], [5.5, 20]], grayPalette[26])

drawPolygon2(90, 90, -1.57, [[1.57, 15], [0, 0], [5.5, 20], [0.6, 10]], grayPalette[10])//upper left pointed corner
drawPolygon2(90, 90, -1.57, [[0, 0], [3.14, 15], [4.1, 10], [5.5, 20]], grayPalette[26])

drawPolygon2(422, 90, 0, [[1.57, 15], [0, 0], [5.5, 20], [0.6, 10]], grayPalette[12])//upper right pointed corner
drawPolygon2(422, 90, 0, [[0, 0], [3.14, 15], [4.1, 10], [5.5, 20]], grayPalette[10])



//region Pointed Corners

defaultShadow()

//big double pointed corners of the card
drawPolygon2(44, 44, 0.78, [[0, 60], [0.2, 50], [0.9, 30], [0, 5]], grayPalette[21])//upper left corner
drawPolygon2(44, 44, 0.78, [[0.9, 30], [2.4, 35], [3.14, 40], [0, 5]], grayPalette[22])
drawPolygon2(44, 44, 0.78, [[2.4, 35], [3.14, 62], [3.14, 40]], grayPalette[24])
drawPolygon2(44, 44, 0.78, [[-2.4, 35], [3.14, 62], [3.14, 40]], grayPalette[14])
drawPolygon2(44, 44, 0.78, [[-0.9, 30], [-2.4, 35], [3.14, 40], [0, 5]], grayPalette[13])
drawPolygon2(44, 44, 0.78, [[0, 60], [-0.2, 50], [-0.9, 30], [0, 5]], grayPalette[12])

drawPolygon2(470, 44, 2.35, [[0, 60], [0.2, 50], [0.9, 30], [0, 5]], grayPalette[16])//upper right corner
drawPolygon2(470, 44, 2.35, [[0.9, 30], [2.4, 35], [3.14, 40], [0, 5]], grayPalette[12])
drawPolygon2(470, 44, 2.35, [[2.4, 35], [3.14, 62], [3.14, 40]], grayPalette[10])
drawPolygon2(470, 44, 2.35, [[-2.4, 32], [3.14, 62], [3.14, 40]], grayPalette[12])
drawPolygon2(470, 44, 2.35, [[-0.9, 30], [-2.4, 32], [3.14, 40], [0, 5]], grayPalette[15])
drawPolygon2(470, 44, 2.35, [[0, 60], [-0.2, 50], [-0.9, 30], [0, 5]], grayPalette[18])

drawPolygon2(44, 660, -0.78, [[0, 60], [0.2, 50], [0.9, 30], [0, 5]], grayPalette[16])//down left corner
drawPolygon2(44, 660, -0.78, [[0.9, 30], [2.4, 35], [3.14, 40], [0, 5]], grayPalette[18])
drawPolygon2(44, 660, -0.78, [[2.4, 35], [3.14, 62], [3.14, 40]], grayPalette[24])
drawPolygon2(44, 660, -0.78, [[-2.4, 35], [3.14, 62], [3.14, 40]], grayPalette[23])
drawPolygon2(44, 660, -0.78, [[-0.9, 30], [-2.4, 35], [3.14, 40], [0, 5]], grayPalette[17])
drawPolygon2(44, 660, -0.78, [[0, 60], [-0.2, 50], [-0.9, 30], [0, 5]], grayPalette[15])

drawPolygon2(470, 660, -2.35, [[0, 60], [0.2, 50], [0.9, 30], [0, 5]], grayPalette[15])//down right corner
drawPolygon2(470, 660, -2.35, [[0.9, 30], [2.4, 32], [3.14, 40], [0, 5]], grayPalette[16])
drawPolygon2(470, 660, -2.35, [[2.4, 32], [3.14, 62], [3.14, 40]], grayPalette[18])
drawPolygon2(470, 660, -2.35, [[-2.4, 35], [3.14, 62], [3.14, 40]], grayPalette[26])
drawPolygon2(470, 660, -2.35, [[-0.9, 30], [-2.4, 35], [3.14, 40], [0, 5]], grayPalette[22])
drawPolygon2(470, 660, -2.35, [[0, 60], [-0.2, 50], [-0.9, 30], [0, 5]], grayPalette[21])

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



//region Name Banner

drawPolygon([[150, 430], [150, 385], [80, 420], [100, 435], [90, 462]], '#e6d899', true)//drawing of the banner to write the name onto
drawPolygon([[368, 433], [368, 385], [432, 420], [412, 435], [422, 462]], '#e6d899', true)
drawPolygon([[109, 419], [150, 398], [150, 430]], '#a69c6c', true)
drawPolygon([[409, 422], [368, 401], [368, 433]], '#a69c6c', true)

defaultShadow()

drawing.fillStyle = '#e6d899'

drawing.beginPath()
drawing.arc(256, 630, 300, 4.2, 5.25)
drawing.arc(256, 680, 300, 5.25, 4.2, true)
drawing.closePath()
drawing.fill()

drawing.shadowColor = 'transparent'


//name of the character written on the banner
writeCurved(256, 650, -285, -0.32, [0, 0.06, 0.05, 0.06, 0.06, 0.11, 0.06, 0.05, 0.06, 0.06, 0.06, 0.05], ['G', 'i', 'a', 'n', 't', 'S', 'e', 'r', 'p', 'e', 'n', 't'], '34px serif')




//region Status Simbols

drawPolygon2(260, 510, 0, [[-0.3, 60], [0.3, 60], [0.78, 31], [1.27, 60], [1.87, 60], [2.35, 31], [2.84, 60], [3.44, 60], [3.92, 31], [4.41, 60], [5.01, 60], [5.49, 31]], '#ff353560')//health translucid icon

drawPolygon2(130, 570, 0, [[0.58, 45], [1.57, 45], [2.55, 45], [3.72, 45], [4.71, 45], [5.69, 45]], '#ffbb0060')//mana cost translucid icon

drawPolygon2(370, 550, 1.1, [[0, 75], [0.2, 63], [1.57, 14], [1.57, 32], [1.7, 38], [1.9, 33], [2.55, 15], [2.9, 34], [2.8, 40], [3.14, 44], [-2.8, 40], [-2.9, 34], [-2.55, 15], [-1.9, 33], [-1.7, 38], [-1.57, 32], [-1.57, 14], [-0.2, 63]], '#13a40060')//attack translucid icon

const font = new FontFace('cloisterblack', 'url(./fonts/cloister-black.ttf)')

font.load().then(loadedFont => {//colored numbers of the card status values: health, attack and mana cost
    document.fonts.add(loadedFont)

    drawing.fillStyle = '#ffbb00'
    drawing.font = '100px cloisterblack'
    drawing.fillText('1', 130, 600)

    drawing.fillStyle = '#ff3535'
    drawing.font = '150px cloisterblack'
    drawing.fillText('5', 260, 550)

    drawing.fillStyle = '#13a400'
    drawing.font = '100px cloisterblack'
    drawing.fillText('3', 385, 600)
})