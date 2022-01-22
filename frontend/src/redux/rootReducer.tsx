
import type {InitialState, LaneType} from "./types";
import {createDefaultLanes} from "./data/laneBuild";
import * as actions from './actions/actionConstants';
import { combineReducers, AnyAction } from "redux";

//import * as reducers from './reducers';

// export const rootReducer = combineReducers(reducers)

const STEPS:number = 32;

const urls = ['asets/samples/bdsh.wav',
'asets/samples/boom.wav']

const initialState: InitialState = {
  currentProject: {
    name: 'noName',
    bpm: 120,
    lanes: createDefaultLanes(STEPS, urls),
  },
  currentStep: 0,
  isPlaying: false,

}
const rootReducer = (state:InitialState = initialState, action: AnyAction): any => {
  let newState = {
    ...state,
      currentProject: state.currentProject,
  };

  let {lanes} = newState.currentProject;
  let lane

  switch(action.type) {
    case actions.CHECK_CELL:
      lanes = [...state.currentProject.lanes];
      const i = lanes.indexOf(lane, 0)
      // const cells = [...state.currentProject]


      return newState;

    default: return state;
  }

};




export default rootReducer




