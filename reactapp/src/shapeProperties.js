

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
    ],
    'RoundedRect': [
        'width', 'height', 'cornerRadius'
    ],
    'Polygon': [
        'radius', 'sides'
    ],
    'Cone': [
        'diameter', 'length', 'backface'
    ],
    'Cylinder': [
        'diameter', 'length', 'backface', 'frontFace'
    ]
}