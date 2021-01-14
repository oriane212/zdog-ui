// Input Elements

const inputs_illo = {
    dragRotate: document.getElementById('dragRotate'),
    animate: document.getElementById('animate'),
    rotate_x: document.getElementById('rotate_x'),
    rotate_y: document.getElementById('rotate_y')
}

const inputs_ellipse = {
    diameter: document.getElementById('diameter1'),
    stroke: document.getElementById('stroke1'),
    color: document.getElementById('color1'),
}

//Event Listeners

const controls_illo = document.querySelector('.controls_illo');
controls_illo.addEventListener('input', handleControls_Illo);

const controls_shape = document.querySelector('.controls_shape');
controls_shape.addEventListener('input', handleControls_Shape);


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
    });

    illo.updateRenderGraph();
    
}

function updateSpanValue(e) {
    const spanid = e.target.id + 'value';
    let span = document.getElementById(spanid);
    span.innerText = e.target.value;
}

function handleControls_Illo(e) {
    if (e.target.id === 'animate') {
        if (inputs_illo.animate.checked) {
            inputs_illo.rotate_x.disabled = false;
            inputs_illo.rotate_y.disabled = false;
        } else {
            inputs_illo.rotate_x.disabled = true;
            inputs_illo.rotate_y.disabled = true;
        }
    }
    reRenderIllo();
}

function handleControls_Shape(e) {
    updateSpanValue(e);
    reRenderIllo();
}

function checkAnimate() {
    if (inputs_illo.animate.checked) {
        illo.rotate.x += parseFloat(inputs_illo.rotate_x.value);
        illo.rotate.y += parseFloat(inputs_illo.rotate_y.value);
    } 
    if (inputs_illo.animate.checked | inputs_illo.dragRotate.checked) {
        illo.updateRenderGraph();
    }
    requestAnimationFrame(checkAnimate);
}

function init() {
    illo.updateRenderGraph();
    checkAnimate();
}

init();
