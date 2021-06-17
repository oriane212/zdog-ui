import React, { useEffect, useRef, useState } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    slider: {
        width: 155,
        marginBottom: 36,
        marginLeft: 2,
        display: 'block',
        fontSize: 'small'
    },
    checkboxFace: {
        'padding-bottom': 12,
        display: 'inline-block',
        marginTop: 4
    },
    parameter: {
        display: 'block',
        margin: 12
    },
    parameterInline: {
        display: 'inline-block',
        margin: 12
    },
    inlineCheckbox: {
        display: 'inline-block',
        marginTop: 2,
        width: 70
    },
    parameterGroup: {
        display: 'block',
        margin: 12,
        marginTop: 24,
        fontSize: 'small'
    },
    subparameter: {
        'margin-left': 32,
        'margin-top': 3,
        'margin-bottom': 3
    },
    label: {
        fontSize: 'small',
        'margin-bottom': 14,
        marginTop: 24
    },
    labelsm: {
        fontSize: 'small'
    },
    disabledlabel: {
        fontSize: 'small',
        color: 'darkgray'
    }
}));


function Box(props) {

    const index = 0;
    const shape = props.shape;

    const updateShapes = props.updateShapes;

    let cursorFocus = props.cursorFocus;

    const inputRefs = {
        "height": useRef(),
        "width": useRef(),
        "depth": useRef(),
        "frontFace": useRef(),
        "rearFace": useRef(),
        "topFace": useRef(),
        "bottomFace": useRef(),
        "leftFace": useRef(),
        "rightFace": useRef()
    }

    const classes = useStyles();

    useEffect(() => {
        props.refocus(cursorFocus, inputRefs);
    }, [])


    return (
        <React.Fragment>

            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'width_' + index}>Width</InputLabel>
                <Input inputRef={inputRefs['width']} id={'width_' + index} value={shape.data.width} disabled={false} onChange={(e) => updateShapes(e, 'textinput', `width_${index}`, '')} />
            </FormControl>
            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'height_' + index}>Height</InputLabel>
                <Input inputRef={inputRefs['height']} id={'height_' + index} value={shape.data.height} disabled={false} onChange={(e) => updateShapes(e, 'textinput', `height_${index}`, '')} />
            </FormControl>

            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'depth_' + index}>Depth</InputLabel>
                <Input inputRef={inputRefs['depth']} id={'depth_' + index} value={shape.data.depth} disabled={false} onChange={(e) => updateShapes(e, 'textinput', `depth_${index}`, '')} />
            </FormControl>

            <div className={classes.parameterGroup}>

                <p className={classes.label}>Faces</p>

                <div>
                    <FormControl className={classes.inlineCheckbox}>
                        <FormControlLabel
                            label="Front"
                            control={<Checkbox checked={(shape.faces.frontFace === true) ? true : false} onChange={(e) => updateShapes(e, 'checkbox_face', `frontFace_${index}`, '')} size="small" color="primary" className={classes.checkboxFace} />}
                        />
                    </FormControl>
                    <FormControl className={classes.parameterInline}>
                        {/* <label htmlFor={'frontFace_' + index} className={(shape.faces.frontFace === true) ? classes.labelsm : classes.disabledlabel}>Color</label> */}
                        <input type="color" id={'frontFace_' + index} value={(shape.faces.frontFace === true) ? shape.data.frontFace : shape.faces.frontFace} onChange={(e) => updateShapes(e, 'color', `frontFace_${index}`, '')} inputref={inputRefs['frontFace']} disabled={(shape.faces.frontFace !== true) ? true : false}></input>
                    </FormControl>
                </div>

                <div>
                    <FormControl className={classes.inlineCheckbox}>
                        <FormControlLabel
                            label="Rear"
                            control={<Checkbox checked={(shape.faces.rearFace === true) ? true : false} onChange={(e) => updateShapes(e, 'checkbox_face', `rearFace_${index}`, '')} size="small" color="primary" className={classes.checkboxFace} />}
                        />
                    </FormControl>
                    <FormControl className={classes.parameterInline}>
                        {/* <label htmlFor={'rearFace_' + index} className={(shape.faces.rearFace === true) ? classes.labelsm : classes.disabledlabel}>Color</label> */}
                        <input type="color" id={'rearFace_' + index} value={(shape.faces.rearFace === true) ? shape.data.rearFace : shape.faces.rearFace} onChange={(e) => updateShapes(e, 'color', `rearFace_${index}`, '')} inputref={inputRefs['rearFace']} disabled={(shape.faces.rearFace !== true) ? true : false}></input>
                    </FormControl>
                </div>

                <div>
                    <FormControl className={classes.inlineCheckbox}>
                        <FormControlLabel
                            label="Top"
                            control={<Checkbox checked={(shape.faces.topFace === true) ? true : false} onChange={(e) => updateShapes(e, 'checkbox_face', `topFace_${index}`, '')} size="small" color="primary" className={classes.checkboxFace} />}
                        />
                    </FormControl>
                    <FormControl className={classes.parameterInline}>
                        {/* <label htmlFor={'topFace_' + index} className={(shape.faces.topFace === true) ? classes.labelsm : classes.disabledlabel}>Color</label> */}
                        <input type="color" id={'topFace_' + index} value={(shape.faces.topFace === true) ? shape.data.topFace : shape.faces.topFace} onChange={(e) => updateShapes(e, 'color', `topFace_${index}`, '')} inputref={inputRefs['topFace']} disabled={(shape.faces.topFace !== true) ? true : false}></input>
                    </FormControl>
                </div>

                <div>
                    <FormControl className={classes.inlineCheckbox}>
                        <FormControlLabel
                            label="Bottom"
                            control={<Checkbox checked={(shape.faces.bottomFace === true) ? true : false} onChange={(e) => updateShapes(e, 'checkbox_face', `bottomFace_${index}`, '')} size="small" color="primary" className={classes.checkboxFace} />}
                        />
                    </FormControl>
                    <FormControl className={classes.parameterInline}>
                        {/* <label htmlFor={'bottomFace_' + index} className={(shape.faces.bottomFace === true) ? classes.labelsm : classes.disabledlabel}>Color</label> */}
                        <input type="color" id={'bottomFace_' + index} value={(shape.faces.bottomFace === true) ? shape.data.bottomFace : shape.faces.bottomFace} onChange={(e) => updateShapes(e, 'color', `bottomFace_${index}`, '')} inputref={inputRefs['bottomFace']} disabled={(shape.faces.bottomFace !== true) ? true : false}></input>
                    </FormControl>
                </div>

                <div>
                    <FormControl className={classes.inlineCheckbox}>
                        <FormControlLabel
                            label="Left"
                            control={<Checkbox checked={(shape.faces.leftFace === true) ? true : false} onChange={(e) => updateShapes(e, 'checkbox_face', `leftFace_${index}`, '')} size="small" color="primary" className={classes.checkboxFace} />}
                        />
                    </FormControl>
                    <FormControl className={classes.parameterInline}>
                        {/* <label htmlFor={'leftFace_' + index} className={(shape.faces.leftFace === true) ? classes.labelsm : classes.disabledlabel}>Color</label> */}
                        <input type="color" id={'leftFace_' + index} value={(shape.faces.leftFace === true) ? shape.data.leftFace : shape.faces.leftFace} onChange={(e) => updateShapes(e, 'color', `leftFace_${index}`, '')} inputref={inputRefs['leftFace']} disabled={(shape.faces.leftFace !== true) ? true : false}></input>
                    </FormControl>
                </div>

                <div>
                    <FormControl className={classes.inlineCheckbox}>
                        <FormControlLabel
                            label="Right"
                            control={<Checkbox checked={(shape.faces.rightFace === true) ? true : false} onChange={(e) => updateShapes(e, 'checkbox_face', `rightFace_${index}`, '')} size="small" color="primary" className={classes.checkboxFace} />}
                        />
                    </FormControl>
                    <FormControl className={classes.parameterInline}>
                        {/* <label htmlFor={'rightFace_' + index} className={(shape.faces.rightFace === true) ? classes.labelsm : classes.disabledlabel}>Color</label> */}
                        <input type="color" id={'rightFace_' + index} value={(shape.faces.rightFace === true) ? shape.data.rightFace : shape.faces.rightFace} onChange={(e) => updateShapes(e, 'color', `rightFace_${index}`, '')} inputref={inputRefs['rightFace']} disabled={(shape.faces.rightFace !== true) ? true : false}></input>
                    </FormControl>
                </div>

            </div>

        </React.Fragment>
    )

}

export default Box;