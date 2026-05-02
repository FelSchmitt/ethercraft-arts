const cardCanvas = document.getElementById('card-drawing')
const cardDrawing = cardCanvas.getContext('2d')

const lightDirection = 2.4
const shadowLength = 5

const cardPalette = [
    '#afa296',
    '#665a4f',
]

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

const halfCanvasWidth = cardCanvas.width / 2
const halfCanvasHeight = cardCanvas.height / 2

function defaultShadow() {
    cardDrawing.shadowOffsetX = Math.cos(lightDirection) * shadowLength
    cardDrawing.shadowOffsetY = Math.sin(lightDirection) * shadowLength
    cardDrawing.shadowBlur = 4
    cardDrawing.shadowColor = '#0007'
}

function drawPolygon(points, color, shadow, filter) {
    cardDrawing.fillStyle = color
    if (shadow) {
        cardDrawing.shadowColor = '#0007'
    }
    else {
        cardDrawing.shadowColor = 'transparent'
    }
    if (filter) {
        cardDrawing.filter = filter
    }
    else {
        cardDrawing.filter = 'none'
    }

    cardDrawing.beginPath()
    cardDrawing.moveTo(points[0][0], points[0][1])

    points.forEach(point => {
        cardDrawing.lineTo(point[0], point[1])
    })

    cardDrawing.closePath()
    cardDrawing.fill()
}

function drawPolygon2(x, y, rotation, points, color, shadow, filter) {
    cardDrawing.fillStyle = color
    if (shadow) {
        cardDrawing.shadowColor = '#0007'
    }
    else {
        cardDrawing.shadowColor = 'transparent'
    }
    if (filter) {
        cardDrawing.filter = filter
    }
    else {
        cardDrawing.filter = 'none'
    }

    cardDrawing.beginPath()
    cardDrawing.moveTo(x + Math.cos(rotation + points[0][0]) * points[0][1], y + Math.sin(rotation + points[0][0]) * points[0][1])

    points.forEach(point => {
        cardDrawing.lineTo(x + Math.cos(rotation + point[0]) * point[1], y + Math.sin(rotation + point[0]) * point[1])
    })

    cardDrawing.closePath()
    cardDrawing.fill()
}

function gradient(points, colors) {
    const gradient = cardDrawing.createLinearGradient(points[0], points[1], points[2], points[3])

    colors.forEach(color => {
        gradient.addColorStop(color[0], color[1])
    })

    return gradient
}

function drawChainNode(x, y, size, width, angle, direction, shadowDistance) {
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(direction) * size + Math.cos(lightDirection) * shadowDistance, y + Math.sin(direction) * size + Math.sin(lightDirection) * shadowDistance, size + width * 2, size * 0.6 + width * 2, direction, -Math.PI / 2, Math.PI / 2, true)
    cardDrawing.closePath()
    cardDrawing.save()
    cardDrawing.clip()
    
    cardDrawing.fillStyle = '#0007'
    cardDrawing.filter = 'blur(1px)'
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(direction) * size + Math.cos(lightDirection) * shadowDistance, y + Math.sin(direction) * size + Math.sin(lightDirection) * shadowDistance, size, size * 0.6, direction, -Math.PI / 2, Math.PI / 2, true)
    cardDrawing.ellipse(x + Math.cos(direction) * size + Math.cos(lightDirection) * shadowDistance, y + Math.sin(direction) * size + Math.sin(lightDirection) * shadowDistance, size + width, size * 0.6 + width, direction, Math.PI / 2, -Math.PI / 2)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.restore()

    cardDrawing.fillStyle = grayPalette[13]
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(direction) * size, y + Math.sin(direction) * size, size, size * 0.6, direction, -Math.PI / 2, Math.PI / 2, true)
    cardDrawing.ellipse(x + Math.cos(direction) * size, y + Math.sin(direction) * size, size + width, size * 0.6 + width, direction, Math.PI / 2, -Math.PI / 2)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.save()
    cardDrawing.clip()
    
    cardDrawing.fillStyle = '#5559'
    cardDrawing.filter = `blur(${width * 0.15}px)`
    cardDrawing.shadowColor = '#0000'
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(direction) * size + Math.cos(lightDirection + Math.PI) * (width / 3), y + Math.sin(direction) * size + Math.sin(lightDirection + Math.PI) * (width / 3), size, size * 0.6, direction, 0, Math.PI * 2)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(direction) * size + Math.cos(lightDirection + Math.PI) * (width / 3), y + Math.sin(direction) * size + Math.sin(lightDirection + Math.PI) * (width / 3), size + width, size * 0.6 + width, direction, 0, Math.PI * 2)
    cardDrawing.ellipse(x + Math.cos(direction) * size + Math.cos(lightDirection + Math.PI) * (width / 3), y + Math.sin(direction) * size + Math.sin(lightDirection + Math.PI) * (width / 3), size + width * 2, size * 0.6 + width * 2, direction, 0, Math.PI * 2, true)
    cardDrawing.closePath()
    cardDrawing.fill()
    
    cardDrawing.filter = `blur(${width * 0.1}px)`
    cardDrawing.fillStyle = '#fff9'
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(direction) * size, y + Math.sin(direction) * size, size + width / 3, size * 0.6 + width / 3, direction, 0, Math.PI * 2)
    cardDrawing.ellipse(x + Math.cos(direction) * size, y + Math.sin(direction) * size, size + width / 3 * 2, size * 0.6 + width / 3 * 2, direction, Math.PI * 2, 0, true)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.restore()
    
    
    
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(angle) * size + Math.cos(lightDirection) * shadowDistance, y + Math.sin(angle) * size + Math.sin(lightDirection) * shadowDistance, size + width * 2, size * 0.6 + width * 2, angle, -Math.PI / 2, Math.PI / 2, true)
    cardDrawing.closePath()
    cardDrawing.save()
    cardDrawing.clip()
    
    cardDrawing.fillStyle = '#0007'
    cardDrawing.filter = 'blur(1px)'
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(angle) * size + Math.cos(lightDirection) * shadowDistance, y + Math.sin(angle) * size + Math.sin(lightDirection) * shadowDistance, size, size * 0.6, angle, -Math.PI / 2, Math.PI / 2, true)
    cardDrawing.ellipse(x + Math.cos(angle) * size + Math.cos(lightDirection) * shadowDistance, y + Math.sin(angle) * size + Math.sin(lightDirection) * shadowDistance, size + width, size * 0.6 + width, angle, Math.PI / 2, -Math.PI / 2)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.restore()

    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(angle) * size, y + Math.sin(angle) * size, size, size * 0.6, angle, -Math.PI / 2, Math.PI / 2, true)
    cardDrawing.ellipse(x + Math.cos(angle) * size, y + Math.sin(angle) * size, size + width, size * 0.6 + width, angle, Math.PI / 2, -Math.PI / 2)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.save()
    cardDrawing.clip()

    cardDrawing.fillStyle = '#5559'
    cardDrawing.filter = `blur(${width * 0.15}px)`
    cardDrawing.shadowColor = '#0000'
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(angle) * size + Math.cos(lightDirection + Math.PI) * (width / 3), y + Math.sin(angle) * size + Math.sin(lightDirection + Math.PI) * (width / 3), size, size * 0.6, angle, 0, Math.PI * 2)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(angle) * size + Math.cos(lightDirection + Math.PI) * (width / 3), y + Math.sin(angle) * size + Math.sin(lightDirection + Math.PI) * (width / 3), size + width, size * 0.6 + width, angle, 0, Math.PI * 2)
    cardDrawing.ellipse(x + Math.cos(angle) * size + Math.cos(lightDirection + Math.PI) * (width / 3), y + Math.sin(angle) * size + Math.sin(lightDirection + Math.PI) * (width / 3), size + width * 2, size * 0.6 + width * 2, angle, 0, Math.PI * 2, true)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.filter = `blur(${width * 0.1}px)`
    cardDrawing.fillStyle = '#fff9'
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(angle) * size, y + Math.sin(angle) * size, size + width / 3, size * 0.6 + width / 3, angle, 0, Math.PI * 2)
    cardDrawing.ellipse(x + Math.cos(angle) * size, y + Math.sin(angle) * size, size + width / 3 * 2, size * 0.6 + width / 3 * 2, angle, Math.PI * 2, 0, true)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.restore()



    cardDrawing.shadowColor = '#0000'
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(angle) * size, y + Math.sin(angle) * size, size, size * 0.6, angle, -Math.PI / 2, Math.PI, true)
    cardDrawing.ellipse(x + Math.cos(direction) * size, y + Math.sin(direction) * size, size, size * 0.6, direction, Math.PI, -Math.PI / 2)
    cardDrawing.ellipse(x + Math.cos(direction) * size, y + Math.sin(direction) * size, size + width, size * 0.6 + width, direction, -Math.PI / 2, Math.PI - 0.5, true)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.save()
    cardDrawing.clip()

    cardDrawing.filter = `blur(${width * 0.15}px)`
    cardDrawing.fillStyle = '#5559'
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(direction) * size + Math.cos(lightDirection + Math.PI) * (width / 3), y + Math.sin(direction) * size + Math.sin(lightDirection + Math.PI) * (width / 3), size, size * 0.6, direction, 0, Math.PI * 2)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(direction) * size + Math.cos(lightDirection + Math.PI) * (width / 3), y + Math.sin(direction) * size + Math.sin(lightDirection + Math.PI) * (width / 3), size + width, size * 0.6 + width, direction, 0, Math.PI * 2)
    cardDrawing.ellipse(x + Math.cos(direction) * size + Math.cos(lightDirection + Math.PI) * (width / 3), y + Math.sin(direction) * size + Math.sin(lightDirection + Math.PI) * (width / 3), size + width * 2, size * 0.6 + width * 2, direction, 0, Math.PI * 2, true)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.filter = `blur(${width * 0.1}px)`
    cardDrawing.fillStyle = '#fff9'
    cardDrawing.beginPath()
    cardDrawing.ellipse(x + Math.cos(direction) * size, y + Math.sin(direction) * size, size + width / 3, size * 0.6 + width / 3, direction, 0, Math.PI * 2)
    cardDrawing.ellipse(x + Math.cos(direction) * size, y + Math.sin(direction) * size, size + width / 3 * 2, size * 0.6 + width / 3 * 2, direction, Math.PI * 2, 0, true)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.restore()
}

function drawHammerCableSegment(x, y, angle, size) {
    const pointX = x + Math.cos(angle) * size
    const pointY = y + Math.sin(angle) * size
    const pointXInverse = x + Math.cos(angle + Math.PI) * size
    const pointYInverse = y + Math.sin(angle + Math.PI) * size
    const lightOffsetX = Math.cos(lightDirection) * shadowLength
    const lightOffsetY = Math.sin(lightDirection) * shadowLength
    const shadowOffsetX = Math.cos(lightDirection + Math.PI) * shadowLength
    const shadowOffsetY = Math.sin(lightDirection + Math.PI) * shadowLength
    const halfClockwise = angle + Math.PI / 2
    const halfCounterClockwise = angle - Math.PI / 2

    cardDrawing.save()
    defaultShadow()

    cardDrawing.fillStyle = grayPalette[20]
    cardDrawing.beginPath()//clip space in the shape of the cable segment
    cardDrawing.arc(pointX, pointY, size * 0.5, halfCounterClockwise, halfClockwise)
    cardDrawing.arc(pointXInverse, pointYInverse, size * 0.5, halfClockwise, halfCounterClockwise)
    cardDrawing.closePath()
    cardDrawing.fill()
    cardDrawing.clip()

    cardDrawing.filter = `blur(${size * 0.15}px)`
    cardDrawing.shadowColor = '#0000'

    cardDrawing.fillStyle = grayPalette[28]
    cardDrawing.beginPath()//shadow of the segment
    cardDrawing.arc(pointX + shadowOffsetX, pointY + shadowOffsetY, size * 0.5, halfCounterClockwise, halfClockwise)
    cardDrawing.arc(pointXInverse + shadowOffsetX, pointYInverse + shadowOffsetY, size * 0.5, halfClockwise, halfCounterClockwise)
    cardDrawing.lineTo(pointX + shadowOffsetX + Math.cos(halfCounterClockwise) * (size * 0.5), pointY + shadowOffsetY + Math.sin(halfCounterClockwise) * (size * 0.5))
    cardDrawing.lineTo(pointX + shadowOffsetX + Math.cos(halfCounterClockwise) * size, pointY + shadowOffsetY + Math.sin(halfCounterClockwise) * size)
    cardDrawing.arc(pointXInverse + shadowOffsetX, pointYInverse + shadowOffsetY, size, halfCounterClockwise, halfClockwise, true)
    cardDrawing.arc(pointX + shadowOffsetX, pointY + shadowOffsetY, size, halfClockwise, halfCounterClockwise, true)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.fillStyle = grayPalette[15]
    cardDrawing.beginPath()//lighting of the segment
    cardDrawing.arc(pointX + lightOffsetX, pointY + lightOffsetY, size * 0.5, halfCounterClockwise, halfClockwise)
    cardDrawing.arc(pointXInverse + lightOffsetX, pointYInverse + lightOffsetY, size * 0.5, halfClockwise, halfCounterClockwise)
    cardDrawing.lineTo(pointX + lightOffsetX + Math.cos(halfCounterClockwise) * (size * 0.5), pointY + lightOffsetY + Math.sin(halfCounterClockwise) * (size * 0.5))
    cardDrawing.lineTo(pointX + lightOffsetX + Math.cos(halfCounterClockwise) * size, pointY + lightOffsetY + Math.sin(halfCounterClockwise) * size)
    cardDrawing.arc(pointXInverse + lightOffsetX, pointYInverse + lightOffsetY, size, halfCounterClockwise, halfClockwise, true)
    cardDrawing.arc(pointX + lightOffsetX, pointY + lightOffsetY, size, halfClockwise, halfCounterClockwise, true)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.restore()
}





cardDrawing.beginPath()//base shape of the card
cardDrawing.moveTo(30, 10)
cardDrawing.lineTo(cardCanvas.width - 30, 10)
cardDrawing.arcTo(cardCanvas.width - 10, 10, cardCanvas.width - 10, 30, 20)
cardDrawing.lineTo(cardCanvas.width - 10, cardCanvas.height - 60)
cardDrawing.arcTo(cardCanvas.width - 10, cardCanvas.height - 10, cardCanvas.width - 30, cardCanvas.height - 10, 20)
cardDrawing.lineTo(30, cardCanvas.height - 10)
cardDrawing.arcTo(10, cardCanvas.height - 10, 10, cardCanvas.height - 30, 20)
cardDrawing.lineTo(10, 30)
cardDrawing.arcTo(10, 10, 30, 10, 20)
cardDrawing.closePath()
cardDrawing.save()
cardDrawing.clip()

cardDrawing.fillStyle = grayPalette[18]
cardDrawing.fillRect(0, 0, cardCanvas.width, cardCanvas.height)//background of the whole card

const upGradient = cardDrawing.createLinearGradient(30, 0, cardCanvas.width - 10, 0)
upGradient.addColorStop(0, grayPalette[20])
upGradient.addColorStop(1, grayPalette[18])
cardDrawing.fillStyle = upGradient
cardDrawing.fillRect(10, 10, cardCanvas.width - 10, 30)//outer up face with lighting gradient

const sideGradient = cardDrawing.createLinearGradient(0, 10, 0, cardCanvas.height - 10)
sideGradient.addColorStop(0, grayPalette[18])
sideGradient.addColorStop(1, grayPalette[20])
cardDrawing.fillStyle = sideGradient
cardDrawing.fillRect(cardCanvas.width - 40, 10, 40, cardCanvas.height)//outer right face with lighting gradient

cardDrawing.fillStyle = grayPalette[27]
cardDrawing.fillRect(10, 40, 30, cardCanvas.height)//outer left face
cardDrawing.fillRect(10, cardCanvas.height - 40, cardCanvas.width - 50, 40)//outer down face

cardDrawing.fillStyle = grayPalette[22]
cardDrawing.fillRect(42, 42, cardCanvas.width - 82, cardCanvas.height - 82)//inner filling

cardDrawing.restore()

cardDrawing.fillStyle = grayPalette[25]
cardDrawing.fillRect(cardCanvas.width - 72, 42, 30, cardCanvas.height - 82)//inner right face
cardDrawing.fillRect(42, 42, cardCanvas.width - 82, 30)//inner up face

cardDrawing.fillStyle = grayPalette[23]
cardDrawing.beginPath()//inner down face
cardDrawing.moveTo(42, cardCanvas.height - 72)
cardDrawing.lineTo(42, cardCanvas.height - 42)
cardDrawing.lineTo(cardCanvas.width - 42, cardCanvas.height - 42)
cardDrawing.lineTo(cardCanvas.width - 72, cardCanvas.height - 72)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.beginPath()//inner left face
cardDrawing.moveTo(42, 42)
cardDrawing.lineTo(42, cardCanvas.height - 42)
cardDrawing.lineTo(72, cardCanvas.height - 42)
cardDrawing.lineTo(72, 72)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.strokeStyle = '#000'
cardDrawing.lineWidth = 2
cardDrawing.filter = 'none'

cardDrawing.filter = 'blur(2.5px)'
const topLighting = cardDrawing.createLinearGradient(cardCanvas.width - 40, 40, 40, cardCanvas.height - 40)//lighting of the top edge of the border
topLighting.addColorStop(0, grayPalette[12])
topLighting.addColorStop(1, grayPalette[17])
cardDrawing.fillStyle = topLighting
cardDrawing.beginPath()
cardDrawing.moveTo(40, 40)
cardDrawing.lineTo(cardCanvas.width - 40, 40)
cardDrawing.lineTo(cardCanvas.width - 40, cardCanvas.height - 40)
cardDrawing.lineTo(40, cardCanvas.height - 40)
cardDrawing.lineTo(40, 40)
cardDrawing.lineTo(45, 45)
cardDrawing.lineTo(45, cardCanvas.height - 45)
cardDrawing.lineTo(cardCanvas.width - 45, cardCanvas.height - 45)
cardDrawing.lineTo(cardCanvas.width - 45, 45)
cardDrawing.lineTo(45, 45)
cardDrawing.closePath()
cardDrawing.fill()
cardDrawing.filter = 'none'






//region Cross Shape

const gradient1 = gradient([halfCanvasWidth, halfCanvasHeight, 512, 0], [[0, grayPalette[16]], [1, grayPalette[9]]])
const gradient2 = gradient([0, 704, 512, 0], [[0, grayPalette[22]], [1, grayPalette[15]]])

//lighting drawings of the cross
drawPolygon(//right face of the vertical bar and up face of the horizontal bar facing the light source
    [[256, 0], [272, 10], [283, 42], [302, 72], [302, 306], [440, 306], [470, 325], [502, 336], [512, 352], [256, 352]],
    gradient1,
)

drawPolygon(//all the other faces of the cross
    [[210, 72], [229, 42], [240, 10], [256, 0], [256, 352], [512, 352], [502, 368], [470, 379], [440, 398], [302, 398], [302, 632], [283, 662], [272, 694], [256, 704], [240, 694], [229, 662], [210, 632], [210, 398], [72, 398], [42, 379], [10, 368], [0, 352], [10, 336], [42, 325], [72, 306], [210, 306]],
    grayPalette[18],
)

drawPolygon(//shadow of the down left section of the cross
    [[256, 352], [256, 704], [240, 694], [220, 662], [198, 632], [198, 410], [72, 410], [42, 388], [10, 368], [0, 352]],
    '#0004',
    false,
    'blur(3px)'
)

drawPolygon(//shadow of the left side of the vertical bar and down side of the horizontal bar
    [[470, 379], [440, 410], [302, 410], [288, 384], [224, 321], [198, 306], [198, 72], [229, 42], [256, 352]],
    '#0004',
    false,
    'blur(3px)'
)


//pointed shapes coming out of the sides of each half of the two cross bars
drawPolygon2(256, 180, 0, [[0, 0], [0, 70], [-0.35, 49], [-1.57, 30]], grayPalette[15])//up points of the vertical bar
drawPolygon2(256, 180, 0, [[0, 0], [0, 70], [0.35, 49], [1.57, 30]], grayPalette[18])
drawPolygon2(256, 180, 3.14, [[0, 0], [0, 70], [-0.35, 49], [-1.57, 30]], grayPalette[26])
drawPolygon2(256, 180, 3.14, [[0, 0], [0, 70], [0.35, 49], [1.57, 30]], grayPalette[16])
drawPolygon2(256, 180, 3.14, [[0, 0], [0, 55], [0.12, 60], [0.35, 49], [1.57, 30]], '#0004')

drawPolygon2(256, 524, 0, [[0, 0], [0, 70], [-0.35, 49], [-1.57, 30]], grayPalette[15])//down points of the vertical bar
drawPolygon2(256, 524, 0, [[0, 0], [0, 70], [0.35, 49], [1.57, 30]], grayPalette[18])
drawPolygon2(256, 524, 3.14, [[0, 0], [0, 70], [-0.35, 49], [-1.57, 30]], grayPalette[26])
drawPolygon2(256, 524, 3.14, [[0, 0], [0, 70], [0.35, 49], [1.57, 30]], grayPalette[16])
drawPolygon2(256, 524, 3.14, [[0, 0], [0, 55], [0.12, 60], [0.35, 49], [1.57, 30]], '#0004')

drawPolygon2(390, 352, 1.57, [[0, 0], [0, 70], [-0.35, 49], [-1.57, 30]], grayPalette[15])//right points of the horizontal bar
drawPolygon2(390, 352, 1.57, [[0, 0], [0, 55], [-0.1, 62], [-0.35, 49], [-1.57, 30]], '#0004')
drawPolygon2(390, 352, 1.57, [[0, 0], [0, 70], [0.05, 75], [0.5, 49], [1.57, 20]], '#0004', false, 'blur(2px)')
drawPolygon2(390, 352, 1.57, [[0, 0], [0, 70], [0.35, 49], [1.57, 30]], grayPalette[24])
drawPolygon2(390, 352, -1.57, [[0, 0], [0, 70], [-0.35, 49], [-1.57, 30]], grayPalette[18])
drawPolygon2(390, 352, -1.57, [[0, 0], [0, 70], [0.35, 49], [1.57, 30]], grayPalette[16])
drawPolygon2(390, 352, -1.57, [[0, 0], [0, 70], [-0.4, 52], [-1.57, 30]], '#3334', false, 'blur(2px)')

drawPolygon2(122, 352, 1.57, [[0, 0], [0, 70], [-0.35, 49], [-1.57, 30]], grayPalette[15])//left points of the horizontal bar
drawPolygon2(122, 352, 1.57, [[0, 0], [0, 55], [-0.1, 62], [-0.35, 49], [-1.57, 30]], '#0004')
drawPolygon2(122, 352, 1.57, [[0, 0], [0, 70], [0.05, 75], [0.5, 49], [1.57, 20]], '#0004', false, 'blur(2px)')
drawPolygon2(122, 352, 1.57, [[0, 0], [0, 70], [0.35, 49], [1.57, 30]], grayPalette[24])
drawPolygon2(122, 352, -1.57, [[0, 0], [0, 70], [-0.35, 49], [-1.57, 30]], grayPalette[18])
drawPolygon2(122, 352, -1.57, [[0, 0], [0, 70], [0.35, 49], [1.57, 30]], grayPalette[16])
drawPolygon2(122, 352, -1.57, [[0, 0], [0, 70], [-0.4, 52], [-1.57, 30]], '#3334', false, 'blur(2px)')

drawPolygon(//flat top of the cross
    [[229, 42], [256, 25], [283, 42], [283, 325], [470, 325], [487, 352], [470, 378], [281, 378], [281, 664], [256, 679], [231, 664], [231, 378], [41, 378], [25, 352], [41, 326], [229, 326]],
    gradient2,
)






//region Pointed Corners

defaultShadow()

//big double pointed corners
drawPolygon2(44, 44, 0.78, [[0, 60], [0.2, 50], [0.9, 30], [0, 5]], grayPalette[21])//up left corner
drawPolygon2(44, 44, 0.78, [[0.9, 30], [2.4, 35], [3.14, 40], [0, 5]], grayPalette[22])
drawPolygon2(44, 44, 0.78, [[2.4, 35], [3.14, 62], [3.14, 40]], grayPalette[24])
drawPolygon2(44, 44, 0.78, [[-2.4, 35], [3.14, 62], [3.14, 40]], grayPalette[14])
drawPolygon2(44, 44, 0.78, [[-0.9, 30], [-2.4, 35], [3.14, 40], [0, 5]], grayPalette[13])
drawPolygon2(44, 44, 0.78, [[0, 60], [-0.2, 50], [-0.9, 30], [0, 5]], grayPalette[12])

drawPolygon2(470, 44, 2.35, [[0, 60], [0.2, 50], [0.9, 30], [0, 5]], grayPalette[16])//up right corner
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



drawChainNode(302, 238.5, 15, 8, 1.64, 0, 3)//section of the chain that passes under the hammer cable
drawChainNode(300, 268, 15, 8, 0.8, -1.5, 3)
drawChainNode(338, 300, 15, 8, 1.57, 3.8, 3)






//region Hammer

const cableAngle = 5.3
const count = 10
const startX = 300
const startY = 310

defaultShadow()

cardDrawing.fillStyle = '#000'
cardDrawing.beginPath()//general shape of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 12 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 12 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 12 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 12 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 48)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 48)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 18 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 18 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 18 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 18 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 48)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 48)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.shadowColor = 'transparent'


for (let i = 10; i > 0; i--) {//cable of the hammer
    drawHammerCableSegment(startX + Math.cos(cableAngle) * 12 * i, startY + Math.sin(cableAngle) * 12 * i, 1.1, 10)
}

drawChainNode(393, 142.5, 15, 8, 1.06, 3.65, 4)//section of the chain that goes under the hammer head and above the hammer cable
drawChainNode(367, 128, 15, 8, 0.5, 3.45, 4)
drawChainNode(339, 119, 15, 8, 0.3, 3.14, 4)
drawChainNode(310, 119, 15, 8, 0, 3.14, 4)

drawChainNode(407.5, 168, 15, 8, 1.52, 4.2, 4)
drawChainNode(410, 198, 15, 8, 1.57, 4.6, 4)
drawChainNode(408, 225.5, 15, 8, -1.4, 2.53, 4)
drawChainNode(384, 242.5, 15, 8, -0.6, 2.73, 4)
drawChainNode(356.5, 254.5, 15, 8, -0.4, 3.73, 4)
drawChainNode(332, 238, 15, 8, 0.6, 3.14, 3)



cardDrawing.shadowColor = '#0000'

cardDrawing.fillStyle = grayPalette[28]
cardDrawing.beginPath()//down face of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 12 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 12 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 12 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 12 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 14 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 14 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 14 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 14 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.fillStyle = grayPalette[17]
cardDrawing.beginPath()//up face of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 16 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 16 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 16 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 16 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 18 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 18 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 18 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 18 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.fillStyle = grayPalette[23]
cardDrawing.beginPath()//left face of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 48)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 48)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.beginPath()//right face of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 48)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 48)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.closePath()
cardDrawing.fill()

const middleGradient = cardDrawing.createLinearGradient(startX + Math.cos(cableAngle) * 17 * (count - 1), startY + Math.sin(cableAngle) * 17 * (count - 1), startX + Math.cos(cableAngle) * 14 * (count - 1), startY + Math.sin(cableAngle) * 14 * (count - 1))
middleGradient.addColorStop(0, grayPalette[19])
middleGradient.addColorStop(1, grayPalette[23])
cardDrawing.fillStyle = middleGradient
cardDrawing.beginPath()//middle face of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.fillStyle = grayPalette[19]
cardDrawing.beginPath()//upper left face of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 48)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 18 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 18 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 32, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 32)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 16 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 16 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.beginPath()//uppper right face of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 48)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 18 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 18 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 17 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 32, startY + Math.sin(cableAngle) * 17 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 32)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 16 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 16 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.fillStyle = grayPalette[26]
cardDrawing.beginPath()//down right face of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 12 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 12 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 32, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 32)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 14 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 14 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle + Math.PI / 2) * 48)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.beginPath()//down left face of the hammer
cardDrawing.moveTo(startX + Math.cos(cableAngle) * 12 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 12 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 32, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 32)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 14 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 40, startY + Math.sin(cableAngle) * 14 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 40)
cardDrawing.lineTo(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 48, startY + Math.sin(cableAngle) * 13 * (count - 1) + Math.sin(cableAngle - Math.PI / 2) * 48)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.shadowColor = '#00000050'
cardDrawing.shadowOffsetX = -1
cardDrawing.shadowOffsetY = 1
cardDrawing.shadowBlur = 2
cardDrawing.fillStyle = grayPalette[16]
cardDrawing.beginPath()//upper left small ball
cardDrawing.arc(startX + Math.cos(cableAngle) * 14.8 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 25, startY + Math.sin(cableAngle) * 14.8 * count + Math.sin(cableAngle - Math.PI / 2) * 25, 3, 0, Math.PI * 2)
cardDrawing.fill()

cardDrawing.shadowColor = '#0000'
cardDrawing.filter = 'blur(0.5px)'
cardDrawing.fillStyle = grayPalette[11]
cardDrawing.beginPath()//lighting of the upper left small ball
cardDrawing.arc(startX + Math.cos(cableAngle) * 14.9 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 25, startY + Math.sin(cableAngle) * 14.9 * count + Math.sin(cableAngle - Math.PI / 2) * 25, 1.5, 0, Math.PI * 2)
cardDrawing.fill()

cardDrawing.shadowColor = '#00000050'
cardDrawing.fillStyle = grayPalette[16]
cardDrawing.filter = 'none'
cardDrawing.beginPath()//down left small ball
cardDrawing.arc(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 25, startY + Math.sin(cableAngle) * 13 * count + Math.sin(cableAngle - Math.PI / 2) * 25, 3, 0, Math.PI * 2)
cardDrawing.fill()

cardDrawing.shadowColor = '#0000'
cardDrawing.filter = 'blur(0.5px)'
cardDrawing.fillStyle = grayPalette[11]
cardDrawing.beginPath()//lighting of the down left small ball
cardDrawing.arc(startX + Math.cos(cableAngle) * 13.1 * (count - 1) + Math.cos(cableAngle - Math.PI / 2) * 25, startY + Math.sin(cableAngle) * 13.1 * count + Math.sin(cableAngle - Math.PI / 2) * 25, 1.5, 0, Math.PI * 2)
cardDrawing.fill()

cardDrawing.shadowColor = '#00000050'
cardDrawing.fillStyle = grayPalette[16]
cardDrawing.filter = 'none'
cardDrawing.beginPath()//upper right small ball
cardDrawing.arc(startX + Math.cos(cableAngle) * 14.8 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 38, startY + Math.sin(cableAngle) * 14.8 * count + Math.sin(cableAngle + Math.PI / 2) * 38, 3, 0, Math.PI * 2)
cardDrawing.fill()

cardDrawing.shadowColor = '#0000'
cardDrawing.filter = 'blur(0.5px)'
cardDrawing.fillStyle = grayPalette[11]
cardDrawing.beginPath()//lighting of the upper right small ball
cardDrawing.arc(startX + Math.cos(cableAngle) * 14.9 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 38, startY + Math.sin(cableAngle) * 14.9 * count + Math.sin(cableAngle + Math.PI / 2) * 38, 1.5, 0, Math.PI * 2)
cardDrawing.fill()

cardDrawing.shadowColor = '#00000050'
cardDrawing.fillStyle = grayPalette[16]
cardDrawing.filter = 'none'
cardDrawing.beginPath()//down right small ball
cardDrawing.arc(startX + Math.cos(cableAngle) * 13 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 38, startY + Math.sin(cableAngle) * 13 * count + Math.sin(cableAngle + Math.PI / 2) * 38, 3, 0, Math.PI * 2)
cardDrawing.fill()

cardDrawing.shadowColor = '#0000'
cardDrawing.filter = 'blur(0.5px)'
cardDrawing.fillStyle = grayPalette[11]
cardDrawing.beginPath()//lighting of the down right small ball
cardDrawing.arc(startX + Math.cos(cableAngle) * 13.1 * (count - 1) + Math.cos(cableAngle + Math.PI / 2) * 38, startY + Math.sin(cableAngle) * 13.1 * count + Math.sin(cableAngle + Math.PI / 2) * 38, 1.5, 0, Math.PI * 2)
cardDrawing.fill()



const symbolOriginX = startX + Math.cos(cableAngle) * 14.7 * (count - 1)
const symbolOriginY = startY + Math.sin(cableAngle) * 14.7 * (count - 1)

cardDrawing.strokeStyle = grayPalette[29]
cardDrawing.lineWidth = 1.5

cardDrawing.beginPath()//three arcs that form the norse symbol
cardDrawing.arc(symbolOriginX + Math.cos(cableAngle + Math.PI) * 10, symbolOriginY + Math.sin(cableAngle + Math.PI) * 10, 15, cableAngle - 1.5, cableAngle + 1.5)
cardDrawing.arc(symbolOriginX + Math.cos(cableAngle + Math.PI * 2 / 6) * 10, symbolOriginY + Math.sin(cableAngle + Math.PI * 2 / 6) * 10, 15, 1.7, 4.7)
cardDrawing.arc(symbolOriginX + Math.cos(cableAngle - Math.PI * 2 / 6) * 10, symbolOriginY + Math.sin(cableAngle - Math.PI * 2 / 6) * 10, 15, 5.9, 2.6)
cardDrawing.stroke()

cardDrawing.beginPath()//whole circle of the norse symbol
cardDrawing.arc(symbolOriginX, symbolOriginY, 11, 0, Math.PI * 2)
cardDrawing.stroke()

drawChainNode(205, 453, 15, 8, 0, 3.14, 3)//section of the chain that goes under the sword
drawChainNode(175, 453, 15, 8, 0, 2.9, 3)
drawChainNode(146, 460, 15, 8, -0.23, 2.6, 3)
drawChainNode(121, 475, 15, 8, -0.53, 2.26, 3)

defaultShadow()






//region Sword
const startXSword = 200
const startYSword = 410
const swordAngle = 2.1
const swordSegmentCount = 8

cardDrawing.fillStyle = grayPalette[28]
cardDrawing.beginPath()//base of the sword cable in diamond shape to cast the shadow
cardDrawing.moveTo(startXSword + Math.cos(swordAngle - Math.PI / 2) * 9, startYSword + Math.sin(swordAngle - Math.PI / 2) * 9)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle + Math.PI / 2) * 11, startYSword + Math.sin(swordAngle + Math.PI / 2) * 11)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle + Math.PI / 2 + 0.4) * 19, startYSword + Math.sin(swordAngle + Math.PI / 2 + 0.4) * 19)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle + Math.PI) * 23, startYSword + Math.sin(swordAngle + Math.PI) * 23)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle - Math.PI / 2 - 0.4) * 17, startYSword + Math.sin(swordAngle - Math.PI / 2 - 0.4) * 17)
cardDrawing.closePath()
cardDrawing.fill()



function drawSwordCableSegment(x, y, angle, size) {
    const gradient = cardDrawing.createLinearGradient(x + Math.cos(angle + Math.PI / 2) * (size * 0.5), y + Math.sin(angle + Math.PI / 2) * (size * 0.5), x + Math.cos(angle - Math.PI / 2) * (size * 0.55), y + Math.sin(angle - Math.PI / 2) * (size * 0.55))
    gradient.addColorStop(0, cardPalette[0])
    gradient.addColorStop(1, cardPalette[1])
    cardDrawing.fillStyle = gradient
    cardDrawing.beginPath()
    cardDrawing.moveTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size)
    cardDrawing.lineTo(x + Math.cos(angle + 0.5) * (size * 1.14), y + Math.sin(angle + 0.5) * (size * 1.14))
    cardDrawing.lineTo(x + Math.cos(angle + Math.PI) * (size * 0.8), y + Math.sin(angle + Math.PI) * (size * 0.8))
    cardDrawing.lineTo(x + Math.cos(angle + Math.PI + 0.6) * (size * 0.96), y + Math.sin(angle + Math.PI + 0.6) * (size * 0.96))
    cardDrawing.closePath()
    cardDrawing.fill()
}



for (let i = 0; i < swordSegmentCount; i++) {
    drawSwordCableSegment(startXSword + Math.cos(swordAngle) * 6 * i, startYSword + Math.sin(swordAngle) * 6 * i, swordAngle + Math.PI / 2, 10)
}

cardDrawing.shadowColor = '#0000'

cardDrawing.fillStyle = grayPalette[28]
cardDrawing.beginPath()//base of the sword cable in diamond shape
cardDrawing.moveTo(startXSword + Math.cos(swordAngle - Math.PI / 2) * 9, startYSword + Math.sin(swordAngle - Math.PI / 2) * 9)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle + Math.PI / 2) * 11, startYSword + Math.sin(swordAngle + Math.PI / 2) * 11)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle + Math.PI / 2 + 0.4) * 19, startYSword + Math.sin(swordAngle + Math.PI / 2 + 0.4) * 19)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle + Math.PI) * 23, startYSword + Math.sin(swordAngle + Math.PI) * 23)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle - Math.PI / 2 - 0.4) * 17, startYSword + Math.sin(swordAngle - Math.PI / 2 - 0.4) * 17)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.fillStyle = grayPalette[32]
cardDrawing.beginPath()//inner small diamond shape of the cable base
cardDrawing.moveTo(startXSword + Math.cos(swordAngle - Math.PI / 2 - 0.7) * 4, startYSword + Math.sin(swordAngle - Math.PI / 2 - 0.7) * 4)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle + Math.PI / 2 + 0.5) * 6, startYSword + Math.sin(swordAngle + Math.PI / 2 + 0.5) * 6)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle + Math.PI / 2 + 0.6) * 14, startYSword + Math.sin(swordAngle + Math.PI / 2 + 0.6) * 14)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle + Math.PI - 0.05) * 18, startYSword + Math.sin(swordAngle + Math.PI - 0.05) * 18)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle - Math.PI / 2 - 0.6) * 12, startYSword + Math.sin(swordAngle - Math.PI / 2 - 0.6) * 12)
cardDrawing.closePath()
cardDrawing.fill()

const middleBarOriginX = startXSword + Math.cos(swordAngle) * 6 * 7.5
const middleBarOriginY = startYSword + Math.sin(swordAngle) * 6 * 7.5

cardDrawing.shadowColor = '#0007'

cardDrawing.fillStyle = grayPalette[27]
cardDrawing.beginPath()//that bar between the cable and the blade
cardDrawing.moveTo(middleBarOriginX + Math.cos(swordAngle - Math.PI / 2) * 32, middleBarOriginY + Math.sin(swordAngle - Math.PI / 2) * 32)
cardDrawing.lineTo(middleBarOriginX + Math.cos(swordAngle + Math.PI / 2) * 34, middleBarOriginY + Math.sin(swordAngle + Math.PI / 2) * 34)
cardDrawing.lineTo(middleBarOriginX + Math.cos(swordAngle + Math.PI / 2 - 0.3) * 37, middleBarOriginY + Math.sin(swordAngle + Math.PI / 2 - 0.3) * 37)
cardDrawing.lineTo(middleBarOriginX + Math.cos(swordAngle - Math.PI / 2 + 0.3) * 35, middleBarOriginY + Math.sin(swordAngle - Math.PI / 2 + 0.3) * 35)
cardDrawing.closePath()
cardDrawing.fill()

const bladeStartRightX = startXSword + Math.cos(swordAngle) * 6 * 7.5 + Math.cos(swordAngle + Math.PI / 2) * 12
const bladeStartRightY = startYSword + Math.sin(swordAngle) * 6 * 7.5 + Math.sin(swordAngle + Math.PI / 2) * 12
const bladeStartLeftX = startXSword + Math.cos(swordAngle) * 6 * 7.5 + Math.cos(swordAngle - Math.PI / 2) * 12
const bladeStartLeftY = startYSword + Math.sin(swordAngle) * 6 * 7.5 + Math.sin(swordAngle - Math.PI / 2) * 12

cardDrawing.fillStyle = '#ffffff'
cardDrawing.beginPath()//general shape of the blade to cast the shadow
cardDrawing.moveTo(bladeStartRightX, bladeStartRightY)
cardDrawing.lineTo(bladeStartRightX + Math.cos(swordAngle) * 180, bladeStartRightY + Math.sin(swordAngle) * 180)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 260, startYSword + Math.sin(swordAngle) * 260)
cardDrawing.lineTo(bladeStartLeftX + Math.cos(swordAngle) * 180, bladeStartLeftY + Math.sin(swordAngle) * 180)
cardDrawing.lineTo(bladeStartLeftX, bladeStartLeftY)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.shadowColor = '#0000'

const bladeRightGradient = cardDrawing.createLinearGradient(startXSword + Math.cos(swordAngle) * 6 * 7.5, startYSword + Math.sin(swordAngle) * 6 * 7.5, startXSword + Math.cos(swordAngle) * 260, startYSword + Math.sin(swordAngle) * 260)
bladeRightGradient.addColorStop(0, grayPalette[11])
bladeRightGradient.addColorStop(1, grayPalette[15])
cardDrawing.fillStyle = bladeRightGradient
cardDrawing.beginPath()//right side of the blade
cardDrawing.moveTo(bladeStartRightX, bladeStartRightY)
cardDrawing.lineTo(bladeStartRightX + Math.cos(swordAngle) * 180, bladeStartRightY + Math.sin(swordAngle) * 180)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 235, startYSword + Math.sin(swordAngle) * 235)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7.5, startYSword + Math.sin(swordAngle) * 6 * 7.5)
cardDrawing.closePath()
cardDrawing.fill()

const bladeLeftGradient = cardDrawing.createLinearGradient(startXSword + Math.cos(swordAngle) * 6 * 7.5, startYSword + Math.sin(swordAngle) * 6 * 7.5, startXSword + Math.cos(swordAngle) * 260, startYSword + Math.sin(swordAngle) * 260)
bladeLeftGradient.addColorStop(0, grayPalette[8])
bladeLeftGradient.addColorStop(1, grayPalette[17])
cardDrawing.fillStyle = bladeLeftGradient
cardDrawing.beginPath()//left side of the blade
cardDrawing.moveTo(bladeStartLeftX, bladeStartLeftY)
cardDrawing.lineTo(bladeStartLeftX + Math.cos(swordAngle) * 180, bladeStartLeftY + Math.sin(swordAngle) * 180)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 235, startYSword + Math.sin(swordAngle) * 235)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7.5, startYSword + Math.sin(swordAngle) * 6 * 7.5)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.fillStyle = grayPalette[18]
cardDrawing.beginPath()//left side of the point end of the blade
cardDrawing.moveTo(bladeStartLeftX + Math.cos(swordAngle) * 180, bladeStartLeftY + Math.sin(swordAngle) * 180)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 260, startYSword + Math.sin(swordAngle) * 260)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 235, startYSword + Math.sin(swordAngle) * 235)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.fillStyle = grayPalette[20]
cardDrawing.beginPath()//right side of the point end of the blade
cardDrawing.moveTo(bladeStartRightX + Math.cos(swordAngle) * 180, bladeStartRightY + Math.sin(swordAngle) * 180)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 260, startYSword + Math.sin(swordAngle) * 260)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 235, startYSword + Math.sin(swordAngle) * 235)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.fillStyle = grayPalette[26]
cardDrawing.beginPath()//diamond shape between the cable and the blade
cardDrawing.moveTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle - Math.PI / 2) * 9, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle - Math.PI / 2) * 9)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle + Math.PI / 2) * 11, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle + Math.PI / 2) * 11)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle + Math.PI / 2 - 0.4) * 19, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle + Math.PI / 2 - 0.4) * 19)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle) * 23, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle) * 23)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle - Math.PI / 2 + 0.4) * 17, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle - Math.PI / 2 + 0.4) * 17)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.shadowColor = '#0000'

cardDrawing.fillStyle = grayPalette[32]
cardDrawing.beginPath()//inner diamond shape between the cable and the blade
cardDrawing.moveTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle - Math.PI / 2 + 0.4) * 8, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle - Math.PI / 2 + 0.4) * 8)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle + Math.PI / 2 - 0.3) * 9, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle + Math.PI / 2 - 0.3) * 9)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle + Math.PI / 2 - 0.5) * 16, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle + Math.PI / 2 - 0.5) * 16)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle) * 16, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle) * 16)
cardDrawing.lineTo(startXSword + Math.cos(swordAngle) * 6 * 7 + Math.cos(swordAngle - Math.PI / 2 + 0.5) * 14, startYSword + Math.sin(swordAngle) * 6 * 7 + Math.sin(swordAngle - Math.PI / 2 + 0.5) * 14)
cardDrawing.closePath()
cardDrawing.fill()

const leftSquareOriginX = startXSword + Math.cos(swordAngle) * 6 * 7.5 + Math.cos(swordAngle - Math.PI / 2 + 0.15) * 34
const leftSquareOriginY = startYSword + Math.sin(swordAngle) * 6 * 7.5 + Math.sin(swordAngle - Math.PI / 2 + 0.15) * 34
const rightSquareOriginX = startXSword + Math.cos(swordAngle) * 6 * 7.5 + Math.cos(swordAngle + Math.PI / 2 - 0.15) * 34
const rightSquareOriginY = startYSword + Math.sin(swordAngle) * 6 * 7.5 + Math.sin(swordAngle + Math.PI / 2 - 0.15) * 34
const squareRadius = 8

cardDrawing.shadowColor = '#0007'

cardDrawing.beginPath()//square of the left edge of the bar between the cable and the blade
cardDrawing.moveTo(leftSquareOriginX + Math.cos(swordAngle) * squareRadius, leftSquareOriginY + Math.sin(swordAngle) * squareRadius)
cardDrawing.lineTo(leftSquareOriginX + Math.cos(swordAngle + Math.PI / 2) * squareRadius, leftSquareOriginY + Math.sin(swordAngle + Math.PI / 2) * squareRadius)
cardDrawing.lineTo(leftSquareOriginX + Math.cos(swordAngle + Math.PI) * squareRadius, leftSquareOriginY + Math.sin(swordAngle + Math.PI) * squareRadius)
cardDrawing.lineTo(leftSquareOriginX + Math.cos(swordAngle - Math.PI / 2) * squareRadius, leftSquareOriginY + Math.sin(swordAngle - Math.PI / 2) * squareRadius)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.beginPath()//square of the right edge of the bar between the cable and the blade
cardDrawing.moveTo(rightSquareOriginX + Math.cos(swordAngle) * squareRadius, rightSquareOriginY + Math.sin(swordAngle) * squareRadius)
cardDrawing.lineTo(rightSquareOriginX + Math.cos(swordAngle + Math.PI / 2) * squareRadius, rightSquareOriginY + Math.sin(swordAngle + Math.PI / 2) * squareRadius)
cardDrawing.lineTo(rightSquareOriginX + Math.cos(swordAngle + Math.PI) * squareRadius, rightSquareOriginY + Math.sin(swordAngle + Math.PI) * squareRadius)
cardDrawing.lineTo(rightSquareOriginX + Math.cos(swordAngle - Math.PI / 2) * squareRadius, rightSquareOriginY + Math.sin(swordAngle - Math.PI / 2) * squareRadius)
cardDrawing.closePath()
cardDrawing.fill()

cardDrawing.shadowColor = 'transparent'
cardDrawing.shadowOffsetX = 0
cardDrawing.shadowOffsetY = 0

drawChainNode(205, 600, 15, 8, 0, 3.14, 3)//section of the chain that goes above the sword and connects to the cross
drawChainNode(175, 600, 15, 8, 0, 3.4, 3)
drawChainNode(146.5, 592.5, 15, 8, 0.25, 3.7, 3)
drawChainNode(121.5, 577, 15, 8, 0.56, 4, 3)
drawChainNode(102, 498, 15, 8, 1.82, 5.42, 3)
drawChainNode(94.5, 527, 15, 8, 1.27, 4.96, 3)
drawChainNode(102.5, 555, 15, 8, 0.86, 4.45, 3)


drawChainNode(337.5, 405, 15, 8, 1.8, -1.57, 3)//short section of the chain that connects to the two cross bars in the down right quadrant
drawChainNode(330.5, 434, 15, 8, 2.44, -1.33, 3)
drawChainNode(308, 453, 15, 8, -0.7, 3.14, 3)






//region Emblem

cardDrawing.strokeStyle = 'black'

cardDrawing.fillStyle = grayPalette[23]
cardDrawing.beginPath()//circle background of the emblem
cardDrawing.arc(halfCanvasWidth, halfCanvasHeight, 66, Math.PI * 2, 0, true)
cardDrawing.fill()
cardDrawing.shadowColor = 'transparent'
cardDrawing.save()
cardDrawing.clip()

cardDrawing.fillStyle = '#0006'
cardDrawing.filter = 'blur(2px)'
cardDrawing.beginPath()//shadow of the ring
cardDrawing.arc(halfCanvasWidth + Math.cos(lightDirection) * 8, halfCanvasHeight + Math.sin(lightDirection) * 8, 40, 0, Math.PI * 2)
cardDrawing.arc(halfCanvasWidth, halfCanvasHeight, 66, Math.PI * 2, 0, true)
cardDrawing.fill()
cardDrawing.restore()

const emblemCircleGradient = cardDrawing.createLinearGradient(halfCanvasWidth + Math.cos(lightDirection + Math.PI) * 66, halfCanvasHeight + Math.sin(lightDirection + Math.PI) * 66, halfCanvasWidth + Math.cos(lightDirection) * 66, halfCanvasHeight + Math.sin(lightDirection) * 66)
emblemCircleGradient.addColorStop(0, grayPalette[19])
emblemCircleGradient.addColorStop(1, grayPalette[30])
cardDrawing.fillStyle = emblemCircleGradient
cardDrawing.beginPath()//outer circle that forms the elevation ring
cardDrawing.arc(halfCanvasWidth, halfCanvasHeight, 56, 0, Math.PI * 2)
cardDrawing.arc(halfCanvasWidth, halfCanvasHeight, 66, Math.PI * 2, 0, true)
cardDrawing.fill()

cardDrawing.fillStyle = grayPalette[20]
cardDrawing.beginPath()//clip space to draw the shadow of the inner ring of the elevation
cardDrawing.arc(halfCanvasWidth, halfCanvasHeight, 40, 0, Math.PI * 2)
cardDrawing.arc(halfCanvasWidth, halfCanvasHeight, 56, Math.PI * 2, 0, true)
cardDrawing.fill()
cardDrawing.save()
cardDrawing.clip()

cardDrawing.fillStyle = grayPalette[30]
cardDrawing.filter = 'blur(4px)'
cardDrawing.beginPath()//shadow of the inner ring of the elevation
cardDrawing.arc(halfCanvasWidth + Math.cos(lightDirection) * 10, halfCanvasHeight + Math.sin(lightDirection) * 10, 46, 0, Math.PI * 2)
cardDrawing.arc(halfCanvasWidth, halfCanvasHeight, 56, Math.PI * 2, 0, true)
cardDrawing.fill()
cardDrawing.restore()

cardDrawing.strokeStyle = 'black'

function drawEmblemRay(angle, colorRight, colorLeft) {
    cardDrawing.fillStyle = colorRight
    cardDrawing.beginPath()
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle - 0.7) * 32, halfCanvasHeight + Math.sin(angle - 0.7) * 32, 18, angle + 0.7, angle + 2.4)
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle - 0.1) * 29, halfCanvasHeight + Math.sin(angle - 0.1) * 29, 18, angle + 3.2, angle + 1.1, true)
    cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle + 0.05) * 46, halfCanvasHeight + Math.sin(angle + 0.05) * 46)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.shadowColor = 'transparent'

    cardDrawing.fillStyle = colorLeft
    cardDrawing.beginPath()
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle - 0.7) * 32, halfCanvasHeight + Math.sin(angle - 0.7) * 32, 18, angle + 0.7, angle + 2.4)
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle - 0.4) * 34, halfCanvasHeight + Math.sin(angle - 0.4) * 34, 21, angle + 2.7, angle + 0.8, true)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.shadowColor = '#0007'

    cardDrawing.fillStyle = colorLeft
    cardDrawing.beginPath()
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.3) * 80, halfCanvasHeight + Math.sin(angle + 0.3) * 80, 22, angle - 2.1, angle - 0.8)
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.03) * 73, halfCanvasHeight + Math.sin(angle + 0.03) * 73, 22, angle + 0.4, angle - 2, true)
    cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle - 0.06) * 61, halfCanvasHeight + Math.sin(angle - 0.06) * 61)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.shadowColor = 'transparent'

    cardDrawing.fillStyle = colorRight
    cardDrawing.beginPath()
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.3) * 80, halfCanvasHeight + Math.sin(angle + 0.3) * 80, 22, angle - 2.1, angle - 0.8)
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.2) * 73, halfCanvasHeight + Math.sin(angle + 0.2) * 73, 22, angle - 0.2, angle - 2.1, true)
    cardDrawing.closePath()
    cardDrawing.fill()
}



function drawSmallEmblemRay(angle, colorRight, colorLeft) {
    cardDrawing.fillStyle = colorRight
    cardDrawing.beginPath()
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.2) * 32, halfCanvasHeight + Math.sin(angle + 0.2) * 32, 10, angle + 1, angle - 2.6)
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle - 0.2) * 32, halfCanvasHeight + Math.sin(angle - 0.2) * 32, 10, angle + 2.5, angle + 0.7, true)
    cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle + 0.15) * 46, halfCanvasHeight + Math.sin(angle + 0.15) * 46)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.shadowColor = 'transparent'

    cardDrawing.fillStyle = colorLeft
    cardDrawing.beginPath()
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.2) * 32, halfCanvasHeight + Math.sin(angle + 0.2) * 32, 10, angle + 0.85, angle - 2.6)
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle - 0.08) * 36, halfCanvasHeight + Math.sin(angle - 0.08) * 36, 13, angle + 2.9, angle + 0.7, true)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.shadowColor = '#0007'

    cardDrawing.fillStyle = colorRight
    cardDrawing.beginPath()
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.2) * 75, halfCanvasHeight + Math.sin(angle + 0.2) * 75, 12, angle - 2.1, angle - 0.1)
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.03) * 73, halfCanvasHeight + Math.sin(angle + 0.03) * 73, 16, angle + 0.7, angle - 2, true)
    cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle - 0.05) * 61, halfCanvasHeight + Math.sin(angle - 0.05) * 61)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.shadowColor = 'transparent'

    cardDrawing.fillStyle = colorLeft
    cardDrawing.beginPath()
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.2) * 75, halfCanvasHeight + Math.sin(angle + 0.2) * 75, 12, angle - 2.1, angle - 0.1)
    cardDrawing.arc(halfCanvasWidth + Math.cos(angle + 0.15) * 71, halfCanvasHeight + Math.sin(angle + 0.15) * 71, 16, angle, angle - 2.2, true)
    cardDrawing.closePath()
    cardDrawing.fill()
}



function drawEmblemPoint(angle, color1, color2) {
    cardDrawing.fillStyle = grayPalette[color1]
    cardDrawing.beginPath()
    cardDrawing.moveTo(halfCanvasWidth + Math.cos(angle) * 61, halfCanvasHeight + Math.sin(angle) * 61)
    cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle - 0.25) * 66, halfCanvasHeight + Math.sin(angle - 0.25) * 66)
    cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle) * 76, halfCanvasHeight + Math.sin(angle) * 76)
    cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle + 0.25) * 66, halfCanvasHeight + Math.sin(angle + 0.25) * 66)
    cardDrawing.closePath()
    cardDrawing.fill()

    cardDrawing.shadowColor = 'transparent'
    cardDrawing.fillStyle = grayPalette[color2]
    cardDrawing.beginPath()
    cardDrawing.moveTo(halfCanvasWidth + Math.cos(angle) * 61, halfCanvasHeight + Math.sin(angle) * 61)
    cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle - 0.25) * 66, halfCanvasHeight + Math.sin(angle - 0.25) * 66)
    cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle) * 76, halfCanvasHeight + Math.sin(angle) * 76)
    cardDrawing.closePath()
    cardDrawing.fill()
}



function lightingGradient(points, colors) {
    const gradient = cardDrawing.createLinearGradient(points[0], points[1], points[2], points[3])

    colors.forEach(color => {
        gradient.addColorStop(color[0], grayPalette[color[1]])
    })

    return gradient
}



const bigRayLeft1 = lightingGradient([255, 257, 255, 342], [[0, 20], [0.2, 27], [0.7, 27], [1, 20]])
const bigRayRight1 = lightingGradient([255, 257, 255, 342], [[0, 27], [0.2, 20], [0.7, 20], [1, 27]])
const bigRayLeft2 = lightingGradient([267, 352, 350, 352], [[0, 22], [0.2, 22], [0.3, 27], [0.7, 22], [1, 20]])
const bigRayRight2 = lightingGradient([267, 352, 350, 352], [[0, 30], [0.4, 22], [0.7, 23], [1, 27]])
const bigRayLeft3 = lightingGradient([256, 362, 256, 447], [[0, 23], [0.2, 20], [0.5, 20], [0.6, 29], [0.7, 20], [1, 24]])
const bigRayRight3 = lightingGradient([256, 362, 256, 447], [[0, 20], [0.3, 29], [0.7, 30], [0.8, 27], [1, 20]])
const bigRayLeft4 = lightingGradient([246, 352, 161, 352], [[0, 27], [0.2, 22], [0.7, 28], [0.8, 22], [1, 27]])
const bigRayRight4 = lightingGradient([246, 352, 161, 352], [[0, 20], [0.3, 24], [0.7, 30], [0.8, 22], [1, 20]])

const smallRayLeft1 = lightingGradient([275, 342, 322, 292], [[0, 22], [0.3, 30], [0.8, 24], [1, 20]])
const smallRayRight1 = lightingGradient([275, 342, 322, 292], [[0, 30], [0.1, 20], [0.2, 30], [0.7, 22], [1, 27]])
const smallRayLeft2 = lightingGradient([265, 372, 318, 417], [[0, 20], [0.3, 20], [0.7, 20], [1, 23]])
const smallRayRight2 = lightingGradient([265, 372, 318, 417], [[0, 22], [0.3, 30], [0.7, 27], [1, 22]])
const smallRayLeft3 = lightingGradient([238, 363, 190, 412], [[0, 27], [0.3, 20], [0.6, 30], [0.7, 30], [0.9, 20], [1, 27]])
const smallRayRight3 = lightingGradient([238, 363, 190, 412], [[0, 20], [0.3, 27], [0.6, 32], [0.7, 30], [1, 20]])
const smallRayLeft4 = lightingGradient([246, 332, 193, 289], [[0, 20], [0.3, 27], [0.7, 30], [1, 22]])
const smallRayRight4 = lightingGradient([246, 332, 193, 289], [[0, 24], [0.3, 20], [1, 20]])

drawEmblemPoint(0.35, 24, 20)
drawEmblemPoint(1.06, 26, 22)
drawEmblemPoint(1.9, 28, 24)
drawEmblemPoint(2.65, 30, 29)
drawEmblemPoint(3.5, 24, 28)
drawEmblemPoint(4.2, 22, 26)
drawEmblemPoint(5.05, 19, 22)
drawEmblemPoint(5.8, 22, 19)
drawEmblemRay(-Math.PI / 2, bigRayRight1, bigRayLeft1)
drawEmblemRay(0, bigRayRight2, bigRayLeft2)
drawEmblemRay(Math.PI / 2, bigRayRight3, bigRayLeft3)
drawEmblemRay(Math.PI, bigRayRight4, bigRayLeft4)
drawSmallEmblemRay(-Math.PI / 4, smallRayLeft1, smallRayRight1)
drawSmallEmblemRay(Math.PI / 4, smallRayLeft2, smallRayRight2)
drawSmallEmblemRay(Math.PI / 4 * 3, smallRayLeft3, smallRayRight3)
drawSmallEmblemRay(-Math.PI / 4 * 3, smallRayLeft4, smallRayRight4)

cardDrawing.fillStyle = grayPalette[22]
cardDrawing.beginPath()//circle that forms the flat top of the emblem ring
cardDrawing.arc(halfCanvasWidth, halfCanvasHeight, 46, 0, Math.PI * 2)
cardDrawing.arc(halfCanvasWidth, halfCanvasHeight, 61, Math.PI * 2, 0, true)
cardDrawing.fill()

cardDrawing.strokeStyle = grayPalette[30]
cardDrawing.lineWidth = 2



function drawRune(angle, points) {
    cardDrawing.beginPath()
    cardDrawing.moveTo(halfCanvasWidth + Math.cos(angle + points[0][0]) * points[0][1], halfCanvasHeight + Math.sin(angle + points[0][0]) * points[0][1])

    points.forEach(point => {
        if (point[2] == 'newpath') {
            cardDrawing.stroke()
            cardDrawing.beginPath()
            cardDrawing.moveTo(halfCanvasWidth + Math.cos(angle + point[0]) * point[1], halfCanvasHeight + Math.sin(angle + point[0]) * point[1])
        }
        else {
            cardDrawing.lineTo(halfCanvasWidth + Math.cos(angle + point[0]) * point[1], halfCanvasHeight + Math.sin(angle + point[0]) * point[1])
        }
    })

    cardDrawing.stroke()
}



drawRune(0, [[0, 47], [0, 60], [0, 56, 'newpath'], [0.08, 60], [0, 51.5, 'newpath'], [0.15, 60]])//fe
drawRune(0.4, [[0, 47], [0, 60], [0.1, 56], [0.12, 47]])//ur
drawRune(0.8, [[0, 47], [0, 60], [0, 51, 'newpath'], [0.06, 52], [0.08, 54], [0.06, 56], [0, 57]])//thurs
drawRune(1.2, [[0, 47], [0, 60], [0, 56, 'newpath'], [0.08, 54], [0, 52, 'newpath'], [0.08, 50]])//as
drawRune(1.6, [[0, 47], [0, 60], [0.08, 56], [0, 53], [0.12, 49]])//reid
drawRune(2, [[0, 47], [0, 60], [0, 52, 'newpath'], [0.1, 60]])//kaun
drawRune(2.4, [[0, 47], [0, 60], [-0.08, 51, 'newpath'], [0.07, 57], [0.08, 51, 'newpath'], [-0.07, 57]])//hagall
drawRune(2.8, [[0, 47], [0, 60], [0.08, 51, 'newpath'], [-0.07, 57]])//naudr
drawRune(3.2, [[0, 47], [0, 60]])//isa
drawRune(3.6, [[0, 47], [0, 60], [-0.08, 51, 'newpath'], [0.07, 57]])//ar
drawRune(4, [[0.05, 47], [0.05, 55], [-0.05, 52], [-0.05, 60]])//sol
drawRune(4.4, [[0, 47], [0, 60], [-0.1, 56, 'newpath'], [0, 60], [0.1, 56]])//tyr
drawRune(4.8, [[0, 47], [0, 60], [0.08, 57], [0, 54], [0.1, 51], [0, 48]])//bjarkan
drawRune(5.2, [[0, 47], [0, 60], [-0.08, 59, 'newpath'], [0, 54], [0.08, 59]])//madr
drawRune(5.6, [[0, 47], [0, 60], [0, 60], [0.1, 56]])//logr
drawRune(6, [[0, 47], [0, 60], [-0.1, 48, 'newpath'], [0, 52], [0.1, 48]])//yr



drawChainNode(204, 119, 15, 8, 0, 2.8, 3)//section of the chain of the upper left quadrant
drawChainNode(176, 129, 15, 8, -0.34, 2.5, 3)
drawChainNode(152.5, 146.5, 15, 8, -0.63, 2.3, 3)
drawChainNode(133, 168, 15, 8, 5.46, 1.9, 3)
drawChainNode(123.5, 196, 15, 8, 5.05, 1.67, 3)
drawChainNode(120.5, 225.5, 15, 8, 4.82, 2.33, 3)
drawChainNode(100, 247, 15, 8, -0.8, 2.65, 3)
drawChainNode(74, 261, 15, 8, -0.5, 3.14, 3)

drawChainNode(440, 482, 15, 8, 0, 3.14, 3)//section of the chain of the down right quadrant
drawChainNode(411, 482, 15, 8, 0, 2.9, 3)
drawChainNode(382.5, 489, 15, 8, -0.24, 2.2, 3)
drawChainNode(365, 512, 15, 8, -0.9, 1.3, 3)
drawChainNode(372.5, 539.5, 15, 8, -1.83, 1.16, 3)
drawChainNode(384, 566, 15, 8, -1.97, 2.24, 3)
drawChainNode(366, 589, 15, 8, -0.9, 2.76, 3)
drawChainNode(339, 600, 15, 8, -0.4, 3.14, 3)
drawChainNode(310, 600, 15, 8, 0, 3.14, 3)