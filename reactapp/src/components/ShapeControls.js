import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import Shape from './Shape';
import { Button, FormControl, Input, IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import generateID from '../generateID';
// import Ellipse from './Ellipse';
import ShapeLayer from './ShapeLayer';

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

function ShapeControls(props) {

    let inputRef1 = useRef();
    let inputRef2 = useRef();

    //let inputRefs = useRef(new Array(1));
    
    /* let inputRefs = new Array(3).fill(useRef(null));
    console.log(inputRefs); */

    let inputNum = useRef(0);
    //let focusRef = useRef('');

    /* let refIndex = useState('');
    let arrayOfRefs = Array(10).fill('test');
    console.log(arrayOfRefs);

    arrayOfRefs.fill(useRef());
    console.log(arrayOfRefs); */

    /* let uiEls = useRef(new Array());
    let refIndex = useState(''); */

    //let currentActiveRef = '';

    const [selectShapeValue, setSelectShapeValue] = useState('Ellipse');

    const stateShapes = props.stateShapes;
    const [shapes, setShapes] = [stateShapes[0], stateShapes[1]];

    // TODO
    //let arrayOfRefs = Object.keys(shapes[0].data).map((param) => useRef());

    const classes = useStyles();

    /*
    const shapeparams = {
        'Ellipse': {
            diameter: 100,
            stroke: 20
        }
    }
    */


    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes);
        let flattened = newshapearry.flat();
        return flattened;
    }

    /* function handle_onChange(shape, index) {
        let flattened = copyShapes();
        flattened[index] = shape;
        setShapes(flattened);
    } */



    /*
    function handle_onAdd(e) {
        //if (selectShapeValue === 'Ellipse') {
            let newshape = {
                //shapeid: 0,
                shapeClass: selectShapeValue,
                //params: shapeparams[selectShapeValue]
                params: []
            }
            let flattened = copyShapes();
            flattened.push(newshape);
            setShapes(flattened);
        //}
    }
    */

    function handleTest(e) {
        //console.log('selectionStart: ' + inputRef.current.selectionStart);

        //inputRef = e.target;
        //currentActiveRef = inputRef;
        //console.log('currentActive: ', currentActiveRef);

        //focusRef.current = e.target;
        

        let [parameter, shapeindex] = e.target.id.split('_');

        if (parameter === 'diameter') {
            inputNum.current = 1;
        } else {
            inputNum.current = 2;
        }

        /* refIndex[1](shapeindex);
        console.log(refIndex[0]); */

        console.log(e.target);

        let flattened = copyShapes();
        flattened[shapeindex].data[parameter] = e.target.value;

        setShapes(flattened);

        //refocus(inputRef);
        //inputRef.current.focus();
    }

    function refocus(ref) {
        ref.current.focus();
    }

    let shapeComponents = [];
    if (shapes.length > 0) {
        shapeComponents = shapes.map((shape, i) => {

            return (
                

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

                    

              

                /*
                 <ShapeLayer key={generateID()} index={i} shape={shape} stateShapes={stateShapes} onChange={handle_onChange}></ShapeLayer>
                 */
            )
            /*
            if (shape.shapeClass === 'Ellipse') {
                return (
                    <Ellipse key={generateID()} index={i} shape={shape} stateShapes={stateShapes} onChange={handle_onChange}></Ellipse>
                )
            }*/
            /*
            return (
                <Shape key={generateID()} id={shape.shapeid} appstate={this.props.appstate} onChange={this.handle_onChange}></Shape>
            )
            */
        })
    }

    function handle_onAdd() {
        props.addNewZdogShape(selectShapeValue);
    }

    useEffect(() => {

        if (shapes.length > 0) {
            //console.log(inputRef);
            //refocus(uiEls[refIndex[0]]);
            if (inputNum.current === 1) {
                refocus(inputRef1);
                //inputRefs[1].current.focus();
            } else if (inputNum.current === 2) {
                refocus(inputRef2);
                //inputRefs[2].current.focus();
            }
        }


    }, [shapes]);

    return (
        <section className="controls_shape">

            <header>
                <FormControl>
                    <InputLabel id="new-shape-label">
                        New Shape
                        </InputLabel>
                    <Select value={selectShapeValue} onChange={setSelectShapeValue}>
                        <MenuItem value="Ellipse">Ellipse</MenuItem>
                    </Select>
                </FormControl>
                <div className="btnContainer">
                    <IconButton onClick={handle_onAdd} aria-label="add">
                        <AddIcon color="primary" fontSize="small" />
                    </IconButton>

                </div>
            </header>
            <div className="controlsContainer">
                {shapeComponents}
            </div>

        </section>
    );


}

export default ShapeControls;

/*
<select name="selectShape" id="selectShape" onChange={this.handle_selectShape}>
                        <option value="">New shape</option>
                        <option value="Ellipse">Ellipse</option>
                    </select>
                    */
//<button id="addShapeBtn" onClick={this.handle_onAdd}>Add</button>
//<Button color="primary" onClick={this.handle_onAdd} startIcon={<AddIcon />}>Add Shape</Button>

/*
<MenuItem value="Rectangle">Rectangle</MenuItem>
                        <MenuItem value="Triangle">Triangle</MenuItem>
                        */


                        /* (el) => inputRefs[1].current = el */