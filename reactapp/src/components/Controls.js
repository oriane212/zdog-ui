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
    const [canvas_w, setCanvas_w] = [stateVars.canvas_w[0], stateVars.canvas_w[1]];
    const [canvas_h, setCanvas_h] = [stateVars.canvas_h[0], stateVars.canvas_h[1]];
    const [dragRotate, setDragRotate] = [stateVars.dragRotate[0], stateVars.dragRotate[1]];
    const [animate, setAnimate] = [stateVars.animate[0], stateVars.animate[1]];
    const [rotate_x, setRotate_x] = [stateVars.rotate_x[0], stateVars.rotate_x[1]];
    const [rotate_y, setRotate_y] = [stateVars.rotate_y[0], stateVars.rotate_y[1]];

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

    return (

        <section className="controls">

            <div className="controlsContainer" id="addShapeHeader">
            <header>
                <ButtonGroup /* color="primary" */ >
                <Select color="primary" className={classes.addshape} value={selectShapeValue} onChange={(e) => {setSelectShapeValue(e.target.value); checkCursorFocus()}}>
                        <MenuItem value="Ellipse">Ellipse</MenuItem>
                        <MenuItem value="Rect">Rect</MenuItem>
                    </Select>
                    <Button id="add" className={classes.add} onClick={handle_onAdd} aria-label="add">
                        <AddIcon /* color="primary" */ fontSize="small" />
                    </Button>
                </ButtonGroup>
                {/* <FormControl>
                    <InputLabel id="new-shape-label">
                        Add a shape
                        </InputLabel>
                    <Select value={selectShapeValue} onChange={(e) => {setSelectShapeValue(e.target.value); checkCursorFocus()}}>
                        <MenuItem value="Ellipse">Ellipse</MenuItem>
                        <MenuItem value="Rect">Rect</MenuItem>
                    </Select>
                </FormControl>
                
                <div className="btnContainer">
                    <IconButton onClick={handle_onAdd} aria-label="add">
                        <AddIcon color="primary" fontSize="small" />
                    </IconButton>
                </div> */}
            </header>
            </div>

            <section className="controls_illo">
                <div className="controlsContainer">

                    <List component="div" aria-labelledby="nested-list-subheader-canvas"
                        /* subheader={
                            <ListSubheader component="div" id="nested-list-subheader-canvas">
                                Canvas
                        </ListSubheader>
                        } */ className={classes.root}>

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

                                <ListItem /* classes={classes.nested} */ className={classes.nested}>
                                    <div>

                                        <FormControl className={classes.parameter}>
                                            <InputLabel htmlFor="canvas_w">Width</InputLabel>
                                            <Input id="canvas_w" value={canvas_w} disabled={false} onChange={
                                                (e) => {setCanvas_w(e.target.value); checkCursorFocus(); }
                                                }/>
                                        </FormControl>

                                        <FormControl className={classes.parameter}>
                                            <InputLabel htmlFor="canvas_h">Height</InputLabel>
                                            <Input id="canvas_h" value={canvas_h} disabled={false} onChange={(e) => {setCanvas_h(e.target.value); checkCursorFocus(); }} />
                                        </FormControl>

                                        <FormControl className={classes.parameterCheckbox}>
                                            <FormControlLabel
                                                label="Drag Rotate"
                                                control={<Checkbox className={classes.checkbox} checked={dragRotate} onChange={() => {setDragRotate(!dragRotate); checkCursorFocus();}} size="small" name="dragRotate" id="dragRotate" color="primary" />}
                                            />
                                        </FormControl>

                                        <FormControl className={classes.parameterCheckbox}>
                                            <FormControlLabel
                                                label="Animate"
                                                control={<Checkbox className={classes.checkbox} checked={animate} onChange={() => {setAnimate(!animate); checkCursorFocus();}} size="small" name="animate" id="animate" color="primary" />}
                                            />
                                        </FormControl>

                                        <FormControl className={classes.subparameter}>
                                            <Typography variant="body2" id="rotate_x_label">Rotate x = {rotate_x}</Typography>
                                            <Slider className={classes.slider} id="rotate_x" value={rotate_x} min={0} max={1} step={0.01} onChange={(e, v) => {setRotate_x(v); checkCursorFocus();}} aria-labelledby="rotate_x_label" disabled={!animate} />
                                        </FormControl>

                                        <FormControl className={classes.subparameter}>
                                            <Typography variant="body2" id="rotate_y_label">Rotate y = {rotate_y}</Typography>
                                            <Slider className={classes.slider} id="rotate_y" value={rotate_y} min={0} max={1} step={0.01} onChange={(e, v) => {setRotate_y(v); checkCursorFocus();}} aria-labelledby="rotate_y_label" disabled={!animate} />
                                        </FormControl>


                                    </div>
                                </ListItem>

                            </List>
                        </Collapse>



                    </List>

                </div>

            </section>
                {(props.addedShapes[0].length > 0) ? <ShapeControls cursorFocus={cursorFocus} addNewZdogShape={props.addNewZdogShape} addedShapes={props.addedShapes}></ShapeControls> : ''}
        </section>

    )

}

export default Controls;