import { PLAY_SAMPLE } from './actions/actionConstants';
import { createSampleBank } from '../audioPlayer/createSampleBank';
import { audioContext } from '../audioPlayer/audioContext';
import { Sheduler } from '../audioPlayer/sheduler'

const sampleBank = createSampleBank()

export const audioMiddleWare = (store:any) => {
  let state = store.getState();
  const sheduler = new Sheduler()

  return next => action => {

    switch (action.type) {
      case PLAY_SAMPLE:
        sampleBank.playSound(action.url, action.volume, action.panner);
        break;

        export function playStepAtTime(playTime:number, buffer: AudioBuffer, ) {

          for(let i = 0; i < lanes.length; i++) {
            const lane = lanes[i];

            if (lane.cells[state.currentStep].checked == true) {
              playSound((i), playTime);
            }
          }
          cb(currentStep);
        }

      default:
        break;
    }

    next(action);
  }
};
