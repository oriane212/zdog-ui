import React, { useEffect, useRef, useState } from 'react';
import { FormControl, IconButton, Input, InputLabel, makeStyles } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import '../zdogui.css';
import ShapePathPoint from './ShapePathPoint';
import generateID from '../generateID';

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
    },
    ptBtn: {
        width: 28,
        height: 28
    },
    pathSegmentHeader: {
        display: 'flex',
        'align-items': 'center',
        justifyContent: 'space-between',
        height: 44,
        marginTop: 10,
        width: 170
    },
    pathSegmentContainer: {
        '&:hover .deleteSegmentBtnContainer': {
            display: 'inline-flex',
        }
    }
}));

export default function PathSegment(props) {

    const classes = useStyles();

    let pathindex = props.pathindex;
    let copyOfShape = props.copyOfShape;
    let addedShapes = props.addedShapes;
    let flattened = props.flattened;

    let cursorFocus = props.cursorFocus;
    let emptyOrNegative = props.emptyOrNegative;

    let segment = copyOfShape.data.path[pathindex];
    let label = Object.keys(segment)[0];

    function copyPath() {
        let newpatharry = [];
        newpatharry.push(copyOfShape.data.path);
        let flatpath = newpatharry.flat();
        return flatpath;
    }

    function deletePathSegment() {
        let flatpath = copyPath();
        flatpath.splice(pathindex, 1);
        copyOfShape.data.path = flatpath;
        addedShapes[1](flattened);
    }

    let deleteSegmentBtnContainer = (<div className='deleteSegmentBtnContainer'>
    <IconButton className={classes.ptBtn} onClick={deletePathSegment} aria-label="delete path segment">
                <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
    </div>)

    
    let cap = label.charAt(0).toUpperCase();
    let sliced = label.slice(1);
    let labelUI = cap + sliced;

    if (pathindex === 0) {
        labelUI = 'Start';
    }

    let sppArry = [];
    if (label === 'line' || label === 'move') {
        let spp = <ShapePathPoint pathindex={pathindex} segmentindex='-' copyOfShape={copyOfShape} addedShapes={addedShapes} flattened={flattened} cursorFocus={cursorFocus} emptyOrNegative={emptyOrNegative} />
        sppArry.push(spp);
    } else {
        segment[label].forEach((pt, i) => {
            let spp = <ShapePathPoint key={generateID()} pathindex={pathindex} segmentindex={i} copyOfShape={copyOfShape} addedShapes={addedShapes} flattened={flattened} cursorFocus={cursorFocus} emptyOrNegative={emptyOrNegative} />
            sppArry.push(spp);
        })
    }

    return (
        <div className={classes.pathSegmentContainer}>

            <div className={classes.pathSegmentHeader}>
                <p className={classes.label}>{labelUI}</p>
                { (pathindex === 0 ? '' : deleteSegmentBtnContainer) } 
            </div>
            
            {sppArry}

        </div>
    )

}