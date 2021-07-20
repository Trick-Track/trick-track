
import {addButtonCellHandler, generateMatrix, createAllCellsArray, renderPlaybackLine, fillCurrentPlaybackStep} from './renderer.js';
import {addArrowsHandlers, currentSlide} from './slider.js';
import {addBpmHandlers, setTempo} from './bpm.js';
import {addBeatsHandlers, setBeats, setBeatsInputDisabledState} from './beats.js';
import {addButtonPlayHandler, addButtonStopHandler} from './player.js';
import {addControlsHandlers} from './controls.js';
import {getProjectName, addProjectsHandlers, addOpenModalButtonHandler, addSaveButtonHandler} from './project.js';
import {createDefaultProject, Project} from './build-project.js';
import {showSuccess} from './messages.js';
import {Buffer} from './buffer.js'

import '../sass/style.sass';


let sounds = ['/static/samples/bdsh.wav',
                '/static/samples/boom.wav',
                '/static/samples/tsk.wav',
              ];

let context = new (window.AudioContext || window.webkitAudioContext)();

const buffer = new Buffer(context, sounds);
buffer.createBuffer();

window.currentProject = new Project()
currentProject.initialProject(buffer); 



generateMatrix(currentProject); // отрисовка дорожек

renderPlaybackLine();// 


const cellsButtons = createAllCellsArray(sounds);

addButtonCellHandler(cellsButtons, currentProject)

addArrowsHandlers(); //стрелки слайдера
addBeatsHandlers(); //шаги
addBpmHandlers(); //bpm

addControlsHandlers(currentProject) //звук и панорама для дорожек





const playSound = (audioData, playTime, volume, pans) => {
  const source = context.createBufferSource();
  source.buffer = audioData;

  const gainNode= context.createGain();
  gainNode.gain.value = volume;

  const pannerOptions = {pan: 0};
  const panner = new StereoPannerNode(context, pannerOptions);
  panner.pan.value = pans;
  if (context.state === 'suspended') {
    context.resume();
}

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

    playSound(buffer.getSound(i), 0, 1, 0);
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
    playStepAtTime(currentProject, pt, fillCurrentPlaybackStep);
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

function playStepAtTime(project, playTime, cb) {
    const {lanes} = project;
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

//addOpenModalButtonHandler(currentProject)




addSaveButtonHandler(currentProject, () => {
  showSuccess();
})








