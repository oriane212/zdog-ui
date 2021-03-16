import React, { useEffect, useState } from 'react';
import './zdogui.css';
import Controls from './components/Controls';
import Viewer from './components/Viewer';


import Zdog from 'zdog';


let valuesarry = [200, 120, 40, 80, 160];

function App(props) {

  const stateVars = {
    canvas_w: useState(240),
    canvas_h: useState(240),
    dragRotate: useState(false),
    animate: useState(false),
    rotate_x: useState(0),
    rotate_y: useState(.06)
  }

  const addedShapes = useState([]);

  function copyShapes() {
    let newshapearry = [];
    newshapearry.push(addedShapes[0]);
    let flattened = newshapearry.flat();
    return flattened;
  }


  function addNewZdogShape(shapeClass) {

    if (shapeClass === 'Ellipse') {

      let flattened = copyShapes();

      let i = Math.floor(Math.random() * valuesarry.length);

      let newshape = {
        shapeClass: 'Ellipse',
        data: {
          //addTo: '',
          diameter: valuesarry[i],
          stroke: 20
        }
      }

      valuesarry.splice(i, 1);
      console.log(valuesarry);

      flattened.push(newshape);
      addedShapes[1](flattened);

      console.log('inside addNewZdogShape: ');

    }
  }


  console.log('testing outside return');


  return (

    <React.Fragment>

      <main>
        <Controls addNewZdogShape={addNewZdogShape} stateVars={stateVars} shapes={addedShapes}></Controls>
        <Viewer shapes={addedShapes} stateVars={stateVars}></Viewer>
      </main>

      <section id="container"></section>

    </React.Fragment>

  );

}

export default App;