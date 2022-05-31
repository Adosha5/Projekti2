import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Grid, Box, Paper, Typography, makeStyles
} from '@material-ui/core';
import { StylesContext } from '@material-ui/styles';
import api from '../../api';

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

export default function VarausD(props) {

    const styles = useStyles();
    const { openDialog, setOpenDialog, setVarausDialog, startDate, EndDate, mokinId } = props;
    const [asiakasId, setAsiakasId] = useState('');
    const [lisapalveluId, setLisapalveluId] = useState('');
    const [lisapalveluLkm, setLisapalveluLkm] = useState('');

    const handleVaraus = () => {

        let o = { asiakasId: asiakasId, mokinId: mokinId, startDate: startDate, EndDate: EndDate, lisapalveluId: lisapalveluId, lisapalveluLkm: lisapalveluLkm };
        api.addVaraus(o);
        console.log(o);
        setVarausDialog(false);
        setOpenDialog(false);
    }

    return (
        <Grid>
            <Paper style={{ padding: "5vh" }}>
                <Typography variant='h6'>Anna asiakkaan ja lisäpalvelun tiedot:</Typography>
                <Box className={styles.dialog}>
                    <Box sx={
                        {
                            display: 'flex',
                            justifyContent: 'flex-start',
                            m: 1,
                            p: 1
                        }}>
                        <TextField
                            required
                            id="standard-required"
                            label="Asiakas id"
                            value={asiakasId}
                            onChange={(e) => setAsiakasId(e.target.value)}
                            variant="standard"
                            sx={{ m: 1, width: '25ch' }}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Lisäpalvelu id"
                            value={lisapalveluId}
                            onChange={(e) => setLisapalveluId(e.target.value)}
                            variant="standard"
                            sx={{ m: 1, width: '25ch' }}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Lisäpalvelun lkm"
                            value={lisapalveluLkm}
                            onChange={(e) => setLisapalveluLkm(e.target.value)}
                            variant="standard"
                            sx={{ m: 1, width: '25ch' }}
                        />  

                        {/*  
                        <TextField
                            required
                            id="standard-required"
                            label="Sukunimi"
                            defaultValue="Sukunimi"
                            variant="standard"
                            sx={{ m: 1, width: '25ch' }}
                            /> */}
                    </Box>
                    {/* <Box sx={
                        {
                            display: 'flex',
                            justifyContent: 'flex-start',
                            m: 1,
                            p: 1
                        }}>
                        <TextField
                            required
                            id="standard-required"
                            label="Katuosoite"
                            defaultValue="Katuosoite"
                            variant="standard"
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Postinumero"
                            defaultValue="Postinumero"
                            variant="standard"
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Postitoimipaikka"
                            defaultValue="Postitoimipaikka"
                            variant="standard"
                        />
                    </Box>
                    <Box sx={
                        {
                            display: 'flex',
                            justifyContent: 'flex-start',
                            m: 1,
                            p: 1
                        }}>
                        <TextField
                            required
                            id='standard-required'
                            label='Puhelinnumero'
                            defaultValue="+358"
                            variant='standard'
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Sähköposti"
                            defaultValue="Sähköposti"
                            variant="standard"
                        />
                        <TextField
                            required
                            id="standard-number"
                            label="Mökille tulevien henkilöiden määrä"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                        />
                    </Box> */}
                    <Box
                        sx={
                            {
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                        <Button variant='contained' color='primary' onClick={() => { setOpenDialog(false); setVarausDialog(false) }}>Peruuta</Button>
                        <Button variant='contained' color='primary' onClick={handleVaraus} >Varaa</Button>
                    </Box>
                </Box>
            </Paper>
        </Grid>

    );
}