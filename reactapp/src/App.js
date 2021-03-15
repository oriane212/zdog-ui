import React, { useEffect, useState } from 'react';
import './zdogui.css';
import Controls from './components/Controls';
import Viewer from './components/Viewer';


import Zdog from 'zdog';

/* TO DO:
    - figure out steps/flow for automating shape controls, where prototype data is stored
    - decide which properties to ignore creating controls for


    STEPS: 
    1. store Shape, Ellipse, and Rect pairs (in an array of objects?)
    2. (for now) filter results by value type, store only bool, numbers and floats, and string color values (or do this is controls instead of twice)
    3. have a base Shape set of controls + controls for specific shape subclass
  */

//const zdogShape = Object.getOwnPropertyNames(new Zdog.Shape());


/* const zdogShape = new Zdog.Shape(); */
const zdogDefaultShapes = {
  'Ellipse' : new Zdog.Ellipse()
}


function compileFilteredPairs(objOfDefaultShapes) {
  let objOfPairs = {};
  Object.keys(objOfDefaultShapes).forEach((shapeString) => {
    let pairs = Object.keys(objOfDefaultShapes[shapeString]).map((property) => {

      // include only properties with boolean and number values
      if (typeof objOfDefaultShapes[shapeString][property] === 'boolean' | typeof objOfDefaultShapes[shapeString][property] === 'number') {
        return [property, objOfDefaultShapes[shapeString][property]];
      }

    })
    objOfPairs[shapeString] = pairs;
  })
  return objOfPairs;
}


const zdogDefaultPropValPairs = compileFilteredPairs(zdogDefaultShapes);

/* const pairs = Object.keys(zdogShape).map((property) => {
  return [property, zdogShape[property]];
}) */

//const shapePropValPairs = 

//console.log(pairs);



let valuesarry = [200, 120, 40, 80, 160];

function App(props) {

  let stateVars = {
    canvas_w: useState(240),
    canvas_h: useState(240),
    dragRotate: useState(false),
    animate: useState(false),
    rotate_x: useState(0),
    rotate_y: useState(.06),
    addedShapeClasses: useState(['Ellipse']),
    // QUICK TEST
    diameter_0: useState(100),
    stroke_0: useState(20)
    //shapeCount: useState(0)
  }

  function copyArry(arry) {
    let newshapearry = [];
    newshapearry.push(arry);
    let flattened = newshapearry.flat();
    return flattened;
  }

  /* const addedShapes = useState([]); */

  /* function copyShapes() {
    let newshapearry = [];
    newshapearry.push(addedShapes[0]);
    let flattened = newshapearry.flat();
    return flattened;
  } */


  /* function addAllControlPropertiesForShapeToStateVars(newshape) {
    let i = newshape.shapeindex;
    Object.keys(newshape.data).forEach((property) => {
      if (typeof newshape.data[property] === "boolean" | typeof newshape.data[property] === "number") {
        // create new state variable for each property + shape index (eg. 'stroke_0' for stroke value of shape at addedShapes[0][0])
        let stateVarName = property + '_' + i;
        stateVars[stateVarName] = useState(newshape.data[property]);
      }
    })
  } */


  function handleAddShape(shapeClass) {

    let i = stateVars.addedShapeClasses[0].length-1;
    //let i = stateVars.shapeCount[0];
    //let zdogDefault = zdogDefaultShapes[shapeClass];

    //stateVars[`shapeClass_${i}`] = shapeClass;


    zdogDefaultPropValPairs[shapeClass].forEach((pair) => {
      let [prop,val] = pair;
      let stateVarName = prop + '_' + i;
      // stateVars[stateVarName] = useState(val); // // // ERROR: React Hook "useState" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function // // //
    })



    /* Object.keys(zdogDefault).forEach((property) => {
      if (typeof zdogDefault[property] === "boolean" | typeof zdogDefault[property] === "number") {
        // create new state variable for each property + shape index (eg. 'stroke_0' for stroke value of shape 0)
        let stateVarName = property + '_' + i;
        stateVars[stateVarName] = useState(zdogDefault[property]);
      }
    }) */

    // maybe instead of count, keep an array of just each added shape's class (string), since it will never change
    // benefit is fewer statevars, disadvantage is a little less straightfoward to update state (array vs. int)
    let addedShapeClassesCopy = copyArry(stateVars.addedShapeClasses[0]);
    addedShapeClassesCopy.push(shapeClass);
    
    stateVars.addedShapeClasses[1](addedShapeClassesCopy);

    // add 1 to total shape count in state
    /* stateVars.shapeCount[1](i+1); */

  }



  /* function addShape(shapeClass) {
    let data = {
      addTo: ''
    };
    // copy Shape properties into data object
    let pairsCopy = [...pairs];
    pairsCopy.forEach((pair) => {
      data[pair[0]] = pair[1];
      console.log('data inside addShape: ', data);
    })
    
    // copy subclass properties
    // combine into one object of default shape data

    // create new shape object with shapeClass and shapeData properties
    let newshape = {
      shapeClass: shapeClass,
      shapeindex: addedShapes[0].length(),
      data: data
    }

    // copy shape array in state
    let flattened = copyShapes();
    // add new shape to copied array
    flattened.push(newshape);
    // set addedShapes to copy that includes new shape
    addedShapes[1](flattened);

    addAllControlPropertiesForShapeToStateVars(newshape);

    // for testing:
    //addNewZdogShape(shapeClass);

  } */


  /* function addNewZdogShape(shapeClass) {

    if (shapeClass === 'Ellipse') {

      let flattened = copyShapes();

      let i = Math.floor(Math.random() * valuesarry.length);

      let newshape = {
        shapeClass: 'Ellipse',
        data: {
          addTo: '',
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
  } */


  console.log('testing outside return');


  return (

    <React.Fragment>

      <main>
        <Controls /* copyShapes={copyShapes} */ /* addShape={addShape} */ /* addNewZdogShape={addNewZdogShape} */ 
          stateVars={stateVars} 
          handleAddShape={handleAddShape}
          zdogDefaultPropValPairs={zdogDefaultPropValPairs}
          /* shapes={addedShapes} */>
          </Controls>
        <Viewer /* shapes={addedShapes} */ 
          stateVars={stateVars}
          zdogDefaultPropValPairs={zdogDefaultPropValPairs}
          >
          </Viewer>
      </main>

      <section id="container"></section>

    </React.Fragment>

  );

}

export default App;