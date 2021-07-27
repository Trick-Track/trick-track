const PRIMARY_MOUSE_BUTTON = 0;

const isEscEvent = (evt) => {
    return evt.key === ('Escape' || 'Esc');
  };
  
const isMouseLeftEvent = (evt) => {
  return evt.button === PRIMARY_MOUSE_BUTTON;
}


export {isEscEvent, isMouseLeftEvent}