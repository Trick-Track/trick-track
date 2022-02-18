
import type {CellType, LaneType, InitialState} from "../data/types";
import {BPM_SET, CHECK_CELL, NEXT_STEP} from './actions/actionConstants';
import {initialState} from "../data/state";

const rootReducer = (state:InitialState = initialState, action) => {
  let newState: InitialState = {
    ...state,
      ...state.currentProject,
  };

  switch(action.type) {
    case CHECK_CELL:
      newState = JSON.parse(JSON.stringify(state));
      const {lanes} = newState.currentProject;
      const lane:LaneType | undefined = lanes.find(lane => lane.id === action.lane);
      lane.cells[action.cell].checked = lane.cells[action.cell].checked ? false : true;

    case NEXT_STEP:
      newState.currentStep++

      if (newState.currentStep == newState.currentProject.beats) {
        newState.currentStep = 0;
      }

      case BPM_SET:
        newState.currentProject.bpm = action.value;

     return newState;

    default: return state;
  };
}




export default rootReducer




