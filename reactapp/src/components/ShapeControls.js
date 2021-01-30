import React, { useState } from 'react';
import Shape from './Shape';
import { Button, FormControl, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import generateID from '../generateID';
import Ellipse from './Ellipse';

function ShapeControls(props) {

    const [selectShapeValue, setSelectShapeValue] = useState('Ellipse');

    const stateShapes = props.stateShapes;
    const [shapes, setShapes] = [stateShapes[0], stateShapes[1]];

    const shapeparams = {
        'Ellipse': {
            diameter: 200,
            stroke: 20
        }
    }

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes);
        let flattened = newshapearry.flat();
        return flattened;
    }

    function handle_onChange(shape, index) {
        let flattened = copyShapes();
        flattened[index] = shape;
        setShapes(flattened);
    }

    // currently only works for Ellipse
    function handle_onAdd(e) {
        if (selectShapeValue === 'Ellipse') {
            let newshape = {
                //shapeid: 0,
                shapeClass: selectShapeValue,
                params: shapeparams[selectShapeValue]
            }
            let flattened = copyShapes();
            flattened.push(newshape);
            setShapes(flattened);
        }
    }

    let shapeComponents = [];
    if (shapes.length > 0) {
        shapeComponents = shapes.map((shape, i) => {
            if (shape.shapeClass === 'Ellipse') {
                return (
                    <Ellipse key={generateID()} index={i} shape={shape} stateShapes={stateShapes} onChange={handle_onChange}></Ellipse>
                )
            }
            /*
            return (
                <Shape key={generateID()} id={shape.shapeid} appstate={this.props.appstate} onChange={this.handle_onChange}></Shape>
            )
            */
        })
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