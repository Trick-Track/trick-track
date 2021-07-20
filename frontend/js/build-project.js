
import {setBpm} from './bpm.js';
import {getProjectName} from './project.js';

const STEPS = 32;
const defaultBpm = 120;

const initialCells = (steps) => {
    let cells = [];
   
    for (let i = 0; i < steps; i++) {

      const cell = {
        checked: false,
        disabled: false
      };

      cells.push(cell);
    }
    
    return cells;
}

const createDefaultLanes = (sounds, cells) => {
  const lines = []
 
  sounds.map((sound) => {
    const steps = [];

    for (let i = 0; i < cells.length; i++) {
      const clonedCell = Object.assign({}, cells[i]);
      steps.push(clonedCell)
    }
    const obj = {sound: sound, cells: steps, volume: 1, panner: 0}
    lines.push(obj)
  })
  return lines
}



              

//let projectName = getProjectName();
let newCells = initialCells(STEPS); //ячейки



// const createProject = (newLanes, bpm) => {
//   const project = {bpm: bpm, lanes: newLanes, name: name}
//   return project;
// }

export class Project {
  
    constructor () {

      this.projectName = getProjectName();
      this.bpm = setBpm();
      //this.lanes = createDefaultLanes(buffer.urls, newCells);
    }
    
    initialProject(buffer) {
      this.projectName = "no name";
      this.bpm = defaultBpm;
      this.lanes = createDefaultLanes(buffer.urls, newCells);
    }
}


const createDefaultProject = (buffer) => {
   return {
     name: 'no name',
     bpm: defaultBpm, 
     lanes: createDefaultLanes(buffer.urls, newCells),
     
   }
  
  }
  






  
  export {createDefaultProject}