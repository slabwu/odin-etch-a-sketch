const container = document.querySelector('.container');
const sizeSlider = document.querySelector('.sizeSlider');
const resetButton = document.querySelector('.reset');
const randomButton = document.querySelector('.random');
const monochromeButton = document.querySelector('.monochrome');
const colourSelect = document.querySelector('.colour-select');
const colourPickerButton = document.querySelector('#colourpicker');
const containerSize = document.querySelector('.container-size');

const red = document.querySelector('.crimson');
const orange = document.querySelector('.coral');
const yellow = document.querySelector('.gold');
const green = document.querySelector('.limegreen');
const blue = document.querySelector('.royalblue');
const purple = document.querySelector('.darkviolet');
const pink = document.querySelector('.deeppink');
const black = document.querySelector('.black');
const white = document.querySelector('.white');
const colours = document.querySelectorAll('.colour');

colours.forEach(colour => colour.style.backgroundColor = colour.className.substring(7));
colourLookUp =  ['crimson: rgb(220, 20, 60)', 'coral: rgb(255, 127, 80)', 'gold: rgb(255, 215, 0)', 
                'limegreen: rgb(50, 205, 50)', 'royalblue: rgb(65, 105, 225)', 'darkviolet: rgb(148, 0, 211)', 
                'deeppink: rgb(255, 20, 147)', 'black: rgb(0, 0, 0)', 'white: rgb(255, 255, 255)'];
colourNames = ['crimson', 'coral', 'gold', 'limegreen', 'royalblue', 'darkviolet', 'deeppink', 'black', 'white']

colourPickerButton.style.cssText = 'height: 25px; width: 25px; border-radius: 25px; transition: transform 0.1s;';
colourPickerButton.addEventListener('onmouseover', () => {colourPickerButton.style.cssText = 'transform: scale(1.2, 1.2);'});

const containerHeight = 500;
const containerWidth = 500;
container.style.cssText = `height: ${containerHeight}px; width: ${containerWidth}px;`; 
containerSize.innerText = `16 x 16`;

let pixelHeight;
let pixelWidth;
let chosenColour = 'black';
let colourMode = false;





function createCanvas(dimension) {
    pixelHeight = containerHeight/dimension;
    pixelWidth = containerWidth/dimension;

    for (i=0; i<(dimension**2); i++) {
        let div = document.createElement('div')
        div.style.cssText = `height: ${pixelHeight}px; width: ${pixelWidth}px;`;
        div.addEventListener('mouseover', paint);
        container.appendChild(div);
    }
}

function resetCanvas() {
    pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
} 

function paint() {
    if (colourMode) {
        if (chosenColour === 'random') {
            switch (Math.floor(Math.random()*3)+1) {
                case 1:
                    r = 256;
                    g = Math.floor(Math.random()*256)+1;
                    b = Math.floor(Math.random()*256)+1;
                    break;
                case 2:
                    r = Math.floor(Math.random()*256)+1;
                    g = 256;
                    b = Math.floor(Math.random()*256)+1;
                    break;
                case 3:
                    r = Math.floor(Math.random()*256)+1;
                    g = Math.floor(Math.random()*256)+1;
                    b = 256;                    
                    break;
            }
            this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        } else if (chosenColour === 'monochrome') {
            let originalColour;
            if (this.style.backgroundColor === '') {
                originalColour = 'rgb(255, 255, 255)';
            } else if (colourNames.includes(this.style.backgroundColor)) {
                let colourPair;
                for (i=0; i<colourLookUp.length; i++) {
                    colourPair = colourLookUp[i].split(': ');
                    if (this.style.backgroundColor === colourPair[0]) {
                        originalColour = colourPair[1];
                        break;
                    }
                }
            }
            else {
                originalColour = this.style.backgroundColor;
            }
            rgb = originalColour.replace(/[^\d,]/g, '').split(',');
            this.style.backgroundColor = `rgb(${rgb[0]-25.5}, ${rgb[1]-25.5}, ${rgb[2]-25.5})`
        } else {
            this.style.backgroundColor = `${chosenColour}`;
        }
}
}

function changeSize(size) {
    pixels.forEach(pixel => pixel.remove());
    createCanvas(size);
    pixels = document.querySelectorAll('div');
}

function changeColour() {
    chosenColour = this.className.substring(7);
    colourSelect.style.background = `${chosenColour}`;
    colourSelect.style.boxShadow = `0 0 5px ${chosenColour}`;
}

function changeBrightness() {
    let originalColour = window.getComputedStyle(this).getPropertyValue('background-colour');
    console.log(originalColour);
}





createCanvas(16);
let pixels = document.querySelectorAll('div');
colours.forEach(colour => colour.addEventListener('click', changeColour))
resetButton.addEventListener('click', resetCanvas);

sizeSlider.onchange = function() {
    changeSize(this.value)
    containerSize.innerText = `${this.value} x ${this.value}`;
}
colourPickerButton.oninput = function() {
    chosenColour = colourPickerButton.value; 
    colourSelect.style.background = `${chosenColour}`;
    colourSelect.style.boxShadow = `0 0 5px ${chosenColour}`;
}

randomButton.addEventListener('click', () => {chosenColour = 'random'; 
    colourSelect.style.background = 'linear-gradient(to right, red, coral, gold, limegreen, royalblue, darkviolet, deeppink)';
    colourSelect.style.boxShadow = `0 0 5px rgb(91, 88, 177)`;});
monochromeButton.addEventListener('click', () => {chosenColour = 'monochrome'; 
    colourSelect.style.background = 'linear-gradient(to right, black, white)';
    colourSelect.style.boxShadow = `0 0 5px rgb(91, 88, 177)`;});

container.addEventListener('mousedown', () => {colourMode = true});
container.addEventListener('mouseup', () => {colourMode = false});