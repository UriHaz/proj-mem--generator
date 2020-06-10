'use strict';

var gElCanvas;
var gCtx;

function onInit() {
    _createImgs();
    renderGallery();
    gElCanvas = document.querySelector('canvas');
    document.querySelector('.editor').classList.add('hide');
    gCtx = gElCanvas.getContext('2d');
    resetMeme();
    renderMeme(); 

}

function openGallery() {
    document.querySelector('.gallery').classList.remove('hide');
    document.querySelector('.editor').classList.add('hide');
}

function renderLines() {
    drawLines();
}

function renderMeme() {
    drawMeme(getMeme().selectedImgId);
}

function onSetLineText(lineText) {
    setLineText(lineText);
    renderMeme();
}

function drawLines() {
    const meme = getMeme();
    meme.lines.forEach((line, idx) => {
        if (idx === meme.selectedLineIdx) gCtx.strokeStyle = 'red';
        else gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.color;
        gCtx.font = line.size + 'px ' + line.font;
        gCtx.textAlign = line.align;
        gCtx.fillText(line.txt.toUpperCase(), line.x, line.y);
        gCtx.strokeText(line.txt.toUpperCase(), line.x, line.y);
    })
}

function drawMeme(imgId) {
    var img = new Image()
    img.src = `./imgs/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        renderLines()
    }
}

function setInputText() {
    let elLineInput = document.querySelector('[name="line"]');
    elLineInput.value = getMeme().lines[getMeme().selectedLineIdx].txt;
    elLineInput.focus()
}

function onSetMeme(imgId) {
    setMeme(imgId);
    renderMeme()
    setInputText();
    document.querySelector('.editor').classList.remove('hide');
    document.querySelector('.gallery').classList.add('hide');
}

function onSwitchLine() {
    switchLine()
    setInputText()
    renderLines();
}

function onChangeFontSize(diff) {
    changeFontSize(diff);
    renderMeme()
   
}

function onChangeLineHeight(diff) {
    changeLineHeight(diff);
    const meme = getMeme();
    drawMeme(meme.selectedImgId)
}
