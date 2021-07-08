const barsControl = document.querySelector('#bars'); 
const incrementButton = document.querySelector('.app-bars__button--increment');
const decrementButton = document.querySelector('.app-bars__button--decrement');

const addBarsUnit = () => {
    barsControl.value = Number(barsControl.value) + 1;
  }

const deleteBarsUnit = () => {
barsControl.value = Number(barsControl.value) - 1;
}

const addBarsButtonsClickHandlers = () => {
incrementButton.addEventListener('click', addBarsUnit);
decrementButton.addEventListener('click', deleteBarsUnit);
}

const addBarsInputHandler = () => {
barsControl.addEventListener('change', function() {
    barsControl.value = this.value;
});
};

const addBarsHandlers = () => {
    addBarsButtonsClickHandlers();
    addBarsInputHandler();
}

const setBars = () => {
    return barsControl.value
}

  export {addBarsHandlers, setBars}