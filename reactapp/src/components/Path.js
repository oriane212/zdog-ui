import React from 'react';
import { makeStyles } from '@material-ui/core';
import '../zdogui.css';
import ShapePathPoint from './ShapePathPoint';

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
}));

export default function Path(props) {

    const classes = useStyles();

    let cursorFocus = props.cursorFocus;
    let refocus = props.refocus;
    let copyOfShape = props.copyOfShape;
    let addedShapes = props.addedShapes;
    let flattened = props.flattened;

    return (

        <div className={classes.parameter}>

            <p className={classes.label}><b>Path</b></p>

            <ShapePathPoint label='starting point' cursorFocus={cursorFocus} refocus={refocus} copyOfShape={copyOfShape} addedShapes={addedShapes} flattened={flattened} />

        </div>

    )

}