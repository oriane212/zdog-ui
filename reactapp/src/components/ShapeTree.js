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

import generateID from '../generateID';

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

    function addChildItems(shape, i, parent) { 
        let s = shape;
        console.log('s = ' + s);
        if (s.children.length !== 0) {
            s.children.forEach((childshape, y) => {
                let cs = childshape;
                /* let pos = y; */
                let child = (<TreeItem className={classes.item} key={generateID()} nodeId={generateID()} label={s.shapeClass}></TreeItem>);
                console.log('parent = ' + parent);
                parent.append(child);
                addChildItems(cs, child);
            } )
        }
    }


    function createTree(childrenArray, parentnodeid) {
        let p = parentnodeid;
        console.log(childrenArray.length !== 0);
        if (childrenArray.length !== 0) {
            let treeitems = childrenArray.map((shape, i) => {
                let pos = `${p}_${i}`;
                let item = (<TreeItem className={classes.item} key={generateID()} nodeId={pos} label={shape.shapeClass}>
                    {createTree(shape.children, pos)}
                </TreeItem>);
                //treeitems.push(item);
                return item;
            })
            return treeitems;
        } else {
            return '';
        }
    }

    let toptreelevel = addedShapes[0].map((shape, i) => {
        let item = 
        (<TreeItem className={classes.item} key={generateID()} nodeId={i.toString()} label={shape.shapeClass}>
            {createTree(shape.children, i.toString())}
        </TreeItem>);
        return item;
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
                <TreeItem className={classes.item} nodeId="canvasnode" label="Canvas">
                    {toptreelevel}
                </TreeItem>
            </TreeView>
        </section>
    )

}