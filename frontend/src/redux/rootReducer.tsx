
import type {CellType, LaneType, InitialState} from "../data/types";

import {CHECK_CELL} from './actions/actionConstants';

 import {initialState} from "../data/state";
import { createDefaultLanes } from "../data/laneBuild";



const rootReducer = (state:InitialState = initialState, action) => {
  let newState: InitialState
  // = {
  //   ...state,
  //     currentProject: state.currentProject,
  // };

  switch(action.type) {
    case CHECK_CELL:
      newState = JSON.parse(JSON.stringify(state));

      const {lanes} = newState.currentProject;

      const lane: LaneType | undefined = lanes.find(lane => lane.id == action.lane);
      lane.cells[action.cell].checked = lane.cells[action.cell].checked ? false : true

     return newState;

    default: return state;
  };
}




export default rootReducer




