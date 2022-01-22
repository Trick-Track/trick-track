import React, { useEffect } from 'react';
import './app.sass';
import { connect } from 'react-redux';
import DrumMachine from './components/drumMachine/drumMachine';
import * as actions from './redux/actions/actionCreators';
import * as types from './redux/types';

const mapStateToProps = (state:types.InitialState) => {
  return {
    lanes: state.currentProject.lanes,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkCell: (cell: types.CellType) => {dispatch(actions.checkCell(cell))},
    }
};


const App = (props: any) => {


  return (
    <div className="app">
      <DrumMachine lanes={props.lanes} checkCell={props.checkCell}/>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
