import React, { useEffect, useState } from 'react';
import '../zdogui.css';

import Zdog from 'zdog';

function Viewer(props) {

    const stateVars = props.stateVars;

    useEffect(() => {
        console.log(stateVars.dragRotate[0]);

        let illo = new Zdog.Illustration({
            element: '#illo',
            dragRotate: stateVars.dragRotate[0]
        })

        illo.setSize(stateVars.canvas_w[0], stateVars.canvas_h[0]);

        if (stateVars.shapes.length > 0) {
            stateVars.shapes[0].forEach((shape) => {
                if (shape.shapeClass === 'Ellipse') {
                    new Zdog.Ellipse({
                        addTo: illo,
                        diameter: shape.params.diameter,
                        stroke: shape.params.stroke
                    })
                }
            })
        }

        function checkAnimate() {
            if (stateVars.animate[0]) {
                illo.rotate.x += (stateVars.rotate_x[0]);
                illo.rotate.y += (stateVars.rotate_y[0]);
            }
            if (stateVars.animate[0] | stateVars.dragRotate[0]) {
                illo.updateRenderGraph();
            }
            requestAnimationFrame(checkAnimate);
        }

        illo.updateRenderGraph();
        checkAnimate();

    });

    return (

        <section className="results">

        <section className="illustration" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}>
          <canvas id="illo" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}></canvas>
        </section>
        

      </section>

    )
}

export default Viewer;