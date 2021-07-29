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
  }
    
    return cells;
}

const createDefaultLanes = (sounds, cells) => {
  const lanes = []
 
  sounds.map((sound) => {
    const steps = [];

    for (let i = 0; i < cells.length; i++) {
      const clonedCell = Object.assign({}, cells[i]);
      steps.push(clonedCell)
    }
    const obj = {sound: sound, cells: steps, volume: 1, panner: 0}
    lanes.push(obj)
  })
  return lanes;
}

let newCells = initialCells(STEPS); 


const createDefaultProject = (sounds, cb) => {
   
   const project = {
      name: defaultName,
      bpm: defaultBpm, 
      lanes: createDefaultLanes(sounds, newCells),
     }
     return project
   
  

  
 }

export {createDefaultProject}