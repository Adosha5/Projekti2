import {
    Paper,
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    TableContainer,
    Table, TableHead, TableRow, TableCell, TableBody, IconButton
} from '@material-ui/core';
import { Add } from '@material-ui/icons'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles';
import * as api from '../../api';
import React, { useEffect, useState } from "react";
import { Context } from "../../context/dataContext";
import { useContext } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DialogLomake from '../dialog';


const Reservation = () => {

    const [alueet, setAlueet] = useState([]);
    const [mokit, setMokit] = useState([]);
    const [mokinId, setMokinId] = useState({})
    const [alueId, setAlueId] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState()
    const [selectedEndDate, setSelectedEndDate] = useState()
    const [startDate, setStartDate] = useState()
    const [EndDate, setEndDate] = useState()

    const [openDialog, setOpenDialog] = useState(false);
    const [varausDialog, setVarausDialog] = useState(false);

    const d = useContext(Context);

    useEffect(() => {

        async function PaivitaPvm() {
            let isoDateAlku = isoDateWithoutTimeZone(new Date());

            isoDateAlku = isoDateAlku + 'T00:00:00.000Z';

            let isoDateLoppu = isoDateWithoutTimeZone(new Date());
            isoDateLoppu = isoDateLoppu + 'T23:59:59.000Z';

            setStartDate(isoDateAlku);
            setEndDate(isoDateLoppu);
        }

        PaivitaPvm();


    }, [])

    const handleStartDateChange = (date) => {

        let isoDate = isoDateWithoutTimeZone(date);
        isoDate = isoDate + 'T00:00:00.000Z';

        console.log("alkupvm ", isoDate)
        setSelectedStartDate(date)
        setStartDate(isoDate);
    }

    const handleEndDateChange = (date) => {
        let isoDate = isoDateWithoutTimeZone(date);
        isoDate = isoDate + 'T23:59:59.000Z';
        console.log("loppupvm ", isoDate)
        setSelectedEndDate(date)
        setEndDate(isoDate)
    }

    const handleEtsi = () => {

        const o = { alueid: alueId, alkupvm: startDate, loppupvm: EndDate }
        console.log(o)
        async function HaeVarauksenMokit() {
            let vastaus = await api.getVapaatMokit(o);
            console.log("vastaus", vastaus)

            setMokit(vastaus);
        }

        HaeVarauksenMokit();
    }

    const handleAlueChange = (id) => {
        setAlueId(id);
    }


    useEffect(() => {

        async function HaeAlueet() {
            let vastaus = await api.getAlueet();
            console.log("vastaus", vastaus)

            setAlueet(vastaus);
        }

        HaeAlueet();

        console.log("Alueet: ", alueet);

    }, [])

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

    const handleLisays = (e) => {

        console.log("mökin id: ", e.currentTarget.value);
        setMokinId(e.currentTarget.value);
        setOpenDialog(true);
        setVarausDialog(true);

    }


    return (

        <Grid container spacing={3} alignItems="stretch" justify="space-between" style={{ padding: "5vh" }} >
            <Grid item xs={12} sm={7}>
                <TableContainer component={Paper}>
                    <Box sx={{ fontSize: '5vh' }} textAlign='center'>Vapaat mökit</Box>
                    <Table sx={{ minWidth: 650, maxWidth: 700 }} style={{ padding: "5vh" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Alue</TableCell>
                                <TableCell>Mökin nimi</TableCell>
                                <TableCell>Katuosoite</TableCell>
                                <TableCell>Henkilömäärä</TableCell>
                                <TableCell>Hinta</TableCell>
                                <TableCell>Kuvaus</TableCell>
                                <TableCell>Varustelu</TableCell>
                                <TableCell>Varaa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableRows mokit={mokit} handleLisays={handleLisays} />

                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Paper>
                    <form style={{ padding: '1vh' }}>

                        <Typography variant="h6">Tee varaus</Typography>

                        <Autocomplete
                            disablePortal
                            options={alueet}
                            getOptionLabel={(option) => option.nimi.toString()}
                            //value={alue.alue_id}
                            onChange={(e, newValue) => { handleAlueChange(newValue.alue_id) }}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Alue" />}
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                style={{ padding: '1vh' }}
                                disableToolbar
                                variant='inline'
                                format='dd/MM/yyy'
                                margin='normal'
                                id='date-picker'
                                label='Saapuminen'
                                value={selectedStartDate}
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
                                label='Lähtö'
                                value={selectedEndDate}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{ 'arial-label': 'change date' }}
                            />
                        </MuiPickersUtilsProvider>
                    </form>


                    <Grid container xs={12}>
                        <Grid style={{ padding: '1vh' }} item xs={6}><Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleEtsi}>Etsi</Button></Grid>
                    </Grid>
                </Paper>
            </Grid>

            <DialogLomake
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                varausDialog={varausDialog}
                setVarausDialog={setVarausDialog}
                mokinId={mokinId}
                startDate={startDate}
                EndDate={EndDate}
            />

        </Grid>
    )

}

const TableRows = (props) => {

    const x = props.mokit;
    console.log("Mapattavat mökit: ", x)

    if (x != null) {

        const data = x.map((n, index) => {


            return <TableRow key={index}>
                <TableCell>{n.nimi}</TableCell>
                <TableCell>{n.mokkinimi}</TableCell>
                <TableCell>{n.katuosoite}</TableCell>
                <TableCell>{n.henkilomaara}</TableCell>
                <TableCell>{n.hinta}</TableCell>
                <TableCell>{n.kuvaus}</TableCell>
                <TableCell>{n.varustelu}</TableCell>
                <TableCell><IconButton value={n.mokki_id} onClick={props.handleLisays}><Add /></IconButton></TableCell>
            </TableRow>
        });

        return <TableBody>{data}</TableBody>
    }
    else {

        return <TableBody></TableBody>
    }

}

export default Reservation;