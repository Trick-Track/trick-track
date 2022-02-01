import {audioContext} from './audioContext';
import { DrumMachineEngine } from './drumMachineEngine';
import { initialState } from '../data/state';

const {lanes} = initialState.currentProject;

export const createSampleBank = () => {
  let sounds:Array<URL | string> = []
  lanes.forEach((lane) => {
    sounds.push(lane.sound)
  })
  const buffer = new DrumMachineEngine(audioContext, sounds)
  buffer.createBuffer()
  return buffer
}
