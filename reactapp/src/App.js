import React, { useEffect, useState } from 'react';
import './zdogui.css';
import Controls from './components/Controls';
import Viewer from './components/Viewer';
import { shapeProperties } from './shapeProperties';

import Zdog from 'zdog';
import { AppBar, Button, IconButton, Toolbar, Typography, makeStyles } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';



const useStyles = makeStyles((theme) => ({
  bar: {
      backgroundColor: "#2b2b2b"
  },
  getCode: {
    right: 16,
    position: "absolute",
    backgroundColor: "#444444"
  }
}));

const zdogDefaultShapes = {
  'Ellipse': new Zdog.Ellipse(),
  'Rect': new Zdog.Rect()
}

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

  const classes = useStyles();

  function copyShapes() {
    let newshapearry = [];
    newshapearry.push(addedShapes[0]);
    let flattened = newshapearry.flat();
    return flattened;
  }


  function getDefaultValsForShapeProperties(defaultShapes, shapeClass) {

    let zdogShape = defaultShapes[shapeClass];
    let props_basic = shapeProperties['basic'];
    let props_shape = shapeProperties[shapeClass];
    let data = {};

    /*  props_basic.forEach((prop) => {
       let defaultVal = zdogShape[prop];
       data[prop] = defaultVal;
     }) */

    props_basic.forEach((prop) => {
      if (prop === 'translate') {
        data[prop] = new Zdog.Vector({});
        /* data[prop]['x'] = zdogShape[prop]['x'];
        data[prop].y = zdogShape[prop].y;
        data[prop].z = zdogShape[prop].z; */
      } else {
        let defaultVal = zdogShape[prop];
        data[prop] = defaultVal;
      }

    })

    props_shape.forEach((prop) => {
      let defaultVal = zdogShape[prop];
      data[prop] = defaultVal;
    })

    return data;

  }


  function addNewZdogShape(shapeClass) {

    //if (shapeClass === 'Ellipse') {

    let flattened = copyShapes();

    //let i = Math.floor(Math.random() * valuesarry.length);

    let newshape = {
      open: true,
      shapeClass: shapeClass,
      data: getDefaultValsForShapeProperties(zdogDefaultShapes, shapeClass)
      /* data: {
        //addTo: '',
        diameter: valuesarry[i],
        stroke: 20
      } */
    }

    //valuesarry.splice(i, 1);
    //console.log(valuesarry);

    flattened.push(newshape);
    addedShapes[1](flattened);

    //console.log('inside addNewZdogShape: ');

    //}
  }


  console.log('testing outside return');


  return (

    <React.Fragment>

      <AppBar elevation={0} position="fixed" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6">
            Zdog UI
            </Typography>
          <Button color="inherit" aria-label="get code" className={classes.getCode}><CodeIcon /></Button>
        </Toolbar>
      </AppBar>

      <main>


        <Controls addNewZdogShape={addNewZdogShape} stateVars={stateVars} addedShapes={addedShapes}></Controls>
        <Viewer shapes={addedShapes} stateVars={stateVars}></Viewer>
      </main>

    </React.Fragment>

  );

}

export default App;


/* <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" >
              Zdog UI
            </Typography>
              <IconButton edge="end" color="inherit" aria-label="get code">
              <CodeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        */

/*
<header>
<Typography variant="h6">
Zdog UI
</Typography>
  <IconButton edge="end" color="inherit" aria-label="get code">
  <CodeIcon />
</IconButton>
</header>
*/