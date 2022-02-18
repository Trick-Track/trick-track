import {addOpenModalButtonHandler, addProjectsButtonsHandlers} from './components/project.js';
import {createDefaultProject} from './components/build-project.js';
import {Buffer} from './components/buffer.js';
import {setSounds} from './components/data-store.js';
import {addPlayerButtonsHandlers} from './components/player.js';
import {addBpmHandlers} from './components/bpm.js';
import {addInputLabelHandler} from './components/upload.js';
import './sass/style.sass';

import {getProjectsList} from './components/server.js';
import { renderProjectList } from './components/renderer.js';


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

window.currentProject = createDefaultProject(buffer.urls);

addOpenModalButtonHandler();

addPlayerButtonsHandlers();
addBpmHandlers();


addProjectsButtonsHandlers();

addInputLabelHandler();
