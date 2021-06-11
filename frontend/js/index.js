import {isEscEvent} from './util.js';
import {initialCells} from './cell.js';
import {generateMatrix} from './matrix.js';
import {addArrowsHandlers} from './slider.js';
import {addBpmInputHandler} from './bpm.js'


let sounds = ['./samples/bdsh.wav', 
                './samples/boom.wav', 
                './samples/tsk.wav',
              ];

const STEPS = 32;
const activeStep = 32; 

//cell

const newCells = initialCells(STEPS);


const createLanes = (sounds, cells) => {
  return sounds.map((sound) => ({line:sound, time:cells}))
} 

const newLanes = createLanes(sounds, newCells); //дорожки

generateMatrix(newLanes); // отрисовка дорожек


const slideFirst = document.querySelectorAll('.slide-1');

// slideFirst.children.forEach((cell) => {
//   const {time} = newLanes;
//   const {played, checked} = time
//   time.forEach((cell) =>{
//     cell.style.background = setCellBackground(checked, played)});
// });


const createCellsArray = (i) => {
  const slidesFirst = document.querySelectorAll('.slide-1');
  const slidesSecond = document.querySelectorAll('.slide-2');

  for(let i = 0; i < slidesFirst.length; i++) {
    const allCellsList = [];
    allCellsList.push.apply(allCellsList, slidesFirst[i].children);
    allCellsList.push.apply(allCellsList, slidesSecond[i].children);
    return allCellsList
  }
}

const cellsArray = createCellsArray(0)
console.log(cellsArray)
// const onCellClick = (lanes, evt) => {
//     const {time} = lanes[0];
//     console.log(time)
//     const cell = evt.target;
    

//     console.log(i)
//   }


  cellsArray.forEach((cell) => {
    cell.addEventListener('click', (evt) => {
    const {time} = newLanes[0];
    cell = evt.target;
    const i = cellsArray.indexOf(cell, 0);
    time[i].checked = true;
    console.log(time[i])
  })
})

addArrowsHandlers();




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

const playSound = (audioData, time) => {
  const source = context.createBufferSource(); 
  //let gain = context.createGain();
  source.buffer = audioData;
 
  //gain.gain.value = 0.5;
  //source.connect(gain);
  source.connect(context.destination);
  source.start(time);
}


let buffer = new Buffer(context, sounds);
let newSounds = buffer.createBuffer();

//////////////////////////////////////////////////


let button = document.getElementsByClassName('button');
var allSounds = [];
  allSounds.push.apply(allSounds, button);



const onButtonPlaySound = () => {

  allSounds.forEach((btn) => btn.addEventListener('click', (evt) => {
      btn = evt.target;
      const i = allSounds.indexOf(btn, 0);
      isPlaying = isPlaying ? false : true;

    playSound(buffer.getSound(i), 0) 

}))
}

onButtonPlaySound();




//Sequencer

const bpm = 120;
let startTime = 0;
let nextStepTime = 0.0;
let currentStep = 0;
let secondsPerBeat = 60 / bpm ;    
let isPlaying = false;

//let lastStep = -1;


function scheduleSound() {
  let now = context.currentTime;
  now -= startTime
 

  while (nextStepTime < now + 0.2 ) {
    
    let pt = nextStepTime + startTime;
    playStepAtTime(newLanes, pt);
    nextStep(newLanes);
    
    console.log(nextStepTime)
  }
  const ti = setTimeout(scheduleSound, 0);
}



function nextStep(newLanes) {
  currentStep++;

  newLanes.forEach((lane) => {
    if (lane.time[currentStep]) {
      lane.time[currentStep].played = true;
    }
  });
  
  if (currentStep === activeStep) {
    currentStep = 0;
  }

  nextStepTime += secondsPerBeat / 4;


  
  console.log(currentStep);
}

function playStepAtTime(newLanes, playTime) {
  const{time} = newLanes
  for(let i in newLanes) {
     if(newLanes[i].time[currentStep].checked != false) {
      
      playSound(buffer.getSound(i), playTime);
    }
    console.log(newLanes[i].time[currentStep]);
  } 
}



function play() {
  nextStepTime = 0.0;
  startTime = context.currentTime + 0.005;
  scheduleSound();
}

function stop() {
  isPlaying = false;
  currentStep = 0;
}



  





let spb = (60/120);
let frames = 0;

let currentCell = 0;
let lastStep = -1;

const loop = () => {
  
  if(!isPlaying) {
    frames++;

    let seconds = 60/frames;
    let beatTime = spb/seconds%16;


    lastStep = currentCell;
    currentCell = Math.floor(beatTime*4);

    if(lastStep != currentCell) {
     
      
     for (let i = 0; i < 16; i++) {
      if(lastStep === i) {
        now = 0;
        playSound(buffer.getSound(1))
        playSound(buffer.getSound(2))
        console.log('he')
      }
    } 
  }

}
  requestAnimationFrame(loop)

}



document.addEventListener('keydown', (evt) => {
  
    if (isEscEvent(evt)) {
      evt.preventDefault();
      isPlaying = !isPlaying;
      play()
    }
});



