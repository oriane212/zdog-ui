import React, { useRef, useEffect, useState } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, Checkbox, makeStyles, FilledInput, OutlinedInput, InputAdornment } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Ellipse from './Ellipse';

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
}));


function ShapeLayer(props) {

    const index = props.index;
    const shape = props.shape;
    const [shapes, setShapes] = props.addedShapes;

    const inputRefs = {
        "stroke": useRef(),
        "fill": useRef(),
        "color": useRef(),
        "translate_x": useRef(),
        "translate_y": useRef(),
        "translate_z": useRef()
    }

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

    let shapeParameters = [];

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes);
        let flattened = newshapearry.flat();
        return flattened;
    }

    function handleVectorUpdate(e) {
        updateShapes(e, 'vector');
    }

    function handleCheckboxClick(e) {
        // just set the property value to the opposite of what it is (value does not have checked value)
        updateShapes(e, 'checkbox');

    }

    function handleInputUpdate(e) {

        /* let splitElID = e.target.id.split('_');
        let property = splitElID[0];  */

        //let shapeindex = splitElID[1];

        /* prevFocus.current = property; */

        /* if (property === 'stroke') {
            prevFocus = inputRef_stroke.current;
        } else if (property === 'diameter') {
            prevFocus = inputRef_diameter.current;
        } */
        updateShapes(e, 'textinput');
        //updateFocus(e);
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

        let flattened = copyShapes();
        let splitElID = e.target.id.split('_');

        if (controlType === 'vector') {

            let val = Number(e.target.value);

            let property = splitElID[0];
            let axis = splitElID[1];
            let shapeindex = splitElID[2];
      
            let shapeProp = flattened[shapeindex].data[property];

            if (axis === 'x') {
                shapeProp.set({ x : val, y: shapeProp.y, z: shapeProp.z });
            } else if (axis === 'y') {
                shapeProp.set({ x: shapeProp.x, y : val, z: shapeProp.z });
            } else {
                shapeProp.set({ x: shapeProp.x, y: shapeProp.y, z : val });
            }
            

        } else {

            let property = splitElID[0];
            let shapeindex = splitElID[1];

            if (controlType === 'checkbox') {
                flattened[shapeindex].data[property] = !flattened[shapeindex].data[property];
            } else if (controlType === 'textinput') {
                //let stringval = e.target.value;
                //flattened[shapeindex].data[property] = Number(e.target.value);
                flattened[shapeindex].data[property] = e.target.value;
            }

        }


        setShapes(flattened);

    }

    useEffect(() => {

        if (shapes.length > 0) {
            console.log('shapes is longer than 0');
            console.log(inputRefs);

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
        x all open after each update to shapes - needs to remmember which were open and closed
        - no input refocus
        x rm Material UI List click animation
        .. input styles
    */

    /* TO ADD:
        .. other shape properties
        .. additional specific shape properties

        features
        - remove a layer
        - edit layer name
        - undo last change?

        minor
        .. replace stars with icons that match shapeclass?
    */

    return (

        <React.Fragment>
            <ListItem button onClick={handleClick}>
                {/* <ListItemIcon>
                    <StarBorder />
                </ListItemIcon> */}
                <ListItemText primary={(index + 1) + ': ' + shape.shapeClass} />
                {shape.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={shape.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} disableRipple>
                        <div>

                            <FormControl className={classes.parameter}>
                                <label htmlFor={'color_' + index} className="MuiTypography-body1">Color</label>
                                <input type="color" id={'color_' + index} name={'color_' + index} value={shape.data.color} onChange={(e) => handleInputUpdate(e)}></input>
                            </FormControl>

                            <FormControl className={classes.parameter}>
                                <FormControlLabel
                                    label="Fill"
                                    className={classes.labelsm}
                                    control={<Checkbox inputRef={inputRefs['fill']} className={classes.labelsm} checked={shape.data.fill} onChange={(e) => handleCheckboxClick(e)} name={'fill_' + index} id={'fill_' + index} color="primary" />}
                                />
                            </FormControl>

                            <FormControl className={classes.parameter}>
                                <InputLabel htmlFor={'stroke_' + index}>Stroke</InputLabel>
                                <Input inputRef={inputRefs['stroke']} id={'stroke_' + index} value={shape.data.stroke} disabled={false} onChange={(e) => handleInputUpdate(e)} />
                            </FormControl>

                            <div className={classes.parameter}>

                                <p className={classes.label}>Translate</p>

                                <FormControl className={classes.textField}>
                                    <InputLabel htmlFor={'translate_x_' + index}>x</InputLabel>
                                    <Input /* startAdornment={<InputAdornment position="start">x:</InputAdornment>} */ inputRef={inputRefs['translate_x']} id={'translate_x_' + index} value={shape.data.translate.x} disabled={false} onChange={(e) => handleVectorUpdate(e)} />
                                </FormControl>

                                <FormControl className={classes.textField}>
                                    <InputLabel htmlFor={'translate_y_' + index}>y</InputLabel>
                                    <Input /* startAdornment={<InputAdornment position="start">y:</InputAdornment>} */ inputRef={inputRefs['translate_y']} id={'translate_y_' + index} value={shape.data.translate.y} disabled={false} onChange={(e) => handleVectorUpdate(e)} />
                                </FormControl>

                                <FormControl className={classes.textField}>
                                    <InputLabel htmlFor={'translate_z_' + index}>z</InputLabel>
                                    <Input /* startAdornment={<InputAdornment position="start">z:</InputAdornment>} */ inputRef={inputRefs['translate_z']} id={'translate_z_' + index} value={shape.data.translate.z} disabled={false} onChange={(e) => handleVectorUpdate(e)} />
                                </FormControl>

                            </div>



                            <Ellipse shape={shape} index={index} inputHandler={handleInputUpdate} />

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