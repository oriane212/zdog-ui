// Input Elements

const inputs_illo = {
    canvas_width: document.getElementById('canvas_width'),
    canvas_height: document.getElementById('canvas_height'),
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
controls_illo.addEventListener('change', handleControls_Illo);

const controls_shape = document.querySelector('.controls_shape');
controls_shape.addEventListener('input', handleControls_Shape);

const illustration = document.querySelector('.illustration');


// create illo
let illo = new Zdog.Illustration({
    element: '#illo',
    dragRotate: inputs_illo.dragRotate.checked
});

illo.setSize(parseInt(canvas_width.value), parseInt(canvas_height.value));

//let isSpinning = inputs_illo.animate.checked;

// add circle
new Zdog.Ellipse({
    addTo: illo,
    diameter: inputs_ellipse.diameter.value,
    stroke: inputs_ellipse.stroke.value,
    color: inputs_ellipse.color.value
});


// Functions

function setInputMaxByCanvasSize(inputEl) {
    let smallerDim = Math.min(parseInt(canvas_width.value), parseInt(canvas_height.value));
    inputEl.setAttribute('max', smallerDim);
    updateSpanValue(inputEl, true);
}

function resetIllustrationSectionByCanvasSize() {
    let w = parseInt(canvas_width.value);
    let h = parseInt(canvas_height.value);

    illustration.setAttribute("style", `width:${w}; height:${h};`)
}

function reRenderIllo() {

    illo = new Zdog.Illustration({
        element: '#illo',
        dragRotate: inputs_illo.dragRotate.checked
    });

    illo.setSize(parseInt(canvas_width.value), parseInt(canvas_height.value));

    // add circle
    new Zdog.Ellipse({
        addTo: illo,
        diameter: inputs_ellipse.diameter.value,
        stroke: inputs_ellipse.stroke.value,
        color: inputs_ellipse.color.value
    });

    illo.updateRenderGraph();
    
}

function updateSpanValue(e, forceSet=false) {
    let elem = e.target;
    if (forceSet) {
        elem = e;
    }
    const spanid = elem.id + 'value';
    let span = document.getElementById(spanid);
    span.innerText = elem.value;
}

function handleControls_Illo(e) {
    if (e.target.id === 'canvas_width' | e.target.id === 'canvas_height') {
        setInputMaxByCanvasSize(inputs_ellipse.diameter);
        setInputMaxByCanvasSize(inputs_ellipse.stroke);
        resetIllustrationSectionByCanvasSize()
    }
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
    resetIllustrationSectionByCanvasSize();
    illo.updateRenderGraph();
    checkAnimate();
}

init();
