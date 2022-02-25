import React, { useRef, useEffect, useState } from 'react';
import '../zdogui.css';
import { FormControl, FormControlLabel, Input, InputLabel, Checkbox, makeStyles, Typography, Slider, InputAdornment } from '@material-ui/core';

import Zdog from 'zdog';
import Face from './Face';
import SingleParameterInput from './SingleParameterInput';
import ParameterSlider from './ParameterSlider';
import fixCamelCase from '../fixCamelCase';
import CanvasLayer from './CanvasLayer';
import RotateSliders from './RotateSliders';
import TranslateSliders from './TranslateSliders';
import Path from './Path';

/* const tau = Zdog.TAU; */

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
    },
    unit: {
        fontSize: 'small'
    }
}));

function ShapeLayer(props) {

    let cursorFocus = props.cursorFocus;

    console.log('cursorFocus = ', cursorFocus);

    const index = 0;
    const selectedNodeId = props.selectedNodeId;

    //const shape = props.shape;
    const [shapes, setShapes] = props.addedShapes;

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    /* rules for checkValueOnBlur depend on specific property and what Zdog API accepts, not type of input (ie., single, vector) 
    
    conditions:
    - empty
    - decimal ('.', '0.', '1.', '..')
    - negative

    also rules for valid inputs before onBlur - what error/warning does user see?
    - negative
    - decimal
    - NaN

    */

    const basicRefs = {
        "translate_x": useRef(),
        "translate_y": useRef(),
        "translate_z": useRef(),
        "fill": useRef(),
        "color": useRef(),
        "backface": useRef(),
        "closed": useRef(),
    }

    // properties for VectorParameterInputs
    // translate x, y, z (move from basicRefs)
    // scale x, y, z (add)

    // properties for SingleParameterInputs
    const shapeRefs = {
        "width": useRef(),
        "height": useRef(),
        "depth": useRef(),
        "diameter": useRef(),
        "length": useRef(),
        "radius": useRef(),
        "sides": useRef(),
        "cornerRadius": useRef(),
        "quarters": useRef(), // need to create menu with option 1 to 4
        "stroke": useRef()
    }

    /* const shapeRefs = { */
    /*  "width": useRef(),
     "height": useRef(),
     "depth": useRef(),
     "diameter": useRef(),
     "length": useRef(), */

    /* "radius": useRef(), */

    /* "path": useRef(), */
    //}

    const faceRefs = {
        "frontFace": useRef(),
        "rearFace": useRef(),
        "topFace": useRef(),
        "bottomFace": useRef(),
        "leftFace": useRef(),
        "rightFace": useRef(),
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

    const copyOfShape = (selectedNodeId[0] !== 'canvasnode') ? locateShapeInAddedShapesTree(flattened) : '';


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

    let emptyOrNegative = useRef([false, false]); // [value, axis]

    function updateShapes(e, controlType, id = '', v = '') {

        let splitElID = id.split('_');
        let property = splitElID[0];
        let axis = splitElID[1];

        // vector vs non-vector
        if (controlType === 'vector') {

            let val;

            if (property === 'translate') {
                if (e.target.value.length === 1 && e.target.value === '-') {
                    emptyOrNegative.current = ['-', axis];
                    val = 0; // not shown to user
                } else if (e.target.value.length === 0) {
                    emptyOrNegative.current = ['', axis];
                    val = 0; // not shown to user
                } else if (e.target.value[e.target.value.length - 1] === '.') {
                    emptyOrNegative.current = [e.target.value, axis];
                    val = Number(e.target.value.slice(0, -1));
                }
                else {
                    val = Number(e.target.value);
                    emptyOrNegative.current = [false, false];
                }

            } else if (property === 'rotate') {
                val = Number(v);
            }

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

                    //if (property !== 'sides' || (property === 'sides' && e.target.value.length > 0)) {
                        copyOfShape.data[property] = e.target.value;
                        cursorFocus[1](
                            {
                                'id': e.target.id,
                                'cursorPos': e.target.selectionStart
                            }
                        );
                    //} 
                    
                    /* else {
                        validSides.current = false;
                    } */

                    
                } else if (controlType === 'color') {

                    copyOfShape.data[property] = e.target.value;
                    cursorFocus[1]({
                        'id': '',
                        'cursorPos': 0
                    });
                }

            }

        }

        if (emptyOrNegative.current === [false, false]) {
            setShapes(flattened);
        }


    }

    function createColorControls() {

        let cylinderFrontFace = (
            <FormControl className={classes.parameter}>
                <label htmlFor={'frontFace_' + index} className={classes.labelsm}>Front Face</label>
                <input type="color" id={'frontFace_' + index} value={copyOfShape.data.frontFace} onChange={(e) => updateShapes(e, 'color', `frontFace_${index}`, '')} inputref={faceRefs['frontFace']}></input>
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

        return colorControls;
    }


    /* if (selectedNodeId[0] !== 'canvasnode') {
        createControls();
        colorControls = createColorControls();
    } */

    function createBoxFaceControls() {
        let faceControls = [];
        Object.keys(faceRefs).forEach((property) => {
            let side = property.split('F')[0];
            let faceComp = <Face side={side} copyOfShape={copyOfShape} updateShapes={updateShapes} cursorFocus={cursorFocus} refocus={refocus} faceRefs={faceRefs} />
            faceControls.push(faceComp);
        })

        let faceContainer = (
            <div className={classes.parameterGroup}>
                <p className={classes.label}>Faces</p>
                {faceControls}
            </div>
        );

        return faceContainer;
    }

    function createPath() {
        let closed = ((
            <FormControl className={classes.parameterCheckbox}>
                <FormControlLabel
                    label="Closed"
                    control={<Checkbox inputRef={basicRefs['closed']} checked={copyOfShape.data.closed} onChange={(e) => updateShapes(e, 'checkbox', `closed_${index}`, '')} size="small" id={'closed_' + index} color="#4c4c4c" className={classes.checkbox} />}
                />
            </FormControl>));
        let path = <Path checkCursorFocus={props.checkCursorFocus} cursorFocus={cursorFocus} copyOfShape={copyOfShape} addedShapes={props.addedShapes} flattened={flattened} />

        return (<> {closed, path} </>);
    }

    function createShapeControls() {
        let spis = [];
        Object.keys(shapeRefs).forEach((property) => {
            if (copyOfShape.data[property] !== undefined) {
                let spi = <SingleParameterInput cursorFocus={cursorFocus} checkValueOnBlur={checkValueOnBlur} parameter={property} copyOfShape={copyOfShape} addedShapes={props.addedShapes} /* updateShapes={updateShapes} */ paramRef={shapeRefs[property]} />;
                spis.push(spi);
            }
        })
        let container = <> {spis} </>;
        return container;
    }

    function refocus(cursorFocus, shapeRefs) {
        if (cursorFocus[0]['id'] !== '' && !cursorFocus[0]['id'].includes('path')) {

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

    function checkValueOnBlur(e, type, id, v) {
        if (type === 'textinput') {
            if (isNaN(e.target.value) || (e.target.value.includes('-')) || e.target.value.length === 0) {
                id.includes('sides_') ? e.target.value = 3 : e.target.value = 0;
                updateShapes(e, type, id, v);
            } else if (e.target.value[0] === '0' && e.target.value.length > 1) {
                if (e.target.value[1] !== '.' || isNaN(e.target.value[2])) {
                    e.target.value = 0;
                    updateShapes(e, type, id, v);
                } else if (e.target.value[e.target.value.length - 1] === '.') {
                    e.target.value = e.target.value.slice(0, -1);
                    updateShapes(e, type, id, v);
                }
            }
        } else if (e.target.value === '-' || e.target.value.length === 0) {
            e.target.value = 0;
            updateShapes(e, type, id, v);
        } else if (e.target.value[e.target.value.length - 1] === '.') {
            e.target.value = e.target.value.slice(0, -1);
            updateShapes(e, type, id, v);
        }
    }


    function renderLayerControls() {
        if (selectedNodeId[0] === 'canvasnode') {
            return (
                <CanvasLayer checkCursorFocus={props.checkCursorFocus} cursorFocus={cursorFocus} stateVars={props.stateVars} updateShapes={updateShapes}></CanvasLayer>
            )
        } else {
            return (

                <div>

                    <RotateSliders nodeId={selectedNodeId[0]} rotateData={copyOfShape.data.rotate} updateShapes={updateShapes} />

                    <div className={classes.parameter}>
                        <p className={classes.label}>Translate</p>

                        <FormControl className={classes.textField}>
                            <InputLabel htmlFor={'translate_x_' + index}>x</InputLabel>
                            <Input inputRef={basicRefs['translate_x']} id={'translate_x_' + index}
                                value={emptyOrNegative.current[1] === 'x' ? emptyOrNegative.current[0] : copyOfShape.data.translate.x}
                                onBlur={(e) => checkValueOnBlur(e, 'vector', `translate_x_${index}`, '')}
                                disabled={false} onChange={(e) => updateShapes(e, 'vector', `translate_x_${index}`, '')} />
                        </FormControl>

                        <FormControl className={classes.textField}>
                            <InputLabel htmlFor={'translate_y_' + index}>y</InputLabel>
                            <Input inputRef={basicRefs['translate_y']} id={'translate_y_' + index} value={emptyOrNegative.current[1] === 'y' ? emptyOrNegative.current[0] : copyOfShape.data.translate.y} onBlur={(e) => checkValueOnBlur(e, 'vector', `translate_y_${index}`, '')} disabled={false} onChange={(e) => updateShapes(e, 'vector', `translate_y_${index}`, '')} />
                        </FormControl>

                        <FormControl className={classes.textField}>
                            <InputLabel htmlFor={'translate_z_' + index}>z</InputLabel>
                            <Input inputRef={basicRefs['translate_z']} id={'translate_z_' + index} value={emptyOrNegative.current[1] === 'z' ? emptyOrNegative.current[0] : copyOfShape.data.translate.z} onBlur={(e) => checkValueOnBlur(e, 'vector', `translate_z_${index}`, '')} disabled={false} onChange={(e) => updateShapes(e, 'vector', `translate_z_${index}`, '')} />
                        </FormControl>
                    </div>


                    {createShapeControls()}

                    {(copyOfShape.shapeClass === 'Shape') ? createPath() : ''}


                    {/* {(copyOfShape.shapeClass !== 'Group') ? (
                        <FormControl className={classes.parameter}>
                            <InputLabel htmlFor={'stroke_' + index}>Stroke</InputLabel>
                            <Input inputRef={basicRefs['stroke']} id={'stroke_' + index} value={copyOfShape.data.stroke} onBlur={(e) => checkValueOnBlur(e, 'textinput', `stroke_${index}`, '')} disabled={false} onChange={(e) => { updateShapes(e, 'textinput', `stroke_${index}`, ''); console.log(e.target.selectionStart) }} endAdornment={<InputAdornment position="end"><p className={classes.unit}>px</p></InputAdornment>} />
                        </FormControl>
                    ) : ''} */}


                    {/*    {shapeSpecificControls} */}


                    {(copyOfShape.shapeClass !== 'Group') ? (
                        <FormControl className={classes.parameterCheckbox}>
                            <FormControlLabel
                                label="Fill"
                                control={<Checkbox inputRef={basicRefs['fill']} checked={copyOfShape.data.fill} onChange={(e) => updateShapes(e, 'checkbox', `fill_${index}`, '')} size="small" /* name={'fill_' + index} */ id={'fill_' + index} color="#4c4c4c" className={classes.checkbox} />}
                            />
                        </FormControl>
                    ) : ''}

                    {(copyOfShape.shapeClass !== 'Box' && copyOfShape.shapeClass !== 'Group') ? createColorControls() : ''}

                    {(copyOfShape.shapeClass === 'Box') ? createBoxFaceControls() : ''}

                </div>


            )
        }
    }


    useEffect(() => {
        refocus(cursorFocus, shapeRefs);
    }, []);

    return (
        <React.Fragment>
            {renderLayerControls()}
        </React.Fragment>
    )
}

export default ShapeLayer;

/* TO FIX:
       x all open after each update to shapes - needs to remember which were open and closed
       .. no input refocus
           x shapelayer input still in focus while interacting with canvas inputs (eg. after typing once in the canvas width field, it jumps back to whatever shapelayer input you last updated)
           x refocus to string index or character where cursor was last
           x negative numbers and zeros
           x color picker issue: can no longer drag to update

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