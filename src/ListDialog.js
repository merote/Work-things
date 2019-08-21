//Yksittäisen palvelun Täytä tiedot lista ja sen editointi.

import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddDialog from './addDialog.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {deleteData} from './actionCreators'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import DeleteIcon from '@material-ui/icons/Delete';

//Reduxin storen mappaukset propseihin
const mapStateToProps = (state) => ({
   state2: state.adminReducer2,
});

//Reduxin storen mappaukset propseihin
const mapDispatchToProps = {
  deleteData
}

const showText = (data) => {
  
  return (
    <TextField
      required = {data.required}
      label={data.name}
      margin="normal"
      variant="outlined" 
      type = {data.input_type}
      />)
}

const showCheckbox = (data) => {
  return (
    <FormLabel>
      <b>{data.name}</b>
       {data.required === true ? " *" : ""} 
       {data.multiple === true ? "(multivalinta)" : ""}
      <FormGroup row>
        {data.choises.map((a,i) => (
          <FormControlLabel key={i}
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

  const [click, setClick] = useState(false);  // Palvelun täytä tiedot popup-ikkunan on/off toiminto

  const handleClickOpen = () => {
    setClick(true)
  };

  const handleClose = () => {
    setClick(false)
  };

  //Poistetaan listan kysymys(item_index) ja päivitetään reduxin store
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
             LISÄÄ:
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

