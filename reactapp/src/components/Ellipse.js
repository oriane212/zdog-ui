import React, {useRef} from 'react';
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

function Ellipse(props) {

    const index = props.index;
    const shape = props.shape;

    const inputHandler = props.inputHandler;

    const inputRefs = {
        "diameter": useRef()
    }

    const classes = useStyles();



    return (
        <React.Fragment>
            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'diameter_' + index}>Diameter</InputLabel>
                <Input inputRef={inputRefs['diameter']} id={'diameter_' + index} value={shape.data.diameter} disabled={false} onChange={(e) => inputHandler(e)} variant="outlined" />
            </FormControl>
        </React.Fragment>
    )

}

export default Ellipse;