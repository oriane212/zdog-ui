import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    addbtn: {
        /* color: '#643263' */
    },
    disabled: {
        color: 'grey'
    },
    smallFont: {
      fontSize: '0.9rem'
    },
    itemAction: {
      paddingRight: 12,
      color: 'rgba(0, 0, 0, 0.5)',
      display: 'inline-flex',
      '&:hover': {
          color: 'rgba(0, 0, 0, 0.9)'
      }
  },
});

export default function AddShapeMenu(props) {

  /* const [anchorEl, setAnchorEl] = React.useState(null); */

  const [anchorEl, setAnchorEl] = props.anchor;

  //let selected = props.selected;

  let selectedNodeId = props.selectedNodeId;
  let addNewZdogShape = props.addNewZdogShape;

  let checkParentExpanded = props.checkParentExpanded;
  //let [expanded, setExpanded] = props.expandedArray;
  let hovernodeid = props.hovernodeid;

  //let addMenuOpen = props.addMenuOpen;

  const classes = useStyles();

  const handleClick = (event) => {
    /* selectedNodeId[1](hovernodeid); */
    /* addMenuOpen[1](true); */
    setAnchorEl(event.currentTarget);
    console.log('wooooopie');

    /* if (hovernodeid === selectedNodeId) {
      console.log('wooooopie');
      setAnchorEl(event.currentTarget);
    } else {
      console.log('wooooopie waiting');
      setTimeout(() => {setAnchorEl(event.currentTarget);}, 2000);
    } */
    
  };

  const handleClose = () => {
    setAnchorEl(null);
    /* addMenuOpen[1](false);
      selectedNodeId[1](hovernodeid); */
  };

  function handleShapeSelect(v) {
      handleClose();
      //addNewZdogShape(v, hovernodeid /* selectedNodeId[0] */);
      addNewZdogShape(v, selectedNodeId[0]);
  }


/* useEffect(() => {
    //checkParentExpanded();
}); */

/* useEffect(() => {
  
}, [anchorEl]); */

  return (
    <React.Fragment>
      {/* <IconButton disabled={selectedNodeId[0] === ''} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AddIcon className={(selectedNodeId[0] === '')? classes.disabled : classes.addbtn} fontSize="small"/>
      </IconButton> */}
      {/* <AddIcon onClick={handleClick} className={classes.itemAction} fontSize='small'/> */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.smallFont} divider onClick={() => handleShapeSelect('Group')}value="Group">Group</MenuItem>
        <MenuItem className={classes.smallFont} divider onClick={() => handleShapeSelect('Shape')} value="Shape">Shape</MenuItem>
        <MenuItem className={classes.smallFont} onClick={() => handleShapeSelect('Box')} value="Box">Box</MenuItem>
        <MenuItem className={classes.smallFont} onClick={() => handleShapeSelect('Cone')} value="Cone">Cone</MenuItem>
        <MenuItem className={classes.smallFont} onClick={() => handleShapeSelect('Cylinder')} value="Cylinder">Cylinder</MenuItem>
        <MenuItem className={classes.smallFont} onClick={() => handleShapeSelect('Ellipse')}value="Ellipse">Ellipse</MenuItem>
        <MenuItem className={classes.smallFont} onClick={() => handleShapeSelect('Hemisphere')} value="Hemisphere">Hemisphere</MenuItem>
        <MenuItem className={classes.smallFont} onClick={() => handleShapeSelect('Polygon')} value="Polygon">Polygon</MenuItem>
        <MenuItem className={classes.smallFont} onClick={() => handleShapeSelect('Rect')} value="Rectangle">Rectangle</MenuItem>
        <MenuItem className={classes.smallFont} onClick={() => handleShapeSelect('RoundedRect')} value="Rounded Rectangle">Rounded Rectangle</MenuItem>
      </Menu>
    </React.Fragment>
  );
}