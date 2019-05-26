import React from 'react';
import image from './Etusivu.jpg'
import Grid from '@material-ui/core/Grid';


const FrontPage = () => {

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
                <img src={image} width="1800" height="800" alt="etusivu" />
            </Grid>
        </Grid>
        
        )

}

export default (FrontPage)