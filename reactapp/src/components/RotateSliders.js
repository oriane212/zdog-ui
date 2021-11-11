import React from 'react';
import {makeStyles} from '@material-ui/core';
import '../zdogui.css';
import ParameterSlider from './ParameterSlider';
import Zdog from 'zdog';

const tau = Zdog.TAU;

const marks_rotate = [
    {
        value: 0,
        label: '0',
    },
    {
        value: tau / 12,
        label: '30',
    },
    {
        value: tau / 4,
        label: '90',
    },
    {
        value: tau / 2,
        label: '180',
    },
    {
        value: ((tau / 4) * 3),
        label: '270',
    },
    {
        value: tau
    },
];

const useStyles = makeStyles((theme) => ({
    parameterGroup: {
        display: 'block',
        margin: 12,
        marginTop: 24,
        fontSize: 'small'
    },
    label: {
        fontSize: 'small',
        'margin-bottom': 14,
        marginTop: 24
    }
}));

function RotateSliders(props) {

    const classes = useStyles();

    let updateShapes = props.updateShapes;

    let nodeId = props.nodeId;
    let rotateData = props.rotateData;

    let axes = ['x', 'y', 'z'];
    let rotateSliders = [];

    axes.forEach((axis, i) => {
        let id = `rotate_${axis}_0`;
        let axisVal = (nodeId === 'canvasnode') ? rotateData[`rotate_${axis}`][0] : rotateData[axis];
        let slider = (
            <ParameterSlider
                key={i}
                id={id}
                label={`${axis} = ${Math.round((axisVal) * (180 / Math.PI))}`}
                value={axisVal}
                min={0} max={tau} step={tau / 72} marks={marks_rotate}
                onChange={(nodeId === 'canvasnode') ? ((e, v) => rotateData[`rotate_${axis}`][1](v)) : ((e, v) => updateShapes(e, 'vector', id, v))}
            />
        )
        rotateSliders.push(slider);
    });

    return (

        <div className={classes.parameterGroup}>
                <p className={classes.label}><b>Rotation</b></p>
                {rotateSliders}
        </div>
    )
}

export default RotateSliders;