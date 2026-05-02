const canvases = [
    document.getElementById('number-left-side'),
    document.getElementById('number-slash'),
    document.getElementById('number-right-side')
]

const drawings = [
    canvases[0].getContext('2d'),
    canvases[1].getContext('2d'),
    canvases[2].getContext('2d')
]

const fontNames = [
    'cloisterblack',
    'icelandwinterstorm',
    'thecenturion'
]

const fonts = [
    new FontFace(fontNames[0], 'url(./fonts/cloister-black.ttf)'),
    new FontFace(fontNames[1], 'url(./fonts/iceland-winterstorm.otf)'),
    new FontFace(fontNames[2], 'url(./fonts/the-centurion.otf)')
]



const selectedFont = 0

const fontColor = '#ffdd00'
const blurColor = '#fff08f'
const backgroundColor = '#000'
const blurRadius = 12

const charactersToDraw = ['1', '/', '10']
const charactersSizes = [140, 110, 125]
const lineOffsets = [10, 10, 10]



drawings.forEach((drawing, index) => {
    drawing.fillStyle = backgroundColor
    drawing.fillRect(0, 0, canvases[index].width, canvases[index].height)
    drawing.textAlign = 'center'
})

fonts[selectedFont].load().then((loadedFont) => {
    document.fonts.add(loadedFont)

    drawings.forEach((drawing, index) => {
        drawing.fillStyle = blurColor
        drawing.filter = `blur(${blurRadius}px)`
        drawing.translate(canvases[index].width / 2, canvases[index].height / 2)
        drawing.font = `${charactersSizes[index] + 10}px ${fontNames[selectedFont]}`

        drawing.fillText(charactersToDraw[index], 0, charactersSizes[index] / 4 + lineOffsets[index])

        drawing.fillStyle = fontColor
        drawing.font = `${charactersSizes[index]}px ${fontNames[selectedFont]}`
        drawing.filter = 'blur(1px)'

        drawing.fillText(charactersToDraw[index], 0, charactersSizes[index] / 4 + lineOffsets[index])
    })
})