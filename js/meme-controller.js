'use strict';

// var gElCanvas;
var gCtx;

function onInit() {
    createImgs();
    renderGallery();
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    resetMeme();
    renderMeme();
    document.querySelector('.editor').classList.add('hide');
    createSavedMemes();
    renderSavedMemes();
}

function openGallery() {
    document.querySelector('.editor').classList.add('hide');
    document.querySelector('.saved-memes').classList.add('hide');
    document.querySelector('.gallery').classList.remove('hide');
    document.querySelector('h2').classList.remove('hide');
    document.querySelector('h3').classList.remove('hide');
}

function renderLines() {
    drawLines();
}

function renderMeme() {
    drawMeme(getMeme().selectedImgId);
}

function onSetLineText(text) {
    setLineText(text);
    renderMeme();
}

function drawLines() {
    const meme = getMeme();
    meme.lines.forEach((line, idx) => {
        if (idx === meme.selectedLineIdx) gCtx.strokeStyle = 'orange';
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
        renderLines();
    }
}

function setInputText() {
    let elMarkedLine = document.querySelector(".line");
    elMarkedLine.value = getMeme().lines[getMeme().selectedLineIdx].txt;
    elMarkedLine.focus()
    elMarkedLine.select()
}

function stopInput(event) {
    var input = document.querySelector("input");
    if (event.keyCode === 13) input.blur()
}

function onSetMeme(imgId) {
    setMeme(imgId);
    renderMeme()
    setInputText();
    document.querySelector('.gallery').classList.add('hide');
    document.querySelector('h2').classList.add('hide');
    document.querySelector('h3').classList.add('hide');
    document.querySelector('.saved-memes').classList.add('hide');
    document.querySelector('.editor').classList.remove('hide');
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
    //todo : maybe render
    const meme = getMeme();
    drawMeme(meme.selectedImgId)
}

function onRemoveLine() {
    removeLine();
    renderMeme();
}

function onAddLine() {
    addLine();
    setInputText()
    renderMeme();
}

function resizeCanvas() {
    var elContainer = document.querySelector('canvas');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function onSaveMeme() {
    var memeUrl = gElCanvas.toDataURL("");
    // var memeId = makeId(3);
    saveMeme(memeUrl);
}
function renderSavedMemes() {
    const savedMemes = getSavedMemes();
    console.log(getSavedMemes());
    
    let strHTML = savedMemes.map(savedMeme => `<img src="${savedMeme.url}" onclick="onEditMeme(${savedMeme.id})"/>`).join('');
    document.querySelector('.saved-memes').innerHTML = strHTML;
}

function openSavedMemes() {
 
    renderSavedMemes()
    document.querySelector('.editor').classList.add('hide');
    document.querySelector('.gallery').classList.add('hide');
    document.querySelector('h2').classList.add('hide');
    document.querySelector('h3').classList.add('hide');
    document.querySelector('.saved-memes').classList.remove('hide');
}

function onEditMeme(savedMemeId) {
    editMeme(savedMemeId);
    document.querySelector('.gallery').classList.add('hide');
    document.querySelector('h2').classList.add('hide');
    document.querySelector('h3').classList.add('hide');
    document.querySelector('.saved-memes').classList.add('hide');
    document.querySelector('.editor').classList.remove('hide');
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes();
    let strHTML = savedMemes.map(savedMeme => `<img src="${savedMeme.url}" onclick="onEditMeme(${savedMeme.id})"/>`).join('');
    document.querySelector('.saved-memes').innerHTML = strHTML;
}



