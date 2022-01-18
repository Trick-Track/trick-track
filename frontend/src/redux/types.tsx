export type Cell = {
  checked: boolean,
  disabled: boolean
};

export type Lane = {
  sound: URL,
  cells: Array<Cell>,
  volume: number,
  panner: number,
}

export type InitialState = {
  currentProject: {
    name: string,
    bpm: number,
    lanes: Array<Lane>,
  },
  isPlaying: boolean,
}
