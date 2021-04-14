import React, {useRef, useState} from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
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
    const selectHandler = props.selectHandler;

    //const [selectQuartersValue, setQuartersValue] = useState(shape.data.quarters);

    const inputRefs = {
        "diameter": useRef(),
        "height": useRef(),
        "width": useRef()
    }

    const classes = useStyles();



    return (
        <React.Fragment>
            {/* <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'diameter_' + index}>Diameter</InputLabel>
                <Input inputRef={inputRefs['diameter']} id={'diameter_' + index} value={shape.data.diameter} disabled={false} onChange={(e) => inputHandler(e)} />
            </FormControl> */}
            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'width_' + index}>Width</InputLabel>
                <Input inputRef={inputRefs['width']} id={'width_' + index} value={shape.data.width} disabled={false} onChange={(e) => inputHandler(e)} />
            </FormControl>
            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'height_' + index}>Height</InputLabel>
                <Input inputRef={inputRefs['height']} id={'height_' + index} value={shape.data.height} disabled={false} onChange={(e) => inputHandler(e)} />
            </FormControl>
            <FormControl className={classes.parameter}>
                <InputLabel>Quarters</InputLabel>
                        <Select name={'quarters_' + index} id={'quarters_' + index} value={shape.data.quarters} onChange={(e) => selectHandler(e)}>
                            <MenuItem id={'quarters_1_' + index} value="1">1</MenuItem>
                            <MenuItem id={'quarters_2_' + index} value="2">2</MenuItem>
                            <MenuItem id={'quarters_3_' + index} value="3">3</MenuItem>
                            <MenuItem id={'quarters_4_' + index} value="4">4</MenuItem>
                        </Select>
            </FormControl>
        </React.Fragment>
    )

}

export default Ellipse;