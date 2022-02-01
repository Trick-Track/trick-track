import {PLAY_SAMPLE} from './actions/actionConstants';
import {createSampleBank} from '../audioPlayer/createSampleBank';
import { audioContext } from '../audioPlayer/audioContext';

const sampleBank = createSampleBank()

export const audioMiddleWare = (store:any) => {
  audioContext.resume()

  return next => action => {

    switch (action.type) {
      case PLAY_SAMPLE:
        sampleBank.playSound(action.url, action.volume, action.panner);
        break;

      default:
        break;
    }

    next(action);
  }
};
