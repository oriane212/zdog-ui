import React from 'react';

class Shape extends React.Component {
    constructor(props) {
        super(props);
        this.handle_onChange = this.handle_onChange.bind(this);
    }

    handle_onChange(e) {
        console.log('shape component');
        this.props.onChange(e);
    }

    render() {
        return (
            <section className="controls_shape" id={this.props.data.id}>
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
        );
    }
    
}

export default Shape;