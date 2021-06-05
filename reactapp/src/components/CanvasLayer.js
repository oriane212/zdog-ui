import { Checkbox, FormControl, FormControlLabel, Input, InputLabel, makeStyles, Slider, Typography } from '@material-ui/core';
import React from 'react';

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

function CanvasLayer(props) {

    const stateVars = props.stateVars;
    const [canvas_w, setCanvas_w] = [stateVars.canvas_w[0], stateVars.canvas_w[1]];
    const [canvas_h, setCanvas_h] = [stateVars.canvas_h[0], stateVars.canvas_h[1]];
    const [dragRotate, setDragRotate] = [stateVars.dragRotate[0], stateVars.dragRotate[1]];
    const [animate, setAnimate] = [stateVars.animate[0], stateVars.animate[1]];
    const [rotate_x, setRotate_x] = [stateVars.rotate_x[0], stateVars.rotate_x[1]];
    const [rotate_y, setRotate_y] = [stateVars.rotate_y[0], stateVars.rotate_y[1]];

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

            <FormControl className={classes.parameterCheckbox}>
                <FormControlLabel
                    label="Drag Rotate"
                    control={<Checkbox className={classes.checkbox} checked={dragRotate} onChange={() => { setDragRotate(!dragRotate); checkCursorFocus(); }} size="small" name="dragRotate" id="dragRotate" color="primary" />}
                />
            </FormControl>

            <FormControl className={classes.parameterCheckbox}>
                <FormControlLabel
                    label="Animate"
                    control={<Checkbox className={classes.checkbox} checked={animate} onChange={() => { setAnimate(!animate); checkCursorFocus(); }} size="small" name="animate" id="animate" color="primary" />}
                />
            </FormControl>

            <FormControl className={classes.subparameter}>
                <Typography variant="body2" id="rotate_x_label">Rotate x = {rotate_x}</Typography>
                <Slider className={classes.slider} id="rotate_x" value={rotate_x} min={0} max={1} step={0.01} onChange={(e, v) => { setRotate_x(v); checkCursorFocus(); }} aria-labelledby="rotate_x_label" disabled={!animate} />
            </FormControl>

            <FormControl className={classes.subparameter}>
                <Typography variant="body2" id="rotate_y_label">Rotate y = {rotate_y}</Typography>
                <Slider className={classes.slider} id="rotate_y" value={rotate_y} min={0} max={1} step={0.01} onChange={(e, v) => { setRotate_y(v); checkCursorFocus(); }} aria-labelledby="rotate_y_label" disabled={!animate} />
            </FormControl>


        </div>
    )


}

export default CanvasLayer;