import React, { useEffect, useRef, useState } from 'react';
import { FormControl, FormHelperText, IconButton, Input, InputLabel, makeStyles } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
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
        /* marginTop: 24, */
        marginRight: 14
    },
    textField: {
        width: 55,
        marginBottom: 8
    },
    ptBtn: {
        width: 36,
        height: 36
    },
    pathpointHeader: {
        display: 'flex',
        'align-items': 'center',
        height: 44,
        marginTop: 10
    },
    pathpointContainer: {
        '&:hover .deletePtBtnContainer': {
            display: 'inline-flex',
        }
    },
    lightBottomBorder: {
        '&:before': {
            'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
        }
    }
}));

export default function ShapePathPoint(props) {

    const classes = useStyles();

    let pathindex = props.pathindex;
    let segmentindex = props.segmentindex;
    let copyOfShape = props.copyOfShape;
    let addedShapes = props.addedShapes;
    let flattened = props.flattened;

    let cursorFocus = props.cursorFocus;
    let emptyOrNegative = props.emptyOrNegative;

    const ppRefs = {
        'x' : useRef(),
        'y' : useRef(),
        'z' : useRef()
    }

    let segment = copyOfShape.data.path[pathindex];
    let label = Object.keys(segment)[0];

    let baseid = `path_${pathindex}_${label}_${segmentindex}`;

    let pp = segmentindex === '-' ? segment[label] : segment[label][segmentindex];

    function createHelperText() {
        const helpers = {
            'line' : ['point'],
            'move' : ['start'],
            'arc' : ['corner', 'end'],
            'bezier' : ['control 1', 'control 2', 'end']
        }
        let i = (segmentindex === '-') ? 0 : segmentindex;
        let helpertext = helpers[label][i];
        return helpertext;
    }

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

    function checkValueOnBlur(e, axis) {
        if (e.target.value === '-' || e.target.value.length === 0) {
            e.target.value = 0;
            updatePathPoint(e, axis, false);
        }
    }
    
    function updatePathPoint(e, axis, setfocus=true) {

        let val;

        if (e.target.value.length === 1 && e.target.value === '-') {
            /* emptyOrNegative.current = ['-', axis]; */
            emptyOrNegative[1](['-', axis, e.target.id]);
            val = 0; // not shown to user
        } else if (e.target.value.length === 0){
            /* emptyOrNegative.current = ['', axis]; */
            emptyOrNegative[1](['', axis, e.target.id]);
            val = 0; // not shown to user
        } else if (e.target.value[e.target.value.length-1] === '.') {
            if (e.target.value[0] === '.') {
                e.target.value = '0' + e.target.value;
                emptyOrNegative[1]([e.target.value, axis, e.target.id]);
                val = Number(e.target.value);
            } else if (e.target.value[0] === '-' && e.target.value[1] === '.') {
                e.target.value = '-0' + e.target.value.slice(1);
                emptyOrNegative[1]([e.target.value, axis, e.target.id]);
                val = Number(e.target.value);
            } else {
                emptyOrNegative[1]([e.target.value, axis, e.target.id]);
                val = Number(e.target.value.slice(0, -1));
            }
        } else {
            val = Number(e.target.value);
            /* emptyOrNegative.current = [false, false]; */
            emptyOrNegative[1]([false, false, '']);
        }

        
        if (axis === 'x') {
            pp.set({ x: val, y: pp.y, z: pp.z });
        } else if (axis === 'y') {
            pp.set({ x: pp.x, y: val, z: pp.z });
        } else {
            pp.set({ x: pp.x, y: pp.y, z: val });
        }

        if (setfocus) {
            cursorFocus[1](
                {
                    'id': e.target.id,
                    'cursorPos': e.target.selectionStart
                }
            );
        } else {
            cursorFocus[1](
                {
                    'id': '',
                    'cursorPos': 0
                }
            );
        }

        //if (emptyOrNegative.current === [false, false]) {
        if (emptyOrNegative[0] === [false, false, '']) {
            addedShapes[1](flattened);
        }

    }

    useEffect(() => {
        ppRefocus();
    }, []);

    return (

        <div>
            
            <FormControl className={classes.textField}>
                <InputLabel htmlFor={baseid + '_x'}>x</InputLabel>
                <Input className={classes.lightBottomBorder} inputRef={ppRefs['x']} id={baseid + '_x'}
                    value={(emptyOrNegative[0][2] === `${baseid}_x` && emptyOrNegative[0][1] === 'x') ? emptyOrNegative[0][0] : pp.x}
                    onBlur={(e) => checkValueOnBlur(e, 'x')}
                    disabled={false} onChange={(e) => updatePathPoint(e, 'x')} />
                {label === 'line' ? '' : <FormHelperText>{createHelperText()}</FormHelperText>}
            </FormControl>

            <FormControl className={classes.textField}>
                <InputLabel htmlFor={baseid + '_y'}>y</InputLabel>
                <Input className={classes.lightBottomBorder} inputRef={ppRefs['y']} id={baseid + '_y'} value={(emptyOrNegative[0][2] === `${baseid}_y` && emptyOrNegative[0][1] === 'y') ? emptyOrNegative[0][0] : pp.y} onBlur={(e) => checkValueOnBlur(e, 'y')} disabled={false} onChange={(e) => updatePathPoint(e, 'y')} />
            </FormControl>

            <FormControl className={classes.textField}>
                <InputLabel htmlFor={baseid + '_z'}>z</InputLabel>
                <Input className={classes.lightBottomBorder} inputRef={ppRefs['z']} id={baseid + '_z'} value={(emptyOrNegative[0][2] === `${baseid}_z` && emptyOrNegative[0][1] === 'z') ? emptyOrNegative[0][0] : pp.z} onBlur={(e) => checkValueOnBlur(e, 'z')} disabled={false} onChange={(e) => updatePathPoint(e, 'z')} />
            </FormControl>

        </div>

    )

}