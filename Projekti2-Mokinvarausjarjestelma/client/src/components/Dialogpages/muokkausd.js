import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Grid, Box, Paper, Typography, makeStyles
} from '@material-ui/core';
import { StylesContext } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Context } from "../../context/dataContext";
import { useContext } from 'react';
import * as api from '../../api';

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

export default function MuokkausD(props) {

const d = useContext(Context);

    const styles = useStyles();
    const { openDialog, setOpenDialog, varaus, setVaraus, setMuokkausDialog } = props;
    const [varaus_id, setVaraus_id] = useState('');    
    const [sukunimi, setSukunimi] = useState('');
    const [etunimi, setEtunimi] = useState('');
    const [mokkinimi, setMokkinimi] = useState('');
    const [alue, setAlue] = useState('');
    const [varauksen_apvm, setVarauksen_apvm] = useState('');
    const [varauksen_lpvm, setVarauksen_lpvm] = useState('');
    const [lisapalvelu, setLisapalvelu] = useState('');
    const [lpalvelulkm, setLpalveluLkm] = useState('');
    const [hinta, setHinta] = useState('');
    const [palvelu_id, setPalvelu_id] = useState('');

    const [selectedStartDate, setSelectedStartDate] = useState()
    const [selectedEndDate, setSelectedEndDate] = useState()


    

    useEffect(() => {

        console.log("MUOKKAUSD VARAUS: ", varaus);

        async function PaivitaPvm() {

            setVarauksen_apvm(new Date(varaus.varauksen_apvm))
            setVarauksen_lpvm(new Date(varaus.varauksen_lpvm))

            console.log("default date: ", new Date(varaus.varauksen_apvm))

        let alku = varaus.varauksen_apvm;
        console.log("alku: ", alku)
        alku = alku.substring(0,10).split('-')
        alku = alku[0] + '-' + alku[1] + '-' + alku[2]
        console.log("muokattu alku: ", alku)

        let loppu = varaus.varauksen_lpvm;
        console.log("loppu: ", loppu)
        loppu = loppu.substring(0,10).split('-')

        loppu = loppu[0] + '-' + loppu[1] + '-' + loppu[2]
        console.log("muokattu loppu: ", loppu)
        
        let isoDateAlku = alku + 'T00:00:00.000Z';
        console.log("muokattu aika", isoDateAlku)
        let isoDateLoppu = loppu + 'T23:59:59.000Z';

        console.log("MUokatut ajat: ", isoDateAlku + ", " + isoDateLoppu)

        setVaraus({ ...varaus, varauksen_apvm: isoDateAlku })
        setVaraus({ ...varaus, varauksen_lpvm: isoDateLoppu })
        
        }

        PaivitaPvm();

    }, [])

    const handleStartDateChange = (date) => {

        console.log("date: ", date)
        
        let isoDate = isoDateWithoutTimeZone(date);
        isoDate = isoDate + 'T00:00:00.000Z';

        console.log("alkupvm ", isoDate);
        setVarauksen_apvm(date);
        setVaraus({ ...varaus, varauksen_apvm: isoDate })
        // setSelectedStartDate(date);
        // setStartDate(isoDate);
    }

    const handleEndDateChange = (date) => {
        let isoDate = isoDateWithoutTimeZone(date);
        isoDate = isoDate + 'T23:59:59.000Z';
        console.log("loppupvm ", isoDate);
        setVarauksen_lpvm(date);
        setVaraus({ ...varaus, varauksen_lpvm: isoDate })
        // setSelectedEndDate(date);
        // setEndDate(isoDate);
    }

    const isoDateWithoutTimeZone = (d) => {

        console.log("d: ", d)

        let year = d.getFullYear().toString();
        let date = d.getDate().toString();
        let month = d.getMonth() + 1;
        month = month.toString();
        console.log("month: ", month)
        if (month.length == 1) month = '0' + month;
        if (date.length == 1) date = '0' + date;
        let dateString = year + '-' + month + '-' + date;

        console.log("isodate muokkaus: ", dateString);

        return dateString;
    }

    const handleTallenna = () => {

        api.updateVaraus(varaus);
        setOpenDialog(false)
        setMuokkausDialog(false)
        d.setCount(d.count + 1);
        console.log("MUOKATTU VARAUS: ", varaus);
    }


    return (
        <Grid>
            <Paper style={{ padding: "5vh" }}>
                <Typography variant='h6'>Varauksen muokkaus</Typography>
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
                            id="standard"
                            label="Sukunimi"                            
                            defaultValue={varaus.sukunimi}                        
                            variant="standard"
                            sx={{ m: 1, width: '25ch' }}
                            onChange={(e) => {setSukunimi(e.target.value); setVaraus({ ...varaus, sukunimi: e.target.value })}} 
                        />
                        <TextField
                            required
                            id="standard"
                            label="Etunimi"
                            defaultValue={varaus.etunimi}
                            variant="standard"
                            sx={{ m: 1, width: '25ch' }}
                            onChange={(e) => {setEtunimi(e.target.value); setVaraus({ ...varaus, etunimi: e.target.value })}}
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
                            id="standard"
                            label="Mökin nimi"
                            defaultValue={varaus.mokkinimi}
                            variant="standard"
                            onChange={(e) => {setMokkinimi(e.target.value); setVaraus({ ...varaus, mokkinimi: e.target.value })}}
                        />
                        <TextField
                            required
                            id="standard"
                            label="Alue"
                            defaultValue={varaus.alue}
                            variant="standard"
                            onChange={(e) => {setAlue(e.target.value); setVaraus({ ...varaus, alue: e.target.value })}}
                        />                      
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                style={{ padding: '1vh' }}
                                disableToolbar
                                variant='inline'
                                format='dd/MM/yyy'
                                margin='normal'
                                id='date-picker'
                                label='Varauksen alkupäivä'
                        
                                value={varauksen_apvm}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{ 'arial-label': 'change date' }}
                            />
                        </MuiPickersUtilsProvider>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                style={{ padding: '1vh' }}
                                disableToolbar
                                variant='inline'
                                format='dd/MM/yyy'
                                margin='normal'
                                id='date-picker'
                                label='Varauksen loppupäivä'
                                value={varauksen_lpvm}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{ 'arial-label': 'change date' }}
                            />
                        </MuiPickersUtilsProvider>
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
                            id='standard'
                            label='Lisäpalvelu'
                            defaultValue={varaus.lisapalvelu}
                            variant='standard'
                            onChange={(e) => {setLisapalvelu(e.target.value); setVaraus({ ...varaus, lisapalvelu: e.target.value })}}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Lisäpalveluiden lukumäärä"
                            defaultValue={varaus.palvelulkm}
                            variant="standard"
                            onChange={(e) => {setLpalveluLkm(e.target.value); setVaraus({ ...varaus, palvelulkm: e.target.value })}}
                        />                      
                    </Box>
                    <Box
                        sx={
                            {
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                        <Button variant='contained' color='primary' onClick={() => {setOpenDialog(false); setMuokkausDialog(false)}}>Peruuta</Button>
                        <Button variant='contained' color='primary' onClick={handleTallenna} >Tallenna</Button>
                    </Box>
                </Box>
            </Paper>
        </Grid>

    );
}