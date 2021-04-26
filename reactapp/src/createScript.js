export default function createScript(illoVars, shapesCopy) {
    
    let scriptString = `
// Script.js

// create illo
let illo = new Zdog.Illustration({
    // set canvas with id 'illo'
    element: '#illo',
});
    `;

    shapesCopy.forEach(shape => {
        let data = shape.data;
        data.addTo = '#illo';
        let dataString = JSON.stringify(data, null, '\t');
        let newShapeString = `
new Zdog[${shape.shapeClass}](${dataString})
        `;
        
        scriptString = scriptString.concat(newShapeString);
    });

    scriptString = scriptString.concat(`
// update & render
illo.updateRenderGraph();

`)

    return scriptString;

}

