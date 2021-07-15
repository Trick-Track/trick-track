import {initialCells, createLanes} from './cell.js';
import {addButtonCellHandler, generateMatrix, createAllCellsArray} from './matrix.js';
import {renderPlaybackLine, fillCurrentPlaybackStep} from './playback-cells.js'
import {addArrowsHandlers, currentSlide} from './slider.js';
import {addBpmHandlers, setBpm, setTempo} from './bpm.js';
import {addBeatsHandlers, setBeats, setBeatsInputDisabledState} from './beats.js';
import {addButtonPlayHandler, addButtonStopHandler} from './player.js';
//import {addInpytAddHandler} from './add.js';
import {addControlsHandlers} from './controls.js';
import {addSaveButtonHandler, createProject, addProjectNameInputHandler, getNameOfProject} from './project.js';
import {showSuccess} from './messages.js';
import '../sass/style.sass';


let sounds = ['/static/samples/bdsh.wav',
                '/static/samples/boom.wav',
                '/static/samples/tsk.wav',
              ];

const STEPS = 32;

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

const buffer = new Buffer(context, sounds)
buffer.createBuffer();

/////////////////////////


const newCells = initialCells(STEPS);
const newLanes = createLanes(buffer.urls, newCells); //дорожки
generateMatrix(newLanes); // отрисовка дорожек

renderPlaybackLine();// 


const cellsButtons = createAllCellsArray();

addButtonCellHandler(cellsButtons, newLanes)

addArrowsHandlers(); //стрелки слайдера
addBeatsHandlers(); //шаги
addBpmHandlers(); //bpm
addProjectNameInputHandler(); //нэйм проекта
addControlsHandlers(newLanes) //звук и панорама для дорожек




////Bufer////////////////////////////////////////////////////////






const playSound = (audioData, playTime, volume, pans) => {
  const source = context.createBufferSource();
  source.buffer = audioData;

  const gainNode= context.createGain();
  gainNode.gain.value = volume;

  const pannerOptions = {pan: 0};
  const panner = new StereoPannerNode(context, pannerOptions);
  panner.pan.value = pans;

  //const defaults = {volume: 1, pans: 0};

  source.connect(gainNode).connect(panner).connect(context.destination);

    source.start(playTime);
    //source.stop(stopTime);
}






//////////////////////////////////////////////////




const onButtonPlaySound = () => {

let button = document.getElementsByClassName('button');
var allSounds = [];
  allSounds.push.apply(allSounds, button);


  allSounds.forEach((btn) => btn.addEventListener('click', (evt) => {
      btn = evt.target;
      const i = allSounds.indexOf(btn, 0);

    playSound(buffer.getSound(i), 0, 1, 0)

}))
}

onButtonPlaySound();



//Sequencer


let startTime = 0;
let nextStepTime = 0.0;
let currentStep = 0;


function scheduleSound() {
  let now = context.currentTime;
  now -= startTime;
 

  while (nextStepTime < now + 0.2 ) {

    let pt = nextStepTime + startTime;
    playStepAtTime(newLanes, pt, fillCurrentPlaybackStep);
    nextStep(currentSlide);
  }
    const ti = setTimeout(scheduleSound, 0)
    
}

function nextStep(callback) {
  currentStep++;

  // lanes.forEach((lane) => {

  //   const {cells} = lane;
  //   cells.forEach((cell) => {
  //     const currentCell = lane.cells[currentStep - 1];

  //     if (cell = currentCell) {
  //       cell.played == true;
  //     }
  //     else {
  //       cell.played == false;
  //     }; 

  //   });
  // });

  currentStep > 16 ? callback(2)  : callback(1);
  let activeStep = setBeats();
  
  if (currentStep == activeStep) {
    currentStep = 0;
  }

  let tempo = setTempo();
  nextStepTime += tempo;
}

function playStepAtTime(lanes, playTime, cb) {

    for(let i = 0; i < lanes.length; i++) {
        const lane = lanes[i];
        const volume = lane.volume;
        const panner = lane.panner;
      
        if (lane.cells[currentStep].checked == true) {
          playSound(buffer.getSound(i), playTime, volume, panner);
        }
    }
    cb(currentStep)
    
}
addButtonPlayHandler(context, scheduleSound)
addButtonStopHandler(context, scheduleSound)





let bpm = setBpm();
let projectName = getNameOfProject();

    let project = createProject(newLanes, bpm, projectName);

const onSuccess = () => {
  showSuccess();
}

addSaveButtonHandler(project, onSuccess)





