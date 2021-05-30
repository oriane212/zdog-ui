import React, { useState } from 'react';
import '../zdogui.css';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Button, ButtonGroup, IconButton, Menu, MenuItem, Select, Typography } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddShapeMenu from './AddShapeMenu';

const useStyles = makeStyles({
    root: {
        /* width: '100%', */
        padding: 16
    },
    item: {
        /* height: 16 */
    },
    addshape: {
        width: 140,
        height: 34
    },
    add: {
        backgroundColor: 'dodgerblue',
        color: 'white'
    },
    delete: {
        color: 'white'
        /* height: 36,
        width: 40, */
 /*        marginLeft: 12 */
    },
    disabled: {
        color: 'grey'
    },
    inlineAdd: {
        display: 'inline'
    },
    shapelabel: {
        display: 'inline',
        paddingTop: 11
    }
});

export default function ShapeTree(props) {

    const stateVars = props.stateVars;
    const addedShapes = props.addedShapes;

    let cursorFocus = props.cursorFocus;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const [selectShapeValue, setSelectShapeValue] = useState('Ellipse');

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
        console.log('nodeIds: ' + nodeIds);
    };

    function handle_onAdd() {
        props.addNewZdogShape(selectShapeValue);
        checkCursorFocus();
    }

    function checkCursorFocus() {
        console.log('inside cursor check');
        if (cursorFocus[0]['id'] !== '') {
            cursorFocus[1]({
                'id': '',
                'cursorPos': 0
            });
            console.log('cursorFocus reset');
        }
    }

    function handleDelete() {
        console.log('hello');
    }

    let shapelist = addedShapes.map((shape, i) => {
        return (
            <TreeItem className={classes.item} key={i} nodeId={toString(i)} label={shape.shapeClass} />
        )
    })

    return (
        <section className="shapetree">
            <div className="toplevelactions">
                {/* <ButtonGroup>
                    <Select color="primary" className={classes.addshape} value={selectShapeValue} onChange={(e) => { setSelectShapeValue(e.target.value); }}>
                        <MenuItem value="Ellipse">Ellipse</MenuItem>
                        <MenuItem value="Rect">Rect</MenuItem>
                    </Select>
                    <Button id="add" className={classes.add} onClick={handle_onAdd} aria-label="add">
                        <AddIcon fontSize="small" />
                    </Button>
                </ButtonGroup> */}
                <ButtonGroup id="btngrp">
                    <div>
                    <IconButton className={(selected.length === 0)? classes.disabled : classes.delete} onClick={handleDelete} aria-label="delete">
                    <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
                    </div>
                
                <AddShapeMenu selected={selected}/>
                </ButtonGroup>
                
                
            </div>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                <TreeItem className={classes.item} nodeId="canvasnode" label="Canvas" /* label={
                    <div className="shapeitem">
                        <Typography className={classes.shapelabel} variant="body1">
                            Canvas
                        </Typography>
                       
                    </div>
                } */>

                    <TreeItem className={classes.item} nodeId="testnode" label="Shape"></TreeItem>
                    {shapelist}
                </TreeItem>
            </TreeView>
        </section>
    )

}