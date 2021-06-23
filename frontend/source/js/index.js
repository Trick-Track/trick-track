import {isEscEvent} from './util.js';
import {initialCells, setCellCheckedColor, createLanes, setCellPlayedColor} from './cell.js';
import {addButtonCellHandler, generateMatrix, createAllCellsArray, renderPlayedCells} from './matrix.js';
import {addArrowsHandlers, currentSlide} from './slider.js';
import {addBpmInputHandler, setTempo} from './bpm.js';
import {addButtonPlayHandler, addButtonStopHandler} from './player.js';
import {addInpytAddHandler} from './add.js';
//import {am} from './controls.js';
import '../sass/style.sass';

console.log('hey');



let sounds = ['./samples/bdsh.wav',
                './samples/boom.wav',
                './samples/tsk.wav',
              ];

const STEPS = 32;
const activeStep = 30;

const newCells = initialCells(STEPS);
const newLanes = createLanes(sounds, newCells); //дорожки
generateMatrix(newLanes); // отрисовка дорожек

const cellsButtons = createAllCellsArray();

addButtonCellHandler(cellsButtons, newLanes, setCellCheckedColor)

addArrowsHandlers(); //стрелки слайдера







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
 // const gain = context.createGain();

  source.connect(context.destination);

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
let bpm = 100;
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
    playStepAtTime(newLanes, pt, renderPlayedCells);

    nextStep(newLanes, currentSlide);
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
  //nextStepTime = 0;
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

    if (isEscEvent(evt)) {
      evt.preventDefault();
      isPlaying = !isPlaying
      play()
    }
});
