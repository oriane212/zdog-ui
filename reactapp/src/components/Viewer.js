import React, { useEffect, useState, useRef } from 'react';
import '../zdogui.css';

import Zdog from 'zdog';

let illo = '';

function Viewer(props) {

    const stateVars = props.stateVars;
    const shapes = props.shapes;
    
    /* const refDragRotate = useRef(stateVars.dragRotate[0]);
    refDragRotate.current = stateVars.dragRotate[0]; */

    /* const refAnimate = useRef(stateVars.animate[0]);
    refAnimate.current = stateVars.animate[0]; */

    const refRotate_x = useRef(stateVars.rotate_x[0]);
    refRotate_x.current = stateVars.rotate_x[0];

    const refRotate_y = useRef(stateVars.rotate_y[0]);
    refRotate_y.current = stateVars.rotate_y[0];

    const refRotate_z = useRef(stateVars.rotate_z[0]);
    refRotate_z.current = stateVars.rotate_z[0];

    const isRotating = useState(false);

    const refSpin_x = useRef(stateVars.spin_x[0]);
    refSpin_x.current = stateVars.spin_x[0];

    const refSpin_y = useRef(stateVars.spin_y[0]);
    refSpin_y.current = stateVars.spin_y[0];

    const refSpin_z = useRef(stateVars.spin_z[0]);
    refSpin_z.current = stateVars.spin_z[0];

    const refAnimateSelection = useRef(stateVars.animateSelection[0]);
    refAnimateSelection.current = stateVars.animateSelection[0];

    const refEaseIOx = useRef(stateVars.easeIO[0].x);
    refEaseIOx.current = stateVars.easeIO[0].x;

    const refEaseIOy = useRef(stateVars.easeIO[0].y);
    refEaseIOy.current = stateVars.easeIO[0].y;

    const refEaseIOz = useRef(stateVars.easeIO[0].z);
    refEaseIOz.current = stateVars.easeIO[0].z;

    const refEaseIOcycleCount = useRef(stateVars.easeIO[0].cycleCount);
    refEaseIOcycleCount.current = stateVars.easeIO[0].cycleCount;

    const refEaseIOpower = useRef(stateVars.easeIO[0].power);
    refEaseIOpower.current = stateVars.easeIO[0].power;

    const refAnimationOption = useRef(stateVars.animationOption[0]);
    refAnimationOption.current = stateVars.animationOption[0];

    let af;

    function createChildShapes(parent, parentInstance) {
        if (parent.children.length > 0) {
            parent.children.forEach((shape) => {
                shape.data.addTo = parentInstance;
                let shapeInstance = new Zdog[shape.shapeClass](shape.data);
                createChildShapes(shape, shapeInstance);
            })
        }
    }

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(shapes[0]);
        let flattened = newshapearry.flat();
        return flattened;
      }

    function createIllo() {

        illo = new Zdog.Illustration({
          element: '#illo',
          /* dragRotate: stateVars.dragRotate[0], */
          dragRotate: (refAnimationOption.current === 'dragRotate'),
          rotate: {
              x: refRotate_x.current,
              y: refRotate_y.current,
              z: refRotate_z.current
          }
        })
    
        illo.setSize(stateVars.canvas_w[0], stateVars.canvas_h[0]);

        let copiedshapes = shapes[0].slice(0, shapes[0].length);
    
        copiedshapes.forEach((shape) => {
          console.log(shape);
          shape.data.addTo = illo;
          // check face props and replace color value with false if actually false
          if (Object.keys(shape.faces).length !== 0) {
              Object.keys(shape.faces).forEach((face) => {
                  if (shape.faces[face] === false) {
                      shape.data[face] = false;
                  }
              })
          }
          let shapeInstance = new Zdog[shape.shapeClass](shape.data);
          createChildShapes(shape, shapeInstance);
        })
    
        illo.updateRenderGraph();

        console.log('illo = ', illo);
    
      }

    let ticker = 0;
    
    function rotateIllo() {

        /* if (refAnimate.current === false && refDragRotate.current === false) { */
        if (refAnimationOption.current === 'none') {
            console.log('canceling animation frame');
            cancelAnimationFrame(af);
            illo.rotate.x = refRotate_x.current;
            illo.rotate.y = refRotate_y.current;
            illo.rotate.z = refRotate_z.current;
            illo.updateRenderGraph();

            isRotating[1](false);

        } else {
        
            /* if (refAnimate.current === true) { */
            if (refAnimationOption.current === 'animate') {

                if (refAnimateSelection.current === 'spin') {

                    if (refSpin_x.current === 0) {
                        illo.rotate.x = refRotate_x.current;
                    } else {
                        illo.rotate.x += (refSpin_x.current);
                    }
                    if (refSpin_y.current === 0) {
                        illo.rotate.y = refRotate_y.current;
                    } else {
                        illo.rotate.y += (refSpin_y.current);
                    }
                    if (refSpin_z.current === 0) {
                        illo.rotate.z = refRotate_z.current;
                    } else {
                        illo.rotate.z += (refSpin_z.current);
                    }

                } else if (refAnimateSelection.current === 'ease') {

                    // Zdog animate fn for easeInOut()
                    let progress = ticker / refEaseIOcycleCount.current;
                    // apply easing to rotation
                    let tween = Zdog.easeInOut( progress % 1, refEaseIOpower.current );

                    if (refEaseIOx.current) {
                        illo.rotate.x = tween * Zdog.TAU;
                    }
                    if (refEaseIOy.current) {
                        illo.rotate.y = tween * Zdog.TAU;
                    }
                    if (refEaseIOz.current) {
                        illo.rotate.z = tween * Zdog.TAU;
                    }

                    ticker++;

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

        if (illo !== '' && /* (stateVars.animate[0] | stateVars.dragRotate[0]) */ stateVars.animationOption[0] !== 'none' && isRotating[0] === false) {
            console.log("was not rotating");
            isRotating[1](true);
            rotateIllo();
        }

    /* }, [stateVars.animate[0], stateVars.dragRotate[0]]); */
    }, [stateVars.animationOption[0]]);

    return (
        <section className="results">
            <section className="illustration" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}>
                <canvas id="illo" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}>
                    <p>{stateVars.fallback[0]}</p>
                </canvas>
            </section>
        </section>
    )
}

export default Viewer;