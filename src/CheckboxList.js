import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
import { connect } from 'react-redux'
import { checkList1, checkList2 } from './actionCreators'
import Grid from '@material-ui/core/Grid';
import DialogCustomer  from './dialogCustomer.js'
import { useState } from 'react';
import Button from '@material-ui/core/Button';


/*const MainService = ["Mini", "Keski", "Laaja", "Räätälöity"]
const Service = ["siivous", "tiskaus", "imurointi", "syöttäminen", "strippaaminen"]
const Service_lists = [[0,0,1,0,0],[1,0,1,0,1],[1,1,1,1,1]]
const checked2_init = [0,0,0,0,0]
const mixed_index = MainService.length-1
*/

const mapStateToProps = (state) => ({
  list1: state.adminReducer,
  list2: state.adminReducer2,
  customer_data: state.customerReducer
});

const mapDispatchToProps = {
  checkList1,
  checkList2
}


const CheckboxList = (props) => {

const check2_init = Array(props.list2.length).fill(0)
const [check1, setCheck1] = useState(); 
const [check2, setCheck2] = useState([]);   

const handleChecked1 = index => () => { 
  if (index === 0) {
    setCheck1(index)
    setCheck2(check2_init)
    }
   else {
    const check_temp = check2_init
    //Päivitetään reduxin storesta paikallinen reactin tila
    props.list2.forEach((a, i) => {       
        props.list1[index].list2_id.find(element => element === a.id) !== undefined
        ? check_temp[i] = 1 : check_temp[i] = 0
    })
    setCheck1(index)
    setCheck2(check_temp)
   }
}

const handleChecked2 = index => () => {
    const newChecked = [...check2];
    newChecked[index] === 1 ? newChecked[index] = 0 : newChecked[index] = 1
    setCheck2(newChecked)
}

const handleSave = () => {

  const check2_temp = check2.map((a,i) => a === 1 ? i : -1)
                              .filter(index => index !== -1 )                  
    props.checkList1(check1)
    props.checkList2(check2_temp)

}

const saveDatabase = () => {
  const order = {asiakas_id: 1, asiakkaan_nimi: "Asiakas1", tilatut_palvelut: []} 

  console.log(props.customer_data)
  

  console.log(props.list2[1].name,)
//Creating JSON
  const temp = props.customer_data.list2.map(a => (
       {palvelun_tyyppi: props.list2[a].name,
        tiedot: props.customer_data.data[a].map(b => (
                {kentta: b.question,
                 arvo: b.answer}))
        }))
  
  order.tilatut_palvelut = temp      
      
  console.log(order)

}

return (

    <Grid container spacing={24}>  
      <Grid container item xs={12} justify='center' >
          <Button variant="contained" size="large" onClick = {handleSave}
          >TALLENNA</Button>
          <Button variant="contained" size="large" onClick = {saveDatabase}
          >ETENE OSTOSLISTAAN</Button>
      </Grid>
      <Grid item xs={3}>
      <List >
        {props.list1.map((value, index) => (
          <ListItem key={index} role={undefined} dense divider>
            <Checkbox
              checked = {check1 === index}
              onChange = {handleChecked1(index)}
              disableRipple
            />
            <ListItemText primary={value.name} />
          </ListItem>          
        ))}
      </List>
      </Grid>
      <Grid item xs={3}>    
         <List >
          {props.list2.map((value, index) => (
           <ListItem key={index} role={undefined} dense divider>             
              <Checkbox
              disabled = {check1 !== 0 ? true : false}
              checked = {check2[index] === 1}
              disableRipple
              onChange = {handleChecked2(index)}
              />   
          <ListItemText primary={value.name} />
            
            <ListItemSecondaryAction>
              <DialogCustomer list_index = {index}></DialogCustomer >
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
)(CheckboxList);

