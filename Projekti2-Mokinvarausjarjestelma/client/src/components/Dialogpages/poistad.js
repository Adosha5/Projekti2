import React, { useState, useContext } from 'react';
import * as api from '../../api';
import {
    Button,
    TextField,
    Grid, Box, Paper, Typography, makeStyles
} from '@material-ui/core';
import { StylesContext } from '@material-ui/styles';
import {Context} from '../../context/dataContext';


const useStyles = makeStyles((theme) => ({
    dialog: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
        },
        '& .MuiButton-root': {
            margin: theme.spacing(1)
        }
    }
}))

export default function PoistaD(props) {

    const styles = useStyles();
    const { openDialog,
        setOpenDialog, 
        poistaDialog, 
        setPoistaDialog, 
        mokkiId, 
        palvelu_id,
        alue_id,
        asiakas_id,
        varaus_id
         } = props;
    const d = useContext(Context);


    const handleDelete = () => {    
        
        if (mokkiId){
            api.deleteMokki(mokkiId);
        }

        if (palvelu_id){
            api.deletePalvelu(palvelu_id);
        }

        if (alue_id){
            api.deleteAlue(alue_id);
        }

        if (asiakas_id){
            api.deleteAsiakas(asiakas_id);
        }

        if (varaus_id) {
            console.log(varaus_id);
            api.deleteVaraus(varaus_id);
        }
    
               
        d.setCount(d.count + 1);
    }

    return (
        <Grid>
            <Paper style={{ padding: "5vh" }}>
                <Typography variant='h6'>Poista?</Typography>
                <Box className={styles.dialog}>
                    <Box
                        sx={
                            {
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                        <Button variant='contained' color='primary' onClick={() => { setOpenDialog(false); setPoistaDialog(false) }}>Peruuta</Button>
                        <Button variant='contained' color='primary' onClick={() => { handleDelete(); setOpenDialog(false); setPoistaDialog(false) }} >Poista</Button>
                    </Box>
                </Box>
            </Paper>
        </Grid>

    );
}