import React from 'react';
import Shape from './Shape';
import { Button, FormControl } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import generateID from '../generateID';

class ShapeControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectShapeValue: 'Ellipse'
        }
        this.shapeparams = {
            'Ellipse': [
                { 'diameter': 100 },
                { 'stroke': 20 }
            ]
        }
        this.handle_onChange = this.handle_onChange.bind(this);
        this.handle_selectShape = this.handle_selectShape.bind(this);
        this.handle_onAdd = this.handle_onAdd.bind(this);
    }

    handle_onChange(e) {
        console.log('shape controls');
        this.props.onChange(e);
    }

    handle_selectShape(e) {
        this.setState({
            selectShapeValue: e.target.value
        })
    }

    // currently only works for Ellipse
    handle_onAdd(e) {
        if (this.state.selectShapeValue === 'Ellipse') {
            let newshape = {
                shapeid: 0,
                shapeClass: this.state.selectShapeValue,
                params: this.shapeparams[this.state.selectShapeValue]
            }
            let newshapearry = [];
            newshapearry.push(this.props.appstate.shapes);
            let flattened = newshapearry.flat();
            flattened.push(newshape);
            this.props.onAdd(flattened);
        }
    }

    render() {
        let shapes = this.props.appstate.shapes;
        let shapeComponents = [];
        if (shapes.length > 0) {
            shapeComponents = shapes.map((shape) => {
                return (
                    <Shape key={generateID()} id={shape.shapeid} appstate={this.props.appstate} onChange={this.handle_onChange}></Shape>
                )
            })
        }

        return (
            <section className="controls_shape">
                <header>
                    <FormControl>
                        <Select value={this.state.selectShapeValue} onChange={this.handle_selectShape}>
                            <MenuItem value="Ellipse">Ellipse</MenuItem>
                            <MenuItem value="Rectangle">Rectangle</MenuItem>
                            <MenuItem value="Triangle">Triangle</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="btnContainer">
                        <Button color="primary" onClick={this.handle_onAdd} startIcon={<AddIcon />}>Add Shape</Button>
                    </div>
                </header>
                <div className="controlsContainer">
                    {shapeComponents}
                </div>

            </section>
        );
    }

}

export default ShapeControls;

/*
<select name="selectShape" id="selectShape" onChange={this.handle_selectShape}>
                        <option value="">New shape</option>
                        <option value="Ellipse">Ellipse</option>
                    </select>
                    */
//<button id="addShapeBtn" onClick={this.handle_onAdd}>Add</button>