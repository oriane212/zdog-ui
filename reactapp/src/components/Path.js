import React from 'react';
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import '../zdogui.css';
import ShapePathPoint from './ShapePathPoint';

import Zdog from 'zdog';
import generateID from '../generateID';

const useStyles = makeStyles((theme) => ({
    parameterSection: {
        display: 'block',
        marginLeft: 12,
        marginTop: 24,
        marginBottom: 42,
        fontSize: 'small'
    },
    label: {
        fontSize: 'small',
        'margin-bottom': 14,
        marginTop: 24
    },
    smallFont: {
        fontSize: '0.8rem'
    }
}));

export default function Path(props) {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    let checkCursorFocus = props.checkCursorFocus;
    let cursorFocus = props.cursorFocus;
    let copyOfShape = props.copyOfShape;
    let addedShapes = props.addedShapes;
    let flattened = props.flattened;

    function handleAddToPathClick(e) {
        console.log('add to path');
        setAnchorEl(e.currentTarget);
        checkCursorFocus();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    function addToPath(v) {
        
        handleClose();

        // copy current path array
        let newpatharry = [];
        newpatharry.push(copyOfShape.data.path);
        let flatpath = newpatharry.flat();

        if (v === 'Point') {
            let pt = new Zdog.Vector({});
            flatpath.push({line: pt});
            copyOfShape.data.path = flatpath;
            addedShapes[1](flattened);
        }

        console.log(v);
    }

    
    function createPathPointFields(patharry) {
        let pathpointFields = [];
        patharry.forEach((item, i) => {
            if (i !== 0 && Object.keys(item).includes('line')) {
                console.log('includes is true');
                let sPP = (<ShapePathPoint checkCursorFocus={props.checkCursorFocus} key={generateID()} pathindex={i} pathSegment='line' segmentIndex= '-' label="point" cursorFocus={cursorFocus} copyOfShape={copyOfShape} addedShapes={addedShapes} flattened={flattened} />);
                pathpointFields.push(sPP);
            } else {
                console.log('includes is false');
            }
        })
        return pathpointFields;
    }

    //let ppFields = createPathPointFields(copyOfShape.data.path);

    return (
        <div className={classes.parameterSection}>
            <p className={classes.label}><b>Path</b></p>
            <div id="pathpoints">
                <ShapePathPoint checkCursorFocus={props.checkCursorFocus} pathindex={0} pathSegment='line' segmentIndex= '-' label='start point' cursorFocus={cursorFocus} copyOfShape={copyOfShape} addedShapes={addedShapes} flattened={flattened} />
                {copyOfShape.data.path.length > 1 ? createPathPointFields(copyOfShape.data.path) : ''}
            </div>
            <IconButton id='addToPathBtn' onClick={handleAddToPathClick}>
                <AddIcon fontSize="small" />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className={classes.smallFont} onClick={() => addToPath('Point')} value="Point">Point</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => addToPath('Move')} value="Move">Move</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => addToPath('Arc')} value="Arc">Arc</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => addToPath('Bezier')} value="Bezier">Bezier</MenuItem>
            </Menu>
        </div >
    )
}