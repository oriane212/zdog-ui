import React, { useState, useEffect, useRef } from 'react';
import Shape from './Shape';
import { Button, FormControl, Input, IconButton, makeStyles } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
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
    },
    root: {
        backgroundColor: "#f1f1f1"
    }
}));

function ShapeControls(props) {

    /* let inputRef1 = useRef();
    let inputRef2 = useRef();

    let inputNum = useRef(0); */

    /* const shapeLayers = {
        'Ellipse': (<Ellipse />)
    } */

    //const [selectShapeValue, setSelectShapeValue] = useState('Ellipse');

    const addedShapes = props.addedShapes;
    const [shapes, setShapes] = [addedShapes[0], addedShapes[1]];

    const classes = useStyles();

    /* function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes);
        let flattened = newshapearry.flat();
        return flattened;
    } */

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

    /*   function handleTest(e) {
        
          let [parameter, shapeindex] = e.target.id.split('_');
  
          if (parameter === 'diameter') {
              inputNum.current = 1;
          } else {
              inputNum.current = 2;
          }
  
          console.log(e.target);
  
          let flattened = copyShapes();
          flattened[shapeindex].data[parameter] = e.target.value;
  
          setShapes(flattened);
      } */


    /* function refocus(ref) {
        ref.current.focus();
    }
 */

    let shapeLayers = [];
    if (shapes.length > 0) {
        shapeLayers = shapes.map((shape, i) => {

            return (
                
                <ShapeLayer key={generateID()} index={i} shape={shape} addedShapes={addedShapes} />


                /*  <ShapeLayer key={generateID()} index={i} shape={shape} addedShapes={addedShapes}></ShapeLayer> */

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

    /* function handle_onAdd() {
        props.addNewZdogShape(selectShapeValue);
    } */

    /* useEffect(() => {

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


    }, [shapes]); */

    return (
        <section className="controls_shape">

            {/* <header>
                <FormControl>
                    <InputLabel id="new-shape-label">
                        Shape
                        </InputLabel>
                    <Select value={selectShapeValue} onChange={(e) => setSelectShapeValue(e.target.value)}>
                        <MenuItem value="Ellipse">Ellipse</MenuItem>
                        <MenuItem value="Rect">Rect</MenuItem>
                    </Select>
                </FormControl>
                
                <div className="btnContainer">
                    <IconButton onClick={handle_onAdd} aria-label="add">
                        <AddIcon color="primary" fontSize="small" />
                    </IconButton>
                </div>
            </header> */}

            <div className="controlsContainer">
                <List component="div" aria-labelledby="nested-list-subheader"
                    /* subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Shapes
                        </ListSubheader>
                    }  */className={classes.root}>
                    {shapeLayers}
                </List>

            </div>

        </section>
    );


}

export default ShapeControls;

/*

<Button onClick={handle_onAdd} color="primary" startIcon={<AddIcon />} aria-label="add shape">Add</Button>


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