import type {InitialState} from "../data/types";
import {createDefaultLanes} from "../data/laneBuild";

const STEPS:number = 32;

const urls = ['/static/samples/bdsh.wav',
'/static/samples/boom.wav',
'/static/samples/tsk.wav']

export const initialState: InitialState = {
  currentProject: {
    name: 'noName',
    bpm: 120,
    lanes: createDefaultLanes(STEPS, urls),
  },
  currentStep: 0,
  isPlaying: false,
}
