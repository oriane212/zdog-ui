

export let shapeProperties = {
    'basic': [
        'addTo', 'color', 'stroke', /* 'closed', */ 'fill', 'translate', 'rotate'/*, 'scale', 'zoom' */
    ],
    'Ellipse': [
        /*'diameter',*/ 'width', 'height', 'quarters'
    ],
    'Rect': [
        'width', 'height'
    ],
    'Box': [
        'width', 'height', 'depth', 'frontFace', 'rearFace', 'topFace', 'bottomFace', 'leftFace', 'rightFace'
    ],
    'Hemisphere': [
        'diameter', 'backface'
    ]
}