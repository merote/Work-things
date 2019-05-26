import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux'
import { checkList1, checkList2 } from './actionCreators'
import Grid from '@material-ui/core/Grid';
import DialogCustomer  from './dialogCustomer.js'
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


/*const MainService = ["Mini", "Keski", "Laaja", "Räätälöity"]
const Service = ["siivous", "tiskaus", "imurointi", "syöttäminen", "strippaaminen"]
const Service_lists = [[0,0,1,0,0],[1,0,1,0,1],[1,1,1,1,1]]
const checked2_init = [0,0,0,0,0]
const mixed_index = MainService.length-1
*/

const mapStateToProps = (state) => ({
  list1: state.adminReducer,
  list2: state.adminReducer2,
  customer: state.customerReducer
});

const mapDispatchToProps = {
  checkList1,
  checkList2
}



const ShoppingList = (props) => {

  const [priceSum, setPriceSum] = useState(0)

  const handlePrice = (price) => () => {
    
  }

  const Service_data = (index) => {

  }

  return (
        <Grid container spacing={24} justify='center' >  

        <Grid item xs={3}>
        <List >
            <ListItem key={1} dense divider>
              <ListItemText primary={<b>OSTOKSET / TIEDOT</b>} />
              <ListItemSecondaryAction>
              <b>Hinta (€)</b>
            </ListItemSecondaryAction>  
            </ListItem>          
            <ListItem key={2} divider>
              <ListItemText 
              primary = {"Palvelutaso: "} 
              secondary = {props.list1[props.customer.list1].name} 
              />
            </ListItem >   
            {props.customer.list2.map((a,i) => (
                  props.customer.data[a].map((b,j) => (                   
                    j === 0
                      ? <>
                        <ListItem key={(i+1)*100+j} divider>
                          <ListItemText
                            primary={"Palvelu: "}
                            secondary={props.list2[a].name}
                          />
                        </ListItem>
                        <ListItem  key={(i+1)*100+j+1}>
                          <ListItemText
                            primary={b.question}
                            secondary={b.answer}
                          />
                          <ListItemSecondaryAction>
                            {props.list2[a].data[j].type === "checkbox" 
                             ? b.price : ""}
                          </ListItemSecondaryAction>
                        </ListItem>
                        </>
                      : <ListItem key={(i+1)*100+j+1} >
                          <ListItemText
                           primary={b.question}
                           secondary={b.answer}
                          />
                          <ListItemSecondaryAction>
                            {props.list2[a].data[j].type === "checkbox" 
                             ? b.price : ""}
                          </ListItemSecondaryAction>
                        </ListItem> 
                  ))
              ))}
              <ListItem key={1000}>
              <ListItemText 
              primary = {<b>Kokonaishinta: </b>} 
              />
            <ListItemSecondaryAction>
              <b>miljoona €</b>
            </ListItemSecondaryAction>
            </ListItem>   
           </List>
          </Grid>
      </Grid>
      );  
  
/*                       <ListItem key={2} >
                       <ListItemText
                         primary={b.question}
                         secondary={b.answer}
                       />
                    </ListItem>  */

    

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShoppingList);
  