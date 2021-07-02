import { Checkbox, FormControl, FormControlLabel, Input, InputLabel, makeStyles, Slider, Typography } from '@material-ui/core';
import React from 'react';
import RotateSliders from './RotateSliders';

const useStyles = makeStyles((theme) => ({
    slider: {
        width: 155,
        display: 'block',
        marginTop: 4,
        marginBottom: 6,
        marginLeft: 12
    },
    checkbox: {
        'padding-bottom': 10
    },
    parameter: {
        display: 'block',
        margin: 12
    },
    parameterSubGroup: {
        display: 'block',
        margin: 12,
        marginTop: 12,
        fontSize: 'small'
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
    },
    sublabel: {
        fontSize: 'small',
        'margin-bottom': 14,
        marginTop: 8,
        marginLeft: 8
    }
}));

function CanvasLayer(props) {

    const stateVars = props.stateVars;
    const [canvas_w, setCanvas_w] = [stateVars.canvas_w[0], stateVars.canvas_w[1]];
    const [canvas_h, setCanvas_h] = [stateVars.canvas_h[0], stateVars.canvas_h[1]];
    const [dragRotate, setDragRotate] = [stateVars.dragRotate[0], stateVars.dragRotate[1]];
    const [animate, setAnimate] = [stateVars.animate[0], stateVars.animate[1]];
    const [rotate_x, setRotate_x] = [stateVars.rotate_x[0], stateVars.rotate_x[1]];
    const [rotate_y, setRotate_y] = [stateVars.rotate_y[0], stateVars.rotate_y[1]];
    const [rotate_z, setRotate_z] = [stateVars.rotate_z[0], stateVars.rotate_z[1]];

    let cursorFocus = props.cursorFocus;
    let checkCursorFocus = props.checkCursorFocus;

    const classes = useStyles();

    return (
        <div>

            <FormControl className={classes.parameter}>
                <InputLabel htmlFor="canvas_w">Width</InputLabel>
                <Input id="canvas_w" value={canvas_w} disabled={false} onChange={
                    (e) => { setCanvas_w(e.target.value); checkCursorFocus(); }
                } />
            </FormControl>

            <FormControl className={classes.parameter}>
                <InputLabel htmlFor="canvas_h">Height</InputLabel>
                <Input id="canvas_h" value={canvas_h} disabled={false} onChange={(e) => { setCanvas_h(e.target.value); checkCursorFocus(); }} />
            </FormControl>


            <RotateSliders nodeId={'canvasnode'} rotateData={stateVars} updateShapes='' />


            <FormControl className={classes.parameterCheckbox}>
                <FormControlLabel
                    label="Drag Rotate"
                    control={<Checkbox className={classes.checkbox} checked={dragRotate} onChange={() => { setDragRotate(!dragRotate); checkCursorFocus(); }} size="small" name="dragRotate" id="dragRotate" color="primary" />}
                />
            </FormControl>


           {/*  <FormControl className={classes.parameterCheckbox}>
                <FormControlLabel
                    label="Animate"
                    control={<Checkbox className={classes.checkbox} checked={animate} onChange={() => { setAnimate(!animate); checkCursorFocus(); }} size="small" name="animate" id="animate" color="primary" />}
                />
            </FormControl>

            <div className={classes.parameterSubGroup}>

            <p className={classes.sublabel}>Rotation Speed</p>

            <FormControl className={classes.slider}>
                <Typography variant="body2" id="rotate_x_label">x = {((rotate_x)*(180/Math.PI)).toFixed(1)} <span className='tinytext'>deg/rerender</span></Typography>
                <Slider className={classes.slider} id="rotate_x" value={rotate_x} min={0} max={1} step={0.01} onChange={(e, v) => { setRotate_x(v); checkCursorFocus(); }} aria-labelledby="rotate_x_label" disabled={!animate} />
            </FormControl>

            <FormControl className={classes.slider}>
                <Typography variant="body2" id="rotate_y_label">y = {((rotate_y)*(180/Math.PI)).toFixed(1)} <span className='tinytext'>deg/rerender</span></Typography>
                <Slider className={classes.slider} id="rotate_y" value={rotate_y} min={0} max={1} step={0.01} onChange={(e, v) => { setRotate_y(v); checkCursorFocus(); }} aria-labelledby="rotate_y_label" disabled={!animate} />
            </FormControl>

            <FormControl className={classes.slider}>
                <Typography variant="body2" id="rotate_z_label">z = {((rotate_z)*(180/Math.PI)).toFixed(1)} <span className='tinytext'>deg/rerender</span></Typography>
                <Slider className={classes.slider} id="rotate_z" value={rotate_z} min={0} max={1} step={0.01} onChange={(e, v) => { setRotate_z(v); checkCursorFocus(); }} aria-labelledby="rotate_z_label" disabled={!animate} />
            </FormControl>

            </div> */}


        </div>
    )


}

export default CanvasLayer;