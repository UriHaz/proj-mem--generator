'use strict';

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [];

var gSavedMemes = [];
var gSavedMeme = {
    id: '',
    url: ''
};

var gElCanvas = document.querySelector('canvas');

var gMeme = {
    selectedImgId: 1
}
function resetMeme() {
    gMeme.selectedLineIdx = 0;
    gMeme.lines = [
        {
            txt: 'insert text',
            font: 'impact',
            size: 30,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            y: 30,
            x: gElCanvas.width / 2
        },
        {
            txt: 'insert text',
            font: 'impact',
            size: 30,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            y: gElCanvas.height - 10,
            x: gElCanvas.width / 2
        }
    ]
}

function createImgs() {
    gImgs.push(_createImg(1, `imgs/1.jpg`, []));
    gImgs.push(_createImg(2, `imgs/2.jpg`, []));
    gImgs.push(_createImg(3, `imgs/3.jpg`, []));
    gImgs.push(_createImg(4, `imgs/4.jpg`, []));
    gImgs.push(_createImg(5, `imgs/5.jpg`, []));
    gImgs.push(_createImg(6, `imgs/6.jpg`, []));
    gImgs.push(_createImg(7, `imgs/7.jpg`, []));
    gImgs.push(_createImg(8, `imgs/8.jpg`, []));
    gImgs.push(_createImg(9, `imgs/9.jpg`, []));
    gImgs.push(_createImg(10, `imgs/10.jpg`, []));
    gImgs.push(_createImg(11, `imgs/11.jpg`, []));
    gImgs.push(_createImg(12, `imgs/12.jpg`, []));
    gImgs.push(_createImg(13, `imgs/13.jpg`, []));
    gImgs.push(_createImg(14, `imgs/14.jpg`, []));
    gImgs.push(_createImg(15, `imgs/15.jpg`, []));
    gImgs.push(_createImg(16, `imgs/16.jpg`, []));
    gImgs.push(_createImg(17, `imgs/17.jpg`, []));
    gImgs.push(_createImg(18, `imgs/18.jpg`, []));
}

function _createImg(id, url, keywords) {
    return { id, url, keywords }
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function setMeme(imgId) {
    resetMeme();
    gMeme.selectedImgId = imgId;
}

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function changeFontSize(diff) {
    var txt = gMeme.lines[gMeme.selectedLineIdx]
    if (txt.size + diff === 0 || txt.size + diff > 70) txt.size
    else txt.size += diff;
}

function changeLineHeight(diff) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.y += (currLine.y + diff < 25 || currLine.y + diff > (gElCanvas.height)) ? 0 : diff;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
}

function addLine() {
    gMeme.lines.push({
        txt: 'insert text',
        font: 'impact',
        size: 30,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        y: gElCanvas.height / 2,
        x: gElCanvas.width / 2
    });
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function editMeme(savedMemeId) {
    savedMemeId = gSavedMemes.id
}

function getSavedMemes() {
    return gSavedMemes;
}


function createSavedMemes() {
    gSavedMemes.push(_createSavedMeme(makeId(3), loadFromStorage('saved-memes')));
    console.log(gSavedMemes);
    
}

function _createSavedMeme(id, url) {
    return { id, url }
}

function saveMeme(memeUrl) {
    saveToStorage('saved-memes', memeUrl)    
}


