import Zdog from 'zdog';
import generateID from './generateID';

export let illoPresets = {
    'blank': {
        canvas_w: 240,
        canvas_h: 240,
        dragRotate: true,
        animate: false,
        rotate_x: 0,
        rotate_y: 0,
        rotate_z: 0,
        spin_x: .01,
        spin_y: .04,
        spin_z: .01,
        easeIO:
        {
            x: false,
            y: true,
            z: true,
            cycleCount: 200,
            power: 3
        }
        ,
        animateSelection: 'ease',
        fallback: 'A blank canvas',
        animationOption: 'dragRotate',
        bgColor: '#FFDDBB',
        shapeLayers: []
    },
    'whitebox': {
        canvas_w: 240,
        canvas_h: 240,
        dragRotate: false,
        animate: true,
        rotate_x: 0,
        rotate_y: 0,
        rotate_z: 0,
        spin_x: .01,
        spin_y: .04,
        spin_z: .01,
        easeIO:
        {
            x: false,
            y: true,
            z: true,
            cycleCount: 350,
            power: 5
        }
        ,
        animateSelection: 'ease',
        fallback: 'An outline of a square rotates to reveal it is the front face of a cube',
        animationOption: 'animate',
        bgColor: '#424242',
        shapeLayers: [
            {
                id: generateID(),
                children: [
                    {
                        id: generateID(),
                        children: [],
                        open: true,
                        shapeClass: 'Box',
                        data: {
                            "color": "#5C5C5C",
                            "backface": true,
                            "stroke": "1",
                            "fill": true,
                            "translate": new Zdog.Vector({}),
                            "rotate": new Zdog.Vector({}),
                            "width": 100,
                            "height": 100,
                            "depth": 100,
                            "frontFace": false,
                            "rearFace": false,
                            "topFace": "#f5f5f5",
                            "bottomFace": "#bfbfbf",
                            "leftFace": "#e0e0e0",
                            "rightFace": "#e0e0e0"
                        },
                        faces: {
                            "frontFace": "#cecece",
                            "rearFace": "#cecece",
                            "topFace": true,
                            "bottomFace": true,
                            "leftFace": true,
                            "rightFace": true
                        }
                    }
                ],
                open: true,
                shapeClass: 'Box',
                data: {
                    "color": "#5C5C5C",
                    "backface": true,
                    "stroke": "1",
                    "fill": false,
                    "translate": new Zdog.Vector({}),
                    "rotate": new Zdog.Vector({}),
                    "width": 100,
                    "height": 100,
                    "depth": 100,
                    "frontFace": "#cecece",
                    "rearFace": "#cecece",
                    "topFace": "#cecece",
                    "bottomFace": "#cecece",
                    "leftFace": "#cecece",
                    "rightFace": "#cecece"
                },
                faces: {
                    "frontFace": true,
                    "rearFace": true,
                    "topFace": true,
                    "bottomFace": true,
                    "leftFace": true,
                    "rightFace": true
                }
            }
        ]
    },
    'lego': {
        canvas_w: 450,
        canvas_h: 450,
        dragRotate: true,
        animate: false,
        rotate_x: 0,
        rotate_y: 0,
        rotate_z: 0,
        spin_x: .01,
        spin_y: .04,
        spin_z: .01,
        easeIO:
        {
            x: true,
            y: true,
            z: false,
            cycleCount: 200,
            power: 3
        }
        ,
        animateSelection: 'ease',
        fallback: 'Animated model of a red LEGO piece',
        animationOption: 'animate',
        bgColor: '#3A7DE9',
        shapeLayers: [
            {
                id: generateID(),
                children: [
                    {
                        id: generateID(),
                        children: [
                            {
                                id: generateID(),
                                children: [],
                                open: true,
                                shapeClass: 'Cylinder',
                                data: {
                                    "color": "#c30006",
                                    "backface": "#aa0a11",
                                    "stroke": "1",
                                    "fill": true,
                                    "translate": new Zdog.Vector({
                                        "x": -80,
                                        "y": 0,
                                        "z": 0
                                    }),
                                    "rotate": new Zdog.Vector({}),
                                    "diameter": "65",
                                    "length": "85",
                                    "frontFace": "#000000"
                                },
                                faces: {}
                            },
                            {
                                id: generateID(),
                                children: [],
                                open: true,
                                shapeClass: 'Cylinder',
                                data: {
                                    "color": "#c30006",
                                    "backface": "#aa0a11",
                                    "stroke": "1",
                                    "fill": true,
                                    "translate": new Zdog.Vector({}),
                                    "rotate": new Zdog.Vector({}),
                                    "diameter": "65",
                                    "length": "85",
                                    "frontFace": "#000000"
                                },
                                faces: {}
                            },
                            {
                                id: generateID(),
                                children: [],
                                open: true,
                                shapeClass: 'Cylinder',
                                data: {
                                    "color": "#c30006",
                                    "backface": "#aa0a11",
                                    "stroke": "1",
                                    "fill": true,
                                    "translate": new Zdog.Vector({
                                        "x": 80,
                                        "y": 0,
                                        "z": 0
                                    }),
                                    "rotate": new Zdog.Vector({}),
                                    "diameter": "65",
                                    "length": "85",
                                    "frontFace": "#000000"
                                },
                                faces: {}
                            }
                        ],
                        open: true,
                        shapeClass: 'Group',
                        data: {
                            "translate": new Zdog.Vector({
                                "x": 0,
                                "y": 5,
                                "z": 0
                            }),
                            "rotate": new Zdog.Vector({
                                "x": 1.5707963267948966,
                                "y": 0,
                                "z": 0
                            })
                        },
                        faces: {}
                    }
                ],
                open: true,
                shapeClass: 'Box',
                data: {
                    /*         "addTo": illo, */
                    "color": "#c30005",
                    "backface": true,
                    "stroke": 1,
                    "fill": true,
                    "translate": new Zdog.Vector({}),
                    "rotate": new Zdog.Vector({}),
                    "width": "320",
                    "height": "96",
                    "depth": "160",
                    "frontFace": "#b2081f",
                    "rearFace": "#c30005",
                    "topFace": "#db0623",
                    "bottomFace": false,
                    "leftFace": "#c30005",
                    "rightFace": "#c30005"
                },
                faces: {
                    "frontFace": true,
                    "rearFace": true,
                    "topFace": true,
                    "bottomFace": "#a20106",
                    "leftFace": true,
                    "rightFace": true
                }
            },
            {
                id: generateID(),
                children: [
                    {
                        id: generateID(),
                        children: [],
                        open: true,
                        shapeClass: 'Cylinder',
                        data: {
                            "color": "#c30006",
                            "backface": true,
                            "stroke": 1,
                            "fill": true,
                            "translate": new Zdog.Vector({
                                "x": 40,
                                "y": 40,
                                "z": 0
                            }),
                            "rotate": new Zdog.Vector({}),
                            "diameter": "50",
                            "length": "20",
                            "frontFace": "#db0723"
                        },
                        faces: {}
                    },
                    {
                        id: generateID(),
                        children: [],
                        open: true,
                        shapeClass: 'Cylinder',
                        data: {
                            "color": "#c30006",
                            "backface": true,
                            "stroke": 1,
                            "fill": true,
                            "translate": new Zdog.Vector({
                                "x": 40,
                                "y": -40,
                                "z": 0
                            }),
                            "rotate": new Zdog.Vector({}),
                            "diameter": "50",
                            "length": "20",
                            "frontFace": "#db0723"
                        },
                        faces: {}
                    },
                    {
                        id: generateID(),
                        children: [],
                        open: true,
                        shapeClass: 'Cylinder',
                        data: {
                            "color": "#c30006",
                            "backface": true,
                            "stroke": 1,
                            "fill": true,
                            "translate": new Zdog.Vector({
                                "x": 120,
                                "y": 40,
                                "z": 0
                            }),
                            "rotate": new Zdog.Vector({}),
                            "diameter": "50",
                            "length": "20",
                            "frontFace": "#db0723"
                        },
                        faces: {}
                    },
                    {
                        id: generateID(),
                        children: [],
                        open: true,
                        shapeClass: 'Cylinder',
                        data: {
                            "color": "#c30006",
                            "backface": true,
                            "stroke": 1,
                            "fill": true,
                            "translate": new Zdog.Vector({
                                "x": 120,
                                "y": -40,
                                "z": 0
                            }),
                            "rotate": new Zdog.Vector({}),
                            "diameter": "50",
                            "length": "20",
                            "frontFace": "#db0723"
                        },
                        faces: {}
                    },
                    {
                        id: generateID(),
                        children: [],
                        open: true,
                        shapeClass: 'Cylinder',
                        data: {
                            "color": "#c30006",
                            "backface": true,
                            "stroke": 1,
                            "fill": true,
                            "translate": new Zdog.Vector({
                                "x": -120,
                                "y": 40,
                                "z": 0
                            }),
                            "rotate": new Zdog.Vector({}),
                            "diameter": "50",
                            "length": "20",
                            "frontFace": "#db0723"
                        },
                        faces: {}
                    },
                    {
                        id: generateID(),
                        children: [],
                        open: true,
                        shapeClass: 'Cylinder',
                        data: {
                            "color": "#b2081f",
                            "backface": true,
                            "stroke": 1,
                            "fill": true,
                            "translate": new Zdog.Vector({
                                "x": -120,
                                "y": -40,
                                "z": 0
                            }),
                            "rotate": new Zdog.Vector({}),
                            "diameter": "50",
                            "length": "20",
                            "frontFace": "#db0723"
                        },
                        faces: {}
                    },
                    {
                        id: generateID(),
                        children: [],
                        open: true,
                        shapeClass: 'Cylinder',
                        data: {
                            "color": "#b2081f",
                            "backface": true,
                            "stroke": 1,
                            "fill": true,
                            "translate": new Zdog.Vector({
                                "x": -40,
                                "y": 40,
                                "z": 0
                            }),
                            "rotate": new Zdog.Vector({}),
                            "diameter": "50",
                            "length": "20",
                            "frontFace": "#db0723"
                        },
                        faces: {}
                    },
                    {
                        id: generateID(),
                        children: [],
                        open: true,
                        shapeClass: 'Cylinder',
                        data: {
                            "color": "#b2081f",
                            "backface": true,
                            "stroke": 1,
                            "fill": true,
                            "translate": new Zdog.Vector({
                                "x": -40,
                                "y": -40,
                                "z": 0
                            }),
                            "rotate": new Zdog.Vector({}),
                            "diameter": "50",
                            "length": "20",
                            "frontFace": "#db0723"
                        },
                        faces: {}
                    }
                ],
                open: true,
                shapeClass: 'Group',
                data: {
                    "translate": new Zdog.Vector({
                        "x": 0,
                        "y": -58,
                        "z": 0
                    }),
                    "rotate": new Zdog.Vector({
                        "x": 1.5707963267948966,
                        "y": 0,
                        "z": 0
                    }),
                    /*  "addTo": illo */
                },
                faces: {}
            }
        ]
    }
}