import React, { useEffect, useState, useContext } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow,
    Paper, Box,
    Grid, Typography,
    TextField, Button, CircularProgress, MenuItem,
    Select,
    FormControl, InputLabel, IconButton
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons'
import { mergeClasses } from "@material-ui/styles";
import * as api from '../../api';
import DialogLomake from "../dialog";
import { Context } from "../../context/dataContext";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    tausta: {
        backgroundColor: 'AliceBlue'
    },

    PaperTausta: {
        backgroundColor: 'Azure'
    }
})

const Activities = () => {

    const [palvelu, setPalvelu] = useState({ palvelu_id: '', alue_id: '', nimi: '', tyyppi: '', kuvaus: '', hinta: '', alv: '' });
    const [palvelut, setPalvelut] = useState([]);
    const [palvelu_id, setPalvelu_id] = useState([]);
    const [alue_id, setAlue_id] = useState('');
    const [nimi, setNimi] = useState([]);
    const [tyyppi, setTyyppi] = useState([]);
    const [kuvaus, setKuvaus] = useState([]);
    const [hinta, setHinta] = useState([]);
    const [alv, setAlv] = useState([]);

    const [alueet, setAlueet] = useState([]);
    const [AlueidHaku, setAlueidHaku] = useState('');

    const [tyypit, setTyypit] = useState([]);
    const [tyyppi_id, setTyyppi_id] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const [poistaDialog, setPoistaDialog] = useState(false);
    const [muokkaus, setMuokkaus] = useState(false);

    const d = useContext(Context);
    const classes = useStyles();

    const handleLisays = () => {
        console.log(palvelu);
        api.addPalvelu(palvelu);

        setPalvelu_id('');
        setAlue_id('');
        setNimi('');
        setTyyppi('');
        setKuvaus('');
        setHinta('');
        setAlv('');

        d.setCount(d.count + 1);
    }

    useEffect(() => {

        async function HaePalvelut() {
            let vastaus = await api.getPalvelut();
            console.log("vastaus", vastaus)

            setPalvelut(vastaus);
        }

        HaePalvelut();

        console.log("Palvelut: ", palvelut);

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

        async function HaePalveluTyypit() {
            let vastaus = await api.getPalveluTyypit();
            console.log("vastaus", vastaus)

            setTyypit(vastaus);
        }

        HaePalveluTyypit();

        console.log("Palveluyypit: ", tyypit);

    }, [d.count])

    const alueValueSelected = (e) => {
        setAlue_id(e.target.value);
        setPalvelu({ ...palvelu, alue_id: e.target.value })
        console.log("alue_id: ", e.target.value)
    }

    const alueHakuValueSelected = (e) => {

        console.log("alue_id: ", e.target.value)
        setAlueidHaku(e.target.value);

        async function HaePalvelutAlueella() {
            let vastaus = await api.getPalvelutAlueella(e.target.value);
            console.log("vastaus", vastaus)

            setPalvelut(vastaus);
        }

        HaePalvelutAlueella();
        console.log("Palvelut: ", palvelut);
    }

    const tyyppiHakuValueSelected = (e) => {

        console.log("tyyppi_id: ", e.target.value)
        setTyyppi_id(e.target.value);

        async function HaePalvelutTyypinMukaan() {
            let vastaus = await api.getPalvelutTyypinMukaan(e.target.value);
            console.log("vastaus", vastaus)

            setPalvelut(vastaus);
        }

        HaePalvelutTyypinMukaan();
        console.log("Palvelut: ", palvelut);
    }

    const handleMuokkaus = (e) => {

        console.log("id?", e.currentTarget.value)

        const muokattavaPalvelu = palvelut.filter(o => o.palvelu_id == e.currentTarget.value)

        muokattavaPalvelu.map((n, index) => {
            setPalvelu_id(n.palvelu_id);
            setAlue_id(n.alue_id);
            setNimi(n.nimi);
            setTyyppi(n.tyyppi);
            setKuvaus(n.kuvaus);
            setHinta(n.hinta);
            setAlv(n.alv);

            setPalvelu({ palvelu_id: n.palvelu_id, alue_id: n.alue_id, nimi: n.nimi, tyyppi: n.tyyppi, kuvaus: n.kuvaus, hinta: n.hinta, alv: n.alv })
        })

        setMuokkaus(true);
    }

    const handleTallenna = () => {

        console.log("muokattava palvelu", palvelu)
        api.updatePalvelu(palvelu);

        setMuokkaus(false);
        setPalvelu_id('');
        setAlue_id('');
        setNimi('');
        setTyyppi('');
        setKuvaus('');
        setHinta('');
        setAlv('');

        d.setCount(d.count + 1);
    }

    const handlePeruuta = () => {

        setMuokkaus(false);
        setPalvelu_id('');
        setAlue_id('');
        setNimi('');
        setTyyppi('');
        setKuvaus('');
        setHinta('');
        setAlv('');
    }


    return (<Grid container spacing={3} alignItems="stretch" justify="space-between" style={{ padding: "5vh" }} className={classes.tausta}>
        <Grid item xs={12} sm={7}>
            <TableContainer component={Paper} className={classes.PaperTausta}>
                <Box sx={{ fontSize: '5vh' }} textAlign='center'>Lisäpalvelut</Box>
                <Table sx={{ minWidth: 650, maxWidth: 700 }} style={{ padding: "5vh" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Id</TableCell>
                            <TableCell>Alue</TableCell>
                            <TableCell>Nimi</TableCell>
                            <TableCell>Tyyppi</TableCell>
                            <TableCell>Kuvaus</TableCell>
                            <TableCell>Hinta</TableCell>
                            <TableCell>ALV</TableCell>
                            <TableCell>Poista</TableCell>
                            <TableCell>Muokkaa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableRows palvelut={palvelut} setOpenDialog={setOpenDialog} setPoistaDialog={setPoistaDialog} setPalvelu_id={setPalvelu_id} handleMuokkaus={handleMuokkaus} />
                </Table>
            </TableContainer>
        </Grid>

        <Grid xs={12} sm={5} padding={{ padding: "5vh" }}>
            <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
                <Paper style={{ padding: "5vh" }} className={classes.PaperTausta}>
                    <Typography variant="h6">Hae lisäpalvelut alueen mukaan</Typography>
                    <AlueHaku alueet={alueet} alue_id={AlueidHaku} valueSelected={alueHakuValueSelected} />
                </Paper>
            </Grid>

            <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
                <Paper style={{ padding: "5vh" }} className={classes.PaperTausta}>
                    <Typography variant="h6">Hae lisäpalvelut tyypin mukaan</Typography>
                    <PalveluTyyppiHaku tyypit={tyypit} tyyppi_id={tyyppi_id} valueSelected={tyyppiHakuValueSelected} />
                </Paper>
            </Grid>

            <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
                <Paper style={{ padding: "5vh" }} className={classes.PaperTausta}>
                    <form style={{ padding: '1vh' }}>
                        {muokkaus ? <Typography variant="h6">Muokkaa palvelua</Typography>
                            : <Typography variant="h6">Lisää palvelu</Typography>}
                        <Alue valueSelected={alueValueSelected} alueet={alueet} alue_id={alue_id} />
                        <TextField style={{ padding: '1vh' }} name="nimi" variant="outlined" label="Nimi" fullWidth value={nimi} onChange={(e) => { setNimi(e.target.value); setPalvelu({ ...palvelu, nimi: e.target.value }) }} />
                        <TextField style={{ padding: '1vh' }} name="tyyppi" variant="outlined" label="Tyyppi" fullWidth value={tyyppi} onChange={(e) => { setTyyppi(e.target.value); setPalvelu({ ...palvelu, tyyppi: e.target.value }) }} />
                        <TextField style={{ padding: '1vh' }} name="kuvaus" variant="outlined" label="Kuvaus" fullWidth value={kuvaus} onChange={(e) => { setKuvaus(e.target.value); setPalvelu({ ...palvelu, kuvaus: e.target.value }) }} />
                        <TextField style={{ padding: '1vh' }} name="hinta" variant="outlined" label="Hinta" fullWidth value={hinta} onChange={(e) => { setHinta(e.target.value); setPalvelu({ ...palvelu, hinta: e.target.value }) }} />
                        <TextField style={{ padding: '1vh' }} name="alv" variant="outlined" label="ALV" fullWidth value={alv} onChange={(e) => { setAlv(e.target.value); setPalvelu({ ...palvelu, alv: e.target.value }) }} />
                    </form>

                    {muokkaus ?
                        <Grid container xs={12}>
                            <Grid style={{ padding: '1vh' }} item xs={6}><Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleTallenna}>Tallenna</Button></Grid>
                            <Grid style={{ padding: '1vh' }} item xs={6}><Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handlePeruuta}>Peruuta</Button></Grid>
                        </Grid>
                        : <Grid xs={6}>< Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleLisays}>Lisää</Button></Grid>}


                </Paper>
            </Grid>
        </Grid>

        <DialogLomake
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            setPoistaDialog={setPoistaDialog}
            poistaDialog={poistaDialog}
            palvelu_id={palvelu_id}
        />

    </Grid>
    );

}

const TableRows = (props) => {

    const { onChange, setOpenDialog, setPoistaDialog, setPalvelu_id } = props;


    const x = props.palvelut;
    console.log("Palvelut: ", x)

    const data = x.map((n, index) => {

        return <TableRow key={index}>
            <TableCell>{n.palvelu_id}</TableCell>
            <TableCell>{n.alue}</TableCell>
            <TableCell>{n.nimi}</TableCell>
            <TableCell>{n.tyyppi}</TableCell>
            <TableCell>{n.kuvaus}</TableCell>
            <TableCell>{n.hinta}</TableCell>
            <TableCell>{n.alv}</TableCell>
            <TableCell><IconButton onClick={() => { setPalvelu_id(n.palvelu_id); setOpenDialog(true); setPoistaDialog(true) }} ><Delete /></IconButton></TableCell>
            <TableCell><IconButton value={n.palvelu_id} onClick={props.handleMuokkaus} ><Edit /></IconButton></TableCell>

        </TableRow>
    });

    return <TableBody>{data}</TableBody>
}

const AlueHaku = (props) => {
    const x = props.alueet;

    const items = x.map((n, index) => {
        return <MenuItem value={n.alue_id}>{n.nimi}</MenuItem>
    })

    return <FormControl style={{ padding: '1vh' }} variant="outlined" fullWidth><InputLabel id="aluehaku">Alue</InputLabel><Select labelId="aluehaku" id="aluehaku-select" value={props.alue_id} onChange={props.valueSelected} label='Alue' ><MenuItem value='0'>Kaikki</MenuItem>{items}</Select></FormControl>
}

const Alue = (props) => {
    const x = props.alueet;

    const items = x.map((n, index) => {
        return <MenuItem value={n.alue_id}>{n.nimi}</MenuItem>
    })

    return <FormControl variant="outlined" fullWidth><InputLabel id="alue">Alue</InputLabel><Select labelId="alue" id="alue-select" value={props.alue_id} onChange={props.valueSelected} label='Alue' >{items}</Select></FormControl>
}

const PalveluTyyppiHaku = (props) => {
    const x = props.tyypit;

    const items = x.map((n, index) => {
        return <MenuItem value={n.tyyppi}>{n.nimi}</MenuItem>
    })

    return <FormControl style={{ padding: '1vh' }} variant="outlined" fullWidth><InputLabel id="palvelutyyppihaku">Tyyppi</InputLabel><Select labelId="palvelutyyppihaku" id="palvelutyyppihaku-select" value={props.tyyppi_id} onChange={props.valueSelected} label='PalveluTyyppi' ><MenuItem value='0'>Kaikki</MenuItem>{items}</Select></FormControl>
}

export default Activities;