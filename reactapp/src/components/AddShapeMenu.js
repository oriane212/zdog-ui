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

  let selected = props.selected;

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleShapeSelect() {
      handleClose();
      console.log('test shape select');
  }

  return (
    <div>
      <IconButton disabled={selected.length === 0} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AddIcon className={(selected.length === 0)? classes.disabled : classes.addbtn} /* color="inherit"  */fontSize="small"/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleShapeSelect} value="Ellipse">Ellipse</MenuItem>
        <MenuItem onClick={handleShapeSelect} value="Rect">Rect</MenuItem>
        <MenuItem onClick={handleShapeSelect} value="Box">Box</MenuItem>
        <MenuItem onClick={handleShapeSelect} value="Hemisphere">Hemisphere</MenuItem>
      </Menu>
    </div>
  );
}