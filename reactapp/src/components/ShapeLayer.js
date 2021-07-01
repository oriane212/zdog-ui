import React, { useRef, useEffect, useState } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, Checkbox, makeStyles, Typography, Slider } from '@material-ui/core';

import Zdog from 'zdog';
import Face from './Face';
import SingleParameterInput from './SingleParameterInput';
import ParameterSlider from './ParameterSlider';
import fixCamelCase from '../fixCamelCase';

const tau = Zdog.TAU;

const useStyles = makeStyles((theme) => ({
    checkbox: {
        'padding-bottom': 12
    },
    parameter: {
        display: 'block',
        margin: 12,
        fontSize: 'small'
    },
    parameterInline: {
        display: 'inline-block',
        margin: 12
    },
    parameterGroup: {
        display: 'block',
        margin: 12,
        marginTop: 24,
        fontSize: 'small'
    },
    parameterCheckbox: {
        display: 'block',
        'margin-left': 12,
        'margin-top': 3,
        'margin-bottom': 3
    },
    subparameter: {
        'margin-left': 32,
        'margin-top': 3,
        'margin-bottom': 3
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    '.MuiTypography-body1': {
        fontSize: '0.5rem'
    },
    label: {
        fontSize: 'small',
        'margin-bottom': 14,
        marginTop: 24
    },
    labelsm: {
        fontSize: 'small',
        display: 'inline-block',
        width: 84
    },
    textField: {
        width: 55,
    },
    delete: {
        margin: 16,
        color: 'red'
    },
    myprimary: {
        color: "black"
    },
    confirmDialog: {
        padding: 40
    },
    li: {
        paddingTop: 4,
        paddingBottom: 4
    },
    slider: {
        marginBottom: 36,
        marginLeft: 2,
        display: 'block',
        fontSize: 'small'
    },
    checkbox: {
        'padding-bottom': 10
    },
    inlineCheckbox: {
        display: 'inline-block',
        marginTop: 2,
        width: 70
    },
    checkboxFace: {
        'padding-bottom': 12,
        display: 'inline-block',
        marginTop: 4
    },
    disabledlabel: {
        fontSize: 'small',
        color: 'darkgray'
    }
}));

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

function ShapeLayer(props) {

    let cursorFocus = props.cursorFocus;

    const index = 0;
    const selectedNodeId = props.selectedNodeId;

    //const shape = props.shape;
    const [shapes, setShapes] = props.addedShapes;

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const basicRefs = {
        "stroke": useRef(),
        "fill": useRef(),
        "color": useRef(),
        "backface": useRef(),
        "translate_x": useRef(),
        "translate_y": useRef(),
        "translate_z": useRef(),
    }

    const shapeRefs = {
        "width": useRef(),
        "height": useRef(),
        "depth": useRef(),
        "diameter": useRef(),
        "length": useRef(),
        "cornerRadius": useRef(),
        "radius": useRef(),
        "sides": useRef(),
        "frontFace": useRef(),
        "rearFace": useRef(),
        "topFace": useRef(),
        "bottomFace": useRef(),
        "leftFace": useRef(),
        "rightFace": useRef(),
        "quarters": useRef()
    }

    const classes = useStyles();

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes);
        let flattened = newshapearry.flat();
        return flattened;
    }

    let flattened = copyShapes();

    function locateShapeInAddedShapesTree(flattened) {

        let posStrings = selectedNodeId[0].split('_');
        let posNums = posStrings.map((s) => Number(s));

        let currentShape;

        posNums.forEach((posNum, i) => {
            if ((0 < i) && (i <= (posNums.length - 1))) {
                currentShape = currentShape.children[posNum];
            } else if (i === 0) {
                currentShape = flattened[posNum];
            }
        })

        return currentShape;
    }

    const copyOfShape = locateShapeInAddedShapesTree(flattened);


    const handleClick = () => {
        let flattened = copyShapes();
        flattened[index].open = !flattened[index].open;
        setShapes(flattened);
    };

    function handleDelete() {
        setConfirmDialogOpen(true);
    }

    function handleConfirm() {
        let flattened = copyShapes();
        flattened.splice(index, 1);
        setShapes(flattened);
        handleClose();
    }

    function handleClose() {
        setConfirmDialogOpen(false);
    }

    let shapeParameters = [];

    function updateShapes(e, controlType, id = '', v = '') {

        let splitElID = id.split('_');
        let property = splitElID[0];

        // vector vs non-vector
        if (controlType === 'vector') {

            let val;

            if (property === 'translate') {
                val = Number(e.target.value);
            } else if (property === 'rotate') {
                val = Number(v);
            }

            let axis = splitElID[1];

            let shapeProp = copyOfShape.data[property];

            if (axis === 'x') {
                shapeProp.set({ x: val, y: shapeProp.y, z: shapeProp.z });
            } else if (axis === 'y') {
                shapeProp.set({ x: shapeProp.x, y: val, z: shapeProp.z });
            } else {
                shapeProp.set({ x: shapeProp.x, y: shapeProp.y, z: val });
            }

            cursorFocus[1](
                {
                    'id': id,
                    'cursorPos': e.target.selectionStart
                }
            );

        } else if (controlType === 'checkbox_face') {

            if (e.target.checked) {
                copyOfShape.data[property] = copyOfShape.faces[property];
                copyOfShape.faces[property] = true;
            } else {
                copyOfShape.faces[property] = copyOfShape.data[property];
                copyOfShape.data[property] = false;
            }

            cursorFocus[1]({
                'id': '',
                'cursorPos': 0
            });

        } else {

            if (controlType === 'slider') {

                copyOfShape.data[property] = v;

                cursorFocus[1]({
                    'id': '',
                    'cursorPos': 0
                });

            } else {

                if (controlType === 'checkbox') {

                    copyOfShape.data[property] = !copyOfShape.data[property];
                    cursorFocus[1]({
                        'id': '',
                        'cursorPos': 0
                    });
                } else if (controlType === 'textinput') {

                    copyOfShape.data[property] = e.target.value;
                    cursorFocus[1](
                        {
                            'id': e.target.id,
                            'cursorPos': e.target.selectionStart
                        }
                    );
                } else if (controlType === 'color') {

                    copyOfShape.data[property] = e.target.value;
                    cursorFocus[1]({
                        'id': '',
                        'cursorPos': 0
                    });
                }

            }

        }

        setShapes(flattened);

    }

    let cylinderFrontFace = (
        <FormControl className={classes.parameter}>
                <label htmlFor={'frontFace_' + index} className={classes.labelsm}>Front Face</label>
                <input type="color" id={'frontFace_' + index} value={copyOfShape.data.frontFace} onChange={(e) => updateShapes(e, 'color', `frontFace_${index}`, '')} inputref={shapeRefs['frontFace']}></input>
            </FormControl>
    )

    let colorControls = (
        <React.Fragment>
            <FormControl className={classes.parameter}>
                <label htmlFor={'color_' + index} className={classes.labelsm}>Color</label>
                <input type="color" id={'color_' + index} value={copyOfShape.data.color} onChange={(e) => updateShapes(e, 'color', `color_${index}`, '')} inputref={basicRefs['color']}></input>
            </FormControl>
            <FormControl className={classes.parameter}>
                <label htmlFor={'backface_' + index} className={classes.labelsm}>Back Face</label>
                <input type="color" id={'backface_' + index} value={copyOfShape.data.backface} onChange={(e) => updateShapes(e, 'color', `backface_${index}`, '')} inputref={basicRefs['backface']}></input>
            </FormControl>
            {(copyOfShape.shapeClass === 'Cylinder') ? cylinderFrontFace : ''}
        </React.Fragment>
    );


    let shapeSpecificControls = [];
    let faceControls = [];
    let faceContainer = (
        <div className={classes.parameterGroup}>
            <p className={classes.label}>Faces</p>
            {faceControls}
        </div>
    );

    createControls();

    function createControls() {

        Object.keys(shapeRefs).forEach((property) => {
            if (copyOfShape.data[property] !== undefined) {
                if (property.includes('Face') && (copyOfShape.shapeClass === 'Box')) {
                    let side = property.split('F')[0];
                    let faceComp = <Face side={side} copyOfShape={copyOfShape} updateShapes={updateShapes} cursorFocus={cursorFocus} refocus={refocus} shapeRefs={shapeRefs} />
                    faceControls.push(faceComp);
                } else if (property === 'quarters' || property === 'sides') {
                    let min = (property === 'quarters') ? 1 : 3;
                    let max = (property === 'quarters') ? 4 : 12;
                    let id = `${property}_${index}`;
                    let slider = (
                        <ParameterSlider
                            id={id}
                            label={fixCamelCase(property)}
                            value={copyOfShape.data[property]}
                            min={min} max={max} step={1} marks={['']}
                            onChange={(e, v) => updateShapes(e, 'slider', id, v)}
                        />
                    )
                    shapeSpecificControls.push(slider);
                } else if (property !== 'frontFace') {
                    let spi = <SingleParameterInput parameter={property} copyOfShape={copyOfShape} updateShapes={updateShapes} paramRef={shapeRefs[property]} />
                    shapeSpecificControls.push(spi);
                }
            }
        })

        if (faceControls.length !== 0) {
            shapeSpecificControls.push(faceContainer);
        }

    }

    function refocus(cursorFocus, shapeRefs) {
        if (cursorFocus[0]['id'] !== '') {

            let splitID = cursorFocus[0]['id'].split('_');
            console.log(splitID);

            let property;

            if (splitID.length === 3) {
                console.log('equal to 3');
                property = `${splitID[0]}_${splitID[1]}`;
            } else {
                property = `${splitID[0]}`;
            }

            let pos = cursorFocus[0]['cursorPos'];


            let paramRef = (shapeRefs[property] !== undefined) ? shapeRefs[property] : basicRefs[property];

            if (paramRef !== undefined) {
                if (paramRef.current !== undefined && paramRef.current !== null) {
                    paramRef.current.focus();
                    if (pos !== 0) {
                        paramRef.current.setSelectionRange(pos, pos);
                    }
                }
            }
        }
    }

    let rotateSliders = [];

    Object.keys(copyOfShape.data.rotate).forEach((axis, i) => {
        let id = `rotate_${axis}_${index}`;
        let slider = (
            <ParameterSlider
                key={i}
                id={id}
                label={`${axis} = ${Math.round((copyOfShape.data.rotate[axis]) * (180 / Math.PI))}`}
                value={copyOfShape.data.rotate[axis]}
                min={0} max={tau} step={tau / 72} marks={marks_rotate}
                onChange={(e, v) => updateShapes(e, 'vector', id, v)}
            />
        )
        rotateSliders.push(slider);
    });


    useEffect(() => {
        refocus(cursorFocus, shapeRefs);
    }, []);

    return (


        <div>

            {(copyOfShape.shapeClass === 'Box') ? '' : colorControls}

            <FormControl className={classes.parameterCheckbox}>
                <FormControlLabel
                    label="Fill"
                    control={<Checkbox inputRef={basicRefs['fill']} checked={copyOfShape.data.fill} onChange={(e) => updateShapes(e, 'checkbox', `fill_${index}`, '')} size="small" /* name={'fill_' + index} */ id={'fill_' + index} color="primary" className={classes.checkbox} />}
                />
            </FormControl>

            {/* <TextField className={classes.parameter} id={'stroke_' + index} label="Stroke" value={shape.data.stroke} onChange={handleInputUpdate} /> */}

            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'stroke_' + index}>Stroke</InputLabel>
                <Input inputRef={basicRefs['stroke']} id={'stroke_' + index} value={copyOfShape.data.stroke} disabled={false} onChange={(e) => { updateShapes(e, 'textinput', `stroke_${index}`, ''); console.log(e.target.selectionStart) }} />
            </FormControl>

            <div className={classes.parameter}>

                <p className={classes.label}>Translate</p>

                <FormControl className={classes.textField}>
                    <InputLabel htmlFor={'translate_x_' + index}>x</InputLabel>
                    <Input /* startAdornment={<InputAdornment position="start">x:</InputAdornment>} */ inputRef={basicRefs['translate_x']} id={'translate_x_' + index} value={copyOfShape.data.translate.x} disabled={false} onChange={(e) => updateShapes(e, 'vector', `translate_x_${index}`, '')} />
                </FormControl>

                <FormControl className={classes.textField}>
                    <InputLabel htmlFor={'translate_y_' + index}>y</InputLabel>
                    <Input /* startAdornment={<InputAdornment position="start">y:</InputAdornment>} */ inputRef={basicRefs['translate_y']} id={'translate_y_' + index} value={copyOfShape.data.translate.y} disabled={false} onChange={(e) => updateShapes(e, 'vector', `translate_y_${index}`, '')} />
                </FormControl>

                <FormControl className={classes.textField}>
                    <InputLabel htmlFor={'translate_z_' + index}>z</InputLabel>
                    <Input /* startAdornment={<InputAdornment position="start">z:</InputAdornment>} */ inputRef={basicRefs['translate_z']} id={'translate_z_' + index} value={copyOfShape.data.translate.z} disabled={false} onChange={(e) => updateShapes(e, 'vector', `translate_z_${index}`, '')} />
                </FormControl>

            </div>

            <div className={classes.parameterGroup}>

                <p className={classes.label}>Rotate</p>
                {/* <Typography variant="body2">Rotate</Typography> */}

                {rotateSliders}

                {/* <FormControl className={classes.slider}>
                    <Typography variant="body2" id={'rotate_x_' + index + '_label'}>x = {Math.round((copyOfShape.data.rotate.x) * (180 / Math.PI))}</Typography>
                    <Slider className={classes.slider} id={'rotate_x_' + index} value={copyOfShape.data['rotate']['x']} min={0} max={tau} step={tau / 72} marks={marks_rotate} onChange={(e, v) => updateShapes(e, 'vector', `rotate_x_${index}`, v)} aria-labelledby={'rotate_x_' + index + '_label'} />
                </FormControl>

                <FormControl className={classes.slider}>
                    <Typography variant="body2" id={'rotate_y_' + index + '_label'}>y = {Math.round((copyOfShape.data.rotate.y) * (180 / Math.PI))}</Typography>
                    <Slider className={classes.slider} id={'rotate_x_' + index} value={copyOfShape.data['rotate']['y']} min={0} max={tau} step={tau / 72} marks={marks_rotate} onChange={(e, v) => updateShapes(e, 'vector', `rotate_y_${index}`, v)} aria-labelledby={'rotate_y_' + index + '_label'} />
                </FormControl>

                <FormControl className={classes.slider}>
                    <Typography variant="body2" id={'rotate_z_' + index + '_label'}>z = {Math.round((copyOfShape.data.rotate.z) * (180 / Math.PI))}</Typography>
                    <Slider className={classes.slider} id={'rotate_z_' + index} value={copyOfShape.data['rotate']['z']} min={0} max={tau} step={tau / 72} marks={marks_rotate} onChange={(e, v) => updateShapes(e, 'vector', `rotate_z_${index}`, v)} aria-labelledby={'rotate_z_' + index + '_label'} />
                </FormControl> */}

            </div>


            {shapeSpecificControls}


            {/* <Button className={classes.delete} size="small">Delete</Button> */}

        </div>

    )
}

export default ShapeLayer;

/* TO FIX:
       x all open after each update to shapes - needs to remember which were open and closed
       .. no input refocus
           x shapelayer input still in focus while interacting with canvas inputs (eg. after typing once in the canvas width field, it jumps back to whatever shapelayer input you last updated)
           x refocus to string index or character where cursor was last
           - negative numbers and zeros
           - color picker issue: can no longer drag to update

       x rm Material UI List click animation
       .. input styles

       - safari: webpage reload on color picker (??)
   */

/* TO ADD:
    .. other shape properties
    .. additional specific shape properties

    features
    x remove a layer
    - edit layer name
    - undo last change?

    minor
    .. replace stars with icons that match shapeclass?
*/