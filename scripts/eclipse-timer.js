const canvas = document.getElementById('eclipse-timer')
const drawing = canvas.getContext('2d')

const starCount = 800
const maximumStarSize = 2

drawing.translate(canvas.width / 2, canvas.height / 2)
drawing.textAlign = 'center'
drawing.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)



function drawRandomlyPositionedStar() {
    drawing.beginPath()
    drawing.arc(
        Math.random() * (canvas.width / 2) * (Math.random() < 0.5 ? 1 : -1),
        Math.random() * (canvas.height / 2) * (Math.random() < 0.5 ? 1 : -1),
        Math.random() * maximumStarSize,
        0,
        Math.PI * 2
    )
    drawing.fill()
}


drawing.fillStyle = '#ffffff'
drawing.filter = 'blur(1px)'

for (let i = 0; i < starCount; i++) { drawRandomlyPositionedStar() }

drawing.filter = 'blur(3px)'

drawing.fillStyle = '#ffffff15'

for (let i = 10; i > 0; i--) {
    drawing.beginPath()
    drawing.arc(0, 0, 12 * i, 0, Math.PI * 2)
    drawing.fill()
}

drawing.filter = 'none'

const pointsCount = 12
const initialAngle = -1.05
const shadowAngle = 5.6
const shadowColor = '#500000b0'
const imageSize = 60
const imageDistance = 220
const fontSize = 40
const fontColor = '#ff0000'
const fontShadowColor = '#ff5e00'
const eclipseHaloColor = '#a92200b0'
const textDistance = 170

const image = new Image()
image.src = './images/moon.png'

const font = new FontFace('cloisterblack', 'url(./fonts/cloister-black.ttf)')



function drawImageAndFont() {
    for (let i = 0; i < pointsCount; i++) {
        if (i >= pointsCount - 1) {
            const stepMultiplier = 0.4
            const distanceOffset = 6
            let angle = 0
            let randomStepSize = 0
            let randomDistance = 0
            const distanceMultiplier = 70
            const coordX = Math.cos(initialAngle + Math.PI * 2 / pointsCount * i) * imageDistance
            const coordY = Math.sin(initialAngle + Math.PI * 2 / pointsCount * i) * imageDistance

            drawing.fillStyle = eclipseHaloColor
            drawing.filter = 'blur(3px)'

            drawing.beginPath()

            drawing.moveTo(
                coordX + Math.cos(angle) * (imageSize / 2 + distanceOffset),
                coordY + Math.sin(angle) * (imageSize / 2 + distanceOffset)
            )

            while (angle < 6.28) {
                randomStepSize = Math.random() * stepMultiplier
                randomDistance = Math.random() * distanceMultiplier

                drawing.lineTo(
                    coordX + Math.cos(angle) * (imageSize / 2 + distanceOffset),
                    coordY + Math.sin(angle) * (imageSize / 2 + distanceOffset)
                )

                drawing.lineTo(
                    coordX + Math.cos(angle + randomStepSize / 2) * (imageSize / 2 + distanceOffset + randomDistance),
                    coordY + Math.sin(angle + randomStepSize / 2) * (imageSize / 2 + distanceOffset + randomDistance)
                )

                angle += randomStepSize
            }

            drawing.closePath()
            drawing.fill()
        }

        drawing.filter = 'none'

        drawing.drawImage(
            image,
            Math.cos(initialAngle + Math.PI * 2 / pointsCount * i) * imageDistance - imageSize / 2,
            Math.sin(initialAngle + Math.PI * 2 / pointsCount * i) * imageDistance - imageSize / 2,
            imageSize,
            imageSize
        )

        drawing.fillStyle = shadowColor
        drawing.filter = 'blur(6px)'

        drawing.save()

        drawing.beginPath()

        drawing.arc(
            Math.cos(initialAngle + Math.PI * 2 / pointsCount * i) * imageDistance,
            Math.sin(initialAngle + Math.PI * 2 / pointsCount * i) * imageDistance,
            imageSize / 2,
            0,
            Math.PI * 2
        )

        drawing.clip()

        drawing.beginPath()

        drawing.arc(
            Math.cos(initialAngle + Math.PI * 2 / pointsCount * i) * imageDistance + Math.cos(shadowAngle) * (imageSize / pointsCount * (pointsCount - (i + 1))),
            Math.sin(initialAngle + Math.PI * 2 / pointsCount * i) * imageDistance + Math.sin(shadowAngle) * (imageSize / pointsCount * (pointsCount - (i + 1))),
            imageSize / 2,
            0,
            Math.PI * 2
        )

        drawing.fill()

        drawing.restore()

        drawing.font = `${fontSize + 10}px cloisterblack`
        drawing.fillStyle = fontShadowColor
        drawing.filter = 'blur(4px)'

        const coordX = Math.cos(initialAngle + Math.PI * 2 / pointsCount * i) * textDistance
        const coordY = Math.sin(initialAngle + Math.PI * 2 / pointsCount * i) * textDistance + fontSize * 0.3

        drawing.fillText(String(i + 1), coordX, coordY + 10 * 0.3)

        drawing.font = `${fontSize}px cloisterblack`
        drawing.fillStyle = fontColor
        drawing.filter = 'none'

        drawing.fillText(String(i + 1), coordX, coordY)
    }
}



image.onload = () => {
    font.load().then(loadedFont => {
        document.fonts.add(loadedFont)

        drawImageAndFont()
    })
}