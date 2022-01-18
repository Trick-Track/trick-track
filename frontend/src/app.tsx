import React from 'react';
import './app.sass';
import 'components/UI/button'


const App: React.FC = () => {
  let a = 10;
  return (
    <div className="app">
      <button>jj{a}</button>
    </div>
  )
}


export default App
