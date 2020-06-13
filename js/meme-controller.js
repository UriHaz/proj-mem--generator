'use strict';

// var gElCanvas;
var gCtx;

function onInit() {
    _createImgs();
    renderGallery();
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    resetMeme();
    renderMeme();
    document.querySelector('.editor').classList.add('hide');

}

function openGallery() {
    document.querySelector('.editor').classList.add('hide');
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

}

function stopInputIfEnter() {

    // var input = document.querySelector("input");
    // input.addEventListener("keyup", function (event) {
    //     var keyCode = event.keyCode;
    //     if (keyCode === 13) keyCode=9
    //     input.onkeydown = keyCode
        
    // });
}



function onSetMeme(imgId) {
    setMeme(imgId);
    renderMeme()
    setInputText();
    document.querySelector('.editor').classList.remove('hide');
    document.querySelector('.gallery').classList.add('hide');
    document.querySelector('h2').classList.add('hide');
    document.querySelector('h3').classList.add('hide');
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

function onRemoveLine() {
    removeLine();
    renderMeme();
}

function onAddLine() {
    addLine();
    setInputText()
    renderMeme();
}

function DownloadMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'New_Meme';
}

function resizeCanvas() {
    var elContainer = document.querySelector('canvas');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}


