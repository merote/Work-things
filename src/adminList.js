//Admin puolen editointi palvelutaso ja palvelu listoja varten. Lisäykset ja poistot

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import ListDialog from './ListDialog.js'
import {editList1,addList1,deleteList1,removeId,addList2,deleteList2} from './actionCreators'
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';




//Reduxin storen mappaukset propseihin
const mapStateToProps = (state) => ({
  state: state.adminReducer,
  state2: state.adminReducer2,
});
//Reduxin storen mappaukset propseihin 
const mapDispatchToProps = {
  editList1,
  addList1,
  deleteList1,
  removeId,
  addList2,
  deleteList2,
}

const AdminList = (props) => {
 
  //React hooksit 
  const [input1, setList1] = useState("");  //Palvelutason nimisyöte
  const [check1, setCheck1] = useState();   //palvelutason checkbox valinta
  const [input2, setList2] = useState(""); //Palvelun nimisyöte
  const [check2, setCheck2] = useState([]); //palvelujen checkbox valinnat


  const handleSavecombo = () => {
    const check2_id = []
    //check2.forEach((a,i) => a === 1 ? check2_id.push(i) : a)
    check2.forEach((a,i) => a === 1 
    ? check2_id.push(props.state2[i].id) : a)
    props.editList1(check1, check2_id )
  }
  
  //Kantaan tallennus palveluyhdistelmästä. Muokataan oikeanlainen JSON + axios
  const handleSaveChanges = () => () => {
    
    const uusiPalveluyhdistelma = {
      palvelut : [],
      palvelutasot: []
    }

    const palvelut = props.state2;
    palvelut.forEach(p => {
      const palvelu = {
        kuvaus: p.name,
        tiedot: p.data
      }

      uusiPalveluyhdistelma.palvelut.push(palvelu)
    })
  
    const palvelutasot = props.state;
    //const uusiYhdistelma = [];
    palvelutasot.forEach(p => {
      const palvelut = []
      p.list2_id.forEach(id => {
        const data = props.state2.filter(a => 
            a.id === id)
        palvelut.push(data[0].name)
        console.log(data)
      })

      const palvelutaso = {
        kuvaus: p.name,
        palvelut: palvelut  
      }

      uusiPalveluyhdistelma.palvelutasot.push(palvelutaso)
    })

    axios.post('api/uusiPalveluyhdistelma', uusiPalveluyhdistelma);
  }
  
  //Lisätään teksti reduxin storeen ja tyhjennetään vastaava hooks
  const handleAdd1 = (text) => () => {
    setList1("")
    props.addList1(text)
  }

  const handleChange1 = (event) => {
    setList1(event.target.value)
  }

  //Varmistetaan että palvelutaso/palvelu kombinaatiot säilyvät vaikka listoja editoitaisiin
  const handleCheck1 = (index) => () => {
    setCheck1(index)
    const check_temp = [...check2].splice(0, check2.length-1, 0) 
    //Update Hooks from Redux store
    props.state2.forEach((a, i) => {       
        props.state[index].list2_id.find(element => element === a.id) !== undefined
        ? check_temp[i] = 1 : check_temp[i] = 0
    })
    setCheck2(check_temp)
  }

  //Poistetaan palvelutaso listalta
  const handleDelete1 = (index) => () => {
    setCheck1()
    setCheck2([])
    const delete_id = props.state[index].id
    props.deleteList1(delete_id)
  }

/////////////////LIST 2

//Palveljen checkbox valinnat
const handleCheck2 = (index) => () => {
    const check_new = [...check2]
    check2[index] === 1 ? check_new[index] = 0: check_new[index] = 1
    setCheck2(check_new)
  }

  //Lisätään teksti reduxin storeen ja tyhjennetään vastaava hooks
  const handleAdd2 = (text) => () => {
    setList2("")
    props.addList2(text)
  }

  const handleChange2 = (event) => {
    setList2(event.target.value)
  }

  //Deletoidaan palvelu listasta. Päivitetään redux ja hooks
  const handleDelete2 = (index) => () => {
    const check2_new = [...check2]
    check2_new.splice(index,1)
    setCheck2(check2_new)
   
    const delete_id = props.state2[index].id
    props.removeId(props.state2[index].id)
    props.deleteList2(delete_id)    
  }



    return (
      <Grid container spacing={24}>
        <Grid container item xs={12} justify='center' >
          <Button variant="contained" size="large" onClick = {handleSavecombo}
          >Lisää uusi yhdistelmä</Button>
          <Button variant="contained" size="large" onClick = {handleSaveChanges()}
          >Tallenna muutokset kantaan</Button>
        </Grid>
        <Grid item xs={3}>
          <List >
            <ListItem role={undefined} dense divider >
              <TextField
                label="Uusi palvelutaso"
                margin="normal"
                variant="outlined"
                value={input1}
                onChange={handleChange1}
              />
              <ListItemSecondaryAction>
                <Button variant="contained" onClick={handleAdd1(input1)}>Lisää</Button>                 
              </ListItemSecondaryAction>
            </ListItem>
            {props.state.map((value, index) => (
              <ListItem key={index} role={undefined} dense divider >
                <IconButton aria-label="Delete" disabled = {index===0} onClick={handleDelete1(index)} >                  
                  <DeleteIcon />
                </IconButton>

                <Checkbox disabled = {index === 0}
                  checked={index === check1}
                  onChange={handleCheck1(index)}
                  disableRipple
                />
                <ListItemText primary={value.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={4}>

          
          <List>
            <ListItem role={undefined} dense divider >
              <TextField
                label="Uusi palvelu"
                margin="normal"
                variant="outlined"
                value={input2}
                onChange={handleChange2}
                />
                <ListItemSecondaryAction>
                    <Button variant="contained" onClick={handleAdd2(input2)}>Lisää</Button>
                </ListItemSecondaryAction>
            </ListItem>
            {props.state2.map((value, index) => (
                <ListItem key={index} role={undefined} dense divider >
                    <IconButton aria-label="Delete" onClick={handleDelete2(index)}>
                        <DeleteIcon />
                    </IconButton>
                    <Checkbox
                        checked={check2[index]===1}
                        disableRipple
                        onChange={handleCheck2(index) }
                    />
                    <ListItemText primary={value.name} />
                    <ListItemSecondaryAction  >
                       <ListDialog index = {index}></ListDialog>
                    </ListItemSecondaryAction>
               </ListItem>
            ))}         
         </List>
         
      </Grid>
    </Grid>
  );
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminList);
  