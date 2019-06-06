import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {addData} from './actionCreators'
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';



const mapStateToProps = (state) => ({
   state2: state.adminReducer2,
});

const mapDispatchToProps = {
  addData
}


const AddDialog = (props) => {

  const [opened1, setOpen1] = useState(false); //Add new Textfield popup
  const [opened2, setOpen2] = useState(false); //Add new checkbox popup
  const [input, setInput] = useState(""); //Textfield input
  const [inputValue, setInputValue] = useState(""); // Price/piece if number checked in Textfield part
  const [textfields, setTextfield] = useState([]); //Checkbox choices names and prices
  const [check, setCheck] = useState(false) // multichoise for checkboxes
  const [check2, setCheck2] = useState([false, false, false]) //date, time or number type for textfield
  const [check3, setCheck3] = useState(false)   //required field (text/checkbox)


  const handleClose = (button) => () => {
    setInput("")
    button === 1 ? setOpen1(false) : setOpen2(false)
    setTextfield([])
    setCheck(false)
    setCheck2([false,false,false])
    setCheck3(false)
    setInputValue(0)
  }

  const handleAdd = (button) => () => {
    button === 1 ? setOpen1(true) : setOpen2(true)
  }

  const handleSave = (button) => () => {
    button === 1 ? saveText(button) : saveCheckbox(button)
    handleClose(button)();
  }

  const saveText = () => {
    const input_temp = check2[0] === true ? "number"
                      :check2[1] === true ? "date"
                      :check2[2] === true ? "time" : "text"
    const data_temp = { type: "text", name: input, input_type: input_temp, required: check3, price: inputValue}
    props.addData(data_temp, props.index)
  }

  const saveCheckbox = () => {
    const data_temp = { type: "checkbox", name: input, multiple: check,
                       choises: textfields, required: check3}
    props.addData(data_temp, props.index)
  }

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleInputValue = (event) => {
    setInputValue(event.target.value)
  }
  
  const handleChangeAdd = (value, index, target) => {
    const textfield_temp = [...textfields]
    target === 1 ? textfield_temp[index].name = value : textfield_temp[index].price = value
    setTextfield(textfield_temp)
  }

  const handleAddOption = () => {
    const textfields_new = [...textfields, { name: "", price: 0 }]
    setTextfield(textfields_new)

  }

  const handleRemoveOption = () => {
    const textfields_new = [...textfields].slice(0, -1)
    setTextfield(textfields_new)
  }


  return (

    <div>
      <Button variant="outlined" color="primary" onClick={handleAdd(1)} >
        Tekstikenttä
      </Button>
      <Button variant="outlined" color="primary" onClick={handleAdd(2)}>
        Monivalinta
      </Button>
      <Dialog
        open={opened1}
        aria-labelledby="text-dialog"
        >
        <DialogTitle id="text-dialog">TEKSTIKENTTÄ</DialogTitle>
        <DialogContent>
            <TextField
              label = "Otsikko"
              margin = "normal"
              variant = "outlined"
              value = {input}
              onChange={handleChange}            
            />
            {check2[0] === true ?
            <TextField
              label ="Hinta €/kpl"
              margin ="normal"
              variant="outlined"
              value = {inputValue}
              type="number"
              onChange={handleInputValue}            
            /> : ""}
            <div></div>
            <FormControlLabel
            control={
              <Checkbox
                checked={check3}
                onChange={() => setCheck3(!check3)}
              />}
            label="Pakollinen asiakkaalle"/>
            <div></div>
          <FormControlLabel
            control={
              <Checkbox
                checked={check2[0]}
                onChange={() => setCheck2([!check2[0],false, false])}
              />}
            label="Kokanaisluku"/>
          <FormControlLabel
            control={
              <Checkbox
                checked={check2[1]}
                onChange={() => setCheck2([false, !check2[1], false])}
              />}
            label="Päivämäärä"/>
          <FormControlLabel
            control={
              <Checkbox
                checked={check2[2]}
                onChange={() => setCheck2([false, false, !check2[2]])}
              />}
            label="Kellonaika"/>
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
        <DialogTitle id="checkbox-dialog">MONIVALINTA</DialogTitle>
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
            onChange={() => setCheck(!check)}
          />
        }
        label="Useamman ruudun valinta"
        /><FormControlLabel
        control={
          <Checkbox
            checked={check3}
            onChange={() => setCheck3(!check3)}
          />
        }
        label="Pakollinen asiakkaalle"
        /><div></div>

        <Button variant="outlined" color="primary" onClick={handleAddOption}>
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
                step="1"
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
  