import React, { useRef, useEffect, useState } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, Checkbox, makeStyles, FilledInput, OutlinedInput, InputAdornment, Button, IconButton, Dialog, Typography, Container, TextField } from '@material-ui/core';
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


const useStyles = makeStyles((theme) => ({
    slider: {
        width: 200
    },
    checkbox: {
        'padding-bottom': 12
    },
    parameter: {
        display: 'block',
        margin: 16,
        fontSize: 'small'
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
        'margin-bottom': 4
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
    }
}));


function ShapeLayer(props) {

    let counter = props.counter;

    const index = props.index;
    const shape = props.shape;
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

    //const refForFocus = useRef();

    //let idRef = useRef(0);
    //idRef.current = 'translate_x_0';

    /* const inputRef_stroke = useRef();
    const inputRef_fill = useRef();

    const inputRef_diameter = useRef(); */


    //let [inputFocus, setInputFocus] = useState('');

    const classes = useStyles();

    /* const [open, setOpen] = React.useState(shape.open); */

    const handleClick = () => {
        //setOpen(!open);
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

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes);
        let flattened = newshapearry.flat();
        return flattened;
    }

    /* function handleSliderUpdate(e,v) {
        // get the parent div with MuiFormControl-root class
        let parentWithID = e.target.closest('.MuiFormControl-root');
        // get id for that parent
        let id = parentWithID.getAttribute('id');
        // pass the id to updateshapes
        updateShapes(e, v, 'slider', id);
    } */

    /* function updateFocus(e) {
        let splitElID = e.target.id.split('_');
        let property = splitElID[0];
        if (inputFocus !== property) {
            setInputFocus(property);
        }
    } */

    /* function refocus(ref) {
        ref.current.focus();
    } */

    

    function updateShapes(e, controlType) {

        //setIdForFocus(e.target.id);
        

        let flattened = copyShapes();

        if (controlType === 'vector') {

            let splitElID = e.target.id.split('_');

            let val = Number(e.target.value);

            let property = splitElID[0];
            let axis = splitElID[1];
            let shapeindex = splitElID[2];

            let shapeProp = flattened[shapeindex].data[property];

            if (axis === 'x') {
                shapeProp.set({ x: val, y: shapeProp.y, z: shapeProp.z });
            } else if (axis === 'y') {
                shapeProp.set({ x: shapeProp.x, y: val, z: shapeProp.z });
            } else {
                shapeProp.set({ x: shapeProp.x, y: shapeProp.y, z: val });
            }

            counter[1](e.target.id);


        } else if (controlType === 'select') {

            console.log('inside select');
            let splitElName = e.target.name.split('_');
            let property = splitElName[0];
            let shapeindex = splitElName[1];

            flattened[shapeindex].data[property] = e.target.value;
            counter[1](0);

            /* let property = splitElID[0];
            let menuitem = splitElID[1];
            let shapeindex = splitElID[2];

            flattened[shapeindex].data[property] = menuitem; */

        } else {

            let splitElID = e.target.id.split('_');
            let property = splitElID[0];
            let shapeindex = splitElID[1];

            if (controlType === 'checkbox') {
                flattened[shapeindex].data[property] = !flattened[shapeindex].data[property];
                counter[1](0);
            } else if (controlType === 'textinput') {
                //let stringval = e.target.value;
                //flattened[shapeindex].data[property] = Number(e.target.value);
                flattened[shapeindex].data[property] = e.target.value;
                counter[1](e.target.id);
            } else if (controlType === 'color') {
                flattened[shapeindex].data[property] = e.target.value;
                counter[1](0);
            }

        }

        //idRef.current++;
        //counter[1](e.target.id);

        setShapes(flattened);

        //console.log('idRef.current: ' + idRef.current);
        

    }

    let shapeSpecificControls;
    if (shape.shapeClass === 'Ellipse') {
        shapeSpecificControls = <Ellipse counter={counter} shape={shape} index={index} updateShapes={updateShapes} />
    } else if (shape.shapeClass === 'Rect') {
        shapeSpecificControls = <Rect counter={counter} shape={shape} index={index} updateShapes={updateShapes} />
    }


    function refocus(ref) {
        ref.current.focus();
    }


    useEffect(() => {

        console.log('counter: ' + counter[0]);
        //console.log('idRef.current: ' + idRef.current);

       if (shapes.length > 0 && counter[0] !== 0) {
            console.log('shapes is longer than 0');
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

            

            



            /* let refForFocus = inputRefs[property];
            console.log(refForFocus);
            refocus(refForFocus); */

            /* if (shapeindex === index) {
                let refForFocus = inputRefs[property];
                refocus(refForFocus);
            } */

            

            // TO FIX - inputFocus never seems to update
            //console.log(inputFocus);

            /* if (typeof inputRefs[inputFocus] !== 'undefined') {
                let ref = inputRefs[inputFocus];
                refocus(ref);
            } */

            /* if (typeof prevFocus.current !== 'undefined') {
                let ref = inputRefs[prevFocus.current];
                console.log('prevFocus.current: ', prevFocus.current);
                console.log('ref: ', ref);
                refocus(ref);
            } */
            /* if (prevFocus.current !== 'init') {
                let ref = inputRefs[prevFocus.current];
                console.log('prevFocus.current: ', prevFocus.current);
                console.log('ref: ', ref);
                ref.current.focus();
            } */

            //console.log(inputRef);
            //refocus(uiEls[refIndex[0]]);
            /* if (inputNum.current === 1) {
                refocus(inputRef1);
                //inputRefs[1].current.focus();
            } else if (inputNum.current === 2) {
                refocus(inputRef2);
                //inputRefs[2].current.focus();
            } */



        }


    }, []);

    /* function handleTest(e) {

        let [parameter, shapeindex] = e.target.id.split('_');

       
        console.log(e.target);

        let flattened = copyShapes();

        if (typeof e)
        flattened[shapeindex].data[parameter] = e.target.value;

        setShapes(flattened);
    } */




    /* TO FIX:
        x all open after each update to shapes - needs to remember which were open and closed
        .. no input refocus
            x shapelayer input still in focus while interacting with canvas inputs (eg. after typing once in the canvas width field, it jumps back to whatever shapelayer input you last updated)
            - refocus to string index or character where cursor was last
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

        <React.Fragment>
            <ListItem /* button onClick={handleClick} */>
                {/* <ListItemIcon>
                    <StarBorder />
                </ListItemIcon> */ }

                <ListItemText primary={(index + 1) + ': ' + shape.shapeClass} />

                <IconButton onClick={handleDelete} aria-label="delete">
                    <DeleteOutlinedIcon fontSize="small" />
                </IconButton>

                {shape.open ?
                    <IconButton onClick={handleClick} className={classes.myprimary} aria-label="Expand less"><ExpandLess /></IconButton>
                    :
                    <IconButton onClick={handleClick} className={classes.myprimary} aria-label="Expand more"><ExpandMore /></IconButton>
                }

                <Dialog onClose={handleClose} open={confirmDialogOpen}>
                    <Container className={classes.confirmDialog}>
                        <Typography>Are you sure you want to delete Shape {(index + 1)} ({shape.shapeClass})?</Typography>
                        <div>
                            <Button onClick={handleConfirm} color="primary">Confirm</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </div>
                    </Container>

                </Dialog>
            </ListItem>
            <Collapse in={shape.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem /* button  */ className={classes.nested} /* disableRipple */>
                        <div>

                            <FormControl className={classes.parameter}>
                                <label htmlFor={'color_' + index} className="MuiTypography-body1">Color</label>
                                <input type="color" id={'color_' + index} /* name={'color_' + index} */ value={shape.data.color} onChange={(e) => updateShapes(e, 'color')} inputRef={inputRefs['color']}></input>
                            </FormControl>

                            <FormControl className={classes.parameter}>
                                <FormControlLabel
                                    label="Fill"
                                    className={classes.labelsm}
                                    control={<Checkbox inputRef={inputRefs['fill']} className={classes.labelsm} checked={shape.data.fill} onChange={(e) => updateShapes(e, 'checkbox')} size="small" /* name={'fill_' + index} */ id={'fill_' + index} color="primary" />}
                                />
                            </FormControl>

                            {/* <TextField className={classes.parameter} id={'stroke_' + index} label="Stroke" value={shape.data.stroke} onChange={handleInputUpdate} /> */}

                            <FormControl className={classes.parameter}>
                                <InputLabel htmlFor={'stroke_' + index}>Stroke</InputLabel>
                                <Input inputRef={inputRefs['stroke']} id={'stroke_' + index} value={shape.data.stroke} disabled={false} onChange={(e) => {updateShapes(e, 'textinput'); console.log(e.target.selectionStart)}} />
                            </FormControl>

                            <div className={classes.parameter}>

                                <p className={classes.label}>Translate</p>

                                <FormControl className={classes.textField}>
                                    <InputLabel htmlFor={'translate_x_' + index}>x</InputLabel>
                                    <Input /* startAdornment={<InputAdornment position="start">x:</InputAdornment>} */ inputRef={inputRefs['translate_x']} id={'translate_x_' + index} value={shape.data.translate.x} disabled={false} onChange={(e) => updateShapes(e, 'vector')} />
                                </FormControl>

                                <FormControl className={classes.textField}>
                                    <InputLabel htmlFor={'translate_y_' + index}>y</InputLabel>
                                    <Input /* startAdornment={<InputAdornment position="start">y:</InputAdornment>} */ inputRef={inputRefs['translate_y']} id={'translate_y_' + index} value={shape.data.translate.y} disabled={false} onChange={(e) => updateShapes(e, 'vector')} />
                                </FormControl>

                                <FormControl className={classes.textField}>
                                    <InputLabel htmlFor={'translate_z_' + index}>z</InputLabel>
                                    <Input /* startAdornment={<InputAdornment position="start">z:</InputAdornment>} */ inputRef={inputRefs['translate_z']} id={'translate_z_' + index} value={shape.data.translate.z} disabled={false} onChange={(e) => updateShapes(e, 'vector')} />
                                </FormControl>

                            </div>


                            {shapeSpecificControls}


                            {/* <Button className={classes.delete} size="small">Delete</Button> */}

                        </div>
                    </ListItem>

                </List>

            </Collapse>
        </React.Fragment>



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