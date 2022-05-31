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
import * as api from '../../api';
import React, { useEffect, useState } from "react";
import { Delete, Edit } from '@material-ui/icons';
import { Context } from "../../context/dataContext";
import { useContext } from 'react';
import DialogLomake from '../dialog';
import Autocomplete from '@material-ui/lab/Autocomplete'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';


const Reservations = () => {

    const [varaukset, setVaraukset] = useState([]);
    const d = useContext(Context);
    const [varaus_id, setVaraus_id] = useState('');
    const [varaus, setVaraus] = useState({ varaus_id: '', sukunimi: '', etunimi: '', mokkinimi: '', alue: '', varauksen_apvm: '', varauksen_lpvm: '', lisapalvelu: '', palvelu_id: '', palvelulkm: '' });
    const [sukunimi, setSukunimi] = useState('');
    const [etunimi, setEtunimi] = useState('');
    const [mokkinimi, setMokkinimi] = useState('');
    const [alue, setAlue] = useState('');
    const [varauksen_apvm, setVarauksen_apvm] = useState(Date());
    const [varauksen_lpvm, setVarauksen_lpvm] = useState(Date());
    const [lisapalvelu, setLisapalvelu] = useState('');
    const [lpalvelulkm, setLpalveluLkm] = useState('');
    const [hinta, setHinta] = useState('');
    const [palvelu_id, setPalvelu_id] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [poistaDialog, setPoistaDialog] = useState(false);
    const [muokkausDialog, setMuokkausDialog] = useState(false);

    const [alueet, setAlueet] = useState([]);
    const [alueId, setAlueId] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState()
    const [selectedEndDate, setSelectedEndDate] = useState()
    const [startDate, setStartDate] = useState()
    const [EndDate, setEndDate] = useState()

    useEffect(() => {

        async function HaeVaraukset() {
            let vastaus = await api.getVaraukset();
            console.log("vastaus", vastaus)

            setVaraukset(vastaus);
        }

        HaeVaraukset();

        console.log("Varaukset: ", varaukset);

    }, [d.count])

    useEffect(() => {

        async function HaeAlueet() {
            let vastaus = await api.getAlueet();
            console.log("vastaus", vastaus)

            setAlueet(vastaus);
        }

        HaeAlueet();

        console.log("Alueet: ", alueet);

    }, [d.count])

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

    const handleAlueChange = (id) => {

        setAlueId(id);
    }
   

    const handleStartDateChange = (date) => {

        let isoDate = isoDateWithoutTimeZone(date);
        isoDate = isoDate + 'T00:00:00.000Z';

        console.log("alkupvm ", isoDate);
        setSelectedStartDate(date);
        setStartDate(isoDate);
    }

    const handleEndDateChange = (date) => {
        let isoDate = isoDateWithoutTimeZone(date);
        isoDate = isoDate + 'T23:59:59.000Z';
        console.log("loppupvm ", isoDate);
        setSelectedEndDate(date);
        setEndDate(isoDate);
    }

    const handleHae = () => {

        const o = { alueid: alueId, alkupvm: startDate, loppupvm: EndDate }
        console.log(o);
        async function HaeVaraukset() {
            let vastaus = await api.getVarauksetAjalla(o);
            console.log("vastaus", vastaus);

            setVaraukset(vastaus);        
        }

        HaeVaraukset();
        
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


    const handleMuokkaus = (e) => {

        console.log("Varaus_id muokkausta varten:", e.currentTarget.value)

        const muokattavaVaraus = varaukset.filter(o => o.varaus_id == e.currentTarget.value)

        console.log("Muokattava varaus: ", muokattavaVaraus);


        muokattavaVaraus.map((n, index) => {
            setVaraus_id(n.varaus_id);
            setSukunimi(n.sukunimi);
            setEtunimi(n.etunimi);
            setMokkinimi(n.mokkinimi);
            setAlue(n.alue);
            setVarauksen_apvm(n.varattu_alkupvm);
            setVarauksen_lpvm(n.varattu_loppupvm);
            setLisapalvelu(n.lisapalvelu);
            setPalvelu_id(n.palvelu_id);
            setLpalveluLkm(n.lkm);
            setVaraus({
                varaus_id: n.varaus_id,
                sukunimi: n.sukunimi,
                etunimi: n.etunimi,
                mokkinimi: n.mokkinimi,
                alue: n.alue,
                varauksen_apvm: n.varattu_alkupvm,
                varauksen_lpvm: n.varattu_loppupvm,
                lisapalvelu: n.lisapalvelu,
                palvelu_id: n.palvelu_id,
                palvelulkm: n.lkm
            })
        })


        setMuokkausDialog(true);
        setOpenDialog(true);
        

        console.log("OPENDIALOG, MUOKKAUSDIALOG", openDialog, muokkausDialog);
        console.log("varaus lähtevä muokkausD:lle: ", varaus);

    }

    return (
        <Grid container spacing={2} direction="column" style={{ padding: "5vh" }} >

            <Grid item xs={12} sm={4}>
                <Paper>
                    <form style={{ padding: '1vh' }}>

                        <Typography variant="h6">Hae varauksia</Typography>

                        <Autocomplete
                            disablePortal
                            options={alueet}
                            getOptionLabel={(option) => option.nimi.toString()}
                            onChange={(e, newValue) => { handleAlueChange(newValue.alue_id) }}
                            sx={{ width: 200 }}
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
                                label='Alkupäivä'
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
                                label='Loppupäivä'
                                value={selectedEndDate}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{ 'arial-label': 'change date' }}
                            />
                        </MuiPickersUtilsProvider>
                    </form>

                    <Grid container xs={12}>
                        <Grid style={{ padding: '1vh' }} item xs={6}>
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleHae}>Hae</Button>
                        </Grid>
                    </Grid>

                </Paper>
            </Grid>

            <Grid item xs={12} sm={12}>
                <TableContainer component={Paper}>
                    <Typography variant='h4'>Varaukset</Typography>
                    <Table sx={{ minWidth: 650, maxWidth: 900 }} style={{ padding: "5vh" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Varaus ID</TableCell>
                                <TableCell>Sukunimi</TableCell>
                                <TableCell>Etunimi</TableCell>
                                <TableCell>Mökin nimi</TableCell>
                                <TableCell>Alue</TableCell>
                                <TableCell>Varauksen alkupvm</TableCell>
                                <TableCell>Varauksen loppupvm</TableCell>
                                <TableCell>Lisäpalvelun ID</TableCell>
                                <TableCell>Lisäpalvelu</TableCell>
                                <TableCell>Lisäpalveluiden lkm</TableCell>
                                <TableCell>Varauksen kokonaishinta</TableCell>
                                <TableCell>Poista</TableCell>
                                <TableCell>Muokkaa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableRows varaukset={varaukset} varaus_id={varaus_id} setVaraus_id={setVaraus_id} handleMuokkaus={handleMuokkaus} setOpenDialog={setOpenDialog} setPoistaDialog={setPoistaDialog} />
                    </Table>
                </TableContainer>
            </Grid>

            <DialogLomake
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                poistaDialog={poistaDialog}
                setPoistaDialog={setPoistaDialog}
                varaus_id={varaus_id}
                varaus={varaus}
                setMuokkausDialog={setMuokkausDialog}
                muokkausDialog={muokkausDialog}
                setVaraus={setVaraus}
            />

        </Grid>
    )
}


const TableRows = (props) => {

    const { varaus_id, setVaraus_id, setOpenDialog, setPoistaDialog } = props;

    const x = props.varaukset;
    console.log("Varaukset: ", x)

    const data = x.map((n, index) => {

        return <TableRow key={index}>
            <TableCell>{n.varaus_id}</TableCell>
            <TableCell>{n.sukunimi}</TableCell>
            <TableCell>{n.etunimi}</TableCell>
            <TableCell>{n.mokkinimi}</TableCell>
            <TableCell>{n.alue}</TableCell>
            <TableCell>{n.varattu_alkupvm}</TableCell>
            <TableCell>{n.varattu_loppupvm}</TableCell>
            <TableCell>{n.palvelu_id}</TableCell>
            <TableCell>{n.lisapalvelu}</TableCell>
            <TableCell>{n.lkm}</TableCell>
            <TableCell>{n.khinta} €</TableCell>
            <TableCell><IconButton onClick={() => { setVaraus_id(n.varaus_id); setOpenDialog(true); setPoistaDialog(true) }} ><Delete /></IconButton></TableCell>
            <TableCell><IconButton value={n.varaus_id} onClick={props.handleMuokkaus}><Edit /></IconButton></TableCell>
        </TableRow>
    });

    return <TableBody>{data}</TableBody>

}

export default Reservations;