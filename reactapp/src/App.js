import React, { useState } from 'react';
import './zdogui.css';
import Controls from './components/Controls';
import Viewer from './components/Viewer';


function App(props) {

  const stateVars = {
    canvas_w: useState(240),
    canvas_h: useState(240),
    dragRotate: useState(true),
    animate: useState(true),
    rotate_x: useState(0),
    rotate_y: useState(.06),
    shapes: useState([])
  }

  return (

    <React.Fragment>

    <main>
      <Controls stateVars={stateVars}></Controls>
      <Viewer stateVars={stateVars}></Viewer>
    </main>

  <section id="container"></section>

  </React.Fragment>

  );

}

export default App;