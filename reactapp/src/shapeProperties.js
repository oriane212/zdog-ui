

export let shapeProperties = {
    'basic': [
        'addTo', 'color', 'backface', 'stroke', 'fill', 'translate', 'rotate'/*, 'scale', 'zoom' */
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
        'diameter'
    ],
    'RoundedRect': [
        'width', 'height', 'cornerRadius'
    ],
    'Polygon': [
        'radius', 'sides'
    ],
    'Cone': [
        'diameter', 'length'
    ],
    'Cylinder': [
        'diameter', 'length', 'frontFace'
    ],
    'Group': [],
    'Shape': [
        'path', 'closed'
    ]
}