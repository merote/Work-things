import React from 'react';
import image from './Borat.jpg'
import Grid from '@material-ui/core/Grid';


const Extra = () => {

    return (
        
        <Grid container 
            
            direction="column"           
            alignItems="center"
            //component = "body"
            spacing = {32}
            style={{
                position: 'absolute', 
                left: '50%', 
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}
            
        >
            <Grid item>
                <div>SPONSORED BY:</div>
            </Grid>
            <Grid item>
                <img src={image} width="350" height="350" alt="Borat" />
            </Grid>
        </Grid>
        
        )

}

export default (Extra)