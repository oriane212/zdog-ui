import React, { useEffect, useState } from 'react';
import './zdogui.css';
import Controls from './components/Controls';
import Viewer from './components/Viewer';
import { FormControl, Input, InputLabel } from '@material-ui/core';

import Zdog from 'zdog';

let illo = '';

let valuesarry = [200, 120, 40, 80, 160];

function App(props) {

  const stateVars = {
    canvas_w: useState(240),
    canvas_h: useState(240),
    dragRotate: useState(false),
    animate: useState(true),
    rotate_x: useState(0),
    rotate_y: useState(.06),
    shapes: useState([])
  }

  //const [ready, setReady] = useState(false);

  //const illoState = useState('');

  // TODO: create illo here - add illo to state?
  // also handle adding shapes here so that params are set at same time zdog shape is created and added to illo
  // OR just store the zdog shapes in the shapes array...

  function copyShapes() {
    let newshapearry = [];
    newshapearry.push(stateVars.shapes[0]);
    let flattened = newshapearry.flat();
    return flattened;
}


  /* function copyIllo() {
    let newIllo = {};
    Object.assign(newIllo, illoState[0]);
    return newIllo;
  } */
  

  

  function addNewZdogShape(shapeClass) {

    if (shapeClass === 'Ellipse') {

      let flattened = copyShapes();
      
      /*
      let modified = flattened.map((shape) => {
        //console.log(shape.addTo);
        shape.addTo = illo;
        return shape;
      })
      */
      
     let modified = flattened;

     let i = Math.floor(Math.random() * valuesarry.length);

      let newshape = new Zdog.Ellipse({
        addTo: illo,
        diameter: valuesarry[i],
        stroke: 20
      })

      valuesarry.splice(i, 1);
      console.log(valuesarry);

      modified.push(newshape);
      stateVars.shapes[1](modified);

      //illo.updateRenderGraph();

      console.log('inside addNewZdogShape: ');
      console.log(illo);

    }
  }

  console.log('testing outside return');

  //let illo = '';

  /* function handleIlloUpdateById(e) {
    console.log('inside handler: ' + e.target.value);
    let elemid = e.target.id;
    stateVars[elemid][1](e.target.value);

    let newillo = createIllo();
    illoState[1](newillo);
  } */

  /* function handleAnimateUpdate() {
    stateVars.animate[1](!stateVars.animate[0]);
    //animateIllo();
  } */

  
  function animateIllo() {

    let animateVal = stateVars.animate[0];
    //console.log('inside animateIllo, illo is ', illo);

      //if (ready) {

        if (animateVal) {
          illo.rotate.x += (stateVars.rotate_x[0]);
          illo.rotate.y += (stateVars.rotate_y[0]);
          console.log('illo rotate x & y: ', illo.rotate.x, illo.rotate.y);
        }
        /*
        if (stateVars.animate[0] | stateVars.dragRotate[0]) {
          illo.updateRenderGraph();
          //requestAnimationFrame(animateIllo);
        }*/
        
        illo.updateRenderGraph();

      //}

      requestAnimationFrame(animateIllo);

  }
 
  /* function attachIllo() {
    illo.element = '#illo';
    illo.dragRotate = stateVars.dragRotate[0];
    illo.setSize(stateVars.canvas_w[0], stateVars.canvas_h[0]);

    animateIllo();

    //return illo;
  } */


  function createIllo() {

    illo = new Zdog.Illustration({
      element: '#illo',
      dragRotate: stateVars.dragRotate[0]
    })

    illo.setSize(stateVars.canvas_w[0], stateVars.canvas_h[0]);

    //setReady(true);

    //animateIllo();
    

    //addZdogShapes();
    //addNewZdogShape('Ellipse');

    //newillo.updateRenderGraph();
    //checkAnimate();

    //illoState[1](illo);



    //return newillo;

  }


  
  useEffect(() => {

    createIllo();
    //attachIllo();

  }, []);

  /* useEffect(() => {

      animateIllo();
      
  }, []); */

  useEffect(() => {

    illo.setSize(stateVars.canvas_w[0], stateVars.canvas_h[0]);
    illo.dragRotate = stateVars.dragRotate[0];
    illo.updateRenderGraph();

  });
  

  return (

    <React.Fragment>

      <main>
        <Controls addNewZdogShape={addNewZdogShape} stateVars={stateVars}></Controls>
        <Viewer illo={illo} stateVars={stateVars}></Viewer>
      </main>

      <section id="container"></section>

    </React.Fragment>

  );

}

export default App;

/*

<Controls stateVars={stateVars}></Controls>
      <Viewer illo={illo} stateVars={stateVars}></Viewer>

      <FormControl>
          <InputLabel htmlFor="canvas_width">Canvas width</InputLabel>
          <Input id="canvas_width" value={stateVars.canvas_w[0]} disabled={false} onChange={(e) => stateVars.canvas_w[1](e.target.value)} />
        </FormControl>

      */