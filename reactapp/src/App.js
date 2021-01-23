import React, {useState} from 'react';
import './zdogui.css';
import ShapeControls from './components/ShapeControls';
import { FormControl, FormControlLabel, Input, InputLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

function App(props) {
  
  const [canvas_w, setCanvas_w] = useState(240);
  const [canvas_h, setCanvas_h] = useState(240);
  const [dragRotate, setDragRotate] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [rotate_x, setRotate_x] = useState(.06);
  const [rotate_y, setRotate_y] = useState(0);
  //const [shapes, setShapes] = useState([]);

  /*
  function updateShapes(e) {

    // TODO

    console.log(e.target.value);
  }
  */

  /*
  function addShape(newshapearry) {
    this.setState({
      shapes: newshapearry
    })
  }
  */

    return (

      <main>
        <section className="controls">
          <section className="controls_illo">

            <div className="controlsContainer">

              <div className="parameter">
                <FormControl>
                  <InputLabel htmlFor="canvas_width">Canvas width</InputLabel>
                  <Input id="canvas_width" value={canvas_w} disabled={false} onChange={(e) => setCanvas_w(e.target.value)} />
                </FormControl>
              </div>

              <div className="parameter">
                <FormControl>
                  <InputLabel htmlFor="canvas_height">Canvas height</InputLabel>
                  <Input id="canvas_height" value={canvas_h} disabled={false} onChange={(e,v) => setCanvas_h(e.target.value)} />
                </FormControl>
              </div>


              <div className="parameter">
                <FormControlLabel
                  label="Drag Rotate"
                  control={<Checkbox checked={dragRotate} onChange={() => setDragRotate(!dragRotate)} name="dragRotate" id="dragRotate" color="primary" />}
                />
              </div>


              <div className="parameter">
                <FormControlLabel
                  label="Animate"
                  control={<Checkbox checked={animate} onChange={() => setAnimate(!animate)} name="animate" id="animate" color="default" />}
                />
              </div>



              <div className="sub-parameter">
                <Typography id="rotate_x_label">Rotate x = {rotate_x}</Typography>
                <Slider id="rotate_x" value={rotate_x} min={0} max={1} step={0.01} onChange={(e,v) => setRotate_x(v)} aria-labelledby="rotate_x_label" disabled={!animate} />
              </div>

              <div className="sub-parameter">
                <Typography id="rotate_y_label">Rotate y = {rotate_y}</Typography>
                <Slider id="rotate_y" value={rotate_y} min={0} max={1} step={0.01} onChange={(e,v) => setRotate_y(v)} aria-labelledby="rotate_y_label" disabled={!animate} />
              </div>



            </div>

          </section>

          
          

        </section>

        <section className="results">

          <section className="illustration" width={canvas_w} height={canvas_h}>
            <canvas id="illo" width={canvas_w} height={canvas_h}></canvas>
          </section>
          <section id="container"></section>

        </section>

      </main>

    );
  
}

export default App;

// <ShapeControls appstate={{values, shapes}} onAdd={this.addShape} onChange={this.updateShapes}></ShapeControls>