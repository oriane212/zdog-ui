// Input Elements

const inputs_illo = {
    dragRotate: document.getElementById('dragRotate'),
    animate: document.getElementById('animate')
    /*
    rotate_x: document.getElementById('rotate_x'),
    rotate_y: document.getElementById('rotate_y'),
    rotate_z: document.getElementById('rotate_z')
    */
}

const inputs_ellipse = {
    diameter: document.getElementById('diameter1'),
    stroke: document.getElementById('stroke1'),
    color: document.getElementById('color1'),
}

//Event Listeners

const controls_illo = document.querySelector('.controls_illo');
controls_illo.addEventListener('input', reRenderIllo);

const controls_shape = document.querySelector('.controls_shape');
controls_shape.addEventListener('input', updateAll);


// create illo
let illo = new Zdog.Illustration({
    element: '#illo',
    dragRotate: inputs_illo.dragRotate.checked
});

illo.setSize(240, 240);

//let isSpinning = inputs_illo.animate.checked;

// add circle
new Zdog.Ellipse({
    addTo: illo,
    diameter: inputs_ellipse.diameter.value,
    stroke: inputs_ellipse.stroke.value,
    color: inputs_ellipse.color.value
    //translate: { z: 10 }
});


// Functions

function reRenderIllo() {

    illo = new Zdog.Illustration({
        element: '#illo',
        dragRotate: inputs_illo.dragRotate.checked
    });

    illo.setSize(240, 240);

    // add circle
    new Zdog.Ellipse({
        addTo: illo,
        diameter: inputs_ellipse.diameter.value,
        stroke: inputs_ellipse.stroke.value,
        color: inputs_ellipse.color.value
        //translate: { z: 10 }
    });
    
}

function updateSpanValue(e) {
    const spanid = e.target.id + 'value';
    let span = document.getElementById(spanid);
    span.innerText = e.target.value;
}

function updateAll(e) {
    updateSpanValue(e);
    reRenderIllo();
}

function checkAnimate() {
    if (inputs_illo.animate.checked) {
        illo.rotate.y += 0.03;
    }
    illo.updateRenderGraph();
    requestAnimationFrame(checkAnimate);
}

function init() {
    illo.updateRenderGraph();
    checkAnimate();
}

init();
