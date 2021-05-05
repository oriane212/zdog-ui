import React, {useEffect, useRef} from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    slider: {
        width: 200
    },
    checkbox: {
        'padding-bottom': 12
    },
    parameter: {
        display: 'block',
        margin: 16
    },
    subparameter: {
        'margin-left': 32,
        'margin-top': 3,
        'margin-bottom': 3
    },
    label: {
        fontSize: 'small'
    },
    labelsm: {
        fontSize: 'small'
    }
}));

function Rect(props) {

    let counter = props.counter;

    const index = props.index;
    const shape = props.shape;

    const updateShapes = props.updateShapes;

    const inputRefs = {
        "width": useRef(),
        "height": useRef()
    }

    const classes = useStyles();

    useEffect(() => {
        console.log('counter: ' + counter[0]);
        //console.log('idRef.current: ' + idRef.current);

       if (counter[0] !== 0) {
            console.log('inside Ellipse useEffect');
            //console.log(inputRefs);

            let splitID = counter[0].split('_');
            console.log(splitID);

            let property;
            let shapeindex;
            if (splitID.length === 3) {
                console.log('equal to 3');
                property = `${splitID[0]}_${splitID[1]}`;
                shapeindex = splitID[2];
            } else {
                property = `${splitID[0]}`;
                shapeindex = splitID[1];
            }

            console.log('property = ' + property);

            

            if (inputRefs[property] !== undefined && Number(shapeindex) === index) {
                inputRefs[property].current.focus(); 
            }
       }
    }, [])


    return (
        <React.Fragment>
            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'width_' + index}>Width</InputLabel>
                <Input inputRef={inputRefs['width']} id={'width_' + index} value={shape.data.width} disabled={false} onChange={(e) => updateShapes(e, 'textinput')} />
            </FormControl>
            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'height_' + index}>Height</InputLabel>
                <Input inputRef={inputRefs['height']} id={'height_' + index} value={shape.data.height} disabled={false} onChange={(e) => updateShapes(e, 'textinput')} />
            </FormControl>
        </React.Fragment>
    )

}

export default Rect;