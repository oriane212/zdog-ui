import React, { useEffect, useState } from 'react';
import './zdogui.css';
import Controls from './components/Controls';
import Viewer from './components/Viewer';
import ShapeTree from './components/ShapeTree';
import { shapeProperties } from './shapeProperties';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Zdog from 'zdog';
import { AppBar, Button, IconButton, Toolbar, Typography, makeStyles, Dialog, Container, Icon, Snackbar } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';

import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

/* import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'; */
/* import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'; */

import { CodeJar } from 'codejar';
/* import Prism from 'prismjs'; */
import createScript from './createScript';
import generateID from './generateID';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
/* import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript); */

import FileCopyIcon from '@material-ui/icons/FileCopy';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
    backgroundColor: "#fafafa",
    color: '#eeaa00',
    borderBottom: '1px solid #ededed',
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  purple: {
    color: '#636'
  },
  snackbar: {
    backgroundColor: 'white',
    color: 'black'
  },
  /* getCode: {
    right: 16,
    position: "absolute",
    backgroundColor: "rgb(100 50 99)",
    paddingLeft: 16,
    paddingRight: 16,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#eeaa00',
    color: '#eeaa00',
    '&:hover': {
      backgroundColor: '#eeaa00',
      color: "rgb(100 50 99)"
    }
  }, */
  code: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    '&:hover': {
      borderColor: '#f0f0f0',
      color: 'black'
    }
  },
  container: {
    paddingTop: 24,
    backgroundColor: '#fafafa'
  },
  invisible: {
    visibility: 'hidden'
  },
  smallFont: {
    fontSize: '0.85rem',
  },
  left: {
    marginLeft: '4px'
  },
  extraMarginTop: {
    marginTop: '36px'
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
                  "translate": new Zdog.Vector({
                    "x": -80,
                    "y": 0,
                    "z": 0
                  }),
                  "rotate": new Zdog.Vector({}),
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
                  "translate": new Zdog.Vector({}),
                  "rotate": new Zdog.Vector({}),
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
                  "translate": new Zdog.Vector({
                    "x": 80,
                    "y": 0,
                    "z": 0
                  }),
                  "rotate": new Zdog.Vector({}),
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
              "translate": new Zdog.Vector({
                "x": 0,
                "y": 5,
                "z": 0
              }),
              "rotate": new Zdog.Vector({
                "x": 1.5707963267948966,
                "y": 0,
                "z": 0
              })
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
          "translate": new Zdog.Vector({}),
          "rotate": new Zdog.Vector({}),
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
              "translate": new Zdog.Vector({
                "x": 40,
                "y": 40,
                "z": 0
              }),
              "rotate": new Zdog.Vector({}),
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
              "translate": new Zdog.Vector({
                "x": 40,
                "y": -40,
                "z": 0
              }),
              "rotate": new Zdog.Vector({}),
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
              "translate": new Zdog.Vector({
                "x": 120,
                "y": 40,
                "z": 0
              }),
              "rotate": new Zdog.Vector({}),
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
              "translate": new Zdog.Vector({
                "x": 120,
                "y": -40,
                "z": 0
              }),
              "rotate": new Zdog.Vector({}),
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
              "translate": new Zdog.Vector({
                "x": -120,
                "y": 40,
                "z": 0
              }),
              "rotate": new Zdog.Vector({}),
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
              "translate": new Zdog.Vector({
                "x": -120,
                "y": -40,
                "z": 0
              }),
              "rotate": new Zdog.Vector({}),
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
              "translate": new Zdog.Vector({
                "x": -40,
                "y": 40,
                "z": 0
              }),
              "rotate": new Zdog.Vector({}),
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
              "translate": new Zdog.Vector({
                "x": -40,
                "y": -40,
                "z": 0
              }),
              "rotate": new Zdog.Vector({}),
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
          "translate": new Zdog.Vector({
            "x": 0,
            "y": -58,
            "z": 0
          }),
          "rotate": new Zdog.Vector({
            "x": 1.5707963267948966,
            "y": 0,
            "z": 0
          }),
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
    rotate_y: useState(0),
    rotate_z: useState(0),
    spin_x: useState(.01),
    spin_y: useState(.04),
    spin_z: useState(.01),
    easeIO: useState(
      {
        x: true,
        y: true,
        z: false,
        cycleCount: 200,
        power: 3
      }
    ),
    animateSelection: useState('ease'),
    demo: useState('lego'),
    fallback: useState(demos.lego.fallback),
    animationOption: useState('animate'),
    bgColor: useState('#FFDDBB')
  }

  const addedShapes = useState(demos.lego.shapelayers);

  const [open, setOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  let cursorFocus = useState({
    'id': '',
    'cursorPos': 0
  });

  const selectedNodeId = useState('canvasnode');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [editorVisibility, setEditorVisibility] = React.useState(false);

  const classes = useStyles();

  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const openInNewTab = (url) => {
    handleCloseMore();
    window.open(url);
  }

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
    setEditorVisibility(false);
  }

  function removeAllDoubleDashQuotes(scriptString) {
    let fixedScript = scriptString.replaceAll(`"--`, '');
    let fixedScript2 = fixedScript.replaceAll(`--"`, '');
    return fixedScript2;
  }

  function clipboardCopy(elID) {
    let text = document.getElementById(elID).innerText;
    navigator.clipboard.writeText(text).then(function() {
      console.log('copy to clipboard successful');
      // add notification
      setSnackbarOpen(true);
    }, function() {
      console.log('copy to clipboard failed')
    })
  }

  console.log('testing outside return');

  useEffect(() => {
    if (open) {
      console.log('open');
      setTimeout(() => {

        // HTML snippets

        let codetagsHTML_canvas = document.getElementById('codetagsHTML_canvas');
        let codetagsHTML_script = document.getElementById('codetagsHTML_script');

        let snippet_canvas =
          `<!-- canvas for Zdog illo -->
<canvas id="illo" style="background-color:${stateVars.bgColor[0]};" width="${stateVars.canvas_w[0]}" height="${stateVars.canvas_h[0]}">
  <p>${stateVars.fallback[0]}</p>
</canvas>`;

        let snippet_script = 
        `<!-- Zdog CDN and illo.js -->
<script src="https://unpkg.com/zdog@1/dist/zdog.dist.min.js"></script>
<script src="illo.js"></script>`;

        let jarHTML_canvas = CodeJar(codetagsHTML_canvas, hljs.highlightAll);
        jarHTML_canvas.updateCode(snippet_canvas);

        let jarHTML_script = CodeJar(codetagsHTML_script, hljs.highlightAll);
        jarHTML_script.updateCode(snippet_script);

        // JavaScript snippet
  
        let codetagsJS = document.getElementById('codetagsJS');
        
        if (codetagsJS !== null) {
          let jar = CodeJar(codetagsJS, hljs.highlightAll);

          if (addedShapes[0].length > 0) {
            let flattened = copyShapes();
            let scriptString = createScript(stateVars, flattened);
            let fixed = removeAllDoubleDashQuotes(scriptString);
            jar.updateCode(fixed);
          }

          // Get code
          let mycode = jar.toString();
          //console.log(mycode);

          // Listen to updates
          jar.onUpdate((code) => {
            console.log(code);
          });
        }

        // set editors to be visible
        setEditorVisibility(true);

      }, 200);
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
        <Toolbar variant='dense' className={classes.toolbar}>
          <Typography variant="h5">
            Zdog <span className={classes.purple}>UI</span>
          </Typography>

      {/*     <IconButton>
            <CreateNewFolderIcon fontSize="small" />
          </IconButton> */}

          <div>

          {/* <IconButton>
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton>
            <AddIcon fontSize="small" />
          </IconButton> */}

          <IconButton className={classes.code} onClick={getCode} aria-label="source code">
            <CodeIcon fontSize="small" />
          </IconButton>

          <IconButton className={classes.left} onClick={handleClickMore} aria-label="more">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <Menu
            id="more-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMore}
          >
            <MenuItem className={classes.smallFont} onClick={() => openInNewTab('https://github.com/oriane212/zdog-ui')} value="Zdog-UI on GitHub">Zdog-UI on GitHub <OpenInNewIcon color='action' className={classes.left} fontSize="small"/></MenuItem>
            <MenuItem className={classes.smallFont} onClick={() => openInNewTab('https://zzz.dog/')} value="Zdog website">Zdog website <OpenInNewIcon color='action' className={classes.left} fontSize="small"/> </MenuItem>
          </Menu>

          </div>

          {/* <div></div> */}

          {/* <Button onClick={getCode} color="inherit" startIcon={<CodeIcon />} aria-label="get code" className={classes.getCode}>Get Code</Button> */}
          <Dialog maxWidth="md" onClose={handleClose} open={open} className={(!editorVisibility) ? classes.invisible : ''}>
            <Container className={classes.container}>
              <div className="editorHeader">
                <Typography>HTML</Typography>
              </div>
              <div className="contentcopy">
              <IconButton onClick={() => clipboardCopy('editorHTML_canvas')} id="copyHTML_canvas" aria-label="Copy to clipboard"><ContentCopyOutlinedIcon fontSize='small' /></IconButton>
              </div>
              <div id="editorHTML_canvas">
                <pre>
                  <code id="codetagsHTML_canvas" className="language-html">''
                  </code>
                </pre>
              </div>
              <div className="contentcopy">
              <IconButton onClick={() => clipboardCopy('editorHTML_script')} id="copyHTML_script" aria-label="Copy to clipboard"><ContentCopyOutlinedIcon fontSize="small"/></IconButton>
              </div>
              <div id="editorHTML_script">
                <pre>
                  <code id="codetagsHTML_script" className="language-html">''
                  </code>
                </pre>
              </div>
              <div className="editorHeader">
                <Typography className={classes.extraMarginTop}>JavaScript</Typography>
              </div>
              <div className="contentcopy">
                <IconButton onClick={() => clipboardCopy('editor')} id="copyJS" aria-label="Copy to clipboard"><ContentCopyOutlinedIcon fontSize="small"/></IconButton>
              </div>
              <div id="editor">
                <pre>
                  <code id="codetagsJS" className="language-javascript">''
                  </code>
                </pre>
              </div>
              <Snackbar
                ContentProps={{ className: classes.snackbar}}
                anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Copied to clipboard!"
              />
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