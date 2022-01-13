import React, { useEffect, useRef } from 'react';
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

    let pathSegment = props.pathSegment;
    let segmentIndex = props.segmentIndex;
    let pathindex = props.pathindex;
    let label = props.label;
    let cursorFocus = props.cursorFocus;
    let refocus = props.refocus;
    let copyOfShape = props.copyOfShape;
    let addedShapes = props.addedShapes;
    let flattened = props.flattened;

    let index = 0;

    const ppRefs = {
        'x' : useRef(),
        'y' : useRef(),
        'z' : useRef()
    }
    

    let baseid = `path_${pathindex}_${pathSegment}_${segmentIndex}`;

    function ppRefocus() {
        let pos = cursorFocus[0]['cursorPos'];
        let focusid = cursorFocus[0]['id'];
        if (focusid.includes(baseid)) {
            let axis = focusid[focusid.length - 1];
            console.log('AXIS = ' + axis);
            let ppRef = ppRefs[axis];
            ppRef.current.focus();
            if (pos !== 0) {
                ppRef.current.setSelectionRange(pos, pos);
            }
        }
    }

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

        cursorFocus[1](
            {
                'id': e.target.id,
                'cursorPos': e.target.selectionStart
            }
        );

        addedShapes[1](flattened);

    }

    useEffect(() => {
        ppRefocus();
    }, []);

    return (

        <div /* className={classes.parameter} */>

            <p className={classes.label}>{label}</p>

            <FormControl className={classes.textField}>
                <InputLabel htmlFor={baseid + '_x'}>x</InputLabel>
                <Input inputRef={ppRefs['x']} id={baseid + '_x'}
                    value={/* emptyOrNegative.current[1] === 'x' ? emptyOrNegative.current[0] :  */pp.x}
                    /* onBlur={(e) => checkValueOnBlur(e, 'vector', `pp_x_${index}`, '')} */
                    disabled={false} onChange={(e) => updatePathPoint(e, 'x')} />
            </FormControl>

            <FormControl className={classes.textField}>
                <InputLabel htmlFor={baseid + '_y'}>y</InputLabel>
                <Input inputRef={ppRefs['y']} id={baseid + '_y'} value={/* emptyOrNegative.current[1] === 'y' ? emptyOrNegative.current[0] :  */pp.y} /* onBlur={(e) => checkValueOnBlur(e, 'vector', `pp_y_${index}`, '')} */ disabled={false} onChange={(e) => updatePathPoint(e, 'y')} />
            </FormControl>

            <FormControl className={classes.textField}>
                <InputLabel htmlFor={baseid + '_z'}>z</InputLabel>
                <Input inputRef={ppRefs['z']} id={baseid + '_z'} value={/* emptyOrNegative.current[1] === 'z' ? emptyOrNegative.current[0] :  */pp.z} /* onBlur={(e) => checkValueOnBlur(e, 'vector', `pp_z_${index}`, '')} */ disabled={false} onChange={(e) => updatePathPoint(e, 'z')} />
            </FormControl>

        </div>

    )

}