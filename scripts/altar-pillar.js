const canvas = document.getElementById('altar-pillar')
const drawing = canvas.getContext('2d')

drawing.translate(canvas.width / 2, canvas.height / 2)
drawing.textAlign = 'center'



const barHeight = 540
const barThickness = 50
const barEdgeThickness = 10
const barThresholdsCount = 4
const barThresholdHeight = 16
const barThresholdLength = 16
const barThresholdPointLength = 10
const barMaxLevel = 32
const barEnergyLevel = 16
const fontSize = 60
const fontYOffset = 22

const baseColor = '#4f4f4f'
const barBackgroundColor = '#2e0a4b'
const barEnergyColor = '#8000ff'
const barEnergyTopColor = '#d2a4ff'
const barEdgeColor = '#342846'
const barOutlineColor = '#583783'
const fontColor = '#c300ff'

drawing.fillStyle = baseColor

drawing.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)



drawing.fillStyle = barEdgeColor
drawing.filter = 'blur(1px)'

drawing.beginPath()
drawing.moveTo(0, -barHeight / 2)

for (let index = 0; index < barThresholdsCount; index++) {
    const positionX = barThickness / 2 + barEdgeThickness
    const positionY = -barHeight / 2 + (barHeight / barThresholdsCount * index)

    drawing.lineTo(positionX, positionY)
    drawing.lineTo(positionX + barThresholdLength, positionY)
    drawing.lineTo(positionX + barThresholdLength + barThresholdPointLength, positionY + barThresholdHeight / 2)
    drawing.lineTo(positionX + barThresholdLength, positionY + barThresholdHeight)
    drawing.lineTo(positionX, positionY + barThresholdHeight)
}

drawing.lineTo(barThickness / 2 + barEdgeThickness, barHeight / 2 - barThickness / 2)

drawing.lineTo(0, barHeight / 2)

drawing.lineTo(-barThickness / 2 - barEdgeThickness, barHeight / 2 - barThickness / 2)

for (let index = barThresholdsCount - 1; index >= 0; index--) {
    const positionX = -barThickness / 2 - barEdgeThickness
    const positionY = -barHeight / 2 + (barHeight / barThresholdsCount * index)

    drawing.lineTo(positionX, positionY + barThresholdHeight)
    drawing.lineTo(positionX - barThresholdLength, positionY + barThresholdHeight)
    drawing.lineTo(positionX - barThresholdLength - barThresholdPointLength, positionY + barThresholdHeight / 2)
    drawing.lineTo(positionX - barThresholdLength, positionY)
    drawing.lineTo(positionX, positionY)
}

drawing.closePath()
drawing.fill()



drawing.fillStyle = barBackgroundColor
drawing.lineWidth = 3
drawing.strokeStyle = barOutlineColor
drawing.filter = 'none'

drawing.save()
drawing.beginPath()
drawing.moveTo(0, -barHeight / 2)
drawing.lineTo(barThickness / 2, -barHeight / 2 + barThickness / 2)
drawing.lineTo(barThickness / 2, barHeight / 2 - barThickness / 2)
drawing.lineTo(0, barHeight / 2)
drawing.lineTo(-barThickness / 2, barHeight / 2 - barThickness / 2)
drawing.lineTo(-barThickness / 2, -barHeight / 2 + barThickness / 2)
drawing.closePath()
drawing.fill()
drawing.stroke()
drawing.clip()

const barEnergyColorGradient = drawing.createLinearGradient(
    0,
    barHeight / 2 - (barEnergyLevel / barMaxLevel * barHeight),
    0,
    barHeight / 2
)

barEnergyColorGradient.addColorStop(0, barEnergyTopColor)
barEnergyColorGradient.addColorStop(0.2, barEnergyColor)

drawing.fillStyle = barEnergyColorGradient
drawing.filter = 'blur(2px)'

drawing.fillRect(
    -barThickness / 2,
    barHeight / 2 - (barEnergyLevel / barMaxLevel * barHeight),
    barThickness,
    barHeight
)

drawing.restore()

const font = new FontFace('cloisterblack', 'url(./fonts/cloister-black.ttf)')

font.load().then(loadedFont => {
    document.fonts.add(font)

    drawing.font = `${fontSize}px cloisterblack`
    drawing.fillStyle = fontColor

    drawing.fillText(String(barEnergyLevel), barThickness / 2 + barEdgeThickness, barHeight / 2 - (barEnergyLevel / barMaxLevel * barHeight) + fontYOffset)
})