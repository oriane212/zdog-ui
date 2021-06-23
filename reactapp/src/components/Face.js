import React, { useEffect, useRef } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    
    checkboxFace: {
        'padding-bottom': 12,
        display: 'inline-block',
        marginTop: 4
    },
    parameterInline: {
        display: 'inline-block',
        margin: 12
    },
    inlineCheckbox: {
        display: 'inline-block',
        marginTop: 2,
        width: 70
    },
    disabledlabel: {
        fontSize: 'small',
        color: 'darkgray'
    }
}));

function Face(props) {

    const index = 0;

    const side = props.side;
    const copyOfShape = props.copyOfShape;

    const updateShapes = props.updateShapes;

    let cursorFocus = props.cursorFocus;

    const inputRefs = {
        "frontFace": useRef(),
        "rearFace": useRef(),
        "topFace": useRef(),
        "bottomFace": useRef(),
        "leftFace": useRef(),
        "rightFace": useRef()
    }

    const classes = useStyles();

    useEffect(() => {
        props.refocus(cursorFocus, inputRefs);
    }, [])


    return (
        <div>
            <FormControl className={classes.inlineCheckbox}>
                <FormControlLabel
                    label={side}
                    control={<Checkbox checked={(copyOfShape.faces[`${side}Face`] === true) ? true : false} onChange={(e) => updateShapes(e, 'checkbox_face', `${side}Face_${index}`, '')} size="small" color="primary" className={classes.checkboxFace} />}
                />
            </FormControl>
            <FormControl className={classes.parameterInline}>
                <input type="color" id={`${side}Face_` + index} value={(copyOfShape.faces[`${side}Face`] === true) ? copyOfShape.data[`${side}Face`] : copyOfShape.faces[`${side}Face`]} onChange={(e) => updateShapes(e, 'color', `${side}Face_${index}`, '')} inputref={inputRefs[`${side}Face`]} disabled={(copyOfShape.faces[`${side}Face`] !== true) ? true : false}></input>
            </FormControl>
        </div>
    )
}

export default Face;