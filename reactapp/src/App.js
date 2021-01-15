import React from 'react';
import logo from './logo.svg';
//import './App.css';
import './illo.css';
import NumberInput from './components/NumberInput';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas_height: '240',
      canvas_width: '240'
    }
    this.resetIllustrationSize = this.resetIllustrationSize.bind(this);
  }

  resetIllustrationSize(e) {
    console.log(`testing testing ${e.target.value}`);
    if (e.target.id === 'canvas_height') {
      this.setState({
        canvas_height: `${e.target.value}`
      });
    } else {
      this.setState({
        canvas_width: `${e.target.value}`
      });
    }
    
  }

  render() {
    return (

      <main>
        <section className="controls">
          <section className="controls_illo">
            <NumberInput id='canvas_width' label='Canvas width' value={this.state.canvas_width} min='36' max='1080' step='1' onChange={this.resetIllustrationSize}></NumberInput>
            <NumberInput id='canvas_height' label='Canvas height' value={this.state.canvas_height} min='36' max='1080' step='1' onChange={this.resetIllustrationSize}></NumberInput>

            <div className="parameter">
              <input type="checkbox" id="dragRotate" name="parameter_illo" value="dragRotate" />
              <label htmlFor="dragRotate">Drag Rotate</label>
            </div>
            <div className="parameter">
              <input type="checkbox" id="animate" name="parameter_illo" value="animate" checked />
              <label htmlFor="animate">Animate</label>
            </div>
            <div className="subparameter">
              <label htmlFor="rotate_x">Rotate x: </label>
              <input type="number" id="rotate_x" name="parameter_illo" value="0" min="-1" max="1" step="0.01" />
            </div>
            <div className="subparameter">
              <label htmlFor="rotate_y">Rotate y: </label>
              <input type="number" id="rotate_y" name="parameter_illo" value="0.03" min="-1" max="1" step="0.01" />
            </div>

          </section>
          <section className="controls_shape">
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
        </section>

        <section className="results">

          <section className="illustration" width={this.state.canvas_width} height={this.state.canvas_height}>
            <canvas id="illo" width={this.state.canvas_width} height={this.state.canvas_height}></canvas>
          </section>
          <section id="container"></section>

        </section>

      </main>

    );
  }
}

export default App;
