
export class Buffer {

    constructor(context, urls) {
      this.context = context;
      this.urls = urls;
      this.buffer = [];
    }
  
    loadSound(url, index) {
      let request = new XMLHttpRequest();
      request.open('get', url, true);
      request.responseType = 'arraybuffer';
      let thisBuffer = this;
      request.onload = function() {
  
        thisBuffer.context.decodeAudioData(request.response, function(data) {
            thisBuffer.buffer[index] = data;
        });
  
       };
      request.send();
    };
  
    createBuffer() {
      this.urls.forEach((url, index) => {
        this.loadSound(url, index);
  
      })

    }
  
   getSound(index) {
      return this.buffer[index];
    }
  
  }