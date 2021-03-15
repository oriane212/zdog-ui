import React from 'react';
import '../zdogui.css';
import { Checkbox, FormControl, FormControlLabel, Input, InputLabel, makeStyles } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
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

/* const acceptedParameters = [
    'diameter', 'stroke', 'width', 'height'
] */


function ShapeLayer(props) {

    const i = props.i;
    const stateVars = props.stateVars;

    // QUICK TEST
    const [diameter_0, setDiameter_0] = stateVars.diameter_0;
    const [stroke_0, setStroke_0] = stateVars.stroke_0;


    const shapeClass = props.shapeClass;
    const shapeProps = props.shapeProps;
    //const copyShapes = props.copyShapes;
    //const stateShapes = props.stateShapes;

    const classes = useStyles();

    /* function copyShapes() {
        let newshapearry = [];
        newshapearry.push(stateShapes[0]);
        let flattened = newshapearry.flat();
        return flattened;
      } */

      // TODO: make as util fn
      function copyArry(arry) {
        let newshapearry = [];
        newshapearry.push(arry);
        let flattened = newshapearry.flat();
        return flattened;
      }

    /* function handleCheckboxClick(e) {
        // just set the property value to the opposite of what it is (value does not have checked value)
        updateShapes(e, e.target.value, 'checkbox', e.target.id);
    } */

    /* function handleInputUpdate(e) {
        updateShapes(e, 'textinput');
    } */

    /* function handleSliderUpdate(e,v) {
        // get the parent div with MuiFormControl-root class
        let parentWithID = e.target.closest('.MuiFormControl-root');
        // get id for that parent
        let id = parentWithID.getAttribute('id');
        // pass the id to updateshapes
        updateShapes(e, v, 'slider', id);
    } */

    /* function updateShapes(e, v, controlType, id) {
        let splitElID = id.split('_');
        let shapeindex = splitElID[0]; 
        let property = splitElID[1];

        let flattened = copyShapes();

        if (controlType === 'checkbox') {
            flattened[shapeindex].data[property] = !flattened[shapeindex].data[property];
        } else if (controlType === 'textinput') {
            //let stringval = e.target.value;
            flattened[shapeindex].data[property] = Number(e.target.value);
        } else if (controlType === 'slider') {
            flattened[shapeindex].data[property] = v;
        }
    
        stateShapes[1](flattened);
    } */

    /* function createContols(dataObj) {
        let controls = Object.keys(dataObj).map((property) => {
            if (typeof dataObj[property] === "boolean") {
                let elID = i + '_' + property;
                // create checkbox
                return (
                    <FormControl key={generateID()} className={classes.parameter}>
                        <FormControlLabel
                            label={property}
                            control={<Checkbox className={classes.checkbox} checked={dataObj[property]} id={elID} onChange={handleCheckboxClick} />}
                        />
                    </FormControl>
                )

            } else if (typeof dataObj[property] === "number") {
                let elID = i + '_' + property;
                let elID_label = elID+'_label';
                // create input
                return (
                    <FormControl id={elID} key={generateID()} className={classes.parameter}>
                        <Typography id={elID_label}>{property} = {dataObj[property]}</Typography>
                        <Slider className={classes.slider} value={dataObj[property]} min={0} max={100} step={1} onChange={handleSliderUpdate} aria-labelledby={elID_label} />
                    </FormControl>
                )

            }
        })

        return controls;
    } */

    function createControls() {
        let controls = shapeProps.map((prop) => {

            //QUICK TEST
            let stateVal, setVal;
            if (prop === 'diameter') {
                stateVal = diameter_0;
                setVal = setDiameter_0;
            } else {
                stateVal = stroke_0;
                setVal = setStroke_0;
            }

            /* // value for property in state
            let stateVal = stateVars[`${prop}_${i}`][0]; */

            // get individual setState hook for updating value of shape prop
            

            // create element ID
            let elID = prop + '_' + i;
            // create checkbox for bool val or create slider for number val
            if (typeof stateVal === 'boolean') {
                return (
                    <FormControl key={generateID()} className={classes.parameter}>
                        <FormControlLabel
                            label={prop}
                            control={<Checkbox className={classes.checkbox} checked={stateVal} id={elID} onChange={() => stateVars[`${prop}_${i}`][1](!stateVal)} />}
                        />
                    </FormControl>
                )
            } else if (typeof stateVal === 'number') {
                let elID_label = elID+'_label';
                return (
                    <FormControl id={elID} key={generateID()} className={classes.parameter}>
                        <Typography id={elID_label}>{prop} = {stateVal}</Typography>
                        <Slider className={classes.slider} value={stateVal} min={0} max={100} step={1} onChange={(e,v) => setVal(v)} aria-labelledby={elID_label} />
                    </FormControl>
                )
            }
        })

        return controls;
    }

    //let shapeParameters = createControls();
    // QUICK TEST
    let shapeParameters = [];

    //let shapeParameters = createContols(shape.data);

    return (
        <div>
            <div>Shape {i + 1} ({shapeClass})</div>
            <FormControl id='diameter_0' className={classes.parameter}>
                        <Typography id='diameter_0_label'>diameter = {diameter_0}</Typography>
                        <Slider className={classes.slider} value={diameter_0} min={0} max={200} step={1} onChange={(e,v) => setDiameter_0(v)} aria-labelledby='diameter_0_label' />
                    </FormControl>
        </div>
    )

}

export default ShapeLayer;

/*

<FormControl className={classes.parameter}>
<InputLabel htmlFor="canvas_width">Canvas width</InputLabel>
<Input id="canvas_width" value={canvas_w} disabled={false} onChange={(e) => setCanvas_w(e.target.value)} />
</FormControl>

*/

/*
                        <InputLabel htmlFor={elID}>{property}</InputLabel>
                        <Input id={elID} value={dataObj[property]} disabled={false} onChange={handleInputUpdate} />
                        */