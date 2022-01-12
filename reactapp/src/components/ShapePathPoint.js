import React, { useRef } from 'react';
import { FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';
import '../zdogui.css';

const useStyles = makeStyles((theme) => ({
    parameter: {
        display: 'block',
        margin: 12,
        fontSize: 'small'
    },
    label: {
        fontSize: 'small',
        'margin-bottom': 14,
        marginTop: 24
    },
    textField: {
        width: 55,
    },
}));

export default function ShapePathPoint(props) {

    const classes = useStyles();

    let pathindex = props.pathindex;
    let label = props.label;
    let cursorFocus = props.cursorFocus;
    let refocus = props.refocus;
    let copyOfShape = props.copyOfShape;
    let addedShapes = props.addedShapes;
    let flattened = props.flattened;

    let index = 0;

    let ppx = useRef();
    let ppy = useRef();
    let ppz = useRef();

    // **** TO DO:

    //let emptyOrNegative = useRef([false, false]); // [value, axis]

    let pp = copyOfShape.data.path[pathindex].line;

    function updatePathPoint(e, axis) {

        /* let pp0 = copyOfShape.data.path[0].line; */

        let val = Number(e.target.value);
        
        if (axis === 'x') {
            pp.set({ x: val, y: pp.y, z: pp.z });
        } else if (axis === 'y') {
            pp.set({ x: pp.x, y: val, z: pp.z });
        } else {
            pp.set({ x: pp.x, y: pp.y, z: val });
        }

        addedShapes[1](flattened);
    }

    return (

        <div /* className={classes.parameter} */>

            <p className={classes.label}>{label}</p>

            <FormControl className={classes.textField}>
                <InputLabel htmlFor={'pp_x_' + pathindex}>x</InputLabel>
                <Input inputRef={ppx} id={'pp_x_' + pathindex}
                    value={/* emptyOrNegative.current[1] === 'x' ? emptyOrNegative.current[0] :  */pp.x}
                    /* onBlur={(e) => checkValueOnBlur(e, 'vector', `pp_x_${index}`, '')} */
                    disabled={false} onChange={(e) => updatePathPoint(e, 'x')} />
            </FormControl>

            <FormControl className={classes.textField}>
                <InputLabel htmlFor={'pp_y_' + pathindex}>y</InputLabel>
                <Input inputRef={ppy} id={'pp_y_' + pathindex} value={/* emptyOrNegative.current[1] === 'y' ? emptyOrNegative.current[0] :  */pp.y} /* onBlur={(e) => checkValueOnBlur(e, 'vector', `pp_y_${index}`, '')} */ disabled={false} onChange={(e) => updatePathPoint(e, 'y')} />
            </FormControl>

            <FormControl className={classes.textField}>
                <InputLabel htmlFor={'pp_z_' + pathindex}>z</InputLabel>
                <Input inputRef={ppz} id={'pp_z_' + pathindex} value={/* emptyOrNegative.current[1] === 'z' ? emptyOrNegative.current[0] :  */pp.z} /* onBlur={(e) => checkValueOnBlur(e, 'vector', `pp_z_${index}`, '')} */ disabled={false} onChange={(e) => updatePathPoint(e, 'z')} />
            </FormControl>

        </div>

    )

}