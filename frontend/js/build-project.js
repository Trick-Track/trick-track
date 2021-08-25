import {renderInitialProject} from './renderer.js';

const STEPS = 32;
const defaultBpm = 120;
const defaultName = 'noName';


const initialCells = (steps) => {
  let cells = [];
  
  for (let i = 0; i < steps; i++) {
    const cell = {
      checked: false,
      disabled: false,
    };

    cells.push(cell);
    i >= 16 ? cells[i].disabled = true : false;
  }
  return cells;
};


let newCells = initialCells(STEPS); 


const createLane = (sound) => {
  const steps = [];

  for (let i = 0; i < newCells.length; i++) {
    const clonedCell = Object.assign({}, newCells[i]);
    steps.push(clonedCell);
  }

  const lane = {sound: sound, cells: steps, volume: 1.75, panner: 0};
  return lane;
};


const createDefaultLanes = (sounds) => {
  const lanes = [];
  sounds.map((sound) => {
    const lane = createLane(sound);
    lanes.push(lane);
  });
  return lanes;
};


const createDefaultProject = (sounds) => {
  let project = {
    name: defaultName,
    bpm: defaultBpm, 
    lanes: createDefaultLanes(sounds),
  };

  if (localStorage.hasOwnProperty('project')) {
    project = JSON.parse(localStorage.getItem('project')); 

    localStorage.removeItem('project');
  }

  renderInitialProject(project);
  return project;
};


const createSavedProject = (id) => {
  const newKey = 'pk';
  const newId = id;
  currentProject[newKey] = newId;
  return currentProject;
};


export {createDefaultProject, createSavedProject, createLane};