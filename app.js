// CSS Color Names
// Compiled by @bobspace.
//
// A javascript array containing all of the color names listed in the CSS Spec.
// The full list can be found here: https://www.w3schools.com/cssref/css_colors.asp
// Use it as you please, 'cuz you can't, like, own a color, man.
const CSS_COLOR_NAMES = [
    "Red",
    "Blue",
    "Green",
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];


const form = document.querySelector('form');
const maxNumberInputLine = document.getElementById('maxNumber');

const numbersContainer = document.querySelector('.grid');


let maxNumber = 0;
let numbersList = [];    // 2...maxNumber
let primeList = []; 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    
    maxNumber = Number(maxNumberInputLine.value);
    makeAndAddList();
    findPrime();
    markupPrimes();
});


function makeAndAddList() {
    numbersList = Array(maxNumber - 1);
    
    // create numbersList and html
    let htmlInjection = ``;
    for (let number = 2; number <= maxNumber; number++) {
        numbersList[number - 2] = number;
        htmlInjection += `<div class="number"><p>${number}</p></div>`;
    }
    
    // Injection
    numbersContainer.innerHTML = htmlInjection;   
}


function findPrime() {
    primeList = Array(numbersList.length).fill(0)
    
    let primeCounter = 1;
    for (let index = 0; index < numbersList.length; index++) {
        
        // If prime number. Need to cancel multiples
        if (primeList[index] === 0) {
            const currentPrime = numbersList[index];
            
            // All multiples canceled. Only primes remained.
            if (currentPrime ** 2 > maxNumber) {
                break;
            }
                 
            // Starts with first multiple (2 * currentPrime). But iterations goes through indexes. 
            for (let multipleI = index + currentPrime; multipleI < numbersList.length; multipleI += currentPrime) {
                // only if first time cancel
                if (primeList[multipleI] === 0) {
                    primeList[multipleI] = primeCounter;
                }
            }
            primeCounter++;
        }
    }
    
}


function markupPrimes() {
    const grid = document.querySelector('.grid');
    
    
    let primeCounter = 0;
    for (let index = 0; index < numbersList.length; index++) {
        
        // If prime number. Need to markup it and it mulptiples.
        if (primeList[index] === 0) {
            const currentPrime = numbersList[index];
            
            // All multiples markuped. Only primes remained.
            if (currentPrime ** 2 > maxNumber) {
                break;
            }
            
            grid.children[index].innerHTML += `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'> <circle cx='50' cy='50' r='40' stroke='${CSS_COLOR_NAMES[primeCounter]}' stroke-width='4' fill='none'> </svg>`;
            
            
            // Starts with first multiple (2 * currentPrime). But iterations goes through indexes. 
            for (let multipleI = index + currentPrime; multipleI < numbersList.length; multipleI += currentPrime) {
                // only if first time markup. +1 because.
                if (primeList[multipleI] === primeCounter + 1) {
                    grid.children[multipleI].innerHTML += `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M100 0 L0 100 ' stroke='${CSS_COLOR_NAMES[primeCounter]}' stroke-width='4'/><path d='M0 0 L100 100 ' stroke='${CSS_COLOR_NAMES[primeCounter]}' stroke-width='4'/></svg>`;                    
                }
            }
            primeCounter++;
        }
    }
}

function betterMarkupPrimes() {
    const grid = document.querySelector('.grid');
    
    
    const markNumber = () => {
        
    }
    
}

function markNumber() {
    
}




function printPrimeNumbers() {
    primeList.forEach((element, index) => {
        if (element === 0) {
            console.log(numbersList[index]);
        }
    });
}



