import {setBeatsInputDisabledState, setBeatsInputEnabledState} from './beats.js';
import {fillCurrentPlaybackStep} from './renderer.js';
import {currentSlide} from './slider.js';
import {setBpm} from './bpm.js';
import {setBeats} from './beats.js';


const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');


let startTime = 0;
let nextStepTime = 0.0;
let currentStep = 0;


const playSound = (audioData, playTime, project) => {

  const source = context.createBufferSource();
  const gainNode = context.createGain();


  const pannerOptions = {pan: 0};
  const panner = new StereoPannerNode(context, pannerOptions);

  source.buffer = audioData;

  const {lanes} = project;
  lanes.forEach((lane) => {
    const i = lanes.indexOf(lane, 0);
    if (audioData == buffer.getSound(i)) {
      gainNode.gain.value = lane.volume;
      panner.pan.value = lane.panner;
    }
  });

  source.connect(gainNode).connect(panner).connect(context.destination);
  source.start(playTime);
  if (context.state === 'suspended') {
    context.resume().then(source.start(playTime)).then(context.suspend());
  }
};


const setTempo = () => {
  const bpm = setBpm();
  const tic = (60 / bpm) / 4;
  return tic; 
};


function scheduleSound() {
  let now = context.currentTime;
  now -= startTime;
 
  while (nextStepTime < now + 0.2 ) {

    let pt = nextStepTime + startTime;
    playStepAtTime(currentProject, pt, fillCurrentPlaybackStep);
    nextStep(currentSlide);
  }
  const timer = setTimeout(scheduleSound, 0);
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

    if (lane.cells[currentStep].checked == true) {
      playSound(buffer.getSound(i), playTime, project);
    }
  }
  cb(currentStep);
}


const stopPlayback = (cb) => {
  context.suspend();
  setBeatsInputEnabledState();
  cb();
};


const setStep = () => {
  currentStep = 0;
};


const playSequencer = () => {
  scheduleSound();
  setBeatsInputDisabledState();
  if (context.state === 'suspended') {
    context.resume();
  }
};

const addPlayerButtonsHandlers = () => {
  playButton.addEventListener('click', () => {
    playSequencer();
  });
  stopButton.addEventListener('click', () => {
    stopPlayback(setStep);
  });
};


export {addPlayerButtonsHandlers, playSound};