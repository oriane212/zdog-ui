import React from 'react';
import './zdogui.css';
import ShapeControls from './components/ShapeControls';
import { FormControl, FormControlLabel, Input, InputLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas_height: '240',
      canvas_width: '240',
      dragRotate: false,
      animate: true,
      rotate_x: .06,
      rotate_y: 0,
      shapes: []
    }
    this.updateValue = this.updateValue.bind(this);
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.updateShapes = this.updateShapes.bind(this);
    this.addShape = this.addShape.bind(this);
    this.setValwParentID = this.setValwParentID.bind(this);
    
  }

  updateValue(e, v) {
    const id = e.target.id;
    let value = e.target.value;

    console.log(e.target, value);

    this.setState({
      [id]: value
    })
  }

  // works for Material UI Sliders
  setValwParentID(e, val) {
    let parent = e.target.parentElement;
    let parentID = parent.getAttribute('id');
    console.log(parentID);
    this.setState({
      [parentID]: val
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

  addShape(newshapearry) {
    this.setState({
      shapes: newshapearry
    })
  }

  render() {

    return (

      <main>
        <section className="controls">
          <section className="controls_illo">

            <div className="controlsContainer">

              <div className="parameter">
                <FormControl>
                  <InputLabel htmlFor="canvas_width">Canvas width</InputLabel>
                  <Input id="canvas_width" value={this.state.canvas_width} disabled={false} onChange={this.updateValue} />
                </FormControl>
              </div>

              <div className="parameter">
                <FormControl>
                  <InputLabel htmlFor="canvas_height">Canvas height</InputLabel>
                  <Input id="canvas_height" value={this.state.canvas_height} disabled={false} onChange={this.updateValue} />
                </FormControl>
              </div>


              <div className="parameter">
                <FormControlLabel
                  label="Drag Rotate"
                  control={<Checkbox checked={this.state.dragRotate} onChange={this.toggleCheckBox} name="dragRotate" id="dragRotate" color="primary" />}
                />
              </div>


              <div className="parameter">
                <FormControlLabel
                  label="Animate"
                  control={<Checkbox checked={this.state.animate} onChange={this.toggleCheckBox} name="animate" id="animate" color="default" />}
                />
              </div>



              <div className="sub-parameter">
                <Typography id="rotate_x_label">Rotate y = {this.state.rotate_x}</Typography>
                <Slider id="rotate_x" value={this.state.rotate_x} min={0} max={1} step={0.01} onChange={this.setValwParentID} aria-labelledby="rotate_x_label" disabled={!this.state.animate} />
              </div>

              <div className="sub-parameter">
                <Typography id="rotate_y_label">Rotate y = {this.state.rotate_y}</Typography>
                <Slider id="rotate_y" value={this.state.rotate_y} min={0} max={1} step={0.01} onChange={this.setValwParentID} aria-labelledby="rotate_y_label" disabled={!this.state.animate} />
              </div>



            </div>

          </section>


          <ShapeControls appstate={this.state} onAdd={this.addShape} onChange={this.updateShapes}></ShapeControls>

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

/*

<NumberInput id="rotate_x" label="Rotate x" value={this.state.rotate_x} min="-1" max="1" step="0.01" disabled={!this.state.animate} onChange={this.updateValue} paramlevel="2"></NumberInput>

              <NumberInput id="rotate_y" label="Rotate y" value={this.state.rotate_y} min="-1" max="1" step="0.01" disabled={!this.state.animate} onChange={this.updateValue} paramlevel="2"></NumberInput>

              */


/*
<Typography id="rotate_y_label">Rotate y = {this.state.rotate_y}</Typography>
<Slider id="rotate_y" value={this.state.rotate_y} min={0} max={1} step={0.01} onChange={this.updateValue} aria-labelledby="rotate_y_label" disabled={!this.state.animate}/>

<FormControl>
<Typography id="rotate_x_label">Rotate x = {this.state.rotate_x}</Typography>
<Slider id="rotate_x" value={this.state.rotate_x} min={0.00} max={1.00} step={0.01} onChange={this.updateValue} disabled={!this.state.animate}/>
</FormControl>

<CheckBox id="dragRotate" label="Drag Rotate" name="dragRotate" checked={this.state.dragRotate} onChange={this.toggleCheckBox}></CheckBox>

<CheckBox id="animate" label="Animate" name="animate" checked={this.state.animate} onChange={this.toggleCheckBox}></CheckBox>

*/