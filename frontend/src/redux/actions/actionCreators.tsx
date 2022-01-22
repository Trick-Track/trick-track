import * as Constants from './actionConstants';
import * as Types from '../types'

export const checkCell = (cell: Types.CellType) => {
  return {
    type: Constants.CHECK_CELL,
    cell,
  };
}



