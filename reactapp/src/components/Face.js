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

    let propname = (side === 'back') ? `backface` : `${side}Face`;

    let paramRef = shapeRefs[propname];

    let colorDisabled = false;
    if (side !== 'back') {
        if (copyOfShape.faces[propname] !== true) {
            colorDisabled = true;
        } else {
            colorDisabled = false;
        }
    }

    let checkboxForFace = (<FormControl className={classes.inlineCheckbox}>
        <FormControlLabel
            label={side}
            control={<Checkbox checked={(copyOfShape.faces[propname] === true) ? true : false} onChange={(e) => updateShapes(e, 'checkbox_face', `${propname}_${index}`, '')} size="small" color="primary" className={classes.checkboxFace} />}
        />
    </FormControl>);

    let colorLabel = (<label htmlFor={`${propname}_` + index} className={classes.labelsm}>{side}</label>)

    useEffect(() => {
        props.refocus(cursorFocus, shapeRefs);
    }, [])


    return (
        <div>
            {(copyOfShape.shapeClass === 'Box') ? checkboxForFace : ''}

            <FormControl className={classes.parameterInline}>

                {(copyOfShape.shapeClass !== 'Box') ? colorLabel : ''}
                
                <input type="color" id={`${propname}_` + index} value={(copyOfShape.faces[propname] === true) ? copyOfShape.data[propname] : copyOfShape.faces[propname]} onChange={(e) => updateShapes(e, 'color', `${propname}_${index}`, '')} inputref={paramRef} disabled={colorDisabled /* (copyOfShape.faces[propname] !== true) ? true : false */}></input>
            </FormControl>
        </div>
    )
}

export default Face;