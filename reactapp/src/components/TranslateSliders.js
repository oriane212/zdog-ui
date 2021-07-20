import React from 'react';
import { makeStyles } from '@material-ui/core';
import '../zdogui.css';
import ParameterSlider from './ParameterSlider';
import Zdog from 'zdog';

const tau = Zdog.TAU;

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

function TranslateSliders(props) {

    const classes = useStyles();

    let updateShapes = props.updateShapes;

    let [x_limit, y_limit] = [Math.round(props.canvasDim[0] / 2), Math.round(props.canvasDim[1] / 2)];
    let z_limit = Math.max(x_limit, y_limit);

    const limits = [x_limit, y_limit, z_limit];

    let nodeId = props.nodeId;
    let translateData = props.translateData;

    let axes = ['x', 'y', 'z'];
    let translateSliders = [];

    axes.forEach((axis, i) => {
        let limit = limits[i];
        let id = `translate_${axis}_0`;
        let axisVal = (nodeId === 'canvasnode') ? translateData[`translate_${axis}`][0] : translateData[axis];
        let slider = (
            <ParameterSlider
                key={i}
                id={id}
                label={`${axis} = ${Math.round(axisVal)}`}
                value={axisVal}
                min={0 - limit} max={limit} step={1} marks={
                    [{
                        value: 0 - limit,
                        label: `-${limit}`,
                    },
                    {
                        value: 0,
                        label: '0',
                    },
                    {
                        value: limit,
                        label: `${limit}`,
                    }]
                }
                onChange={(nodeId === 'canvasnode') ? ((e, v) => translateData[`translate_${axis}`][1](v)) : ((e, v) => updateShapes(e, 'vector', id, v))}
            />
        )
        translateSliders.push(slider);
    });

    return (

        <div className={classes.parameterGroup}>
            <p className={classes.label}>Translate</p>
            {translateSliders}
        </div>
    )
}

export default TranslateSliders;