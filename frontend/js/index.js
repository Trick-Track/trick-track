import {addOpenModalButtonHandler, addProjectsButtonsHandlers} from './project.js';
import {createDefaultProject} from './build-project.js';
import {Buffer} from './buffer.js';
import {setSounds} from './data-store.js';
import {addPlayerButtonsHandlers} from './player.js';
import {addBpmHandlers} from './bpm.js';
import {addInputAddHandler} from './upload.js';
import '../sass/style.sass';

import {getProjectsList} from './server.js';
import { renderProjectList } from './renderer.js';


let sounds = ['/static/samples/bdsh.wav',
  '/static/samples/boom.wav',
  '/static/samples/tsk.wav',
];


/* global currentProject:false, buffer:false, context: false*/


window.context = new (window.AudioContext || window.webkitAudioContext)();
window.buffer = new Buffer(context, sounds);


window.addEventListener('load' , () => {
  getProjectsList(renderProjectList);
}); 


buffer.createBuffer(() =>  {
  setSounds(buffer.urls);
});

console.log(buffer);
window.currentProject = createDefaultProject(buffer.urls);

addOpenModalButtonHandler();

addPlayerButtonsHandlers();
addBpmHandlers();


addProjectsButtonsHandlers();

addInputAddHandler();