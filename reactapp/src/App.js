import React from 'react';
import './zdogui.css';
import NumberInput from './components/NumberInput';
import CheckBox from './components/CheckBox';
import ShapeControls from './components/ShapeControls';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas_height: '240',
      canvas_width: '240',
      dragRotate: false,
      animate: true,
      rotate_x: '0.03',
      rotate_y: '0',
      shapes: [
        {
          shapeid: 0,
          shapeClass: 'Ellipse',
          diameter: 100,
          stroke: 20
        }
      ]
    }
    this.updateValue = this.updateValue.bind(this);
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.updateShapes = this.updateShapes.bind(this);
  }

  updateValue(e) {
    const id = e.target.id;
    this.setState({
      [id]: e.target.value
    })
  }

  toggleCheckBox(e) {
    const id = e.target.id;
    this.setState({
      [id]: e.target.checked
    })
  }

  updateShapes(e) {

    // TODO

    console.log(e.target.value);
  }

  render() {
    return (

      <main>
        <section className="controls">
          <section className="controls_illo">

            <NumberInput id='canvas_width' label='Canvas width' value={this.state.canvas_width} min='36' max='1080' step='1' disabled={false} onChange={this.updateValue}></NumberInput>

            <NumberInput id='canvas_height' label='Canvas height' value={this.state.canvas_height} min='36' max='1080' step='1' disabled={false} onChange={this.updateValue}></NumberInput>

            <CheckBox id="dragRotate" label="Drag Rotate" name="dragRotate" checked={this.state.dragRotate} onChange={this.toggleCheckBox}></CheckBox>

            <CheckBox id="animate" label="Animate" name="animate" checked={this.state.animate} onChange={this.toggleCheckBox}></CheckBox>

            <NumberInput id="rotate_x" label="Rotate x" value={this.state.rotate_x} min="-1" max="1" step="0.01" disabled={!this.state.animate} onChange={this.updateValue}></NumberInput>

            <NumberInput id="rotate_y" label="Rotate y" value={this.state.rotate_y} min="-1" max="1" step="0.01" disabled={!this.state.animate} onChange={this.updateValue}></NumberInput>

          </section>

          <ShapeControls appstate={this.state} onChange={this.updateShapes}></ShapeControls>

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
