import React from 'react';
import Shape from './Shape';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class ShapeControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectShapeValue: ''
        }
        this.shapeparams = {
            'Ellipse': [
                {'diameter': 100},
                {'stroke': 20}
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

    handle_onAdd(e) {
        if (this.state.selectShapeValue !== '') {
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
                    <Shape key={shape.shapeid} id={shape.shapeid} appstate={this.props.appstate} onChange={this.handle_onChange}></Shape>
                )
            })
        }

        return (
            <section className="controls_shape">
                <header>
                    <select name="selectShape" id="selectShape" onChange={this.handle_selectShape}>
                        <option value="">New shape</option>
                        <option value="Ellipse">Ellipse</option>
                    </select>
                    <div className="btnContainer">
                        <button id="addShapeBtn" onClick={this.handle_onAdd}>Add</button>
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