import {audioContext} from './audioContext';

let startTime = 0;
let nextStepTime = 0;
let currentStep = 0;
const lookAheadTime = 0.2;
const ticksPerBeat = 4;


const Scheduler= function (bpm: number){
  this.bpm = bpm;
  this.callback = null;
  this.stepCallback = null;
  this.timer = null
}

function ScheduleSound (scheduler) {
  let now = audioContext.currentTime;
  const tick = (60 / scheduler.bpm) / ticksPerBeat

  while (nextStepTime < now + lookAheadTime) {
    let pt = nextStepTime + tick;
    scheduler.callback(pt);
    scheduler.stepCallback();
  }
    sheduler.timer = setTimeout(scheduleSound, 0);
}

Scheduler.prototype.stop = function () {
  //context.suspend();
  window.clearTimeout(this.timer)

};

Scheduler.prototype.start = function () {
  ScheduleSound(this, now);
};

