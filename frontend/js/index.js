
import {addButtonCellHandler, renderProject, renderStateCellElement, addSoundsButtonHandlers, renderPlaybackLine, createAllCellsArray, setCellBackgroundColor} from './renderer.js';
import {addArrowsHandlers} from './slider.js';
import {addBpmHandlers} from './bpm.js';
import {addBeatsHandlers} from './beats.js';
import {addButtonPlayHandler, addButtonStopHandler} from './player.js';
import {addControlsHandlers} from './controls.js';
import {addProjectsHandlers, addOpenModalButtonHandler, addSaveButtonHandler, setProjectDisabledSteps} from './project.js';
import {createDefaultProject} from './build-project.js';
import {showSuccess} from './messages.js';
import {Buffer} from './buffer.js'
import {setSounds, getSounds} from './data-store.js';


import '../sass/style.sass';


let sounds = ['/static/samples/bdsh.wav',
                '/static/samples/boom.wav',
                '/static/samples/tsk.wav',
              ];

window.context = new (window.AudioContext || window.webkitAudioContext)();


window.buffer = new Buffer(context, sounds);

buffer.createBuffer(() =>  {
  setSounds(buffer.urls)
})

window.currentProject = createDefaultProject(buffer.urls)
renderProject(currentProject); // отрисовка проекта

console.log(getSounds()[1])
renderPlaybackLine();// 
window.cellsButtons = createAllCellsArray(buffer.urls)


//addOpenModalButtonHandler(project, currentProject, renderProject)

addSoundsButtonHandlers(currentProject)

//setCellBackgroundColor()


addButtonCellHandler(currentProject, renderStateCellElement)




addArrowsHandlers(); //стрелки слайдера
addBeatsHandlers(() => setProjectDisabledSteps(currentProject, renderStateCellElement)); //шаги
addBpmHandlers(); //bpm





addControlsHandlers(currentProject) //звук и панорама для дорожек









 

addButtonPlayHandler()
addButtonStopHandler()



addSaveButtonHandler(currentProject, () => {
  showSuccess();
})








