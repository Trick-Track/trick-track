import * as Constants from './actionConstants';
import * as Types from '../../data/types'

export const checkCell = (lane: number, cell: number) => {
  return {
    type: Constants.CHECK_CELL,
    lane,
    cell,
  }
};

export const playSample = (url: URL | string, volume:number, panner:number) => {
  return {
    type: Constants.PLAY_SAMPLE,
    url,
    volume,
    panner
  }
};

export const nextStep = (currentStep: number) => {
  return {
    type: Constants.NEXT_STEP,
    currentStep,
  }
};

export const playStepAtTime = (playTime: number, lanes: Array<Types.LaneType>) => {
  return {
    type: Constants.PLAY_STEP_AT_TIME,
    playTime,
    lanes,
  }
};

export const laneAdd = (laneId: number, buffer: AudioBuffer) =>  {
  return {
    type: Constants.LANE_ADD,
    laneId,
    buffer
  }
};

export function laneDelete(laneId:number) {
  return {
    type: Constants.LANE_DELETE,
    laneId,
  };
}


export const laneSetVolume = (laneId:number, value:number) => {
  return {
    type: Constants.LANE_SET_VOLUME,
    laneId,
    value
  };
}


