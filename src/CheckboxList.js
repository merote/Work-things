import React from 'react';
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
import store from './index.css';
import { Column, Row } from 'simple-flexbox';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
//import Popup from "reactjs-popup";
import axios from 'axios'
import { resolveCname } from 'dns';
import { connect } from 'react-redux'
import {editChecked1, editChecked2 } from './actionCreators'
import { throws } from 'assert';
import Popup from 'reactjs-popup'
import Grid from '@material-ui/core/Grid';
import ListDialog from './ListDialog.js'


/*const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});*/

//["Mini", "Keski", "Laaja", "Räätälöity"]


const MainService = ["Mini", "Keski", "Laaja", "Räätälöity"]
const Service = ["siivous", "tiskaus", "imurointi", "syöttäminen", "strippaaminen"]
const Service_lists = [[0,0,1,0,0],[1,0,1,0,1],[1,1,1,1,1]]
const checked2_init = [0,0,0,0,0]
//const mixed_index = MainService.length-1

const ServiceList = ({index, checked1, checked2}) => {
  if (checked1 !== -1) {
    return  (      
          <Checkbox 
              disabled = {checked1 !== 3}
              checked = {checked1 === 3 ? checked2[index] === 1 :
                        Service_lists[checked1][index] === 1}
              disableRipple
            />           
        ) 
        } else {
          return (
            <Checkbox 
              disabled = {true}
              checked = {false}
              disableRipple
            />           
          )
      }
    }

const mapStateToProps = (state) => ({
  checked1: state.checked1,
  checked2: state.checked2
});

const mapDispatchToProps = {
  editChecked1,
  editChecked2,
}



const CheckboxList = (props) => {


 
  //class CheckboxList extends React.Component {
  //constructor(props) {}

//class CheckboxList extends React.Component {
  /*constructor(props) {
    super(props)
 state = {
    MainService: [],
    checked: -1,
    checked2: [],
    //MainService: []
  };
}*/
    
/*togglePopup = index => () => {
  if  state.showPopup[index] === 0) {
    const newPop = state.showPopup
    newPop[index] = 1
   setState({
      showPopup: newPop
  });
  }
}*/  

/*componentDidMount() {
  const promise = axios.get('/api/palvelut')
  promise.then(response => {
  const palvelut = response.data
  const tiedot = []
  palvelut.map((a,i) => tiedot[i] = a.kuvaus)
 setState({MainService: tiedot})
  
  })
}*/


const handleToggle = index => () => { 
  if (index !== 3) {
     props.editChecked2(checked2_init)
    }
   props.editChecked1(index)
}

/*    setState({
      checked: index
    });
  };*/

const handleToggle2 = index => () => {
    if  (props.checked1 !== 3) {
     return  props.editChecked2(checked2_init)
    }
    const newChecked = [...props.checked2];
    if (newChecked[index] === 0) {
      newChecked[index] = 1
    } else {
      newChecked[index] = 0
    }
    return props.editChecked2(newChecked)  
/*    
    const currentIndex = newChecked.indexOf(value);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    return props.editChecked2(newChecked)  
*/
  }

//render() {
   

    return (

    <Grid container spacing={24}>  
      <Grid item xs={3}>
      <List >
        {MainService.map((value, index) => (
          <ListItem key={index} role={undefined} dense divider button onClick= {handleToggle(index)}>
            <Checkbox
              checked = {props.checked1 === index}
              disableRipple
            />
            <ListItemText primary={value} />
          </ListItem>          
        ))}
      </List>
      </Grid>
      <Grid item xs={3}>    
         <List >
          {Service.map((value, index) => (
           <ListItem key={index} role={undefined} dense divider button onClick= {handleToggle2(index)}>             

               <ServiceList index= {index} checked1={props.checked1} checked2={props.checked2}/>
          <ListItemText primary={value} />
            {props.checked2[index] === 1 ?
            <ListItemSecondaryAction>
                <ListDialog props = {props} index = {index}/>
            </ListItemSecondaryAction>:''}                      
            </ListItem>                                 
           ))}         
         </List>
         </Grid>        
    </Grid>
    );  
}


CheckboxList.propTypes = {
  //store: PropTypes.object.isRequired,
  //classes: PropTypes.object.isRequired
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxList);

//export default withStyles(styles)(CheckboxList);

/*              <IconButton aria-label="Comments" color = {props.checked1 !== 3 ? "default" : "secondary"}>                                      
                <CommentIcon />
              </IconButton>*/

/*                <Popup 
                  trigger={<IconButton aria-label="Comments" color={props.checked1 !== 3 ? "default" : "secondary"}>
                    <CommentIcon />
                  </IconButton>} open = {true} position = {'right center'}
                  modal
                  closeOnDocumentClick>
                  <span> Asiat </span>
                </Popup>*/              