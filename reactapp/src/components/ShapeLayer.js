import React, { useRef, useEffect, useState } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, Checkbox, makeStyles, FilledInput, OutlinedInput, InputAdornment, Button, IconButton, Dialog, Typography, Container, TextField, Slider } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Ellipse from './Ellipse';
import Rect from './Rect';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import Zdog from 'zdog';
const tau = Zdog.TAU;

const useStyles = makeStyles((theme) => ({
    slider: {
        width: 200
    },
    checkbox: {
        'padding-bottom': 12
    },
    parameter: {
        display: 'block',
        margin: 12,
        fontSize: 'small'
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
        fontSize: 'small'
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
}));

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: tau/12,
        label: '30',
    },
    {
        value: tau/4,
        label: '90',
    },
    {
        value: tau/2,
        label: '180',
    },
    {
        value: ((tau/4)*3),
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

    const inputRefs = {
        "stroke": useRef(),
        "fill": useRef(),
        "color": useRef(),
        "translate_x": useRef(),
        "translate_y": useRef(),
        "translate_z": useRef()
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



    /* function handleSliderUpdate(e,v) {
        // get the parent div with MuiFormControl-root class
        let parentWithID = e.target.closest('.MuiFormControl-root');
        // get id for that parent
        let id = parentWithID.getAttribute('id');
        // pass the id to updateshapes
        updateShapes(e, v, 'slider', id);
    } */

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

        /* else if (controlType === 'select') {

        console.log('inside select');
        let splitElName = e.target.name.split('_');
        let property = splitElName[0];
        //let shapeindex = splitElName[1];

        //flattened[shapeindex].data[property] = e.target.value;
        copyOfShape.data[property] = e.target.value;
        cursorFocus[1]({
            'id': '',
            'cursorPos': 0
        });

    } */

        setShapes(flattened);

    }



    let shapeSpecificControls;
    if (copyOfShape.shapeClass === 'Ellipse') {
        shapeSpecificControls = <Ellipse cursorFocus={cursorFocus} refocus={refocus} shape={copyOfShape} flattened={flattened} updateShapes={updateShapes} />
    } else if (copyOfShape.shapeClass === 'Rect') {
        shapeSpecificControls = <Rect cursorFocus={cursorFocus} refocus={refocus} shape={copyOfShape} flattened={flattened} updateShapes={updateShapes} />
    }


    function refocus(cursorFocus, inputRefs) {

        if (cursorFocus[0]['id'] !== '') {

            let splitID = cursorFocus[0]['id'].split('_');
            console.log(splitID);

            let property;
            //let shapeindex;

            if (splitID.length === 3) {
                console.log('equal to 3');
                property = `${splitID[0]}_${splitID[1]}`;
                //shapeindex = splitID[2];
            } else {
                property = `${splitID[0]}`;
                //shapeindex = splitID[1];
            }

            console.log('property = ' + property);

            let pos = cursorFocus[0]['cursorPos'];
            console.log('pos:' + pos);

            if (inputRefs[property] !== undefined /* && Number(shapeindex) === index */) {
                console.log('INSIDE INPUT REFS');
                inputRefs[property].current.focus();
                if (pos !== 0) {
                    inputRefs[property].current.setSelectionRange(pos, pos);
                }
            }
        }
    }


    useEffect(() => {
        refocus(cursorFocus, inputRefs);
    }, []);


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

    return (


        <div>

            <FormControl className={classes.parameter}>
                <label htmlFor={'color_' + index} className={classes.labelsm}/* className="MuiTypography-body2" */>Color</label>
                <input type="color" id={'color_' + index} /* name={'color_' + index} */ value={copyOfShape.data.color} onChange={(e) => updateShapes(e, 'color', `color_${index}`,'')} inputref={inputRefs['color']}></input>
            </FormControl>

            <FormControl className={classes.parameterCheckbox}>
                <FormControlLabel
                    label="Fill"
                    control={<Checkbox inputRef={inputRefs['fill']} checked={copyOfShape.data.fill} onChange={(e) => updateShapes(e, 'checkbox', `fill_${index}`,'')} size="small" /* name={'fill_' + index} */ id={'fill_' + index} color="primary" className={classes.checkbox} />}
                />
            </FormControl>

            {/* <TextField className={classes.parameter} id={'stroke_' + index} label="Stroke" value={shape.data.stroke} onChange={handleInputUpdate} /> */}

            <FormControl className={classes.parameter}>
                <InputLabel htmlFor={'stroke_' + index}>Stroke</InputLabel>
                <Input inputRef={inputRefs['stroke']} id={'stroke_' + index} value={copyOfShape.data.stroke} disabled={false} onChange={(e) => { updateShapes(e, 'textinput', `stroke_${index}`,''); console.log(e.target.selectionStart) }} />
            </FormControl>

            <div className={classes.parameter}>

                <p className={classes.label}>Translate</p>

                <FormControl className={classes.textField}>
                    <InputLabel htmlFor={'translate_x_' + index}>x</InputLabel>
                    <Input /* startAdornment={<InputAdornment position="start">x:</InputAdornment>} */ inputRef={inputRefs['translate_x']} id={'translate_x_' + index} value={copyOfShape.data.translate.x} disabled={false} onChange={(e) => updateShapes(e, 'vector', `translate_x_${index}`, '')} />
                </FormControl>

                <FormControl className={classes.textField}>
                    <InputLabel htmlFor={'translate_y_' + index}>y</InputLabel>
                    <Input /* startAdornment={<InputAdornment position="start">y:</InputAdornment>} */ inputRef={inputRefs['translate_y']} id={'translate_y_' + index} value={copyOfShape.data.translate.y} disabled={false} onChange={(e) => updateShapes(e, 'vector', `translate_y_${index}`, '')} />
                </FormControl>

                <FormControl className={classes.textField}>
                    <InputLabel htmlFor={'translate_z_' + index}>z</InputLabel>
                    <Input /* startAdornment={<InputAdornment position="start">z:</InputAdornment>} */ inputRef={inputRefs['translate_z']} id={'translate_z_' + index} value={copyOfShape.data.translate.z} disabled={false} onChange={(e) => updateShapes(e, 'vector', `translate_z_${index}`,'')} />
                </FormControl>

            </div>

            <div className={classes.parameterGroup}>

            <p className={classes.label}>Rotate</p>
            {/* <Typography variant="body2">Rotate</Typography> */}

            <FormControl className={classes.slider}>
                <Typography variant="body2" id={'rotate_x_' + index + '_label'}>x = {Math.round((copyOfShape.data.rotate.x)*(180/Math.PI))}</Typography>
                <Slider /* ref={inputRefs['quarters']} */ className={classes.slider} id={'rotate_x_' + index} value={copyOfShape.data.rotate.x} min={0} max={tau} step={tau/72} marks={marks} onChange={(e, v) => updateShapes(e, 'vector', `rotate_x_${index}`, v)} aria-labelledby={'rotate_x_' + index + '_label'} />
            </FormControl>

            <FormControl className={classes.slider}>
                <Typography variant="body2" id={'rotate_y_' + index + '_label'}>y = {Math.round((copyOfShape.data.rotate.y)*(180/Math.PI))}</Typography>
                <Slider /* ref={inputRefs['quarters']} */ className={classes.slider} id={'rotate_x_' + index} value={copyOfShape.data.rotate.y} min={0} max={tau} step={tau/72} marks={marks} onChange={(e, v) => updateShapes(e, 'vector', `rotate_y_${index}`, v)} aria-labelledby={'rotate_y_' + index + '_label'} />
            </FormControl>

            <FormControl className={classes.slider}>
                <Typography variant="body2" id={'rotate_z_' + index + '_label'}>z = {Math.round((copyOfShape.data.rotate.z)*(180/Math.PI))}</Typography>
                <Slider /* ref={inputRefs['quarters']} */ className={classes.slider} id={'rotate_z_' + index} value={copyOfShape.data.rotate.z} min={0} max={tau} step={tau/72} marks={marks} onChange={(e, v) => updateShapes(e, 'vector', `rotate_z_${index}`, v)} aria-labelledby={'rotate_z_' + index + '_label'} />
            </FormControl>

            </div>

            


            {shapeSpecificControls}


            {/* <Button className={classes.delete} size="small">Delete</Button> */}

        </div>

    )
}

export default ShapeLayer;

/*
<FormControl className={classes.parameter}>
                                <InputLabel className={classes.labelsm} htmlFor={'color_' + index}>color</InputLabel>
                                <input type="color" id={'color_' + index} name={'color_' + index} value={shape.data.color} onChange={(e) => handleInputUpdate(e)}></input>
                            </FormControl>
                            */

/*
<FormControl className={classes.parameter}>
    <FormControlLabel
        label="Fill"
        className={classes.label}
        control={<Checkbox inputRef={inputRefs['fill']} className={classes.labelsm}  checked={shape.data.fill} onChange={(e) => handleCheckboxClick(e)} name={'fill_' + index} id={'fill_' + index} color="primary" />}
    />
</FormControl>
*/

/*
<FormControl className={classes.parameter}>
    <InputLabel className={classes.labelsm} htmlFor={'fill_' + index}>fill</InputLabel>
    <Checkbox inputRef={inputRefs['fill']} checked={shape.data.fill} onChange={(e) => handleCheckboxClick(e)} name={'fill_' + index} id={'fill_' + index} color="primary" />
</FormControl>
*/

/*


<FormControl className={classes.parameter}>
<InputLabel htmlFor="canvas_width">Canvas width</InputLabel>
<Input id="canvas_width" value={canvas_w} disabled={false} onChange={(e) => setCanvas_w(e.target.value)} />
</FormControl>

*/


/*

<div key={generateID()}>
                        <div>shape {i} is {shape.shapeClass}</div>
                        <FormControl className={classes.parameter}>
                            <InputLabel htmlFor="diameter_0">test diameter</InputLabel>
                            <Input inputRef={inputRef1} id="diameter_0" value={shape.data.diameter} disabled={false} onChange={(e) => handleTest(e)} />
                        </FormControl>
                        <FormControl className={classes.parameter}>
                            <InputLabel htmlFor="stroke_0">test stroke</InputLabel>
                            <Input inputRef={inputRef2} id="stroke_0" value={shape.data.stroke} disabled={false} onChange={(e) => handleTest(e)} />
                        </FormControl>
                    </div>

                    */