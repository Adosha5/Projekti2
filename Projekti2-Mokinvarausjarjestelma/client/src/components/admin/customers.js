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
import Autocomplete from '@material-ui/lab/Autocomplete'
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

const Customers = () => {

    const [asiakas, setAsiakas] = useState({ asiakas_id: '', postinro: '', etunimi: '', sukunimi: '', lahiosoite: '', toimipaikka: '', email: '', puhelinnro: '' });
    const [asiakkaat, setAsiakkaat] = useState([]);
    const [asiakas_id, setAsiakas_id] = useState([]);
    const [postinro, setPostinro] = useState('');
    const [etunimi, setEtunimi] = useState([]);
    const [sukunimi, setSukunimi] = useState([]);
    const [lahiosoite, setLahiosoite] = useState([]);
    const [email, setEmail] = useState([]);
    const [puhelinnro, setPuhelinnro] = useState([]);

    const [postinumerot, setPostinumerot] = useState([]);
    const [postinroHaku, setPostinroHaku] = useState('');
    const [nimet, setNimet] = useState([]);
    const [asiakasidHaku, setAsiakasidHaku] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const [poistaDialog, setPoistaDialog] = useState(false);
    const [muokkaus, setMuokkaus] = useState(false);

    const d = useContext(Context);
    const classes = useStyles();

    useEffect(() => {

        async function HaeAsiakkaat() {
            let vastaus = await api.getAsiakkaat();
            console.log("vastaus", vastaus)

            setAsiakkaat(vastaus);
        }

        HaeAsiakkaat();

        console.log("Asiakkaat: ", asiakkaat);

    }, [d.count])


    useEffect(() => {

        async function HaeNimet() {
            let vastaus = await api.getNimet();
            console.log("vastaus", vastaus)

            setNimet(vastaus);
        }

        HaeNimet();

        console.log("Nimet: ", nimet);

    }, [d.count])

    useEffect(() => {

        async function HaePostinumerot() {
            let vastaus = await api.getPostinumerot();
            console.log("vastaus", vastaus)

            setPostinumerot(vastaus);
        }

        HaePostinumerot();

        console.log("Postinumerot: ", postinumerot);

    }, [d.count])

    const PostinumeroValueSelected = (e) => {
        setPostinro(e.target.value);
        setAsiakas({...asiakas, postinro: e.target.value})
        console.log("postinro: ", e.target.value)
    }
    
    const PostinumeroHakuValueSelected = (e) => {

        console.log("postinumero: ", e.target.value)
        setPostinroHaku(e.target.value);

        async function HaeAsiakkaatPostinumerolla() {
            let vastaus = await api.getAsiakkaatPostinumerolla(e.target.value);
            console.log("vastaus", vastaus)

            setAsiakkaat(vastaus);
        }

        HaeAsiakkaatPostinumerolla();
        console.log("Asiakkaat: ", asiakkaat);
    }

    const asiakasHakuValueSelected = (e) => {

        console.log("asiakas_id: ", e.target.value)
        setAsiakasidHaku(e.target.value);

        async function HaeAsiakkaatNimella() {
            let vastaus = await api.getAsiakkaatNimella(e.target.value);
            console.log("vastaus", vastaus)

            setAsiakkaat(vastaus);
        }

        HaeAsiakkaatNimella();
        console.log("Asiakkaat: ", asiakkaat);
    }


    const handleLisays = () => {
        console.log(asiakas);
        api.addAsiakas(asiakas);

        setAsiakas_id('');
        setPostinro('');
        setEtunimi('');
        setSukunimi('');
        setLahiosoite('');
        setEmail('');
        setPuhelinnro('');

        d.setCount(d.count + 1);
    }

    const handleMuokkaus = (e) => {

        console.log("id?", e.currentTarget.value)

        const muokattavaAsiakas = asiakkaat.filter(o => o.asiakas_id == e.currentTarget.value)

        muokattavaAsiakas.map((n, index) => {
            setAsiakas_id(n.asiakas_id);
            setPostinro(n.postinro);
            setEtunimi(n.etunimi);
            setSukunimi(n.sukunimi);
            setLahiosoite(n.lahiosoite);
            setEmail(n.email);
            setPuhelinnro(n.puhelinnro);

            setAsiakas({ asiakas_id: n.asiakas_id, postinro: n.postinro, etunimi: n.etunimi, sukunimi: n.sukunimi, lahiosoite: n.lahiosoite, email: n.email, puhelinnro: n.puhelinnro })
        })

        setMuokkaus(true);
    }

    const handleTallenna = () => {

        console.log("muokattava asiakas", asiakas)
        api.updateAsiakas(asiakas);

        setMuokkaus(false);
        setAsiakas_id('');
        setPostinro('');
        setEtunimi('');
        setSukunimi('');
        setLahiosoite('');
        setEmail('');
        setPuhelinnro('');

        d.setCount(d.count + 1);
    }

    const handlePeruuta = () => {

        setMuokkaus(false);
        setAsiakas_id('');
        setPostinro('');
        setEtunimi('');
        setSukunimi('');
        setLahiosoite('');
        setEmail('');
        setPuhelinnro('');
    }


    return (<Grid container spacing={3} alignItems="stretch" justify="space-between" style={{ padding: "5vh" }} className={classes.tausta}>
        <Grid item xs={12} sm={7}>
            <TableContainer component={Paper} className={classes.PaperTausta}>
                <Box sx={{ fontSize: '5vh' }} textAlign='center'>Asiakkaat</Box>
                <Table sx={{ minWidth: 650, maxWidth: 700 }} style={{ padding: "5vh" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Sukunimi</TableCell>
                            <TableCell>Etunimi</TableCell>
                            <TableCell>Lähiosoite</TableCell>
                            <TableCell>Postinro</TableCell>
                            <TableCell>Toimipaikka</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Puhelinnumero</TableCell>
                            <TableCell>Poista</TableCell>
                            <TableCell>Muokkaa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableRows asiakkaat={asiakkaat} setOpenDialog={setOpenDialog} setPoistaDialog={setPoistaDialog} setAsiakas_id={setAsiakas_id} handleMuokkaus={handleMuokkaus} />
                </Table>
            </TableContainer>
        </Grid>

        <Grid xs={12} sm={5} padding={{ padding: "5vh" }}>
            <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
                <Paper style={{ padding: "5vh" }} className={classes.PaperTausta}>
                    <Typography variant="h6">Hae asiakkaat nimen mukaan</Typography>
                    <AsiakasHaku nimet={nimet} asiakas_id={asiakasidHaku} valueSelected={asiakasHakuValueSelected} />
                </Paper>
            </Grid>

            <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
                <Paper style={{ padding: "5vh" }} className={classes.PaperTausta}>
                    <Typography variant="h6">Hae asiakkaat postinumeron mukaan</Typography>
                    <PostinumeroHaku postinumerot={postinumerot} postinro={postinroHaku} valueSelected={PostinumeroHakuValueSelected} />
                </Paper>
            </Grid>

            <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
                <Paper style={{ padding: "5vh" }} className={classes.PaperTausta}>
                    <form style={{ padding: '1vh' }}>
                        {muokkaus ? <Typography variant="h6">Muokkaa asiakasta</Typography>
                            : <Typography variant="h6">Lisää asiakas</Typography>}
                        <TextField style={{ padding: '1vh' }} name="etunimi" variant="outlined" label="Etunimi" fullWidth value={etunimi} onChange={(e) => { setEtunimi(e.target.value); setAsiakas({ ...asiakas, etunimi: e.target.value }) }} />
                        <TextField style={{ padding: '1vh' }} name="sukunimi" variant="outlined" label="Sukunimi" fullWidth value={sukunimi} onChange={(e) => { setSukunimi(e.target.value); setAsiakas({ ...asiakas, sukunimi: e.target.value }) }} />
                        <TextField style={{ padding: '1vh' }} name="lahiosoite" variant="outlined" label="Lähiosoite" fullWidth value={lahiosoite} onChange={(e) => { setLahiosoite(e.target.value); setAsiakas({ ...asiakas, lahiosoite: e.target.value }) }} />
                        <Postinumero valueSelected={PostinumeroValueSelected} postinumerot={postinumerot} postinro={postinro}/>
                        <TextField style={{ padding: '1vh' }} name="email" variant="outlined" label="Email" fullWidth value={email} onChange={(e) => { setEmail(e.target.value); setAsiakas({ ...asiakas, email: e.target.value }) }} />
                        <TextField style={{ padding: '1vh' }} name="puhelinnro" variant="outlined" label="Puhelinnumero" fullWidth value={puhelinnro} onChange={(e) => { setPuhelinnro(e.target.value); setAsiakas({ ...asiakas, puhelinnro: e.target.value }) }} />
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
            asiakas_id={asiakas_id}
        />

    </Grid>
    );

}

const TableRows = (props) => {

    const { setOpenDialog, setPoistaDialog, setAsiakas_id } = props;

    const x = props.asiakkaat;
    console.log("Asiakkaat: ", x)

    const data = x.map((n, index) => {

        return <TableRow key={index}>
            <TableCell>{n.asiakas_id}</TableCell>
            <TableCell>{n.sukunimi}</TableCell>
            <TableCell>{n.etunimi}</TableCell>
            <TableCell>{n.lahiosoite}</TableCell>
            <TableCell>{n.postinro}</TableCell>
            <TableCell>{n.toimipaikka}</TableCell>
            <TableCell>{n.email}</TableCell>
            <TableCell>{n.puhelinnro}</TableCell>
            <TableCell><IconButton onClick={() => { setAsiakas_id(n.asiakas_id); setOpenDialog(true); setPoistaDialog(true) }} ><Delete /></IconButton></TableCell>
            <TableCell><IconButton value={n.asiakas_id} onClick={props.handleMuokkaus} ><Edit /></IconButton></TableCell>

        </TableRow>
    });

    return <TableBody>{data}</TableBody>
}

const AsiakasHaku = (props) => {
    const x = props.nimet;

    const items = x.map((n, index) => {
        return <MenuItem value={n.asiakas_id}>{n.sukunimi} {n.etunimi}</MenuItem>
    })

    return <FormControl style={{ padding: '1vh' }} variant="outlined" fullWidth><InputLabel id="asiakashaku">Nimi</InputLabel><Select labelId="asiakashaku" id="asiakashaku-select" value={props.asiakas_id} onChange={props.valueSelected} label='Asiakas' ><MenuItem value='0'>Kaikki</MenuItem>{items}</Select></FormControl>
}

const PostinumeroHaku = (props) => {
    const x = props.postinumerot;

    const items = x.map((n, index) => {
        return <MenuItem value={n.postinro}>{n.postinro} {n.toimipaikka}</MenuItem>
    })

    return <FormControl style={{ padding: '1vh' }} variant="outlined" fullWidth><InputLabel id="postinumerohaku">Postinumero</InputLabel><Select labelId="postinumerohaku" id="postinumerohaku-select" value={props.postinro} onChange={props.valueSelected} label='Postinumero' ><MenuItem value='0'>Kaikki</MenuItem>{items}</Select></FormControl>
}

const Postinumero = (props) => {
    const x = props.postinumerot;

    const items = x.map((n, index) => {
        return <MenuItem value={n.postinro}>{n.postinro} {n.toimipaikka}</MenuItem>
    })

    return <FormControl style={{padding: '1vh'}} variant="outlined" fullWidth><InputLabel id="postinumero">Postinumero ja toimipaikka</InputLabel><Select labelId="postinumero" id="postinumero-select" value={props.postinro} onChange={props.valueSelected} label='Postinumero' >{items}</Select></FormControl>
}

export default Customers;