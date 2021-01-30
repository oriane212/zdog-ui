import React from 'react';
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
    }
}));

function Ellipse(props) {

    //const [shapes, setShapes] = [props.stateShapes[0], props.stateShapes[1]];
    const shape = props.shape;
    const diameter = shape.params.diameter;
    const stroke = shape.params.stroke;
    //const [diameter, setDiameter] = [shape.params.diameter[0],shape.params.diameter[1]];

    const classes = useStyles();

    function handleDiameterUpdate(e, v) {
        let shapeCopy = {};
        Object.assign(shapeCopy, shape);
        shapeCopy.params.diameter = v;
        props.onChange(shapeCopy, props.index);
    }

    function handleStrokeUpdate(e, v) {
        let shapeCopy = {};
        Object.assign(shapeCopy, shape);
        shapeCopy.params.stroke = v;
        props.onChange(shapeCopy, props.index);
    }

    return (
        <section className="controls_shape">

            <FormControl className={classes.parameter}>
                <Typography id={'diameter_'+props.index}>Diameter = {diameter}</Typography>
                <Slider className={classes.slider} value={diameter} min={0} max={500} step={1} onChange={handleDiameterUpdate} aria-labelledby={'diameter_'+props.index}/>
            </FormControl>

            <FormControl className={classes.parameter}>
                <Typography id={'stroke_'+props.index}>Stroke = {stroke}</Typography>
                <Slider className={classes.slider} value={stroke} min={0} max={100} step={1} onChange={handleStrokeUpdate} aria-labelledby={'stroke_'+props.index}/>
            </FormControl>

        </section>
    )

}

export default Ellipse;