import {Buffer} from './buffer.js';
import {initialCells, createLanes} from './cell.js';
import {addButtonCellHandler, generateMatrix, createAllCellsArray} from './matrix.js';
import {renderPlaybackLine, fillCurrentPlaybackStep} from './playback-cells.js'
import {addArrowsHandlers, currentSlide} from './slider.js';
import {addBpmHandlers, setBpm, setTempo} from './bpm.js';
import {addBeatsHandlers, setBeats, setBeatsInputDisabledState} from './beats.js';
import {addButtonPlayHandler, addButtonStopHandler} from './player.js';
import {addControlsHandlers} from './controls.js';
import {addSaveButtonHandler,Project, getProjectName, addProjectsHandlers, addOpenModalButtonHandler} from './project.js';
import {showSuccess} from './messages.js';
import {resetPage} from './page.js';
import '../sass/style.sass';


let sounds = ['/static/samples/bdsh.wav',
                '/static/samples/boom.wav',
                '/static/samples/tsk.wav',
              ];

const STEPS = 32;

let context = new (window.AudioContext || window.webkitAudioContext)();

const buffer = new Buffer(context, sounds)
buffer.createBuffer();

let bpm = setBpm();
let projectName = getProjectName();

let newCells = initialCells(STEPS); //ячейки
let newLanes = createLanes(buffer.urls, newCells); //дорожки

const project = new Project(bpm, newLanes, projectName);



generateMatrix(project); // отрисовка дорожек

renderPlaybackLine();// 


const cellsButtons = createAllCellsArray(sounds);

addButtonCellHandler(cellsButtons, newLanes)

addArrowsHandlers(); //стрелки слайдера
addBeatsHandlers(); //шаги
addBpmHandlers(); //bpm

addControlsHandlers(newLanes) //звук и панорама для дорожек





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

addOpenModalButtonHandler(project, newLanes)




//project.initialDefaultProject(newCells)
//console.log(project1)

    //let project = createProject(newLanes, bpm);

const onSuccess = () => {
  showSuccess();
}

addSaveButtonHandler(project, onSuccess)
addProjectsHandlers(project, newLanes)






