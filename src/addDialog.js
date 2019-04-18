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
import ListDialog from './ListDialog'
import {addData} from './actionCreators'
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';



const mapStateToProps = (state) => ({
   state2: state.adminReducer2,
});

const mapDispatchToProps = {
  addData
}


const AddDialog = (props) => {

  const [opened1, setOpen1] = useState(false);
  const [opened2, setOpen2] = useState(false);
  const [input, setInput] = useState("");
  const [textfields, setTextfield] = useState([]);
  const [check, SetCheck] = useState(false)


  const handleClose = (button) => () => {
    setInput("")
    button === 1 ? setOpen1(false) : setOpen2(false)
    setTextfield([])
    SetCheck(false)

  }

  const handleAdd = (button) => () => {
    button === 1 ? setOpen1(true) : setOpen2(true)
  }

  const handleSave = (button) => () => {
    button === 1 ? saveText(button) : saveCheckbox(button)
    handleClose(button)();
  }

  const saveText = () => {
    const data_temp = { type: "text", name: input }
    props.addData(data_temp, props.index)
  }

  const saveCheckbox = () => {
    const data_temp = { type: "checkbox", name: input, multiple: check, choises: textfields }
    props.addData(data_temp, props.index)
  }

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleChangeAdd = (value, index, target) => {
    const textfield_temp = [...textfields]
    target === 1 ? textfield_temp[index].name = value : textfield_temp[index].price = value
    setTextfield(textfield_temp)
  }

  const handleAddOption = () => {
    const textfields_new = [...textfields, { name: "", price: "" }]
    setTextfield(textfields_new)

  }

  const handleRemoveOption = () => {
    const textfields_new = [...textfields].slice(0, -1)
    console.log(textfields_new)
    setTextfield(textfields_new)

  }


  return (

    <div>
      <Button variant="outlined" color="primary" onClick={handleAdd(1)} >
        Tekstikenttä
      </Button>
      <Button variant="outlined" color="primary" onClick={handleAdd(2)}>
        Checkbox
      </Button>
      <Dialog
        open={opened1}
        aria-labelledby="text-dialog"
        >
        <DialogTitle id="text-dialog">TEKSTIKENTTÄ</DialogTitle>
        <DialogContent>
            <TextField
              label="Otsikko"
              margin="normal"
              variant="outlined"
              value={input}
              onChange={handleChange}            
            />
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleSave(1)}>
            Tallenna
        </Button><div></div>
          <Button variant="outlined" color="primary" onClick={handleClose(1)}>
            Sulje
        </Button><div></div>
        </DialogActions>
      </Dialog>

      <Dialog
        open={opened2}
        aria-labelledby="checkbox-dialog"
        >
        <DialogTitle id="checkbox-dialog">CHECKBOX</DialogTitle>
        <DialogContent>
            <TextField
              label="Otsikko"
              margin="normal"
              variant="outlined"
              value={input}
              onChange={handleChange}
              />
            <div></div>  
      <FormControlLabel
        control={
          <Checkbox
            checked={check}
            onChange={() => SetCheck(!check)}
          />
        }
        label="Multivalinta"
        /><div></div>

      <Button variant="outlined" color="primary"  onClick={handleAddOption}
      >
            lisää
        </Button>
          <Button variant="outlined" color="primary" onClick={handleRemoveOption}>
            poista
        </Button> Lisää/poista valinta

        
        <List>
        {textfields.map((item, index) => (                   
          <ListItem key={index} role={undefined} dense divider >
            <TextField
              label="Anna nimi"
              margin="normal"
              variant="outlined"
              value={item.name}
              onChange={e => handleChangeAdd(e.target.value, index, 1)}
            />
            <TextField
                label="Anna hinta"
                margin="normal"
                variant="outlined"
                value={item.price}
                type="number"
                onChange={e => handleChangeAdd(e.target.value, index, 2)}
                />                
          </ListItem>
        ))} 
        </List>
        </DialogContent>

        <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleSave(2)}>
            Tallenna
        </Button><div></div>
          <Button variant="outlined" color="primary" onClick={handleClose(2)}>
            Sulje
        </Button><div></div>
        </DialogActions>
      </Dialog>
    </div>
  )


};

export default connect(
    mapStateToProps, mapDispatchToProps)(AddDialog);
  