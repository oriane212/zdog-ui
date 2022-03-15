import React, { useState} from 'react';
import '../zdogui.css';
import { FormControl, Input, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import fixCamelCase from '../fixCamelCase';

const useStyles = makeStyles((theme) => ({
    parameter: {
        display: 'inline-flex',
        margin: 12,
        width: '40%',
    },
    lightBottomBorder: {
        '&:before': {
            'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
        }
    }
}));

function SingleParameterInput(props) {

    const index = 0;
    const copyOfShape = props.copyOfShape;

    const parameter = props.parameter;

    const label = fixCamelCase(parameter);

    //const updateShapes = props.updateShapes;
    const [shapes, setShapes] = props.addedShapes;

    const checkValueOnBlur = props.checkValueOnBlur;

    let cursorFocus = props.cursorFocus;

    let validSides = useState(true);

    //let cursorFocus = props.cursorFocus;

    /* let shapeRefs = props.shapeRefs; */

    let paramRef =  props.paramRef;

    // State of Select menu for Ellipse quarters
    const [open, setOpen] = useState(false);

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes);
        let flattened = newshapearry.flat();
        return flattened;
    }

    let flattened = copyShapes();

    function spiUpdateShapes(e, property) {
        if (property !== 'sides' && property !== 'quarters') {
            copyOfShape.data[property] = e.target.value;
            cursorFocus[1](
                {
                    'id': e.target.id,
                    'cursorPos': e.target.selectionStart
                }
            );
            setShapes(flattened);
            //validSides[1](true);
        } else if (property === 'quarters') {
            copyOfShape.data[property] = e.target.value;
            cursorFocus[1](
                {
                    'id': parameter + '_' + index,
                    'cursorPos': 0
                }
            );
            setShapes(flattened);
        }
        else if (property === 'sides') {
            if (e.target.value === '0' || e.target.value.length < 1 || isNaN(Number(e.target.value)) || e.target.value.includes('-')) {
                console.log('aaaa');
                validSides[1](false);
            } else {
                console.log('bbbb');
                validSides[1](true);
                copyOfShape.data[property] = e.target.value;
                cursorFocus[1](
                    {
                        'id': e.target.id,
                        'cursorPos': e.target.selectionStart
                    }
                );
                setShapes(flattened);
            }
        }


        /* if (validSides[0]) {
            setShapes(flattened);
        } */
    }

    function sides(parameter) {
        if (parameter === 'sides') {
            validSides[1](true);
        }
    }

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleChange(e) {
        spiUpdateShapes(e, 'quarters');
    }

    function createSPI() {
        let spi = '';
        if (parameter !== 'quarters') {
            spi = (<FormControl className={classes.parameter}>
                <InputLabel htmlFor={parameter + '_' + index}>{label}</InputLabel>
                <Input className={classes.lightBottomBorder} inputRef={paramRef} id={parameter + '_' + index} value={(validSides[0]) ? copyOfShape.data[parameter] : ''} onBlur={(e) => {checkValueOnBlur(e, 'textinput', `${parameter}_${index}`, ''); sides(parameter);}} disabled={false} onChange={(e) => spiUpdateShapes(e, parameter)} />
            </FormControl>);
        } else {
            spi = (<FormControl className={classes.parameter}>
                <InputLabel htmlFor={parameter + '_' + index}>{label}</InputLabel>
                <Select
                  /* labelId="demo-controlled-open-select-label" */
                  className={classes.lightBottomBorder} 
                  id={parameter + '_' + index}
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={copyOfShape.data[parameter]}
                  label={label}
                  onChange={handleChange}
                  inputRef={paramRef}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>)
        }
        return spi;
    }
    

    const classes = useStyles();

    

    return (

        createSPI()

    )

}

export default SingleParameterInput;