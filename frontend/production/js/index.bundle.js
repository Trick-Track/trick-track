/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./source/js/add.js":
/*!**************************!*\
  !*** ./source/js/add.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addInpytAddHandler": function() { return /* binding */ addInpytAddHandler; }
/* harmony export */ });
/* harmony import */ var _matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix.js */ "./source/js/matrix.js");


const inputAdd = document.getElementById('.#sample');

const FILE_TYPES = ['mp3', 'wav'];

const uploadFile = (evt, cb) => {

    const sound = evt.files;
    const fileName = sound.url.toLowerCase();
  
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
  
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', cb)
      reader.readAsDataURL(sound);
    }
  };
  
const uploadSound = () => {
  uploadFile(inputAdd, _matrix_js__WEBPACK_IMPORTED_MODULE_0__.generateMatrixLane)
}

const addInpytAddHandler = () => {
  inputAdd.addEventListener('click', uploadSound)
};



/***/ }),

/***/ "./source/js/bpm.js":
/*!**************************!*\
  !*** ./source/js/bpm.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBpmInputHandler": function() { return /* binding */ addBpmInputHandler; },
/* harmony export */   "setTempo": function() { return /* binding */ setTempo; }
/* harmony export */ });
const bpmControl = document.querySelector('#bpm');


const addBpmInputHandler = (callback) => {
  let tempo
    bpmControl.addEventListener('change', function() {
    tempo = this.value;
    callback(tempo)
  });
  
};

const setTempo = (tempo) => {
    //const tempo = bpmControl.value;
    const tic = (60 / tempo) / 4;
    return tic;  
  }






/***/ }),

/***/ "./source/js/cell.js":
/*!***************************!*\
  !*** ./source/js/cell.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialCells": function() { return /* binding */ initialCells; },
/* harmony export */   "createLanes": function() { return /* binding */ createLanes; },
/* harmony export */   "setCellCheckedColor": function() { return /* binding */ setCellCheckedColor; },
/* harmony export */   "setCellPlayedColor": function() { return /* binding */ setCellPlayedColor; }
/* harmony export */ });

const initialCells = (steps) => {
    let cells = [];
   
    for (let i = 0; i < steps; i++) {

      const cell = {
        played: false,
        checked: false,
        disabled: false
      };

      cells.push(cell);
    }
    
    return cells;
}

const createLanes = (sounds, cells) => {
  const lines = []
 
  sounds.map((sound) => {
    const steps = [];

    for (let i = 0; i < cells.length; i++) {
      const clonedCell = Object.assign({}, cells[i]);
      steps.push(clonedCell)
    }
    const obj = {line: sound, cells: steps}
    lines.push(obj)
  })
  return lines
}

const setCellCheckedColor = (cell) => {
  const {checked} = cell;
  switch(checked) {
    case true:
      return '#000000';
    break;
    case false:
      return '#ffffff';
    break;
    default:
      return '#ffffff';
  }
}

const setCellPlayedColor = (cell) => {
  const {played} = cell;
  switch(played) {
    case true:
      return "#ff00ff";
    break;
    case (!true): 
      return ""
    case false:
      return "#ffffff";
    break;
    default:
      return "#ffffff";
  }
}





/***/ }),

/***/ "./source/js/controls.js":
/*!*******************************!*\
  !*** ./source/js/controls.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "am": function() { return /* binding */ am; }
/* harmony export */ });
const volumeControls = document.querySelectorAll('[data-action="volume"]');
const pannerControls = document.querySelectorAll('[data-action="panner"]');

const am = (buffer, audioData) => {
    volumeControls.forEach((volumeControl) => {
        console.log(volumeControl)
        volumeControl.addEventListener('input', () => {
            const j = volumeControls.indexOf(volumeControl, 0)
            const i = [...buffer.urls].indexOf(audioData, 0)
            if (j === i) {
                return volumeControl.value;
            } 
        })
    });
}




// volumeControl.addEventListener('input', function() {
//     
// 	gainNode.gain.value = this.value;
// }, false);

// // panning
// const pannerOptions = {pan: 0};
// const panner = new StereoPannerNode(context, pannerOptions);


// pannerControl.addEventListener('input', function() {
// 	panner.pan.value = this.value;	
// }, false);
  

/***/ }),

/***/ "./source/js/matrix.js":
/*!*****************************!*\
  !*** ./source/js/matrix.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateMatrix": function() { return /* binding */ generateMatrix; },
/* harmony export */   "createAllCellsArray": function() { return /* binding */ createAllCellsArray; },
/* harmony export */   "generateMatrixLane": function() { return /* binding */ generateMatrixLane; },
/* harmony export */   "addButtonCellHandler": function() { return /* binding */ addButtonCellHandler; },
/* harmony export */   "renderPlayedCells": function() { return /* binding */ renderPlayedCells; }
/* harmony export */ });
/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell.js */ "./source/js/cell.js");


const sequencer = document.querySelector('.sequencer__wrapper');
const sampleList = sequencer.querySelector('.sequencer__samples-list');
const sampleTemplate = document.querySelector('#matrix').content.querySelector('.sequencer__samples-item');

// const createLine = (sound) => {
//   const newSample = sampleTemplate.cloneNode(true);
//   newSample.querySelector('.button').textContent = sound;
//   sampleList.append(newSample);
// }

const renderStep = () => {
  const cellElement = document.createElement('button');
  cellElement.classList.add('sequencer__cell');
  cellElement.type = 'button';
  cellElement.tabIndex = 0;

  return cellElement;
}

const fillStep = (stepsList, steps) => {
   
   const fragment = document.createDocumentFragment();
   const fragmentOne = document.createDocumentFragment();

   steps.slice(0, 16).forEach((step) => {
    
    const newStep = renderStep();
  
    fragment.append(newStep);
    });

    steps.slice(16, 32).forEach((step) => {
      const newStep = renderStep();
      fragmentOne.append(newStep);
      });
  
    stepsList[0].append(fragment);
    stepsList[1].append(fragmentOne);
};
  
  
const generateMatrixLane = (lane) => {
  const{line, cells} = lane
  const newSample = sampleTemplate.cloneNode(true);
  newSample.querySelector('.button').textContent = line.replace(/^.*[\\\/]/, '').slice(0, -4);
  sampleList.append(newSample);

  const stepsList = newSample.querySelectorAll('.sequencer__step-list');
  fillStep(stepsList, cells); 
};


const generateMatrix = (lanes) => {
    lanes.forEach((lane) => {
    generateMatrixLane(lane);
  })
};

const createCellsArray = (i) => {
  const slidesFirst = document.querySelectorAll('.slide-1');
  const slidesSecond = document.querySelectorAll('.slide-2');
  
  const cellsOfLane = [];
    cellsOfLane.push.apply(cellsOfLane, slidesFirst[i].children);
    cellsOfLane.push.apply(cellsOfLane, slidesSecond[i].children);
    return cellsOfLane;
}

const createAllCellsArray = () => {
  const allCellsLists = []
  for (let i = 0; i < 3; i++) {
    const cellsOfLane = createCellsArray(i);
    allCellsLists.push(cellsOfLane);
  }
  return allCellsLists
}

const addButtonCellHandler = (cellsElements, lanes, cb) => {
  //const cellsButtonsArray = createAllCellsArray();
  cellsElements.forEach((cellsOfLane) => {

    cellsOfLane.forEach((cell) => cell.addEventListener('click', (evt) => {
      const i = cellsElements.indexOf(cellsOfLane, 0);
      const {cells} = lanes[i];
      const cell = evt.target;
      const j = cellsOfLane.indexOf(cell, 0);
      cells[j].checked = cells[j].checked ? false : true; 
      cell.style.background = cb(cells[j]);
    }))
  })
};

const renderPlayedCells = (cellsElements, lanes) => {

  lanes.forEach((lane) => {
    const {cells} = lane;
    cells.forEach((cell) => {
      const i = lanes.indexOf(lane);
      const cellsOfLane = cellsElements[i];
      const j = cells.indexOf(cell, 0);

      if (cell.played != false) {
        cellsOfLane[j].style.borderColor = (0,_cell_js__WEBPACK_IMPORTED_MODULE_0__.setCellPlayedColor)(cell);
      }
      
    })
  })
}


//создание новой дорожки

  

// const deleteLane = (lanes) => {
  
//   const before = lanes.slice(0, i);
//   const after = lanes.slice(i, i + 1);
//     const newArray = [...before, ...after];

//     return {
//       lanes: newArray,
//     }
//   })
// };




  
  

/***/ }),

/***/ "./source/js/player.js":
/*!*****************************!*\
  !*** ./source/js/player.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addButtonPlayHandler": function() { return /* binding */ addButtonPlayHandler; },
/* harmony export */   "addButtonStopHandler": function() { return /* binding */ addButtonStopHandler; }
/* harmony export */ });
const player = document.querySelectorAll('.player')
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');

const playProject = (cb) => {
    //isPlaying = true;
    cb();
}

const stopPlayProject = (cb) => {
    //isPlaying = false;
    cb();
}

const addButtonPlayHandler = (callback, cb) => {
    playButton.addEventListener('click', (callback));
    stopButton.removeEventListener('click', (cb))
}

const addButtonStopHandler = (cb, callback) => {
    stopButton.addEventListener('click', (cb));
    playButton.removeEventListener('click', callback)

}



/***/ }),

/***/ "./source/js/slider.js":
/*!*****************************!*\
  !*** ./source/js/slider.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addArrowsHandlers": function() { return /* binding */ addArrowsHandlers; },
/* harmony export */   "currentSlide": function() { return /* binding */ currentSlide; }
/* harmony export */ });
const nextArrow = document.querySelector('.slider__arrow--next');
const previousArrow = document.querySelector('.slider__arrow--prev');
let slideNumber = 1;

 
//  class slider {
      
//   constructor(selector) {  
//     this.loop = false;
//     this.autoplay = false;
//     this.slide = selector;
//     this.interval = 5000;

const showSlide = (n) => {
  const slidesLists = document.querySelectorAll('.slider-tracker');

  slidesLists.forEach((slidesList) => {
      const slides = slidesList.children

      let i;
      if (n > slides.length) {
        slideNumber = 1;
      }
      if (n < 1) {
        slideNumber = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("current-slide");
      }

      slides[slideNumber-1].classList.add("current-slide");
    });
    }

const onNextArrowClick = () => {
  showSlide(slideNumber += 1);
}

const onPreviousArrowClick = () => {
  showSlide(slideNumber -= 1);
}
function currentSlide (n) {
  showSlide(slideNumber = n);
}


const addArrowsHandlers = () => {
  nextArrow.addEventListener('click', onNextArrowClick);
  previousArrow.addEventListener('click', onPreviousArrowClick);
}





/***/ }),

/***/ "./source/js/util.js":
/*!***************************!*\
  !*** ./source/js/util.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEscEvent": function() { return /* binding */ isEscEvent; },
/* harmony export */   "isMouseLeftEvent": function() { return /* binding */ isMouseLeftEvent; }
/* harmony export */ });
const PRIMARY_MOUSE_BUTTON = 0;

const isEscEvent = (evt) => {
    return evt.key === ('Escape' || 0);
  };
  
  const isMouseLeftEvent = (evt) => {
    return evt.button === PRIMARY_MOUSE_BUTTON;
  }
  
  

/***/ }),

/***/ "./source/sass/style.scss":
/*!********************************!*\
  !*** ./source/sass/style.scss ***!
  \********************************/
/***/ (function() {

throw new Error("Module parse failed: Unexpected character '@' (2:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n> @import \"global/variables\";\n| @import \"blocks/button\";\n| @import \"blocks/page\";");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!****************************!*\
  !*** ./source/js/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./source/js/util.js");
/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cell.js */ "./source/js/cell.js");
/* harmony import */ var _matrix_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./matrix.js */ "./source/js/matrix.js");
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slider.js */ "./source/js/slider.js");
/* harmony import */ var _bpm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bpm.js */ "./source/js/bpm.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./player.js */ "./source/js/player.js");
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add.js */ "./source/js/add.js");
/* harmony import */ var _controls_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controls.js */ "./source/js/controls.js");
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sass/style.scss */ "./source/sass/style.scss");
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_sass_style_scss__WEBPACK_IMPORTED_MODULE_8__);










//import {debounce} from 'lodash';

const DEBOUNCE_TIME = 1000;


let sounds = ['./samples/bdsh.wav', 
                './samples/boom.wav', 
                './samples/tsk.wav',
              ];

const STEPS = 32;
const activeStep = 30; 

const newCells = (0,_cell_js__WEBPACK_IMPORTED_MODULE_1__.initialCells)(STEPS);
const newLanes = (0,_cell_js__WEBPACK_IMPORTED_MODULE_1__.createLanes)(sounds, newCells); //дорожки
(0,_matrix_js__WEBPACK_IMPORTED_MODULE_2__.generateMatrix)(newLanes); // отрисовка дорожек

const cellsButtons = (0,_matrix_js__WEBPACK_IMPORTED_MODULE_2__.createAllCellsArray)();

(0,_matrix_js__WEBPACK_IMPORTED_MODULE_2__.addButtonCellHandler)(cellsButtons, newLanes, _cell_js__WEBPACK_IMPORTED_MODULE_1__.setCellCheckedColor)

;(0,_slider_js__WEBPACK_IMPORTED_MODULE_3__.addArrowsHandlers)(); //стрелки слайдера







// addFilterHandlers(
//   debounce(renderOffersPin, DEBOUNCE_TIME));
// })



////Bufer////////////////////////////////////////////////////////

let context = new (window.AudioContext || window.webkitAudioContext)();

class Buffer {
  
  constructor(context, urls) {  
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }
  
  loadSound(url, index) {
    let request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    let thisBuffer = this;
    request.onload = function() {
    
      thisBuffer.context.decodeAudioData(request.response, function(data) {
          thisBuffer.buffer[index] = data;
      });
          
     };
    request.send();
  };
  
  createBuffer() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
  
    })
  }

 getSound(index) {
    return this.buffer[index];
  }

}




const playSound = (audioData, playTime) => {

  const source = context.createBufferSource(); 
  source.buffer = audioData;
  const gain = context.createGain();

  source.connect(gain).connect(context.destination);
 
    source.start(playTime);
}


const buffer = new Buffer(context, sounds);

buffer.createBuffer();

//////////////////////////////////////////////////


let button = document.getElementsByClassName('button');
var allSounds = [];
  allSounds.push.apply(allSounds, button);



const onButtonPlaySound = () => {

  allSounds.forEach((btn) => btn.addEventListener('click', (evt) => {
      btn = evt.target;
      const i = allSounds.indexOf(btn, 0);

    playSound(buffer.getSound(i), 0) 

}))
}

onButtonPlaySound();



//Sequencer

let startTime = 0;
let nextStepTime = 0.0;
let currentStep = 0;
let secondsPerBeat = 60 / bpm ;    
let isPlaying = false;


function scheduleSound() {
  let now = context.currentTime;
  now -= startTime
 

  while (nextStepTime < now + 0.2 ) {
    
    let pt = nextStepTime + startTime;
    playStepAtTime(newLanes, pt, _matrix_js__WEBPACK_IMPORTED_MODULE_2__.renderPlayedCells);
    
    nextStep(newLanes, _slider_js__WEBPACK_IMPORTED_MODULE_3__.currentSlide);
  }
    const ti = setTimeout(scheduleSound, 0);
}



function nextStep(lanes, callback) {
  currentStep++;

  lanes.forEach((lane) => {

    const {cells} = lane;
    cells.forEach((cell) => {
      const currentCell = lane.cells[currentStep - 1];
   
    if (cell = currentCell) {
      cell.played = true; 
    }
    else {
      cell.played = false
    };

   });
  });

  currentStep > 16 ? callback(2)  : callback(1);
  
  
  if (currentStep === activeStep) {
    currentStep = 0;
  }
  
  nextStepTime += secondsPerBeat / 4;
}



function playStepAtTime(lanes, playTime, callback) {
 
    for(let i = 0; i < lanes.length; i++) {
        const lane = lanes[i];
        if (lane.cells[currentStep].checked != false) {
          playSound(buffer.getSound(i), playTime);
        }
    }
    callback(cellsButtons, newLanes);
} 



function play() {
  isPlaying = true;
  currentStep = currentStep;
  nextStepTime = 0;
  startTime = context.currentTime + 0.005;
  scheduleSound();

}




// function stop() {
//   isPlaying = false;
//   scheduleSound()  
//   console.log('stop')
//   console.log(isPlaying)
// }



// addButtonPlayHandler(play, stop);
// addButtonStopHandler(stop, play)



  

// const loop = () => {
//   let spb = (60/120);
//   let frames = 0;

//    let currentC = 0;
//    let lastStep = -1;

//   if(!isPlaying) {
//     frames++;

//     let seconds = 60/frames;
//     let beatTime = spb/seconds%activeStep;


//     lastStep = currentC;
//     currentC = Math.floor(beatTime*4);


//     if(lastStep != currentC) {
     
      
//      //for (let i = 0; i < activeStep; i++) {
//       if(lastStep === i) {
//         now = 0;
//         playSound(buffer.getSound(1))
//         playSound(buffer.getSound(2))
//       }
//     } 
//   }

// }
//   requestAnimationFrame(loop)

// }



document.addEventListener('keydown', (evt) => {
  
    if ((0,_util_js__WEBPACK_IMPORTED_MODULE_0__.isEscEvent)(evt)) {
      evt.preventDefault();
      isPlaying = !isPlaying
      play()
    }
});




}();
/******/ })()
;
//# sourceMappingURL=index.bundle.js.map