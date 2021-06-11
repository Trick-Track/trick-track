const context = new AudioContext();

const justNow = context.currentTime;
const oscillator = context.createOscillator(); //узел осцилятора
const  gain = context.createGain(); // узел усилителя

oscillator.connect(gain)

const turnOnOscillator = () => {
    // Выбрать тип сигнала
    oscillator.type = 'sine'// 'sine' by default;

    // Установить частоту
    oscillator.frequency.value = 440; //A4

    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.frequency.exponentialRampToValueAtTime(
      466.16,
      justNow + 4
  );
  oscillator.stop(justNow + 9);
}

const increaseSound = () => {
  
}

window.onclick = () => {
    turnOnOscillator();
}



// // start at "C4"
// osc.frequency.value = "C4";
// // ramp to "C2" over 2 seconds
// osc.frequency.rampTo("C2", 2);
// // start the oscillator for 2 seconds
// osc.start().stop("+3");