import React, { useState } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ShapeControls from './ShapeControls';

const useStyles = makeStyles((theme) => ({
    slider: {
        width: 200
    },
    checkbox: {
        'padding-bottom': 12
    },
    parameter: {
        display: 'block',
        margin: 16
    },
    subparameter: {
        'margin-left': 32,
        'margin-top': 3,
        'margin-bottom': 3
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

    const classes = useStyles();

    return (

        <section className="controls">
            <section className="controls_illo">
                <div className="controlsContainer">

                    <FormControl className={classes.parameter}>
                        <InputLabel htmlFor="canvas_w">Canvas width</InputLabel>
                        <Input id="canvas_w" value={canvas_w} disabled={false} onChange={(e) => setCanvas_w(e.target.value)} />
                    </FormControl>

                    <FormControl className={classes.parameter}>
                        <InputLabel htmlFor="canvas_h">Canvas height</InputLabel>
                        <Input id="canvas_h" value={canvas_h} disabled={false} onChange={(e) => setCanvas_h(e.target.value)} />
                    </FormControl>

                    <FormControl className={classes.parameter}>
                        <FormControlLabel
                            label="Drag Rotate"
                            control={<Checkbox className={classes.checkbox} checked={dragRotate} onChange={() => setDragRotate(!dragRotate)} name="dragRotate" id="dragRotate" color="primary" />}
                        />
                    </FormControl>

                    <FormControl className={classes.parameter}>
                        <FormControlLabel
                            label="Animate"
                            control={<Checkbox className={classes.checkbox} checked={animate} onChange={() => setAnimate(!animate)} name="animate" id="animate" color="primary" />}
                        />
                    </FormControl>

                    <FormControl className={classes.subparameter}>
                        <Typography id="rotate_x_label">Rotate x = {rotate_x}</Typography>
                        <Slider className={classes.slider} id="rotate_x" value={rotate_x} min={0} max={1} step={0.01} onChange={(e, v) => setRotate_x(v)} aria-labelledby="rotate_x_label" disabled={!animate} />
                    </FormControl>

                    <FormControl className={classes.subparameter}>
                        <Typography id="rotate_y_label">Rotate y = {rotate_y}</Typography>
                        <Slider className={classes.slider} id="rotate_y" value={rotate_y} min={0} max={1} step={0.01} onChange={(e, v) => setRotate_y(v)} aria-labelledby="rotate_y_label" disabled={!animate} />
                    </FormControl>

                </div>

            </section>

            <ShapeControls addNewZdogShape={props.addNewZdogShape} stateShapes={props.shapes}></ShapeControls>


        </section>

    )

}

export default Controls;