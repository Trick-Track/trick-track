import React from "react";
import {LaneType} from '../../../data/types';
import Lane from '../../lane/lane'

type Key = string | number;

const Sequencer: React.FC = (props: any) => {
  let {lanes, checkCell} = props;

  return (
    <div className="drumMachine__wrapper">
      <ul className="sequencer__samples-list">

        {lanes.map((lane:LaneType) => (
          <Lane
            key={lane.sound}
            lane = {lane}
            checkCell={checkCell}
          />))
        }
      </ul>
    </div>
  )

}

export default Sequencer
