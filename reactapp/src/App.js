import React, { useEffect, useState } from 'react';
import './zdogui.css';
import Controls from './components/Controls';
import Viewer from './components/Viewer';
import ShapeTree from './components/ShapeTree';
import { shapeProperties } from './shapeProperties';

import Zdog from 'zdog';
import { AppBar, Button, IconButton, Toolbar, Typography, makeStyles, Dialog, Container } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';

import { CodeJar } from 'codejar';
import Prism from 'prismjs';
import createScript from './createScript';
import generateID from './generateID';


/* Zdog shape instances */
const zdogDefaultShapes = {
  'Group': new Zdog.Group(),
  'Ellipse': new Zdog.Ellipse(),
  'Rect': new Zdog.Rect(),
  'Box': new Zdog.Box(),
  'Hemisphere': new Zdog.Hemisphere(),
  'RoundedRect': new Zdog.RoundedRect(),
  'Polygon': new Zdog.Polygon(),
  'Cone': new Zdog.Cone(),
  'Cylinder': new Zdog.Cylinder(),
}


const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: "#2b2b2b"
  },
  getCode: {
    right: 16,
    position: "absolute",
    backgroundColor: "#3a3939",
    paddingLeft: 16,
    paddingRight: 16
  },
  container: {
    paddingTop: 24
  }
}));

let valuesarry = [200, 120, 40, 80, 160];


let demos = {
  none: {
    fallback: "An animated illustration consisting of 3D shapes",
    shapelayers: []
  },
  lego: {
    fallback: 'Animated model of a red LEGO piece',
    shapelayers: [
      {
        id: generateID(),
        children: [
          {
            id: generateID(),
            children: [
              {
                id: generateID(),
                children: [],
                open: true,
                shapeClass: 'Cylinder',
                data: {
                  "color": "#c30006",
                  "backface": "#aa0a11",
                  "stroke": "1",
                  "fill": true,
                  "translate": {
                    "x": -80,
                    "y": 0,
                    "z": 0
                  },
                  "rotate": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                  },
                  "diameter": "65",
                  "length": "85",
                  "frontFace": "#000000"
                },
                faces: {}
              },
              {
                id: generateID(),
                children: [],
                open: true,
                shapeClass: 'Cylinder',
                data: {
                  "color": "#c30006",
                  "backface": "#aa0a11",
                  "stroke": "1",
                  "fill": true,
                  "translate": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                  },
                  "rotate": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                  },
                  "diameter": "65",
                  "length": "85",
                  "frontFace": "#000000"
                },
                faces: {}
              },
              {
                id: generateID(),
                children: [],
                open: true,
                shapeClass: 'Cylinder',
                data: {
                  "color": "#c30006",
                  "backface": "#aa0a11",
                  "stroke": "1",
                  "fill": true,
                  "translate": {
                    "x": 80,
                    "y": 0,
                    "z": 0
                  },
                  "rotate": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                  },
                  "diameter": "65",
                  "length": "85",
                  "frontFace": "#000000"
                },
                faces: {}
              }
            ],
            open: true,
            shapeClass: 'Group',
            data: {
              "translate": {
                "x": 0,
                "y": 5,
                "z": 0
              },
              "rotate": {
                "x": 1.5707963267948966,
                "y": 0,
                "z": 0
              }
            },
            faces: {}
          }
        ],
        open: true,
        shapeClass: 'Box',
        data: {
          /*         "addTo": illo, */
          "color": "#c30005",
          "backface": true,
          "stroke": 1,
          "fill": true,
          "translate": {
            "x": 0,
            "y": 0,
            "z": 0
          },
          "rotate": {
            "x": 0,
            "y": 0,
            "z": 0
          },
          "width": "320",
          "height": "96",
          "depth": "160",
          "frontFace": "#b2081f",
          "rearFace": "#c30005",
          "topFace": "#db0623",
          "bottomFace": false,
          "leftFace": "#c30005",
          "rightFace": "#c30005"
        },
        faces: {
          "frontFace": true,
          "rearFace": true,
          "topFace": true,
          "bottomFace": "#a20106",
          "leftFace": true,
          "rightFace": true
        }
      },
      {
        id: generateID(),
        children: [
          {
            id: generateID(),
            children: [],
            open: true,
            shapeClass: 'Cylinder',
            data: {
              "color": "#c30006",
              "backface": true,
              "stroke": 1,
              "fill": true,
              "translate": {
                "x": 40,
                "y": 40,
                "z": 0
              },
              "rotate": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "diameter": "50",
              "length": "20",
              "frontFace": "#db0723"
            },
            faces: {}
          },
          {
            id: generateID(),
            children: [],
            open: true,
            shapeClass: 'Cylinder',
            data: {
              "color": "#c30006",
              "backface": true,
              "stroke": 1,
              "fill": true,
              "translate": {
                "x": 40,
                "y": -40,
                "z": 0
              },
              "rotate": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "diameter": "50",
              "length": "20",
              "frontFace": "#db0723"
            },
            faces: {}
          },
          {
            id: generateID(),
            children: [],
            open: true,
            shapeClass: 'Cylinder',
            data: {
              "color": "#c30006",
              "backface": true,
              "stroke": 1,
              "fill": true,
              "translate": {
                "x": 120,
                "y": 40,
                "z": 0
              },
              "rotate": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "diameter": "50",
              "length": "20",
              "frontFace": "#db0723"
            },
            faces: {}
          },
          {
            id: generateID(),
            children: [],
            open: true,
            shapeClass: 'Cylinder',
            data: {
              "color": "#c30006",
              "backface": true,
              "stroke": 1,
              "fill": true,
              "translate": {
                "x": 120,
                "y": -40,
                "z": 0
              },
              "rotate": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "diameter": "50",
              "length": "20",
              "frontFace": "#db0723"
            },
            faces: {}
          },
          {
            id: generateID(),
            children: [],
            open: true,
            shapeClass: 'Cylinder',
            data: {
              "color": "#c30006",
              "backface": true,
              "stroke": 1,
              "fill": true,
              "translate": {
                "x": -120,
                "y": 40,
                "z": 0
              },
              "rotate": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "diameter": "50",
              "length": "20",
              "frontFace": "#db0723"
            },
            faces: {}
          },
          {
            id: generateID(),
            children: [],
            open: true,
            shapeClass: 'Cylinder',
            data: {
              "color": "#b2081f",
              "backface": true,
              "stroke": 1,
              "fill": true,
              "translate": {
                "x": -120,
                "y": -40,
                "z": 0
              },
              "rotate": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "diameter": "50",
              "length": "20",
              "frontFace": "#db0723"
            },
            faces: {}
          },
          {
            id: generateID(),
            children: [],
            open: true,
            shapeClass: 'Cylinder',
            data: {
              "color": "#b2081f",
              "backface": true,
              "stroke": 1,
              "fill": true,
              "translate": {
                "x": -40,
                "y": 40,
                "z": 0
              },
              "rotate": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "diameter": "50",
              "length": "20",
              "frontFace": "#db0723"
            },
            faces: {}
          },
          {
            id: generateID(),
            children: [],
            open: true,
            shapeClass: 'Cylinder',
            data: {
              "color": "#b2081f",
              "backface": true,
              "stroke": 1,
              "fill": true,
              "translate": {
                "x": -40,
                "y": -40,
                "z": 0
              },
              "rotate": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "diameter": "50",
              "length": "20",
              "frontFace": "#db0723"
            },
            faces: {}
          }
        ],
        open: true,
        shapeClass: 'Group',
        data: {
          "translate": {
            "x": 0,
            "y": -58,
            "z": 0
          },
          "rotate": {
            "x": 1.5707963267948966,
            "y": 0,
            "z": 0
          },
          /*  "addTo": illo */
        },
        faces: {}
      }
    ]
  }
}

function App(props) {

  const stateVars = {
    canvas_w: useState(500),
    canvas_h: useState(500),
    dragRotate: useState(true),
    animate: useState(false),
    rotate_x: useState(0),
    rotate_y: useState(3.141592653589793),
    rotate_z: useState(0.4363323129985824),
    spin_x: useState(.01),
    spin_y: useState(.04),
    spin_z: useState(.01),
    easeIO: useState(
      {
        x: true,
        y: true,
        z: false,
        cycleCount: 400,
        power: 3
      }
    ),
    animateSelection: useState('ease'),
    demo: useState('lego'),
    fallback: useState(demos.lego.fallback)
  }

  const addedShapes = useState(demos.lego.shapelayers);

  const [open, setOpen] = useState(false);

  let cursorFocus = useState({
    'id': '',
    'cursorPos': 0
  });

  const selectedNodeId = useState('canvasnode');

  const classes = useStyles();

  function copyShapes() {
    let newshapearry = [];
    newshapearry.push(addedShapes[0]);
    let flattened = newshapearry.flat();
    return flattened;
  }


  function getDefaultValsForShapeProperties(defaultShapes, shapeClass) {

    let zdogShape = defaultShapes[shapeClass];

    let props_basic = (shapeClass === 'Group') ? ['translate', 'rotate'] : shapeProperties['basic'];

    let props_shape = shapeProperties[shapeClass];
    let data = {};
    let faces = {};

    /*  props_basic.forEach((prop) => {
       let defaultVal = zdogShape[prop];
       data[prop] = defaultVal;
     }) */

    props_basic.forEach((prop) => {
      if (prop === 'translate' || prop === 'rotate') {
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
      if (prop === 'width' || prop === 'height' || prop === 'depth' || prop === 'diameter' || prop === 'length' || prop === 'radius') {
        data[prop] = 100;
      } else if (prop.includes('Face') || prop.includes('face')) {
        data[prop] = '#000000';
        faces[prop] = true;
      } else {
        let defaultVal = zdogShape[prop];
        data[prop] = defaultVal;
      }
    })

    return { data, faces };

  }


  function addNewZdogShape(shapeClass, nodeId) {

    let flattened = copyShapes();

    let shapeDefaults = getDefaultValsForShapeProperties(zdogDefaultShapes, shapeClass);

    let newshape = {
      id: generateID(),
      children: [],
      open: true,
      shapeClass: shapeClass,
      data: shapeDefaults.data,
      faces: shapeDefaults.faces
    }

    if (nodeId === "canvasnode") {

      flattened.push(newshape);

      // set selectedNodeId to newly added shape layer in tree
      selectedNodeId[1]((flattened.length - 1).toString());

    } else {
      let posStrings = nodeId.split('_');
      let posNums = posStrings.map((s) => Number(s));

      let currentShape;

      posNums.forEach((posNum, i) => {
        if ((0 < i) && (i <= (posNums.length - 1))) {
          currentShape = currentShape.children[posNum];
        } else if (i === 0) {
          currentShape = flattened[posNum];
        }
      })

      currentShape.children.push(newshape);

      // set selectedNodeId to newly added shape layer in tree
      let childcount = currentShape.children.length;
      selectedNodeId[1](nodeId + '_' + (childcount - 1));
    }

    addedShapes[1](flattened);

  }

  function getCode() {
    console.log('getting code');
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function removeAllDoubleDashQuotes(scriptString) {
    let fixedScript = scriptString.replaceAll(`"--`, '');
    let fixedScript2 = fixedScript.replaceAll(`--"`, '');
    return fixedScript2;
  }

  console.log('testing outside return');

  useEffect(() => {
    if (open) {
      console.log('open');
      setTimeout(() => {

        let divHTML = document.getElementById('editorHTML');
        let jarHTML = CodeJar(divHTML, Prism.highlightElement);

        let snippet =
          `<canvas id="illo" width="${stateVars.canvas_w[0]}" height="${stateVars.canvas_h[0]}">
          <p>${stateVars.fallback[0]}</p>
        </canvas>`;

        jarHTML.updateCode(snippet);

        let div = document.getElementById('editor');

        if (div !== null) {
          /* function myhighlight(div) {
            const code = 'let foo = bar';
            div.innerHTML = code;
          } */
          let jar = CodeJar(div, Prism.highlightElement);

          if (addedShapes[0].length > 0) {
            let flattened = copyShapes();
            let scriptString = createScript(stateVars, flattened);
            let fixed = removeAllDoubleDashQuotes(scriptString);
            jar.updateCode(fixed);

          }

          // Get code
          let mycode = jar.toString();
          console.log(mycode);

          // Listen to updates
          jar.onUpdate((code) => {
            console.log(code);
          });
        }
      }, 1000);
    }
  }, [open]);

  // TO DO
  /* useEffect(() => {
    console.log('a shapelayer input was just updated');
    // pass this as prop to shapeLayer and add to conditional refocus
  }, [actuallyJustUpdated]) */

  console.log('selectedNodeId[0]: ' + selectedNodeId[0]);


  return (

    <React.Fragment>

      <AppBar elevation={0} position="fixed" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6">
            Zdog UI
          </Typography>
          <Button onClick={getCode} color="inherit" startIcon={<CodeIcon />} aria-label="get code" className={classes.getCode}>Get Code</Button>
          <Dialog maxWidth="md" onClose={handleClose} open={open}>
            <Container className={classes.container}>
              <Typography>HTML</Typography>
              <div id="editorHTML">Canvas element...</div>
              <Typography>JavaScript</Typography>
              <div id="editor">Getting code...</div>
            </Container>

          </Dialog>
        </Toolbar>
      </AppBar>

      <main>

        <ShapeTree selectedNodeId={selectedNodeId} cursorFocus={cursorFocus} addNewZdogShape={addNewZdogShape} stateVars={stateVars} addedShapes={addedShapes}></ShapeTree>
        <Viewer shapes={addedShapes} stateVars={stateVars}></Viewer>
        <Controls selectedNodeId={selectedNodeId} cursorFocus={cursorFocus} stateVars={stateVars} addedShapes={addedShapes}></Controls>
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