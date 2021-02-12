import React, { useEffect, useState, useRef } from 'react';
import '../zdogui.css';

import Zdog from 'zdog';

function Viewer(props) {

    const stateVars = props.stateVars;
    let illo = props.illo;

    const refAnimate = useRef(stateVars.animate[0]);
    refAnimate.current = stateVars.animate[0];

    const refRotate_x = useRef(stateVars.rotate_x[0]);
    refRotate_x.current = stateVars.rotate_x[0];

    const refRotate_y = useRef(stateVars.rotate_y[0]);
    refRotate_y.current = stateVars.rotate_y[0];

    const shouldRotate = useState(false);


    /* if (stateVars.animate[0] | stateVars.dragRotate[0]) {
        shouldRotate[1](true);
        rotateIllo();
    } else {
        shouldRotate[1](false);
    } */

    //console.log('dragRotate: ', stateVars.dragRotate[0]);

    let af;

    function updateIlloR() {

        //if (stateVars.animate[0] | stateVars.dragRotate[0]) {
        /* illo.rotate.x += (stateVars.rotate_x[0]);
        illo.rotate.y += (stateVars.rotate_y[0]);
        illo.updateRenderGraph();
        console.log('inside updateIlloR TRUE')
        af = requestAnimationFrame(updateIlloR); */
        /*} else {
            cancelAnimationFrame(af);
            console.log('cancel');
            console.log('inside updateIlloR FALSE');
            console.log('animate: ', stateVars.animate[0]);
        } */

    }

    function rotateIllo() {

        //if (stateVars.animate[0] | stateVars.dragRotate[0]) {

        if (refAnimate.current === false) {
            cancelAnimationFrame(af);
            illo.rotate.x = 0;
            illo.rotate.y = 0;
            illo.updateRenderGraph();
        } else {
            //console.log('inside rotateIllo TRUE');

            //console.log('dragRotate: ', stateVars.dragRotate[0]);

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
            
            illo.updateRenderGraph();
            //console.log('inside updateIlloR TRUE')
            af = requestAnimationFrame(rotateIllo);
            //console.log(af);
        }






        //updateIlloR();

        //rotateIllo();

        /* } else {
            cancelAnimationFrame(af);
            console.log('cancel');
            console.log('inside rotateIllo FALSE');
            console.log('dragRotate: ', stateVars.dragRotate[0]);
        }  */



    }

    /* useEffect(() => {
    
        if (illo !== '') {
            illo.updateRenderGraph();
        }
        
    }) */

    useEffect(() => {

        if (illo !== '' && stateVars.animate[0]) {
            rotateIllo();
        /* } else {
            if (illo !== '') {
                illo.updateRenderGraph();
            }
          */  
        } 

    }, [stateVars.animate[0]]);

    useEffect(() => {

        /*

        console.log(stateVars.dragRotate[0]);

        let illo = new Zdog.Illustration({
            element: '#illo',
            dragRotate: stateVars.dragRotate[0]
        })

        illo.setSize(stateVars.canvas_w[0], stateVars.canvas_h[0]);

        if (stateVars.shapes.length > 0) {

            stateVars.shapes[0].forEach((shape) => {
                if (shape.shapeClass === 'Ellipse') {
                    let circle = new Zdog.Ellipse({
                        addTo: illo,
                        //diameter: shape.params.diameter,
                        //stroke: shape.params.stroke,
                    })

                    console.log(Object.keys(circle));
                }
            })

        }

        */

        /*

        if (illo !== '') {

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

        }
        */

        if (illo !== '') {
            rotateIllo();
        }



    }
        //, [stateVars.dragRotate[0], stateVars.animate[0]]
        , [illo]
    );

    return (

        <section className="results">

            <section className="illustration" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}>
                <canvas id="illo" width={stateVars.canvas_w[0]} height={stateVars.canvas_h[0]}></canvas>
            </section>


        </section>

    )
}

export default Viewer;