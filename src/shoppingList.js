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
import { number } from 'prop-types';


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


  
  const calculatePrice = (list) => {
    let price_all = 0

    console.log(list)

    list.forEach(b => 
    b.type === "checkbox"
      ? b.price.length !== 0
        ? price_all = price_all + b.price.reduce((a,x) => a + x)
        : null
      : b.input_type === "number"  
      ? price_all = price_all + (b.answer * b.price)
      : null  
      
       
    )
     return price_all
  }


  const List_print = () => {
    const list_both = []
      props.customer.list2.forEach((a,i) => {
      list_both.push({type: "service", name: props.list2[a].name})
      props.customer.data[a].map((b,j) => (
        props.list2[a].data[j].type === "checkbox"
          ? b.price[0] !== ""        
            ? list_both.push({type: "checkbox", question: b.question, answer: [...b.answer],
              price: [...b.price]}) 
            : list_both.push({type: "checkbox", question: b.question, answer: [...b.answer],
              price: ""})
            : props.list2[a].data[j].input_type !== "number"
                ? list_both.push({type: "text", question: b.question, answer: b.answer, input_type: "other"}) 
                : list_both.push({type: "text", input_type: "number", question: b.question, 
                                  answer: b.answer !== "" ? parseInt(b.answer) : 0,
                                  price: parseInt(props.list2[a].data[j].price)})
      ))
    })


 /*   let price_all = 0
    list_both.forEach(b => 
      b.price !== undefined
      ? b.type === "checkbox"
      ? price_all = price_all + b.price.reduce((a,x) => a + x)
      : b.input_type === "number"  
      ? price_all = price_all + (b.answer * b.price)
      : null  
      : null
    ) */  
  
  console.log(list_both)

  return list_both
  }

  const combined_list = List_print()
  const price_sum = calculatePrice(combined_list)

  console.log(List_print());

  return (
        <Grid container spacing={24} justify='center' >  

        <Grid item xs={3}>
        <List >
          <ListItem key={1} dense divider>
            <ListItemText primary={<h2>OSTOKSET / TIEDOT</h2>} />
            <ListItemSecondaryAction>
              <b>Hinta (€)</b>
            </ListItemSecondaryAction>
          </ListItem >
          {props.customer.list1 !== -1 ?
            <ListItem key={2} divider>
              <ListItemText
                primary={<b>Palvelutaso:</b>}
                secondary={props.list1[props.customer.list1].name}
              />
            </ListItem > : null}
          {combined_list.map((a, i) => (
            a.type === "service"
              ? <ListItem key={a.name} divider>
                <ListItemText
                  primary={<b>Palvelu:</b>}
                  secondary={a.name}
                />
              </ListItem>
              : a.type === "text"
                ?
                a.input_type !== "number" 
                ? <ListItem key={a.question}>
                  <ListItemText
                    primary={a.question}
                    secondary={a.answer}
                  />
                </ListItem>
                : <ListItem key={a.question}>
                <ListItemText
                  primary={a.question}
                  secondary={a.answer + "  "+"("+a.price + " €/kpl)"}
                />
                <ListItemSecondaryAction>
                    {parseInt(a.price) * parseInt(a.answer)}
                  </ListItemSecondaryAction>
                </ListItem>
                
                :
                <ListItem key={a.question}>
                  <ListItemText
                    primary={a.question}
                    secondary={a.answer.map((b,i) => a.answer.length > i+1 ? b+", " : b)}
                  />
                  <ListItemSecondaryAction>
                    {a.price.length !== 0 ? a.price.reduce((a,x) => a + x) : ""}
                  </ListItemSecondaryAction>
                </ListItem>
          ))}
          <ListItem key={3}>
            <ListItemText
              primary={<b>Kokonaishinta: </b>}
            />
            <ListItemSecondaryAction>
              <b>{price_sum} €</b>
            </ListItemSecondaryAction>
          </ListItem>   
           </List>
          </Grid>
      </Grid>
      );    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShoppingList);

/*            {props.customer.list2 !== [] ? props.customer.list2.map((a,i) => (
                  props.customer.data[a].map((b,j) => (                   
                    j === 0
                      ? <div>
                        
                        <ListItem key={props.list2[a].name} divider >
                            <ListItemText
                            primary={"Palvelu: "}
                            secondary={props.list2[a].name}
                          />
                        </ListItem>
                        
                        
                        <ListItem key={b.question}>
                          <ListItemText
                            primary={b.question}
                            secondary={b.answer}
                          />
                          <ListItemSecondaryAction>
                            {props.list2[a].data[j].type === "checkbox" 
                             ? b.price : null}
                          </ListItemSecondaryAction>
                        </ListItem>
                        </div>
                        
                      : <ListItem key={b.question} >
                          <ListItemText
                           primary={b.question}
                           secondary={b.answer}
                          />
                          <ListItemSecondaryAction>
                            {props.list2[a].data[j].type === "checkbox" 
                             ? b.price : null}
                          </ListItemSecondaryAction>
                        </ListItem>
                        
                  ))
              )) :  null}*/