import React, { useEffect, useState } from 'react';
import '../zdogui.css';
import { Button, ButtonGroup, Collapse, createMuiTheme, FormControl, FormControlLabel, IconButton, Input, InputLabel, List, ListItem, ListItemText, ListSubheader, makeStyles, MenuItem, Select } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ShapeControls from './ShapeControls';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import CanvasLayer from './CanvasLayer';
import ShapeLayer from './ShapeLayer';

/* const themeBody2 = createMuiTheme({
    props: {
      MuiTypography: {
        variantMapping: {
          body2: 'span'
        },
      },
    },
  }); */


const useStyles = makeStyles((theme) => ({
    slider: {
        width: 155
    },
    checkbox: {
        'padding-bottom': 10
    },
    parameter: {
        display: 'block',
        margin: 12
    },
    parameterCheckbox: {
        display: 'block',
        'margin-left': 12,
        'margin-top': 3,
        'margin-bottom': 3
    },
    subparameter: {
        'margin-left': 38,
        'margin-top': 3,
        'margin-bottom': 3
    },
    myprimary: {
        color: "black"
    },
    root: {
        /* backgroundColor: "#f1f1f1", */
        backgroundColor: "#f9f9f9",
        fontSize: '0.9rem'
    },
    addshape: {
        width: 140,
        height: 32
    },
    add: {
        backgroundColor: 'dodgerblue',
        color: 'white'
    },
    li: {
        paddingTop: 4,
        paddingBottom: 4
    },
    nested: {
        paddingTop: 4,
        paddingBottom: 4
    },
    body2: {
        fontSize: '0.9rem'
    }
}));

function Controls(props) {

    const stateVars = props.stateVars;

    //const [shapes, setShapes] = [stateVars.shapes[0], stateVars.shapes[1]];

    const [canvasLayerOpen, setCanvasLayerOpen] = useState(true);

    const [selectShapeValue, setSelectShapeValue] = useState('Ellipse');

    let cursorFocus = props.cursorFocus;

    const classes = useStyles();

    function handle_onAdd() {
        props.addNewZdogShape(selectShapeValue);
        checkCursorFocus();
    }

    function checkCursorFocus() {
        console.log('inside cursor check');
        if (cursorFocus[0]['id'] !== '') {
            cursorFocus[1]({
                'id': '',
                'cursorPos': 0
              });
            console.log('cursorFocus reset');
        }
    }

    function renderLayerControls() {

        if (props.selectedNodeId[0] === 'canvasnode') {
            return (
                <CanvasLayer checkCursorFocus={checkCursorFocus} cursorFocus={cursorFocus} stateVars={stateVars}></CanvasLayer>
            )
        } else {
            return (
                <ShapeLayer selectedNodeId={props.selectedNodeId} addedShapes={props.addedShapes} checkCursorFocus={checkCursorFocus} cursorFocus={cursorFocus} stateVars={stateVars}></ShapeLayer>
            )
        }
    }

    return (

        <section className="controls">

            {/* <div className="controlsContainer" id="addShapeHeader">
            <header>
                <ButtonGroup>
                <Select color="primary" className={classes.addshape} value={selectShapeValue} onChange={(e) => {setSelectShapeValue(e.target.value); checkCursorFocus()}}>
                        <MenuItem value="Ellipse">Ellipse</MenuItem>
                        <MenuItem value="Rect">Rect</MenuItem>
                    </Select>
                    <Button id="add" className={classes.add} onClick={handle_onAdd} aria-label="add">
                        <AddIcon fontSize="small" />
                    </Button>
                </ButtonGroup>
                
            </header>
            </div> */}

            <section className="controls_illo">
                <div className="controlsContainer">

                    {/* <List component="div" aria-labelledby="nested-list-subheader-canvas" className={classes.root}>
                        <ListItem className={classes.li}>
                            <ListItemText primary="Canvas" />
                            {canvasLayerOpen ?
                                <IconButton onClick={() => setCanvasLayerOpen(!canvasLayerOpen)} className={classes.myprimary} aria-label="Expand less"><ExpandLess /></IconButton>
                                :
                                <IconButton onClick={() => setCanvasLayerOpen(!canvasLayerOpen)} className={classes.myprimary} aria-label="Expand more"><ExpandMore /></IconButton>
                            }
                        </ListItem>

                        <Collapse in={canvasLayerOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <ListItem className={classes.nested}> */}
                                
                    {renderLayerControls()}

                            {/*     </ListItem>

                            </List>
                        </Collapse>



                    </List> */}

                </div>

            </section>
                
        </section>

    )

}

/*
{(props.addedShapes[0].length > 0) ? <ShapeControls cursorFocus={cursorFocus} addNewZdogShape={props.addNewZdogShape} addedShapes={props.addedShapes}></ShapeControls> : ''}
*/

export default Controls;