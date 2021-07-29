import {renderInitialProject} from './renderer.js';
import {addArrowsHandlers} from './slider.js';
import {addButtonPlayHandler, addButtonStopHandler} from './player.js';
import {addControlsHandlers} from './controls.js';
import {addProjectsHandlers, addOpenModalButtonHandler, addSaveButtonHandler} from './project.js';
import {createDefaultProject} from './build-project.js';
import {showSuccess} from './messages.js';
import {Buffer} from './buffer.js'
import {setSounds} from './data-store.js';


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

window.currentProject = createDefaultProject(buffer.urls); // отрисовка проекта

//window.cellsButtons = createAllCellsArray(buffer.urls)
renderInitialProject(currentProject)

addOpenModalButtonHandler(currentProject, renderInitialProject)


addArrowsHandlers(); //стрелки слайдера







addControlsHandlers(currentProject) //звук и панорама для дорожек









 

addButtonPlayHandler()
addButtonStopHandler()



addSaveButtonHandler(currentProject, () => {
  showSuccess();
})








