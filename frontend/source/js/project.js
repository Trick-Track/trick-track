const createProject = (newLanes, bpm) => {
    const project = {bpm: bpm, lanes: newLanes, isPlayed: false}
    return project;
}



// export default class Project {

//         constructor (bpm, lanes) {
//           this.bpm = bpm;
//           this.lanes = lanes;
//         }
      
// }

export {createProject} 