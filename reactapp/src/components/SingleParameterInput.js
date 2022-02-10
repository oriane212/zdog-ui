import React, { useState} from 'react';
import '../zdogui.css';
import { FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';
import fixCamelCase from '../fixCamelCase';

const useStyles = makeStyles((theme) => ({
    parameter: {
        display: 'inline-flex',
        margin: 12,
        width: '40%'
    }
}));

function SingleParameterInput(props) {

    const index = 0;
    const copyOfShape = props.copyOfShape;

    const parameter = props.parameter;

    const label = fixCamelCase(parameter);

    //const updateShapes = props.updateShapes;
    const [shapes, setShapes] = props.addedShapes;

    const checkValueOnBlur = props.checkValueOnBlur;

    let cursorFocus = props.cursorFocus;

    let validSides = useState(true);

    //let cursorFocus = props.cursorFocus;

    /* let shapeRefs = props.shapeRefs; */

    let paramRef =  props.paramRef;

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes);
        let flattened = newshapearry.flat();
        return flattened;
    }

    let flattened = copyShapes();

    function spiUpdateShapes(e, property) {
        if (property !== 'sides' || (property === 'sides' && e.target.value.length > 0)) {
            copyOfShape.data[property] = e.target.value;
            cursorFocus[1](
                {
                    'id': e.target.id,
                    'cursorPos': e.target.selectionStart
                }
            );
            validSides[1](true);
        } else {
            validSides[1](false);
        }

        if (validSides[0]) {
            setShapes(flattened);
        }
    }

    // NEED TO handle invalid sides onblur, and negative values

    function createSPI() {
        let spi = '';
        if (parameter !== 'quarters') {
            spi = (<FormControl className={classes.parameter}>
                <InputLabel htmlFor={parameter + '_' + index}>{label}</InputLabel>
                <Input inputRef={paramRef} id={parameter + '_' + index} value={(validSides[0]) ? copyOfShape.data[parameter] : ''} onBlur={(e) => checkValueOnBlur(e, 'textinput', `${parameter}_${index}`, '')} disabled={false} onChange={(e) => spiUpdateShapes(e, parameter)} />
            </FormControl>);
        }
        return spi;
    }
    

    const classes = useStyles();

    

    return (

        createSPI()

    )

}

export default SingleParameterInput;