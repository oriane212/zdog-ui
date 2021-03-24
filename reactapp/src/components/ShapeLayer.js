import React, { useRef, useEffect, useState } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, Checkbox, makeStyles } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

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
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));


function ShapeLayer(props) {

    const index = props.index;
    const shape = props.shape;
    const [shapes, setShapes] = props.addedShapes;

    const inputRefs = {
        "stroke": useRef(),
        "fill": useRef(),
        "diameter": useRef()
    }

    /* const inputRef_stroke = useRef();
    const inputRef_fill = useRef();

    const inputRef_diameter = useRef(); */

    
    //let [inputFocus, setInputFocus] = useState('');

    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    let shapeParameters = [];

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes);
        let flattened = newshapearry.flat();
        return flattened;
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
        let splitElID = e.target.id.split('_');
        let property = splitElID[0];



        let shapeindex = splitElID[1];
        let flattened = copyShapes();
        if (controlType === 'checkbox') {
            flattened[shapeindex].data[property] = !flattened[shapeindex].data[property];
        } else if (controlType === 'textinput') {
            //let stringval = e.target.value;
            flattened[shapeindex].data[property] = Number(e.target.value);
        } /* else if (controlType === 'slider') {
            flattened[shapeindex].data[property] = v;
        } */

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
        - all open after each update to shapes - needs to remmember which were open and closed
        - no input refocus
        - rm Material UI List click animation
        - input styles
    */

    /* TO ADD:
        - other shape properties
        - additional specific shape properties

        features
        - remove a layer
        - edit layer name
        - undo last change?

        minor
        - replace stars with icons that match shapeclass?
    */

    return (

        <React.Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <StarBorder />
                </ListItemIcon>
                <ListItemText primary={(index + 1) + ': ' + shape.shapeClass} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <div>
                            <FormControl className={classes.parameter}>
                                <InputLabel htmlFor={'stroke_' + index}>stroke</InputLabel>
                                <Input inputRef={inputRefs['stroke']} id={'stroke_' + index} value={shape.data.stroke} disabled={false} onChange={(e) => handleInputUpdate(e)} />
                            </FormControl>

                            <FormControl className={classes.parameter}>
                                <FormControlLabel
                                    label="fill"
                                    control={<Checkbox inputRef={inputRefs['fill']} className={classes.checkbox} checked={shape.data.fill} onChange={(e) => handleCheckboxClick(e)} name={'fill_' + index} id={'fill_' + index} color="primary" />}
                                />
                            </FormControl>

                            <FormControl className={classes.parameter}>
                                <InputLabel htmlFor={'diameter_' + index}>diameter</InputLabel>
                                <Input inputRef={inputRefs['diameter']} id={'diameter_' + index} value={shape.data.diameter} disabled={false} onChange={(e) => handleInputUpdate(e)} />
                            </FormControl>
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