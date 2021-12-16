import React, { useEffect, useState } from 'react';
import '../zdogui.css';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Button, ButtonGroup, Container, Dialog, IconButton, Menu, MenuItem, Select, Typography } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddShapeMenu from './AddShapeMenu';

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CodeIcon from '@mui/icons-material/Code';

import generateID from '../generateID';
import fixCamelCase from '../fixCamelCase';


const useStyles = makeStyles({
    root: {
        padding: 16,
        overflowX: 'scroll',
        overflowY: 'scroll',
       height: window.innerHeight - 185 /* 185 is (appbar + actionsbar heights) + additional 33px offset needed for bottom horizontal scroll bar to show */

    },
    item: {
        /* height: 16 */
        color: 'rgba(0, 0, 0, 0.87)'
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
        /* color: '#643263' */
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
    },
    confirmDialog: {
        padding: 40
    },
});

export default function ShapeTree(props) {

    const stateVars = props.stateVars;
    const addedShapes = props.addedShapes;

    let cursorFocus = props.cursorFocus;

    let selectedNodeId = props.selectedNodeId;

    let addNewZdogShape = props.addNewZdogShape;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(['canvasnode']);

    console.log('expanded = ' + expanded);

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    //const [selected, setSelected] = React.useState([]);

    //const [selectShapeValue, setSelectShapeValue] = useState('Ellipse');

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        selectedNodeId[1](nodeIds);
        //setSelected(nodeIds);
        console.log('nodeIds: ' + nodeIds);
    };

    /* function handle_onAdd() {
        props.addNewZdogShape(selectShapeValue);
        checkCursorFocus();
    } */

    function copyArray(a) {
        let newArray = [];
        newArray.push(a);
        let newArrayFlattened = newArray.flat();
        return newArrayFlattened;
    }

    function checkParentExpanded() {
        let pos = selectedNodeId[0].split('_');
        if (pos.length > 1) {
            pos.pop();
            let parentId = pos.join('_');
            if (!expanded.includes(parentId)) {
                console.log('does not include parentId');
                let copied = copyArray(expanded);
                copied.push(parentId);
                setExpanded(copied);
            }
        } else {
            if (!expanded.includes('canvasnode')) {
                let copied = copyArray(expanded);
                copied.push('canvasnode');
                setExpanded(copied);
            }
        }
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
        setConfirmDialogOpen(true);
    }

    function handleConfirm() {
        let flattened = copyShapes();

        let nodeId = selectedNodeId[0];
        let posStrings = nodeId.split('_');
        let posNums = posStrings.map((s) => Number(s));

        if (posNums.length === 1) {

            flattened.splice(posNums[0], 1);

            // reset selected node id to canvas
            selectedNodeId[1]('canvasnode');

        } else {
            let currentShape;

            posNums.forEach((posNum, i) => {
                if ((0 < i) && (i <= (posNums.length - 2))) {
                    currentShape = currentShape.children[posNum];
                } else if (i === 0) {
                    currentShape = flattened[posNum];
                }
            })

            let lastpos = posNums[posNums.length - 1];

            currentShape.children.splice(lastpos, 1);

            // reset selected node id to parent of deleted shape
            posNums.pop();
            let posNumsToStrings = posNums.map((n) => n.toString());
            let parentNodeId = posNumsToStrings.join('_');
            selectedNodeId[1](parentNodeId);
            
        }

        //setShapes(flattened);
        addedShapes[1](flattened);
        handleClose();
    }

    function handleClose() {
        setConfirmDialogOpen(false);
    }

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(addedShapes[0]);
        let flattened = newshapearry.flat();
        return flattened;
    }

    function createTree(childrenArray, parentnodeid) {
        let p = parentnodeid;
        console.log(childrenArray.length !== 0);
        if (childrenArray.length !== 0) {
            let treeitems = childrenArray.map((shape, i) => {
                let pos = `${p}_${i}`;
                let item = (<TreeItem className={classes.item} key={generateID()} nodeId={pos} label={fixCamelCase(shape.shapeClass)}>
                    {createTree(shape.children, pos)}
                </TreeItem>);
                return item;
            })
            return treeitems;
        } else {
            return '';
        }
    }

    let toptreelevel = addedShapes[0].map((shape, i) => {
        let item =
            (<TreeItem className={classes.item} key={generateID()} nodeId={i.toString()} label={fixCamelCase(shape.shapeClass)}>
                {createTree(shape.children, i.toString())}
            </TreeItem>);
        return item;
    })

    function handleCreateNew() {
        console.log('create new clicked');
    }

    /* function getCode() {
        console.log('getting code');
        setOpen(true);
      } */

    useEffect(() => {
        checkParentExpanded();
    });


    return (
        <section className="shapetree">
            <div className="toplevelactions">
                <IconButton id="createnew" onClick={handleCreateNew} aria-label="Create new illustration">
                            <NoteAddOutlinedIcon fontSize="small" />
                </IconButton>
                <ButtonGroup id="btngrp">
                    <div>
                        <IconButton className={(selectedNodeId[0] === '' || selectedNodeId[0] === 'canvasnode') ? classes.disabled : classes.delete} onClick={handleDelete} aria-label="delete" disabled={(selectedNodeId[0] === '' || selectedNodeId[0] === 'canvasnode')}>
                            <DeleteOutlinedIcon fontSize="small" />
                        </IconButton>
                    </div>

                    <Dialog onClose={handleClose} open={confirmDialogOpen}>
                        <Container className={classes.confirmDialog}>
                            <Typography>Deleting this shape will also delete any child shapes. Are you sure you want to delete this shape?</Typography>
                            <div>
                                <Button onClick={handleConfirm} color="primary">Confirm</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </div>
                        </Container>

                    </Dialog>

                    <AddShapeMenu selectedNodeId={selectedNodeId} addNewZdogShape={addNewZdogShape} />
            
                </ButtonGroup>
                <IconButton id="getcode" onClick={handleCreateNew} aria-label="Get code">
                            <CodeIcon fontSize="small" />
                </IconButton>
            </div>

            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selectedNodeId[0]}
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