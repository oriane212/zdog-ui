export default function createScript(illoVars, shapesCopy) {
    
    let scriptString = `
// Script.js

// create illo
let illo = new Zdog.Illustration({
    // set canvas with id 'illo'
    element: '#illo',
    dragRotate: ${illoVars.dragRotate[0]}
});
    `;

    // above, should I add dragRotate only if true?

    shapesCopy.forEach(shape => {
        let data = shape.data;
        // TO FIX - 'circular structure to JSON' error with dummy illo... might need to add each property for shapes (eg, dragRotate for illo), maybe only add properties that are not equal to the default?
        data.addTo = 'illo';
        let dataString = JSON.stringify(data, null, '\t');
        let newShapeString = `
new Zdog[${shape.shapeClass}](${dataString})
        `;
        
        scriptString = scriptString.concat(newShapeString);
    });

    let endString;

    if (illoVars.animate[0]) {
        endString = `
function animate() {
    illo.rotate.x += ${illoVars.rotate_x[0]};
    illo.rotate.y += ${illoVars.rotate_y[0]};
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

