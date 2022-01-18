import {Cell, Lane} from '../redux/types';

const ENABLED_CELLS:number = 16;
const DEFAULT_VOLUME:number = 1.75;
const DEFAULT_PANNER:number = 0;

const initialCells = (steps:number):Array<Cell> => {
  let cells = [];

  for (let i = 0; i < steps; i++) {
    const cell:Cell = {
      checked: false,
      disabled: false,
    };

    cells.push(cell);
    i >= ENABLED_CELLS ? cells[i].disabled = true : false;
  }
  return cells;
};

const createLane = (steps:number, sound:URL) => {
  const cells = [];
  const newCells = initialCells(steps);

  for (let i = 0; i < newCells.length; i++) {
    const clonedCell = Object.assign({}, newCells[i]);
    cells.push(clonedCell);
  }

  const lane:Lane = {sound, cells, volume: DEFAULT_VOLUME, panner: DEFAULT_PANNER};
  return lane;
};

export const createDefaultLanes = (steps:number, sounds:Array<URL>) => {
  const lanes:Array<Lane> = [];
  sounds.map((sound) => {
    const lane = createLane(steps,sound);
    lanes.push(lane);
  });
  return lanes;
};
