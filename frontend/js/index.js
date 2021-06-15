import {isEscEvent} from './util.js';
import {initialCells, setCellCheckedColor, setCellPlayedColor} from './cell.js';
import {addButtonCellHandler, generateMatrix, createAllCellsArray, renderPlayedCells} from './matrix.js';
import {addArrowsHandlers} from './slider.js';
import {addBpmInputHandler} from './bpm.js';
import {addButtonPlayHandler, addButtonStopHandler} from './player.js';


//import {debounce} from 'lodash';

const DEBOUNCE_TIME = 1000;


let sounds = ['./samples/bdsh.wav', 
                './samples/boom.wav', 
                './samples/tsk.wav',
              ];

const STEPS = 32;
const activeStep = 32; 

const newCells = initialCells(STEPS);
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

const newLanes = createLanes(sounds, newCells); //дорожки
generateMatrix(newLanes); // отрисовка дорожек

const cellsButtons = createAllCellsArray();
console.log(cellsButtons)

addButtonCellHandler(cellsButtons, newLanes, setCellCheckedColor)


addArrowsHandlers();

// let bpm = addBpmInputHandler()
// console.log(bpm)

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
  //let gain = context.createGain();
  source.buffer = audioData;
 
  //gain.gain.value = 0.5;
  //source.connect(gain);
  source.connect(context.destination);
  //if (isPlaying = true) {
    source.start(playTime);
  //}
  // else {
  //   source.stop(stopTime)
  // }

}


let buffer = new Buffer(context, sounds);
const newSounds = buffer.createBuffer();
console.log(buffer.urls)

//////////////////////////////////////////////////


let button = document.getElementsByClassName('button');
var allSounds = [];
  allSounds.push.apply(allSounds, button);



const onButtonPlaySound = () => {

  allSounds.forEach((btn) => btn.addEventListener('click', (evt) => {
      btn = evt.target;
      const i = allSounds.indexOf(btn, 0);
      //isPlaying = isPlaying ? false : true;

    playSound(buffer.getSound(i), 0) 

}))
}

onButtonPlaySound();



//Sequencer

const bpm = 100;
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
    nextStep(newLanes);
  }
    const ti = setTimeout(scheduleSound, 0);
}



function nextStep(newLanes) {
  currentStep++;

  newLanes.forEach((lane) => {

    const {cells} = lane;
    cells.forEach((cell) => {
      const i = cells.indexOf(cell, 0);
      const currentCell = lane.cells[currentStep - 1];
   
    if (i == currentStep - 1) {
      cells[i].played = currentCell.played ? false : true; 
    };
  });
});
  
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
   callback(cellsButtons, newLanes)
} 


  // lanes.forEach((lane) => {
  //   if(lane.cells[currentStep].checked != false) {
  //     const i = lanes.indexOf(lane, 0);
  //     playSound(buffer.getSound(i), playTime);
  //   }
  //   });



function play() {
  isPlaying = true;
  currentStep = 1;
  startTime = context.currentTime + 0.005;
  scheduleSound(renderPlayedCells);

}
// function stop() {
//   isPlaying = false;
//   scheduleSound()  
//   console.log('stop')
//   console.log(isPlaying)
// }



// addButtonPlayHandler(play, stop);
// addButtonStopHandler(stop, play)



  
// let spb = (60/120);
// let frames = 0;

// let currentCell = 0;
// let lastStep = -1;

// const loop = () => {
  
//   if(!isPlaying) {
//     frames++;

//     let seconds = 60/frames;
//     let beatTime = spb/seconds%16;


//     lastStep = currentCell;
//     currentCell = Math.floor(beatTime*4);

//     if(lastStep != currentCell) {
     
      
//      for (let i = 0; i < 16; i++) {
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



