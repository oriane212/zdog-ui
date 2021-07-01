import React, { useEffect } from 'react';
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
    },
    labelsm: {
        fontSize: 'small'
    },
}));

function Face(props) {

    const index = 0;

    const side = props.side;
    const copyOfShape = props.copyOfShape;

    const updateShapes = props.updateShapes;

    let cursorFocus = props.cursorFocus;

    let shapeRefs = props.shapeRefs;

    const classes = useStyles();

    let propname = `${side}Face`;

    let label = (side[0].toUpperCase() + side.slice(1));

    let paramRef = shapeRefs[propname];

    useEffect(() => {
        props.refocus(cursorFocus, shapeRefs);
    }, [])


    return (
        <div>

            <FormControl className={classes.inlineCheckbox}>
                <FormControlLabel
                    label={label}
                    control={<Checkbox checked={(copyOfShape.faces[propname] === true) ? true : false} onChange={(e) => updateShapes(e, 'checkbox_face', `${propname}_${index}`, '')} size="small" color="primary" className={classes.checkboxFace} />}
                />
            </FormControl>

            <FormControl className={classes.parameterInline}>
                <input type="color" id={`${propname}_` + index} value={(copyOfShape.faces[propname] === true) ? copyOfShape.data[propname] : copyOfShape.faces[propname]} onChange={(e) => updateShapes(e, 'color', `${propname}_${index}`, '')} inputref={paramRef} disabled={/* colorDisabled */(copyOfShape.faces[propname] !== true) ? true : false}></input>
            </FormControl>
        </div>
    )
}

export default Face;