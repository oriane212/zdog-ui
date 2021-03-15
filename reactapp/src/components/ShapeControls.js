import React, { useState } from 'react';
import Shape from './Shape';
import { Button, FormControl, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import generateID from '../generateID';
// import Ellipse from './Ellipse';
import ShapeLayer from './ShapeLayer';

function ShapeControls(props) {

    const stateVars = props.stateVars;
    //const shapeCount = stateVars.shapeCount[0];
    const addedShapeClasses = stateVars.addedShapeClasses[0];

    const zdogDefaultPropValPairs = props.zdogDefaultPropValPairs;


    const [selectShapeValue, setSelectShapeValue] = useState('Ellipse');

    /* const stateShapes = props.stateShapes;
    const [shapes, setShapes] = [stateShapes[0], stateShapes[1]]; */


    //let shapeComponents = [];

    let shapeComponents = addedShapeClasses.map((string, i) => {

        // QUICK TEST
        /* let defaultShapePairsArry = zdogDefaultPropValPairs[string];
        let shapeProps = defaultShapePairsArry.map((pair) => pair[0]); */
        let shapeProps = ['diameter', 'stroke'];

        return (
            <ShapeLayer key={generateID()} stateVars={stateVars} i={i} shapeClass={string} shapeProps={shapeProps}/>
        )
    })


    // use stateVars.shapeCount[0] with propValPairs object for creating shape components (instead of using a shapes array we once had)
    /* if (shapeCount > 0) {
        for (let i=0; i<shapeCount; i++) {
        
            return (
                <ShapeLayer key={generateID()} stateVars={stateVars} i={i} />
            )

            // put this in ShapeLayer

            let shapeClassAtIndex = stateVars[`shapeClass_${i}`];
            let defaultShapePairsArry = zdogDefaultPropValPairs[shapeClassAtIndex];

            defaultShapePairsArry.forEach((pair) => {
                let prop = pair[0];
                let stateVal = stateVars[`${prop}_${i}`];
            })

        }
    } */

    /* if (shapes.length > 0) {
        shapeComponents = shapes.map((shape, i) => {
            return (
            <ShapeLayer key={generateID()} shape={shape} i={i} stateShapes={props.stateShapes} stateVars={stateVars}/>
            //<div key={generateID()}>Shape {i+1} ({shape.shapeClass})</div>
            )
        })
    } */

    function handle_onAdd() {
        //props.addNewZdogShape(selectShapeValue);
        //props.addShape(selectShapeValue);
        props.handleAddShape(selectShapeValue);
    }

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