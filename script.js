const container = document.querySelector('.container');
const sizeButton = document.querySelector('.size');
const resetButton = document.querySelector('.reset');

const red = document.querySelector('.red');
const orange = document.querySelector('.orange');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');
const blue = document.querySelector('.blue');
const purple = document.querySelector('.purple');
const pink = document.querySelector('.pink');
const black = document.querySelector('.black');
const white = document.querySelector('.white');
const colours = document.querySelectorAll('.colour');
colours.forEach(colour => colour.style.backgroundColor = colour.className.substring(7));

const containerHeight = 480;
const containerWidth = 480;
container.style.cssText = `height: ${containerHeight}px; width: ${containerWidth}px;`; 

let pixelHeight;
let pixelWidth;
let chosenColour = 'black';





function createCanvas(dimension) {
    pixelHeight = containerHeight/dimension;
    pixelWidth = containerWidth/dimension;

    for (i=0; i<(dimension**2); i++) {
        let div = document.createElement('div')
        div.classList.add(`${i}`);
        div.style.cssText = `height: ${pixelHeight}px; width: ${pixelWidth}px;`;
        div.addEventListener('mouseover', paint);
        container.appendChild(div);
    }
}

function resetCanvas() {
    pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
} 

function paint () {
    this.style.backgroundColor = `${chosenColour}`;
}

function changeSize() {
    let size = prompt('Select a dimension of pixels.');
    while (size > 100 || size < 1) {
        if (size === null) {
            size = 16;
            break;
        }
        size = prompt('Invalid pixel dimension. Select another value.');
    }
    pixels.forEach(pixel => pixel.remove());
    createCanvas(size);
    pixels = document.querySelectorAll('div');
}

function changeColour () {
    chosenColour = this.className.substring(7);
}





createCanvas(16);
let pixels = document.querySelectorAll('div');
sizeButton.addEventListener('click', changeSize);
resetButton.addEventListener('click', resetCanvas);
colours.forEach(colour => colour.addEventListener('click', changeColour))