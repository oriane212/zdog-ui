import React from 'react';
import Shape from './Shape';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class ShapeControls extends React.Component {
    constructor(props) {
        super(props);
        this.handle_onChange = this.handle_onChange.bind(this);
    }

    handle_onChange(e) {
        console.log('shape controls');
        this.props.onChange(e);
    }

    render() {
        let shapes = this.props.appstate.shapes;
        let shapeComponents = shapes.map((shape) => {
            return (
                <Shape key={shape.id} data={shape} onChange={this.handle_onChange}></Shape>
            )
        })

        // TODO: add btn and fn for adding shapes

        return (
            <section className="controls_shape">
                <header>
                    <select name="selectShape" id="selectShape">
                        <option value="">Add a shape</option>
                        <option value="Ellipse">Ellipse</option>
                    </select>
                    <div id="addShapeBtn">
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </header>
                {shapeComponents}
            </section>
        );
    }

}

export default ShapeControls;