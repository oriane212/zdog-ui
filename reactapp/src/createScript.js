export default function createScript(illoVars, shapesCopy) {
    
    let scriptString = `
/* illo.js */

// Copy and paste everything into a new file named "illo.js"


// create illo
let illo = new Zdog.Illustration({
    // set canvas with id 'illo'
    element: "#illo",
    dragRotate: ${illoVars.dragRotate[0]},
    rotate: {
        x: ${illoVars.rotate_x[0]},
        y: ${illoVars.rotate_y[0]},
        z: ${illoVars.rotate_z[0]}
    }
});
    `;

    let shapeCount = 0;

    function createChildShapes(parent, parentName) {
        if (parent.children.length > 0) {
            parent.children.forEach((shape) => {
                let name = `shape${shapeCount}`;
                let data = shape.data;
                shape.data.addTo = "--" + parentName + "--";
                let dataString = JSON.stringify(data, null, '\t');
                let newShapeString = `
let ${name} = new Zdog['${shape.shapeClass}'](${dataString})
        `;
        
        scriptString = scriptString.concat(newShapeString);
        shapeCount += 1;
                createChildShapes(shape, name);
            })
        }
    }

    shapesCopy.forEach(shape => {
        let name = `shape${shapeCount}`;
        let data = shape.data;
        data.addTo = "--illo--";
        let dataString = JSON.stringify(data, null, '\t');
        let newShapeString = `
let ${name} = new Zdog['${shape.shapeClass}'](${dataString})
        `;
        scriptString = scriptString.concat(newShapeString);
        shapeCount += 1;
        createChildShapes(shape, name);
    });

    let endString;

    if (illoVars.animate[0]) {

        // continuous spin
        if (illoVars.animateSelection[0] === 'spin') {
            endString = `
function animate() {
    illo.rotate.x += ${illoVars.spin_x[0]};
    illo.rotate.y += ${illoVars.spin_y[0]};
    illo.rotate.z += ${illoVars.spin_z[0]};
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}
            
    animate();
        `
        } else if (illoVars.animateSelection[0] === 'ease') {
        endString = `
/* Zdog animate fn for easeInOut */

let ticker = 0;
let cycleCount = ${illoVars.easeIO[0].cycleCount};

function animate() {
    let progress = ticker / cycleCount;
    // apply easing to rotation
    let tween = Zdog.easeInOut(progress % 1, ${illoVars.easeIO[0].power});
    ${illoVars.easeIO[0].x ? 'illo.rotate.x = tween * Zdog.TAU;' : ''}
    ${illoVars.easeIO[0].y ? 'illo.rotate.y = tween * Zdog.TAU;' : ''}
    ${illoVars.easeIO[0].z ? 'illo.rotate.z = tween * Zdog.TAU;' : ''}
    ticker++;

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

animate();
        `
        }
    } else if (!illoVars.animate[0] && illoVars.dragRotate[0]) {
        endString = `
function animate() {
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}
        
animate();
        `
    } else {
        endString = `
// update & render
illo.updateRenderGraph();
        `
    }

    scriptString = scriptString.concat(endString);

    return scriptString;

}
