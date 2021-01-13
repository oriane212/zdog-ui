const controls = document.querySelector('.controls');
controls.addEventListener('input', updateAll);

const inputs_ellipse = {
    diameter: document.getElementById('diameter1'),
    stroke: document.getElementById('stroke1'),
    color: document.getElementById('color1'),
}

function renderIllo() {

    // create illo
    let illo = new Zdog.Illustration({
        // set canvas with selector
        element: '#illo',
      });

      // add circle
    new Zdog.Ellipse({
        addTo: illo,
        diameter: inputs_ellipse.diameter.value,
        stroke: inputs_ellipse.stroke.value,
        color: inputs_ellipse.color.value
      });

    illo.setSize(240,240);
    illo.updateRenderGraph();    
}

function updateSpanValue(e) {
    const spanid = e.target.id + 'value';
    let span = document.getElementById(spanid);
    span.innerText = e.target.value;
}


function updateAll(e) {
    updateSpanValue(e);
    renderIllo();
}

renderIllo();