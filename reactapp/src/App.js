import React, { useEffect, useState } from 'react';
import './zdogui.css';
import Controls from './components/Controls';
import Viewer from './components/Viewer';
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
import SourceCodeDialog from './components/SourceCodeDialog';
import IlloExplorer from './components/IlloExplorer';

import { illoPresets } from './illoPresets';

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
  'Shape': new Zdog.Shape()
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
  /* snackbar: {
    backgroundColor: 'white',
    color: 'black'
  }, */
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
  /* invisible: {
    visibility: 'hidden'
  }, */
  smallFont: {
    fontSize: '0.85rem',
  },
  left: {
    marginLeft: '4px'
  },
  /* extraMarginTop: {
    marginTop: '36px'
  } */

}));

function App(props) {

  const [presets, setPresets] = useState('whitebox');

  const [psets, setPsets] = useState(illoPresets[presets]);

  const stateVars = {
    canvas_w: useState(psets.canvas_w),
    canvas_h: useState(psets.canvas_h),
    dragRotate: useState(psets.dragRotate),
    animate: useState(psets.animate),
    rotate_x: useState(psets.rotate_x),
    rotate_y: useState(psets.rotate_y),
    rotate_z: useState(psets.rotate_z),
    spin_x: useState(psets.spin_x),
    spin_y: useState(psets.spin_y),
    spin_z: useState(psets.spin_z),
    easeIO: useState(psets.easeIO),
    animateSelection: useState(psets.animateSelection),
/*     demo: useState('lego'), */
    fallback: useState(psets.fallback),
    animationOption: useState(psets.animationOption),
    bgColor: useState(psets.bgColor)
  }

  const addedShapes = useState(psets.shapeLayers);

  const [open, setOpen] = useState(false);

  /* const [snackbarOpen, setSnackbarOpen] = useState(false); */

  let cursorFocus = useState({
    'id': '',
    'cursorPos': 0
  });

  const selectedNodeId = useState('canvasnode');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [editorVisibility, setEditorVisibility] = React.useState(false);

  const classes = useStyles();

  function updateAllPresets() {
    //setPsets(illoPresets[presets]);
    updateAllStateVars(illoPresets[presets]);
    addedShapes[1](illoPresets[presets].shapeLayers);
  }

  function updateAllStateVars(selectedPresets) {
    Object.keys(stateVars).forEach((param) => {
      stateVars[param][1](selectedPresets[param]);
    })
  }

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

    props_basic.forEach((prop) => {
      if (shapeClass === 'Shape' && prop === 'stroke') {
        data[prop] = 20;
      } else if (prop === 'translate' || prop === 'rotate') {
        data[prop] = new Zdog.Vector({});
      } else if (prop === 'backface' && !(shapeClass === 'Box')) { /* backface needs to remain set to default value of true for Box. If it is set to a color value then all Box-specific face colors do not render properly */
        data[prop] = '#424242';
      } else if (prop === 'color') {
        data[prop] = '#5C5C5C';
      } else {
        let defaultVal = zdogShape[prop];
        data[prop] = defaultVal;
      }
    })

    props_shape.forEach((prop) => {
      if (prop === 'width' || prop === 'height' || prop === 'depth' || prop === 'diameter' || prop === 'length' || prop === 'radius') {
        data[prop] = 100;
      } else if (prop.includes('Face')) {
        if (prop === 'frontFace') {
          data[prop] = '#B8B8B8';
        } else if (prop === 'rearFace') {
          data[prop] = '#424242';
        } else {
          data[prop] = '#5C5C5C';
        }
        faces[prop] = true;
      } else if (prop === 'path') {
        data[prop] = [{line: new Zdog.Vector({})}];
        data.closed = false;
      } else {
        let defaultVal = zdogShape[prop];
        data[prop] = defaultVal;
      }
    })

    return { data, faces };

  }


  function addNewZdogShape(shapeClass, nodeId) {

    let flattened = copyShapes();

    //let shapeClass = (v === 'Sphere') ? 'Shape' : v;

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

  /* function getCode() {
    console.log('getting code');
    setOpen(true);
  } */

  console.log('selectedNodeId[0]: ' + selectedNodeId[0]);

  useEffect(() => {
    if (presets !== 'work_in_progress') {
      console.log(`presets = '${presets}'`)
      updateAllPresets();
      setPresets('work_in_progress');
    } else {
      console.log(`presets = 'work_in_progress'`);
    }
  }, [presets]);


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

          {/* <IconButton className={classes.code} onClick={getCode} aria-label="source code">
            <CodeIcon fontSize="small" />
          </IconButton> */}

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

        </Toolbar>
      </AppBar>

      { open ? <SourceCodeDialog stateVars={stateVars} addedShapes={addedShapes} editorVisibility={[editorVisibility, setEditorVisibility]} open={[open, setOpen]} /> : ''}
        

      <main>

        <IlloExplorer setPresets={setPresets} setOpen={setOpen} selectedNodeId={selectedNodeId} cursorFocus={cursorFocus} addNewZdogShape={addNewZdogShape} stateVars={stateVars} addedShapes={addedShapes}></IlloExplorer>
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