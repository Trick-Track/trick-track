const context = new AudioContext();

const audio = document.getElementById('audio');
//audio.crossorigin = "anonymous";

const logo = document.querySelector('.logo').style;
let analyser
let src 


const init = () => {
    
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination); // сточка для передачи звука
    loop();
}

const loop = () => {
    window.requestAnimationFrame(loop);//метод зацикливания для снижения нагрузки на браузер
    
    const array = new Uint8Array(analyser.frequencyBinCount);//1024
    analyser.getByteFrequencyData(array);//копируем данные в массив текущей частоты

    logo.minHeight = (array[40])+"px";
    logo.width = (array[40])+"px";
}

window.onclick = () => {
    init();
    audio.play();
}