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

const App = ({lanes, checkCell, playSample, isPlaying}) => {
  const audioContextRef = useRef();

  useEffect(() => {
    audioContextRef.current = audioContext;
    console.log(audioContextRef.current)
  })

    // const toggleContext = () => {
    //   if (isPlaying) {
    //     audioContextRef.current.suspend();
    //   } else {
    //     audioContextRef.current.resume();
    //   }
    //   setDataPlaying((play) => !play);
    // };



    return (
    <div className="app">
     <header className="app__header">
     <div className="app__header-wrapper">
        <a className="app__logo">
          <img src="image/logo2.png" width="130" height="50" alt="logo"/>
        </a>
        <div className="app__header-input">
          <Input id="bpm" type="number"/>
          <Input id="beats" type="number"/>
        </div>
      </div>
     </header>
      <DrumMachine lanes={lanes} checkCell={checkCell} playSample={playSample}/>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
