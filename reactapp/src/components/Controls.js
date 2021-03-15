import React, { useState } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ShapeControls from './ShapeControls';
import generateID from '../generateID';

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

    const classes = useStyles();

    const stateVars = props.stateVars;
    const [canvas_w, setCanvas_w] = [stateVars.canvas_w[0], stateVars.canvas_w[1]];
    const [canvas_h, setCanvas_h] = [stateVars.canvas_h[0], stateVars.canvas_h[1]];
    const [dragRotate, setDragRotate] = [stateVars.dragRotate[0], stateVars.dragRotate[1]];
    const [animate, setAnimate] = [stateVars.animate[0], stateVars.animate[1]];
    const [rotate_x, setRotate_x] = [stateVars.rotate_x[0], stateVars.rotate_x[1]];
    const [rotate_y, setRotate_y] = [stateVars.rotate_y[0], stateVars.rotate_y[1]];
    //const [shapes, setShapes] = [stateVars.shapes[0], stateVars.shapes[1]];

    // QUICK TEST
    //const [diameter_0, setDiameter_0] = stateVars.diameter_0;

    let parameters = ['stroke'];

    let iterativeComponents = []; 
    stateVars.addedShapeClasses[0].forEach((string, i) => {
        parameters.forEach((prop) => {
            let elID = prop + '_' + i;
            let elID_label = elID+'_label';
            let stateVal = stateVars[elID][0];
            let sliderComponent = (
                <FormControl id={elID} key={generateID()} className={classes.parameter}>
                        <Typography id={elID_label}>{prop} = {stateVal}</Typography>
                        <Slider className={classes.slider} value={stateVal} min={0} max={200} step={1} onChange={(e,v) => stateVars[elID][1](v)} aria-labelledby={elID_label} />
                    </FormControl>
            )
            iterativeComponents.push(sliderComponent);
        })
        // below has a smooth slider!!
        /* return (
            <FormControl id='diameter_0' className={classes.parameter}>
                        <Typography id='diameter_0_label'>diameter = {diameter_0}</Typography>
                        <Slider className={classes.slider} value={diameter_0} min={0} max={200} step={1} onChange={(e,v) => setDiameter_0(v)} aria-labelledby='diameter_0_label' />
                    </FormControl>
        ) */
    });


    

    return (

        <section className="controls">
            <section className="controls_illo">
                <div className="controlsContainer">

                    <FormControl className={classes.parameter}>
                        <InputLabel htmlFor="canvas_w">Canvas width</InputLabel>
                        <Input id="canvas_w" value={canvas_w} disabled={false} onChange={(e) => setCanvas_w(Number(e.target.value))} />
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


                    {iterativeComponents}

                </div>

            </section>

            <ShapeControls stateVars={stateVars} handleAddShape={props.handleAddShape} zdogDefaultPropValPairs={props.zdogDefaultPropValPairs}
            /* addShape={props.addShape} addNewZdogShape={props.addNewZdogShape} stateShapes={props.shapes} */></ShapeControls>


        </section>

    )

}

export default Controls;