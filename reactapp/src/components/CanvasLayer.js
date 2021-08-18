import { Checkbox, FormControl, FormControlLabel, TextField, Tooltip, Badge, Select, MenuItem, Input, InputLabel, makeStyles, Slider, Typography } from '@material-ui/core';
import React from 'react';
import RotateSliders from './RotateSliders';
import ParameterSlider from './ParameterSlider';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HelpIcon from '@material-ui/icons/Help';

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
    inlinecheckbox: {
        'padding-bottom': 10,
        display: 'inline-block'
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
    inlineParameterCheckbox: {
        display: 'inline-block',
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    smallFont: {
        fontSize: 'small'
    },
    /* mediumFont: {
        fontSize: 16
    } */
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
    const [spin_x, setSpin_x] = [stateVars.spin_x[0], stateVars.spin_x[1]];
    const [spin_y, setSpin_y] = [stateVars.spin_y[0], stateVars.spin_y[1]];
    const [spin_z, setSpin_z] = [stateVars.spin_z[0], stateVars.spin_z[1]];
    const [easeIO, setEaseIO] = [stateVars.easeIO[0], stateVars.easeIO[1]];
    const [animateSelection, setAnimateSelection] = [stateVars.animateSelection[0], stateVars.animateSelection[1]];
    const [fallback, setFallback] = [stateVars.fallback[0], stateVars.fallback[1]];

    let cursorFocus = props.cursorFocus;
    let checkCursorFocus = props.checkCursorFocus;

    const classes = useStyles();

    const marks_cycleCount = [
        {
            value: 150,
            label: 'short',
        },
        {
            value: 450,
            label: 'long',
        }
    ];

    function updateEaseIO(paramID, val) {
        let splitID = paramID.split('_');
        let param = splitID[1];

        let easeIO_copy = JSON.parse(JSON.stringify(easeIO));
        easeIO_copy[param] = val;

        setEaseIO(easeIO_copy);
    }

    function handleAnimateSelect(e) {
        setAnimateSelection(e.target.value);
    }

    let animateParameters;

    if (animateSelection === 'spin') {
        animateParameters = (
            <React.Fragment>
                <FormControl className={classes.slider}>
                    <Typography variant="body2" id="spin_x_label">x = {((spin_x) * (180 / Math.PI)).toFixed(1)} <span className='tinytext'>deg/rerender</span></Typography>
                    <Slider className={classes.slider} id="spin_x" value={spin_x} min={0} max={1} step={0.01} onChange={(e, v) => { setSpin_x(v); checkCursorFocus(); }} aria-labelledby="spin_x_label" disabled={!animate} />
                </FormControl>

                <FormControl className={classes.slider}>
                    <Typography variant="body2" id="spin_y_label">y = {((spin_y) * (180 / Math.PI)).toFixed(1)} <span className='tinytext'>deg/rerender</span></Typography>
                    <Slider className={classes.slider} id="spin_y" value={spin_y} min={0} max={1} step={0.01} onChange={(e, v) => { setSpin_y(v); checkCursorFocus(); }} aria-labelledby="spin_y_label" disabled={!animate} />
                </FormControl>

                <FormControl className={classes.slider}>
                    <Typography variant="body2" id="spin_z_label">z = {((spin_z) * (180 / Math.PI)).toFixed(1)} <span className='tinytext'>deg/rerender</span></Typography>
                    <Slider className={classes.slider} id="spin_z" value={spin_z} min={0} max={1} step={0.01} onChange={(e, v) => { setSpin_z(v); checkCursorFocus(); }} aria-labelledby="spin_z_label" disabled={!animate} />
                </FormControl>
            </React.Fragment>
        )
    } else if (animateSelection === 'ease') {
        animateParameters = (
            <React.Fragment>
                <div>
                    <FormControl className={classes.inlineParameterCheckbox}>
                        <FormControlLabel
                            label="x"
                            control={<Checkbox className={classes.checkbox} checked={easeIO.x} onChange={() => { updateEaseIO("easeIO_x", !easeIO.x); checkCursorFocus(); }} size="small" name="easeIO_x" id="easeIO_x" color="primary" />}
                        />
                    </FormControl>

                    <FormControl className={classes.inlineParameterCheckbox}>
                        <FormControlLabel
                            label="y"
                            control={<Checkbox className={classes.checkbox} checked={easeIO.y} onChange={() => { updateEaseIO("easeIO_y", !easeIO.y); checkCursorFocus(); }} size="small" name="easeIO_y" id="easeIO_y" color="primary" />}
                        />
                    </FormControl>

                    <FormControl className={classes.inlineParameterCheckbox}>
                        <FormControlLabel
                            label="z"
                            control={<Checkbox className={classes.checkbox} checked={easeIO.z} onChange={() => { updateEaseIO("easeIO_z", !easeIO.z); checkCursorFocus(); }} size="small" name="easeIO_z" id="easeIO_z" color="primary" />}
                        />
                    </FormControl>
                </div>

                <div className={classes.parameterSubGroup}>
                    <ParameterSlider
                        id='easeIO_cycleCount'
                        label='Cycle'
                        sublabel={`count = ${easeIO.cycleCount}`}
                        value={easeIO.cycleCount}
                        min={100} max={500} step={50} marks={marks_cycleCount}
                        onChange={(e, v) => { updateEaseIO("easeIO_cycleCount", v); checkCursorFocus(); }}
                    />

                    <ParameterSlider
                        id='easeIO_power'
                        label='Power'
                        value={easeIO.power}
                        min={2} max={5} step={1} marks={['']}
                        onChange={(e, v) => { updateEaseIO("easeIO_power", v); checkCursorFocus(); }}
                    />
                </div>
            </React.Fragment>
        )
    }

    return (
        <div>
                      
                <FormControl className={classes.parameter}>
                    <InputLabel htmlFor="fallback">Fallback Text { <Tooltip className={classes.mediumFont} title={<Typography variant="body2">Alternative text added inside the canvas tags. Useful for assistive technology users (eg. screen readers) or browsers which don't support canvas rendering.</Typography>}><HelpIcon fontSize='inherit' /></Tooltip> }</InputLabel>
                    
                    <Input
                        id="fallback"
                        multiline
                        maxRows={8}
                        value={fallback}
                        onChange={(e) => { setFallback(e.target.value); checkCursorFocus();}}
                    />
                </FormControl>
           
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


            <FormControl className={classes.parameterCheckbox}>
                <FormControlLabel
                    label="Animate"
                    control={<Checkbox className={classes.checkbox} checked={animate} onChange={() => { setAnimate(!animate); checkCursorFocus(); }} size="small" name="animate" id="animate" color="primary" />}
                />
            </FormControl>


            <div className={classes.parameterSubGroup}>

                <FormControl className={classes.formControl} disabled={!animate}>
                    <Select
                        labelId="animateSelection_label"
                        id="animateSelection"
                        value={animateSelection}
                        onChange={handleAnimateSelect}
                        className={classes.smallFont}
                    >
                        <MenuItem value='spin' className={classes.smallFont}>Continuous spin</MenuItem>
                        <MenuItem value='ease' className={classes.smallFont}>Ease In/Out</MenuItem>
                    </Select>
                </FormControl>

                {animate ? animateParameters : ''}

            </div>

        </div>
    )


}

export default CanvasLayer;