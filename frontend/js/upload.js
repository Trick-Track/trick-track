import {addNewLane, resetProject} from './project.js';
import{resetProjectRendering} from './project.js';

const inputAdd = document.getElementById('#sample');

const FILE_TYPES = ['mp3', 'wav'];


const onFileInputchange = () => {

  const sound = inputAdd.files[0];
  const fileName = sound.name;
  console.log(sound.type, sound.name);

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    getSignedRequest(sound);
    
  }
};
 
function getSignedRequest(file) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/upload/?file_name='+file.name+'&file_type='+file.type);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        let response = JSON.parse(xhr.responseText);
        console.log(response);
        console.log(response.data);
        
        uploadFile(file, response.data, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}

function uploadFile(file, data, url){
  var xhr = new XMLHttpRequest();
  console.log(data);
  xhr.open('POST', data.url);
 

  var postData = new FormData();
  for(let key in data.fields){
    postData.append(key, data.fields[key]);
  }
  postData.append('file', file);

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      if(xhr.status === 200 || xhr.status === 204) {
        let clone = {};
        for (let key in currentProject) {
          clone[key] = currentProject[key];
        }
        resetProject(currentProject, () => {
          window.currentProject = clone;
          addNewLane(url, clone);
        // document.getElementById("preview").src = url;
        // document.getElementById("avatar-url").value = url;
      });
    }
      else {
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(postData);
}


const addInputAddHandler = () => {
  inputAdd.addEventListener('change', onFileInputchange);
};

export {addInputAddHandler};