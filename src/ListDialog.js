import Popup from 'reactjs-popup'
//import React from 'react';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AddDialog from './addDialog.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {deleteData} from './actionCreators'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import DeleteIcon from '@material-ui/icons/Delete';

const mapStateToProps = (state) => ({
   state2: state.adminReducer2,
});

const mapDispatchToProps = {
  deleteData
}

const showText = (data) => {
  return (
    <TextField
      label={data.name}
      margin="normal"
      variant="outlined" />
  )
}

const showCheckbox = (data) => {
  return (
    <FormLabel>
      <b>{data.name}</b> {data.multiple === true ? "(multivalinta)" : ""}
      <FormGroup row>
        {data.choises.map((a, i) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={false}
              />}
            label={a.name}
          />
        ))}
      </FormGroup>
    </FormLabel>  
  )
}

const ListDialog = (props) => {

  const [click, setClick] = useState(false);
  const [check, setCheck] = useState(false);

  const handleClickOpen = () => {
    setClick(true)
  };

  const handleClose = () => {
    setClick(false)
  };

  const handleChange = () => {
    setCheck(!check)
  };

  const handleAddText = (button) => () => {
    const temp = {button: 0, clicked: true}
    button === 1 ? temp.button = 1 : temp.button = 2
    //setClick2(temp)
  };

  const handleDelete = (item_index, list_index) => () => {
    const dialog_id = props.state2[list_index].data[item_index].id
    props.deleteData(dialog_id, list_index)
  }

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Täytä tiedot
        </Button>
        <Dialog
          open={click}
          onClose={handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{props.state2[props.index].name}</DialogTitle>
          <DialogContent>
          <DialogContentText id="dialog-description">
             <b>LISÄÄ:</b>
          </DialogContentText>      
            <AddDialog index={props.index}></AddDialog>   
            <List>
            {props.state2[props.index].data.map((a,i) => (
                 <ListItem key={i} role={undefined} dense divider >
                 <IconButton aria-label="Delete" onClick={handleDelete(i, props.index)}>
                     <DeleteIcon />
                 </IconButton>                
                {a.type === "text" ? showText(a) : showCheckbox(a)}
                </ListItem>
             ))} 
            </List>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose} color="primary">
              Sulje
            </Button>
           </DialogActions>
        </Dialog>
      </div>
    );
  
}

export default connect(
  mapStateToProps, mapDispatchToProps)(ListDialog);

