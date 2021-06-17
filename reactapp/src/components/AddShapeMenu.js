import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    addbtn: {
        color: 'white'
    },
    disabled: {
        color: 'grey'
    }
});

export default function AddShapeMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  //let selected = props.selected;

  let selectedNodeId = props.selectedNodeId;
  let addNewZdogShape = props.addNewZdogShape;

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleShapeSelect(v) {
      handleClose();
      addNewZdogShape(v, selectedNodeId[0]);
  }

  return (
    <div>
      <IconButton disabled={selectedNodeId[0] === ''} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AddIcon className={(selectedNodeId[0] === '')? classes.disabled : classes.addbtn} /* color="inherit"  */fontSize="small"/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleShapeSelect('Ellipse')}value="Ellipse">Ellipse</MenuItem>
        <MenuItem onClick={() => handleShapeSelect('Rect')} value="Rect">Rect</MenuItem>
        <MenuItem onClick={() => handleShapeSelect('Box')} value="Box">Box</MenuItem>
        {/* <MenuItem onClick={() => handleShapeSelect('Hemisphere')} value="Hemisphere">Hemisphere</MenuItem> */}
      </Menu>
    </div>
  );
}