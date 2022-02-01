
import type {CellType, LaneType, InitialState} from "../data/types";

import {CHECK_CELL} from './actions/actionConstants';
import { combineReducers, AnyAction } from "redux";
 import {initialState} from "../data/state";


const rootReducer = (state:InitialState = initialState, action): InitialState => {
  let newState: InitialState
  // = {
  //   ...state,
  //     currentProject: state.currentProject,
  // };

  switch(action.type) {
    case action.CHECK_CELL:
      //lanes = [...state.currentProject.lanes];
      //lanes[i].cells = [...state.currentProject.lanes[i].cells]
      newState = JSON.parse(JSON.stringify(state))
      console.log(newState)

      let {lanes} = newState.currentProject;
      console.log(lanes)

        const b = cells.find(cell => cell === action.cell)
        b.checked == true
      //}








      return newState;

    default: return state;
  };
}




export default rootReducer




