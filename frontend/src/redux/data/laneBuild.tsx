import {CellType, LaneType} from '../types';

const ENABLED_CELLS:number = 16;
const DEFAULT_VOLUME:number = 1.75;
const DEFAULT_PANNER:number = 0;

const initialCells = (steps:number):Array<CellType> => {
  let cells = [];

  for (let i = 0; i < steps; i++) {
    const cell:CellType = {
      checked: false,
      disabled: false,
    };

    cells.push(cell);
    i >= ENABLED_CELLS ? cells[i].disabled = true : false;
  }
  return cells;
};

const createLane = (steps:number, sound:URL | string) => {
  const cells = [];
  const newCells = initialCells(steps);

  for (let i = 0; i < newCells.length; i++) {
    const clonedCell = Object.assign({}, newCells[i]);
    cells.push(clonedCell);
  }

  const lane:LaneType = {sound, cells, volume: DEFAULT_VOLUME, panner: DEFAULT_PANNER};
  return lane;
};

export const createDefaultLanes = (steps:number, sounds:Array<URL | string>) => {
  const lanes:Array<LaneType> = [];
  sounds.map((sound) => {
    const lane = createLane(steps,sound);
    lanes.push(lane);
  });
  return lanes;
};
