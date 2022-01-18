
import type {InitialState} from "../types";
import {createDefaultLanes} from "../../data/laneBuild";

const STEPS:number = 32;

const initialState: InitialState = {
  currentProject: {
    bpm: 120,
    name: 'noName',
    //lanes: createDefaultLanes(STEPS, buffer.urls)
  },
  isPlaying: false,
}
