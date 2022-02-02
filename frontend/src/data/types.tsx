export type CellType = {
  checked: boolean,
  disabled: boolean
};

export type LaneType = {
  sound: string | URL,
  cells: Array<CellType>,
  volume: number,
  panner: number,
  id: number
}

export type InitialState = {
  currentProject: {
    name: string,
    bpm: number,
    lanes: Array<LaneType>,
  },
  currentStep: number,
  isPlaying: boolean,
}

export type InputType = {
  id: string,
  className: string,
}
