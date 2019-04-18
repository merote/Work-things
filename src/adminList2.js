//import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Icon from '@material-ui/core/Icon';
//import Paper from '@material-ui/core/Paper';
//import { Table } from '@material-ui/core';
import './index.css';
import { Column, Row } from 'simple-flexbox';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
//import Popup from "reactjs-popup";
import axios from 'axios'
import { resolveCname } from 'dns';
import {createStore} from 'redux'
import { connect } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import {addList2, deleteList2} from './actionCreators'
import Paper from '@material-ui/core/Paper';


const mapStateToProps = (state) => ({
    state2: state.adminReducer2,
    list2_id: state.adminReducer
});

const mapDispatchToProps = {
   addList2,
   deleteList2,
}



const AdminList2 = (props) => {
    
    console.log(props)
    console.log(props.checked1)
    const [input, setList] = useState("");
    const [check, setCheck] = useState([0,0,0,0,0]);
    
    const handleCheck = (index) => () => {
        const check_new = [...check]
        check_new[index] = !check[index]
        setCheck(check_new)
    }

    const handleAdd = (text) => () => { 
        setList("")
        props.addList2(text)
      }

    const handleChange = (event) => {
      setList(event.target.value)
    }

    const handleDelete = (index) => () => {     
        const delete_id = props.state2[index].id
        return props.deleteList2(delete_id)
    }
  
    return(
        <List>
            <ListItem role={undefined} dense divider >
              <TextField
                label="Uusi palvelu"
                margin="normal"
                variant="outlined"
                value={input}
                onChange={handleChange}
                />
                <ListItemSecondaryAction>
                    <Button variant="contained" onClick={handleAdd(input)}>Lisää</Button>
                </ListItemSecondaryAction>
            </ListItem>
            {props.state2.map((value, index) => (
                <ListItem key={index} role={undefined} dense divider >
                    <IconButton aria-label="Delete" onClick={handleDelete(index)}>
                        <DeleteIcon />
                    </IconButton>
                    <Checkbox
                        checked={check[index]}
                        disableRipple
                        onChange={handleCheck(index)}
                    />
                    <ListItemText primary={value.name} />
                    <ListItemSecondaryAction  >
                        <Button variant="outlined" color="primary" >
                            Täytä tiedot
                        </Button>
                    </ListItemSecondaryAction>
               </ListItem>
            ))}         
         </List>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminList2);

