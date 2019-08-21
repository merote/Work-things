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
import {usePopupState, bindTrigger, bindMenu} from 'material-ui-popup-state/hooks'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const AdminOrdersList = () => {

    const [input1, setInput1] = useState("");
    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

    const handleChange1 = (event) => {
        setInput1(event.target.value)
    }


    const handleAdd1 = (text) => () => {
       
    }


    return (
        <Grid container spacing={24} justify='center' >
            <Grid item xs={5}>
                <List >
                    <ListItem role={undefined} id={"search"} dense divider >
                        <TextField
                            label="Anna tilausnumero"
                            margin="normal"
                            variant="outlined"
                            value={input1}
                            onChange={handleChange1}
                        />
                        
                        <Button variant="contained" onClick={handleAdd1(input1)}>Hae</Button>
                        
                        <ListItemSecondaryAction>
                            <Button variant="contained" onClick={handleAdd1(input1)}>Hae</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem key={"labels"} dense divider>
                        <ListItemText
                            primary="Tilausnumero"
                        />
                        <ListItemText
                            primary="Päivämäärä"
                        />
                        <ListItemText
                            primary="Tila"
                        />
                        <Button variant = "text" {...bindTrigger(popupState)}>
                        <ListItemText
                            
                            primary="JÄRJESTYS:"
                            secondary="tilausnumero"
                        />
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>Tilausnumero</MenuItem>
                            <MenuItem onClick={popupState.close}>Päivämäärä</MenuItem>
                            <MenuItem onClick={popupState.close}>Tila</MenuItem>
                        </Menu>

                    </ListItem >
                </List>
            </Grid>
        </Grid>
    );    
}



export default AdminOrdersList;