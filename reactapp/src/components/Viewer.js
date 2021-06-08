import React, { useEffect, useState, useRef } from 'react';
import '../zdogui.css';

import Zdog from 'zdog';

let illo = '';

function Viewer(props) {

    const stateVars = props.stateVars;
    const shapes = props.shapes;
    
    const refDragRotate = useRef(stateVars.dragRotate[0]);
    refDragRotate.current = stateVars.dragRotate[0];

    const refAnimate = useRef(stateVars.animate[0]);
    refAnimate.current = stateVars.animate[0];

    const refRotate_x = useRef(stateVars.rotate_x[0]);
    refRotate_x.current = stateVars.rotate_x[0];

    const refRotate_y = useRef(stateVars.rotate_y[0]);
    refRotate_y.current = stateVars.rotate_y[0];

    const isRotating = useState(false);

    
    let af;

    /* function createObjOfShapesById(shapes) {
        let shapesById = {};
        shapes.forEach((shape) => {
            shapesById[shape.id] = 
        })
    } */

    function createChildShapes(parent, parentInstance) {
        if (parent.children.length > 0) {
            parent.children.forEach((shape) => {
                shape.data.addTo = parentInstance;
                let shapeInstance = new Zdog[shape.shapeClass](shape.data);
                createChildShapes(shape, shapeInstance);
            })
        }
    }

    function createIllo() {

        illo = new Zdog.Illustration({
          element: '#illo',
          dragRotate: stateVars.dragRotate[0]
        })
    
        illo.setSize(stateVars.canvas_w[0], stateVars.canvas_h[0]);

        //let shapesById = {};
    
        shapes[0].forEach((shape) => {
          console.log(shape);
          shape.data.addTo = illo;
          let shapeInstance = new Zdog[shape.shapeClass](shape.data);
          createChildShapes(shape, shapeInstance);
        })
    
        illo.updateRenderGraph();
    
      }
    

    function rotateIllo() {

        if (refAnimate.current === false && refDragRotate.current === false) {
            console.log('canceling animation frame');
            cancelAnimationFrame(af);
            illo.rotate.x = 0;
            illo.rotate.y = 0;
            illo.updateRenderGraph();

            isRotating[1](false);

        } else {
        
            if (refAnimate.current === true) {
                // set to 0 if 0 so it doesn't get stuck at (0.01 + 0)
                if (refRotate_x.current === 0) {
                    illo.rotate.x = 0;
                } else {
                    illo.rotate.x += (refRotate_x.current);
                }
                if (refRotate_y.current === 0) {
                    illo.rotate.y = 0;
                } else {
                    illo.rotate.y += (refRotate_y.current);
                }
            }

            illo.updateRenderGraph();
            af = requestAnimationFrame(rotateIllo);
 
        }

    }


    useEffect(() => {
        createIllo();
    })


    useEffect(() => {

        if (illo !== '' && (stateVars.animate[0] | stateVars.dragRotate[0]) && isRotating[0] === false) {
            console.log("was not rotating");
            isRotating[1](true);
            rotateIllo();
        }

    }, [stateVars.animate[0], stateVars.dragRotate[0]]);


    return (

        <section className="results">

            <section className="illustration" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}>
                <canvas id="illo" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}></canvas>
            </section>


        </section>

    )
}

export default Viewer;