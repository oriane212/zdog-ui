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

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        event.preventDefault();
        selectedNodeId[1](nodeIds);
        console.log('nodeIds: ' + nodeIds);
    };

    function copyArray(a) {
        let newArray = [];
        newArray.push(a);
        let newArrayFlattened = newArray.flat();
        return newArrayFlattened;
    }

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


    let startingParentIds = [];

    function createTree(childrenArray, parentnodeid) {
        let p = parentnodeid;
        startingParentIds.push(p);

        console.log(childrenArray.length !== 0);
        if (childrenArray.length !== 0) {
            let treeitems = childrenArray.map((shape, i) => {
                let pos = `${p}_${i}`;
                let item = (<TreeItem onLabelClick={handleSelect} onIconClick={handleToggle} className={classes.item} key={generateID()} nodeId={pos} label={fixCamelCase(shape.shapeClass)}>
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
            (<TreeItem onLabelClick={handleSelect} onIconClick={handleToggle} className={classes.item} key={generateID()} nodeId={i.toString()} label={fixCamelCase(shape.shapeClass)}>
                {createTree(shape.children, i.toString())}
            </TreeItem>);
        return item;
    })

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

            <IlloToolbar setPresets={setPresets} setOpen={setOpen} stateVars={stateVars} addedShapes={addedShapes} selectedNodeId={selectedNodeId} addNewZdogShape={addNewZdogShape} />

            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded ={expanded}
                selected={selectedNodeId[0]}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                <TreeItem onLabelClick={handleSelect} onIconClick={handleToggle} className={classes.item} nodeId="canvasnode" label="Canvas">
                    {toptreelevel}
                </TreeItem>
            </TreeView>

        </section>
    )

}