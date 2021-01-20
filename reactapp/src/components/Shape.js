import React from 'react';
import RangeInput from './RangeInput';

class Shape extends React.Component {
    constructor(props) {
        super(props);
        this.canvasMin = Math.min(parseInt(this.props.appstate.canvas_width), parseInt(this.props.appstate.canvas_height));
        this.shapes = this.props.appstate.shapes;
        this.shapedata = this.shapes[this.props.id];
        this.paramToInput = {
            'diameter': 'createInputRange'
        }
        this.ellipse = ['diameter', 'stroke', 'color'];
        this.handle_onChange = this.handle_onChange.bind(this);
        this.createRangeInput = this.createRangeInput.bind(this);
        //this.createControlsForNewEllipse = this.createControlsForNewEllipse.bind(this);
        this.createControls = this.createControls.bind(this);
        this.createParam = this.createParam.bind(this);
    }

    handle_onChange(e) {
        console.log('shape component');
        this.props.onChange(e);
    }

    
    createRangeInput(paramclass, paramvalue) {
        return (
            <RangeInput 
                id={`${paramclass}1`} 
                label={paramclass}
                name="parameter"
                value={paramvalue}
                min="0"
                max={this.canvasMin}
                step="1"
                disabled={false}
                onChange={this.props.onChange}
            ></RangeInput>
        )
    }

    createParam(paramclass, paramvalue) {
        return this.createRangeInput(paramclass, paramvalue);
        //this.paramToInput[paramclass]
    }
    
    /*
    createControlsForNewEllipse(shapeid) {
        let diameter = this.createRangeInput(this.paramClasses['diameter']);
        let stroke = this.createRangeInput(this.paramClasses['stroke']);
        let section = (
            <section className="controls_shape">
                {diameter, stroke}
            </section>
        )
        return section;
    }
    */

    createControls() {
        let inputs = this.shapedata.params.map((param) => {
            let paramclass = Object.keys(param)[0];
            let paramvalue = param[paramclass];
            console.log(paramclass, paramvalue);
            let inputcomponent = this.createParam(paramclass, paramvalue);
            return inputcomponent;
        })
        return inputs;
    }

    render() {

        let inputs = this.createControls();

        return (
            <section className="controls_shape">
                {inputs}
            </section>
            /*
            <section className="controls_shape" id={this.props.data.id}>
                <h3>Ellipse</h3>
                <div className="parameter">
                  <label htmlFor="diameter1">Diameter = </label>
                  <span id="diameter1value">100</span>
                  <input type="range" className="diameter" id="diameter1" name="parameter_shape1" min="0" max="240" value="100"
                    step="1" />
                </div>
                <div className="parameter">
                  <label htmlFor="stroke1">Stroke = </label>
                  <span id="stroke1value">20</span>
                  <input type="range" className="stroke" id="stroke1" name="parameter_shape1" min="0" max="240" value="20" step="1"
                    list="tickmarks_stroke" />
                </div>
                <div className="parameter">
                  <label htmlFor="color1">Color = </label>
                  <span id="color1value">#663366</span>
                  <input type="color" className="color" id="color1" name="parameter_shape1" value="#663366" />
                </div>
              </section>
              */
        );
    }
    
}

export default Shape;