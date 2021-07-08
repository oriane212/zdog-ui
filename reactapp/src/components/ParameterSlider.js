import React from 'react';
import '../zdogui.css';
import { FormControl, Slider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    parameter: {
        display: 'block',
        margin: 12,
        marginLeft: 4
    },
    slider: {
        marginBottom: 36,
        display: 'block',
        fontSize: 'small'
    },
    label: {
        fontSize: 'small',
        'margin-bottom': 8,
        marginTop: 24
    }
}));

function ParameterSlider(props) {

    const [id, label, value] = [props.id, props.label, props.value];

    //const sublabel = props.sublabel;

    const [min, max, step] = [props.min, props.max, props.step];

    const onChange = props.onChange;

    let marksArray;

    // create marks if empty
    if (props.marks.length < 2) {
        console.log('INSIDE EMPTY MARKS')
        let newmarks = [];
        for (let i=min; i <= max; i++) {
            let mark = { 'value': Number(i), 'label': `${i}`};
            newmarks.push(mark);
        }
        console.log(newmarks);
        marksArray = newmarks;
    } else {
        marksArray = props.marks;
    }

    const classes = useStyles();

    return (
        <FormControl className={classes.parameter}>
            <p id={id + '_label'} className={classes.label}>{label} {props.sublabel !== undefined ? <span className='tinytext'>{props.sublabel}</span> : ''} </p>
            <Slider className={classes.slider} id={id} value={value} min={min} max={max} step={step} marks={marksArray} onChange={onChange} aria-labelledby={id + '_label'} />
        </FormControl>
    )

}

export default ParameterSlider;