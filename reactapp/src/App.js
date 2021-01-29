import React, { useState } from 'react';
import './zdogui.css';
import Controls from './components/Controls';


function App(props) {

  const stateVars = {
    canvas_w: useState(240),
    canvas_h: useState(240),
    dragRotate: useState(false),
    animate: useState(true),
    rotate_x: useState(.06),
    rotate_y: useState(0),
    shapes: useState([])
  }

  return (

    <React.Fragment>

    <main>
      
      <Controls stateVars={stateVars}></Controls>

      <section className="results">

        <section className="illustration" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}>
          <canvas id="illo" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}></canvas>
        </section>
        

      </section>

    </main>

  <section id="container"></section>

  </React.Fragment>

  );

}

export default App;