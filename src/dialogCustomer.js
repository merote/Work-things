import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {saveData} from './actionCreators'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';


const mapStateToProps = (state) => ({
   state2: state.adminReducer2,
});

const mapDispatchToProps = {
  saveData
}

const showText = (data, index, answers, setAnswers) => {
  
  //const [input, setInput] = useState([])
  
  const handleChange = (event) => {
    const temp = [...answers]
    temp[index] = event.target.value
    setAnswers(temp)
  }
  
  return (
    <TextField
      onChange = {handleChange}
      value = {answers[index]}
      required = {data.required}
      label = {data.name}
      margin = "normal"
      variant = "outlined" 
      type =  {data.input_type}
      />)
}

const showCheckbox = (data, index, answers, setAnswers) => {
  
  const handleSingle = (choise_index) => () => {
    const temp = [...answers]
    const temp_row = answers[index].map(a => false)
    temp_row[choise_index] = !answers[index][choise_index]
    temp[index] = temp_row
    setAnswers(temp)
  }

  const handleMultiple = (choise_index) => () => {
    const temp = [...answers]
    temp[index][choise_index] = !(temp[index][choise_index])
    setAnswers(temp)
  }
  
  return (
    <FormLabel>
      <b>{data.name}</b>
      <b>{data.required === true ? " *" : ""}</b>
      <FormGroup row>
        {data.choises.map((a,i) => (
          <FormControlLabel key={i}
            control={
              <Checkbox
                checked = {answers[index][i]}
                onChange = {data.multiple === true ? handleMultiple(i) : handleSingle(i)}
              />}
            label={a.name}
          />
        ))}
      </FormGroup>
    </FormLabel>  
  )
}

const answer_init = (data) => {
  const init = []
  data.forEach((a,i) => {
      a.type === "text"
      ? init[i] = ""
      : init[i] = (Array(a.choises.length).fill(false))
       
  })
  return init
}

const DialogCustomer = (props) => {

  console.log(props)
  
  const init = answer_init(props.state2[props.list_index].data)

  const [click, setClick] = useState(false);
  const [answers, setAnswers]= useState(init)
  //const [check, setCheck] = useState(false);

  const handleClickOpen = () => {
    setClick(true)
  };

  const handleCancel = () => {
    setAnswers(answer_init(props.state2[props.list_index].data))
    setClick(false)
  }

  const handleSave = () => {


    const index = props.list_index
    const temp_state = props.state2[index].data
    
    console.log(props.state2[index].data[0].name)
    const temp = props.state2[index].data.map(() => [])
    console.log(answers)
    answers.forEach((a,i) => {
      temp[i] = {question: temp_state[i].name,
                answer: temp_state[i].type === "text"
                        ? a
                        : a.indexOf(true) !== -1
                          ? a.map((b,j) => b === true ? j : -1)  //find indexes of true answers
                            .filter(c => c !== -1 )
                            .map(d => temp_state[i].choises[d].name)
                          : [],
                price: temp_state[i].type === "checkbox"  
                       ? a.indexOf(true) !== -1
                         ? a.map((b,j) => b === true ? j : -1)  //find indexes of true answers
                         .filter(c => c !== -1 )
                         .map(d => temp_state[i].choises[d].price)
                         : []
                       : undefined 
                }
    })
    console.log(temp)


    setClick(false)
    props.saveData(temp, index)
  }

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen} 
          disabled = {props.list2_checked[props.list_index] !== 1}> 
          Täytä tiedot
        </Button>
        <Dialog
          open={click}
          //onClose={handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{props.state2[props.list_index].name}</DialogTitle>
          <DialogContent>
 
            <List>
            {props.state2[props.list_index].data.map((a,i) => (
                 <ListItem key={i} role={undefined} dense divider >          
                {a.type === "text" ? showText(a ,i ,answers, setAnswers) : showCheckbox(a, i ,answers, setAnswers)}
                </ListItem>
             ))} 
            </List>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCancel} color="primary">
              Hylkää
            </Button>
            <Button variant="outlined" onClick={handleSave} color="primary">
              Tallenna
            </Button>
           </DialogActions>
        </Dialog>
      </div>
    );
  
}

export default connect(
  mapStateToProps, mapDispatchToProps)(DialogCustomer);

