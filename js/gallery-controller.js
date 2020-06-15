'use strict';

function renderGallery() {
    const imgs = getImgs();
    let strHTML = imgs.map(img => `<img src="${img.url}" onclick="onSetMeme(${img.id})"/>`).join('');
    document.querySelector('.gallery').innerHTML = strHTML;
}

