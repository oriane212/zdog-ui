import React, { useEffect, useRef} from 'react';
import '../zdogui.css';
import { FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';

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

    const updateShapes = props.updateShapes;

    let cursorFocus = props.cursorFocus;

    let shapeRefs = props.shapeRefs;

    let paramRef = shapeRefs[parameter];

    const classes = useStyles();

    useEffect(() => {
        props.refocus(cursorFocus, shapeRefs);
    }, [])

    return (

        <FormControl className={classes.parameter}>
            <InputLabel htmlFor={parameter + '_' + index}>{parameter}</InputLabel>
            <Input inputRef={paramRef} id={parameter + '_' + index} value={copyOfShape.data[parameter]} disabled={false} onChange={(e) => updateShapes(e, 'textinput', `${parameter}_${index}`, '')} />
        </FormControl>

    )

}

export default SingleParameterInput;