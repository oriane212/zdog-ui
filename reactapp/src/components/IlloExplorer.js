import React, { useEffect, useState } from 'react';
import '../zdogui.css';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import generateID from '../generateID';
import fixCamelCase from '../fixCamelCase';
import IlloToolbar from './IlloToolbar';
import { Button, Container, Dialog, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddIcon from '@material-ui/icons/Add';
import AddShapeMenu from './AddShapeMenu';


const useStyles = makeStyles({
    root: {
        padding: 16,
        overflowX: 'scroll',
        overflowY: 'scroll',
        height: window.innerHeight - 185 /* 185 is (appbar + actionsbar heights) + additional 33px offset needed for bottom horizontal scroll bar to show */

    },
    item: {
        color: 'rgba(0, 0, 0, 0.87)',
        /*         borderLeft: '1px dashed grey' */

    },
    flexy: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
        '&:hover .itemActionsContainer': {
            display: 'flex'
        }
    },
    selected: {
        display: 'flex'
    },
    itemAction: {
        paddingRight: 12,
        color: 'rgba(0, 0, 0, 0.5)',
        display: 'inline-flex',
        '&:hover': {
            color: 'rgba(0, 0, 0, 0.9)'
        }
    },
    confirmDialog: {
        padding: 40
    }
});

export default function IlloExplorer(props) {

    const setPresets = props.setPresets;
    const stateVars = props.stateVars;
    const addedShapes = props.addedShapes;
    let selectedNodeId = props.selectedNodeId;
    let addNewZdogShape = props.addNewZdogShape;
    const setOpen = props.setOpen;

    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(['canvasnode']);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    let addMenuOpen = useState(false);


    const anchor = React.useState(null);



    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        event.preventDefault();

        // ***** this seems to cause a rerender that interferes with the rendering of AddShapeMenu, even though AddShapeMenu IS triggered when add icons are clicked ***** //
        //if (!addMenuOpen[0]) {
            selectedNodeId[1](nodeIds);
        //}

        console.log('nodeIds: ' + nodeIds);
    };

    function copyArray(a) {
        let newArray = [];
        newArray.push(a);
        let newArrayFlattened = newArray.flat();
        return newArrayFlattened;
    }

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(addedShapes[0]);
        let flattened = newshapearry.flat();
        return flattened;
    }

    function handleDelete() {
        console.log('hello');
        setConfirmDialogOpen(true);
    }

    function handleClose() {
        setConfirmDialogOpen(false);
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

    /* const handleAdd = (e) => {
        setAnchorEl(e.currentTarget);
        console.log('anchorEl = ', anchorEl);
      };
    
      const handleCloseAddMenu = () => {
        setAnchorEl(null);
      };
    
      function handleAddMenuShapeSelect(v) {
          handleCloseAddMenu();
          addNewZdogShape(v, selectedNodeId[0]);
      } */

    // check that the parent of the selected item is expanded (ie. selected item is not hidden from user, which happens when a new item is added)
    // also make sure top level Canvas node is always expanded
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

    function handleAdd(nodeid) {
        console.log(`nodeid inside handleAdd = ${nodeid}`);
        //let el = document.getElementById(e.target.id);
        /* anchor[1](el); */

        //let section = document.querySelector('.illoExplorer');
        let el = document.getElementById('invisibleAnchorEl');
        anchor[1](el);
    }


    let startingParentIds = [];

    function createTree(childrenArray, parentnodeid) {
        let p = parentnodeid;
        startingParentIds.push(p);

        console.log(childrenArray.length !== 0);
        if (childrenArray.length !== 0) {
            let treeitems = childrenArray.map((shape, i) => {
                let pos = `${p}_${i}`;
                let item = (<TreeItem onLabelClick={handleSelect} onIconClick={handleToggle} className={classes.item} key={generateID()} nodeId={pos} label={<div className={classes.flexy}>{fixCamelCase(shape.shapeClass)} <div className={selectedNodeId[0] === pos ? classes.selected : 'itemActionsContainer'}> <DeleteOutlinedIcon onClick={handleDelete} className={classes.itemAction} fontSize='small' /> <AddIcon /* id={pos}  */onClick={() => handleAdd(pos)} className={classes.itemAction} fontSize='small'/>  {/* <AddShapeMenu addMenuOpen={addMenuOpen} hovernodeid={pos} checkParentExpanded={checkParentExpanded} selectedNodeId={selectedNodeId} addNewZdogShape={addNewZdogShape} />  */}</div></div>}>
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
            (<TreeItem onLabelClick={handleSelect} onIconClick={handleToggle} className={classes.item} key={generateID()} nodeId={i.toString()} label={<div className={classes.flexy}>{fixCamelCase(shape.shapeClass)} <div className={selectedNodeId[0] === i.toString() ? classes.selected : 'itemActionsContainer'}> {/* <IconButton onClick={handleAdd}> <AddIcon className={classes.itemAction} fontSize='small' /> </IconButton>  */ } <DeleteOutlinedIcon onClick={handleDelete} className={classes.itemAction} fontSize='small'/> <AddIcon onClick={() => handleAdd(i.toString())} className={classes.itemAction} fontSize='small'/> {/* <AddShapeMenu addMenuOpen={addMenuOpen} hovernodeid={i.toString()} checkParentExpanded={checkParentExpanded} selectedNodeId={selectedNodeId} addNewZdogShape={addNewZdogShape} />  */}</div></div>}>
                {createTree(shape.children, i.toString())}
            </TreeItem>);
        return item;
    })

    let canvasItem = (
        <TreeItem onLabelClick={handleSelect} onIconClick={handleToggle} className={classes.item} nodeId="canvasnode" label={<div className={classes.flexy}>Canvas <div className={selectedNodeId[0] === 'canvasnode' ? classes.selected : 'itemActionsContainer'}> <AddIcon onClick={() => handleAdd('canvasnode')} className={classes.itemAction} fontSize='small'/> {/* <AddShapeMenu addMenuOpen={addMenuOpen} hovernodeid="canvasnode" checkParentExpanded={checkParentExpanded} selectedNodeId={selectedNodeId} addNewZdogShape={addNewZdogShape} /> */}  {/* <AddIcon id="canvasAdd" onClick={handleAdd} className={classes.itemAction} fontSize='small' /> */} </div></div>}>
                    {toptreelevel}
                </TreeItem>
    )

    /*   let itemActions = (
          <div className='itemActions'>
              <IconButton className={classes.itemBtn} onClick={handleDelete} aria-label="delete shape">
                  <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
          </div>
      ) */

    useEffect(() => {
        checkParentExpanded();
    });

    useEffect(() => {
        // check that all items are expanded to start
        let copied = copyArray(expanded);
        let newArry = copied.concat(startingParentIds);
        setExpanded(newArry);
        console.log(newArry);
    }, []);


    return (
        <section className="illoExplorer">

            <div id='invisibleAnchorEl'> </div>

            <IlloToolbar setPresets={setPresets} setOpen={setOpen} stateVars={stateVars} addedShapes={addedShapes} selectedNodeId={selectedNodeId} addNewZdogShape={addNewZdogShape} />

            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selectedNodeId[0]}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {canvasItem}

            </TreeView>

            <AddShapeMenu anchor={anchor} addMenuOpen={addMenuOpen} checkParentExpanded={checkParentExpanded} selectedNodeId={selectedNodeId} addNewZdogShape={addNewZdogShape} /> 

            <Dialog onClose={handleClose} open={confirmDialogOpen}>
                <Container className={classes.confirmDialog}>
                    <Typography>Deleting this shape will also delete any child shapes. Are you sure you want to delete this shape?</Typography>
                    <div>
                        <Button onClick={handleConfirm} color="primary">Confirm</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </div>
                </Container>

            </Dialog>

           {/*  <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseAddMenu}
            >
                <MenuItem className={classes.smallFont} divider onClick={() => handleAddMenuShapeSelect('Group')} value="Group">Group</MenuItem>
                <MenuItem className={classes.smallFont} divider onClick={() => handleAddMenuShapeSelect('Shape')} value="Shape">Shape</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => handleAddMenuShapeSelect('Box')} value="Box">Box</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => handleAddMenuShapeSelect('Cone')} value="Cone">Cone</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => handleAddMenuShapeSelect('Cylinder')} value="Cylinder">Cylinder</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => handleAddMenuShapeSelect('Ellipse')} value="Ellipse">Ellipse</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => handleAddMenuShapeSelect('Hemisphere')} value="Hemisphere">Hemisphere</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => handleAddMenuShapeSelect('Polygon')} value="Polygon">Polygon</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => handleAddMenuShapeSelect('Rect')} value="Rectangle">Rectangle</MenuItem>
                <MenuItem className={classes.smallFont} onClick={() => handleAddMenuShapeSelect('RoundedRect')} value="Rounded Rectangle">Rounded Rectangle</MenuItem>
            </Menu> */}

        </section>
    )

}