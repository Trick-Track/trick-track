import * as Constants from './actionConstants';
import * as Types from '../../data/types'

export const checkCell = (cell: Types.CellType) => {
  return {
    type: Constants.CHECK_CELL,
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



