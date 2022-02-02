import React, {useEffect, useRef} from 'react';
import './app.sass';
import {connect} from 'react-redux';
import DrumMachine from './components/drumMachine/drumMachine';
import * as actions from './redux/actions/actionCreators';
import * as types from './data/types';
import Header from './components/header/header';
import {audioContext} from './audioPlayer/audioContext'
import Input from './components/UI/input/input';

const mapStateToProps = (state:types.InitialState) => {
  return {
    lanes: state.currentProject.lanes,
    isPlaying: state.isPlaying
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkCell: (lane: number, cell: number) => {dispatch(actions.checkCell(lane, cell))},
    playSample: (url: URL | string, volume:number, panner:number) => {dispatch(actions.playSample(url, volume, panner))}
  }
};

const App = ({lanes, checkCell, playSample}) => {
  const audioContextRef = useRef();


    // useEffect(() => {
    //   const audioContext = new AudioContext()
    //   const sounds = []
    //   lanes.forEach((lane: types.LaneType) => {
    //     sounds.push(lane.sound)
    //   })
    //     const buffer  = new Buffer(audioContext, sounds)
    //     console.log(buffer)
    // }, [])



    return (
    <div className="app">
      <Header/>
      <DrumMachine lanes={lanes} checkCell={checkCell} playSample={playSample}/>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
