import * as Constants from './actionConstants';
import * as Types from '../../data/types'

export const checkCell = (lane: number, cell: number) => {
  return {
    type: Constants.CHECK_CELL,
    lane,
    cell,
  };
}

export const playSample = (url: URL | string, volume:number, panner:number) => {
  return {
    type: Constants.PLAY_SAMPLE,
    url,
    volume,
    panner
  }
}
