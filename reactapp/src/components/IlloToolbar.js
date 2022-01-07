import React, { useEffect, useState } from 'react';
import '../zdogui.css';

import { makeStyles } from '@material-ui/core/styles';

import { Button, ButtonGroup, Container, Dialog, IconButton, Typography } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddShapeMenu from './AddShapeMenu';

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CodeIcon from '@mui/icons-material/Code';


const useStyles = makeStyles({
    addshape: {
        width: 140,
        height: 34
    },
    disabled: {
        color: 'grey'
    },
    confirmDialog: {
        padding: 40
    },
});

export default function IlloToolbar(props) {

    const setPresets = props.setPresets;
    const stateVars = props.stateVars;
    const addedShapes = props.addedShapes;
    let selectedNodeId = props.selectedNodeId;
    let addNewZdogShape = props.addNewZdogShape;
    const setOpen = props.setOpen;

    const classes = useStyles();

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [confirmCreateNewDialogOpen, setConfirmCreateNewDialogOpen] = useState(false);

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

    function handleCreateNew() {
        console.log('create new clicked');
        setConfirmCreateNewDialogOpen(true);
    }

    function handleConfirmCreateNew() {

        // TO DO: replace below with a fn that sets all state props to a default or a specific demo
        selectedNodeId[1]('canvasnode');
        setPresets('blank');
        /* stateVars.fallback[1]('');
        addedShapes[1]([]); */

        handleCloseCreateNewDialog();
    }

    function handleCloseCreateNewDialog() {
        setConfirmCreateNewDialogOpen(false);
    }

    function getSourceCode() {
        console.log('getting source code');
        setOpen(true);
    }


    return (
            <div className="toplevelactions">

                <IconButton id="createnew" onClick={handleCreateNew} aria-label="Create new illustration">
                    <NoteAddOutlinedIcon fontSize="small" />
                </IconButton>

                <Dialog onClose={handleCloseCreateNewDialog} open={confirmCreateNewDialogOpen}>
                        <Container className={classes.confirmDialog}>
                            <Typography>Starting a new Zdog Illustration will delete any work you've done so far! 
                                <br/>
                                <b>Be sure to grab any source code you want for your current project first.</b>
                            </Typography>
                                <Typography><br/>Create a new Zdog Illustration?</Typography>
                            <div>
                                <Button onClick={handleConfirmCreateNew} color="primary">Confirm</Button>
                                <Button onClick={handleCloseCreateNewDialog}>Cancel</Button>
                            </div>
                        </Container>
                </Dialog>

                <ButtonGroup id="btngrp">
                    <div>
                        <IconButton className={(selectedNodeId[0] === '' || selectedNodeId[0] === 'canvasnode') ? classes.disabled : ''} onClick={handleDelete} aria-label="delete" disabled={(selectedNodeId[0] === '' || selectedNodeId[0] === 'canvasnode')}>
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

                <IconButton id="getsourcecode" onClick={getSourceCode} aria-label="Source code">
                            <CodeIcon fontSize="small" />
                </IconButton>

            </div>
    )

}