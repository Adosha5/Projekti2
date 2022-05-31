import { Button, Grid, TextField, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import React, { useState, useContext } from 'react';

import { Context } from '../context/dataContext';

const useStyles = makeStyles({
    tausta: {
        backgroundColor: 'AliceBlue'
    },

    PaperTausta: {
        backgroundColor: 'Azure'
    },

    Buttoni: {
        margin: '0 auto',
        display: 'flex'
    }

})


const Login = () => {

    const d = useContext(Context);

    const classes = useStyles();

    const [kayttaja, setKayttaja] = useState('');
    const [salasana, setSalasana] = useState('');
    


    const handleKirjaudu = () => {

        if (kayttaja == 'admin' && salasana == 'admin') {
            d.setAdmin(true);
        }

    }

    const handleKirjauduUlos = () => {

        
            d.setAdmin(false);
        

    }
    return (

        <Grid container spacing={2} className={classes.tausta} direction="column" alignItems="center" justify="stretch-center" style={{ padding: "30vh" }}>
            <Paper className={classes.PaperTausta}>
                <Grid item xs={12} sm={12}>
                    <TextField id="outlined-basic" label="Tunnus" variant="outlined" value={kayttaja} onChange={(e) => setKayttaja(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField id="outlined-password-input" type='password' label="Salasana" variant="outlined" value={salasana} onChange={(e) => setSalasana(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    {d.admin ? 
                    <Button variant='contained' color='primary' type='submit' className={classes.Buttoni} onClick={() => handleKirjauduUlos()}>Kirjaudu ulos</Button>
                    :
                    <Button variant='contained' color='primary' type='submit' className={classes.Buttoni} onClick={() => handleKirjaudu()}>Kirjaudu</Button>
                    }               
                    </Grid>
            </Paper>
        </Grid>
    );
}

export default Login;