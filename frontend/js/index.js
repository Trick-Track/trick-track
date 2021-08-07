import {addPlayerButtonsHandlers} from './player.js';
import {getPkByProjectLink, addOpenModalButtonHandler, addSaveButtonHandler, changeProjectUpdateButton, addUpdateButtonHandler, addProjectsHandlers} from './project.js';
import {createDefaultProject} from './build-project.js';
import {showSuccess} from './messages.js';
import {Buffer} from './buffer.js';
import {setSounds} from './data-store.js';
import {renderInitialProject} from './initial-project.js';
import {renderProject} from './renderer.js'

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




  const project = createDefaultProject(buffer.urls);

window.currentProject = project
renderInitialProject(currentProject);

 
addProjectsHandlers();
addOpenModalButtonHandler(project);

addPlayerButtonsHandlers();


addSaveButtonHandler(currentProject, () => {
  showSuccess();
  changeProjectUpdateButton();
});

addUpdateButtonHandler(currentProject, () => {
  console.log('ok')
});

getPkByProjectLink(renderProject)



