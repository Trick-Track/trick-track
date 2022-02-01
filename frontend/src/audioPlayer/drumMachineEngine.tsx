export class DrumMachineEngine {

  context: AudioContext
  urls: Array<URL | String>
  buffer: Array<any>

  constructor(context: AudioContext, urls: Array<string | URL>) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  loadSound(url:URL | string, index: number) {
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
  }

  createBuffer() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
    });
  }

  getSound(index) {
    return this.buffer[index]
  }


  playSound(snd: URL | string, vol:number, pann:number) {
    const source = this.context.createBufferSource();
    const gainNode = this.context.createGain();
    const pannerOptions = {pan: 0};
    const panner = new StereoPannerNode(this.context, pannerOptions);
    const sound = this.urls.find(url => url === snd)

    let i = this.urls.indexOf(sound, 0)
    source.buffer = this.getSound(i);

    gainNode.gain.value = vol;
    panner.pan.value = pann;
    source.connect(gainNode).connect(panner).connect(this.context.destination);
    source.start(0);
  }
}


