import React, { useEffect, useRef} from 'react';
import '../zdogui.css';
import { FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';
import fixCamelCase from '../fixCamelCase';

const useStyles = makeStyles((theme) => ({
    parameter: {
        display: 'block',
        margin: 12
    }
}));

function SingleParameterInput(props) {

    const index = 0;
    const copyOfShape = props.copyOfShape;

    const parameter = props.parameter;

    const label = fixCamelCase(parameter);

    const updateShapes = props.updateShapes;
    const checkValueOnBlur = props.checkValueOnBlur;

    //let cursorFocus = props.cursorFocus;

    /* let shapeRefs = props.shapeRefs; */

    let paramRef =  props.paramRef;

    const classes = useStyles();

    /* useEffect(() => {
        props.refocus(cursorFocus, shapeRefs);
    }, []) */

    return (

        <FormControl className={classes.parameter}>
            <InputLabel htmlFor={parameter + '_' + index}>{label}</InputLabel>
            <Input inputRef={paramRef} id={parameter + '_' + index} value={copyOfShape.data[parameter]} onBlur={(e) => checkValueOnBlur(e, 'textinput', `${parameter}_${index}`, '')} disabled={false} onChange={(e) => updateShapes(e, 'textinput', `${parameter}_${index}`, '')} />
        </FormControl>

    )

}

export default SingleParameterInput;