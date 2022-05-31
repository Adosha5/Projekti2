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
    FormControl, InputLabel,IconButton
} from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons'
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

const Cottage = () => {

const classes = useStyles();

    const [mokki, setMokki] = useState({ mokki_id: '', alueid: '', postinumero: '', mokkinimi: '', katuosoite: '', hinta: '', kuvaus: '', henkilomaara: '', varustelu: '' });
    const [mokkiId, setMokkiId] = useState('');
    const [alueid, setAlueid] = useState('');
    const [postinumero, setPostinumero] = useState('');
    const [mokkinimi, setMokkinimi] = useState('');
    const [katuosoite, setKatuosoite] = useState('');
    const [henkilomaara, setHenkilomaara] = useState('');
    const [hinta, setHinta] = useState('');
    const [kuvaus, setKuvaus] = useState('');
    const [varustelu, setVarustelu] = useState('');
    
    const [mokit, setMokit] = useState([]);
    const [AlueidHaku, setAlueidHaku] = useState('');
    const [alueet, setAlueet] = useState([]);
    const [postinumerot, setPostinumerot] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [varausDialog, setVarausDialog] = useState(false);
    const [varattavaMokki, setVarattavaMokki] = useState({});
    const [poistaDialog, setPoistaDialog] = useState(false);
    const [muokkaus, setMuokkaus] = useState(false);
    
    
    const d = useContext(Context);

    const handleLisays = () => {
        console.log(mokki);
        api.addMokki(mokki);
        setAlueid('');
    setPostinumero('');
    setMokkinimi('');
    setKatuosoite('');
    setHinta('');
    setKuvaus('');
    setHenkilomaara('');
    setVarustelu('');

        d.setCount(d.count + 1);

    }

    const onChange = (id) => {
        console.log("id", id)
        
        const x = mokit.filter(o => o.mokki_id == id)

        x.map((n, index) => {
            setVarattavaMokki({mokki_id: n.mokki_id, mokkinimi: n.mokkinimi})
        })

        
        
    }

    useEffect(() => {

        async function HaeMokit() {
            let vastaus = await api.getMokit();
            console.log("vastaus", vastaus)

            setMokit(vastaus);
        }

        HaeMokit();

        console.log("Mökit: ", mokit);

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

    const alueValueSelected = (e) => {
        setAlueid(e.target.value);
        setMokki({...mokki, alueid: e.target.value})
        console.log("alueid: ", e.target.value)
    }

    const alueHakuValueSelected = (e) => {
        console.log("alueid: ", e.target.value)
        setAlueidHaku(e.target.value);

    

        async function HaeMokitAlueella() {
            let vastaus = await api.getMokitAlueella(e.target.value);
            console.log("vastaus", vastaus)

            setMokit(vastaus);
        }

        HaeMokitAlueella();

        console.log("Mökit: ", mokit);
    
    
}
    
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
        setPostinumero(e.target.value);
        setMokki({...mokki, postinumero: e.target.value})
        console.log("postinumero: ", e.target.value)
    }

    const handleMuokkaus = (e) => {

        console.log("id?", e.currentTarget.value)

        const muokattavaMokki = mokit.filter(o => o.mokki_id == e.currentTarget.value)

        muokattavaMokki.map((n, index) => {
            setAlueid(n.alue_id);
            setPostinumero(n.postinro);
            setMokkinimi(n.mokkinimi);
            setKatuosoite(n.katuosoite);
            setHinta(n.hinta);
            setKuvaus(n.kuvaus);
            setHenkilomaara(n.henkilomaara);
            setVarustelu(n.varustelu);
            setMokki({ mokki_id: n.mokki_id, alueid: n.alue_id, postinumero: n.postinro, mokkinimi: n.mokkinimi, katuosoite: n.katuosoite, henkilomaara: n.henkilomaara, hinta: n.hinta, kuvaus: n.kuvaus, varustelu: n.varustelu })
        })

        setMuokkaus(true);
    }

const handleTallenna = () => {

    console.log("muokattava mökki", mokki)
    api.updateMokki(mokki);

    setMuokkaus(false);
    setAlueid('');
    setPostinumero('');
    setMokkinimi('');
    setKatuosoite('');
    setHinta('');
    setKuvaus('');
    setHenkilomaara('');
    setVarustelu('');

    d.setCount(d.count + 1);
}

const handlePeruuta = () => {

    setMuokkaus(false);
    setAlueid('');
    setPostinumero('');
    setMokkinimi('');
    setKatuosoite('');
    setHinta('');
    setKuvaus('');
    setHenkilomaara('');
    setVarustelu('');
}

    return (
    
    
    <Grid container spacing={3} alignItems="stretch" justify="space-between" style={{ padding: "5vh"}} className={classes.tausta}>
        <Grid item xs={12} sm={7} >
            <TableContainer component={Paper} className={classes.PaperTausta}>
                <Box sx={{ fontSize: '5vh' }} textAlign='center'>Mökit</Box>
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
                            <TableCell>Poista</TableCell>
                            <TableCell>Muokkaa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableRows mokit={mokit} onChange={onChange} setOpenDialog={setOpenDialog} setVarausDialog={setVarausDialog} setPoistaDialog={setPoistaDialog} setMokkiId={setMokkiId} handleMuokkaus={handleMuokkaus}/>

                </Table>
            </TableContainer>
        </Grid>

<Grid xs={12} sm={5} padding={{ padding: "5vh" }}>
        <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
            <Paper style={{ padding: "5vh" }} className={classes.PaperTausta}>
            <Typography  variant="h6">Hae mökit alueen mukaan</Typography>
            <AlueHaku alueet={alueet} alueid={AlueidHaku} valueSelected={alueHakuValueSelected}/>
            </Paper>
        </Grid>

        <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
            <Paper style={{ padding: "5vh" }} className={classes.PaperTausta} >
                <form style={{padding: '1vh'}}>
                    {muokkaus ? <Typography  variant="h6">Muokkaa mökkiä</Typography>
                    : <Typography variant="h6">Lisää mökki</Typography> }
                    <Alue valueSelected={alueValueSelected} alueet={alueet} alueid={alueid}/>
                    <Postinumero valueSelected={PostinumeroValueSelected} postinumerot={postinumerot} postinumero={postinumero}/>
                    <TextField style={{padding: '1vh'}} name="mokin nimi" variant="outlined" label="Mökin nimi" fullWidth value={mokkinimi} onChange={(e) => {setMokkinimi(e.target.value); setMokki({ ...mokki, mokkinimi: e.target.value })}} />
                    <TextField style={{padding: '1vh'}} name="katuosoite" variant="outlined" label="Katuosoite" fullWidth value={katuosoite} onChange={(e) => {setKatuosoite(e.target.value); setMokki({ ...mokki, katuosoite: e.target.value })}} />
                    <TextField style={{padding: '1vh'}} name="henkilomaara" variant="outlined" label="Henkilömäärä" fullWidth value={henkilomaara} onChange={(e) => {setHenkilomaara(e.target.value); setMokki({ ...mokki, henkilomaara: e.target.value })}} />
                    <TextField style={{padding: '1vh'}} name="hinta" variant="outlined" label="Hinta" fullWidth value={hinta} onChange={(e) => {setHinta(e.target.value); setMokki({ ...mokki, hinta: e.target.value })}} />
                    <TextField style={{padding: '1vh'}} name="kuvaus" variant="outlined" label="Kuvaus" fullWidth value={kuvaus} onChange={(e) => {setKuvaus(e.target.value); setMokki({ ...mokki, kuvaus: e.target.value })}} />
                    <TextField style={{padding: '1vh'}} name="varustelu" variant="outlined" label="Varustelu" fullWidth value={varustelu} onChange={(e) => {setVarustelu(e.target.value); setMokki({ ...mokki, varustelu: e.target.value })}} />
                    
                    
                </form>
                
                {muokkaus ?
                <Grid container xs={12}>
                    <Grid style={{padding: '1vh'}} item xs={6}><Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleTallenna}>Tallenna</Button></Grid>
                    <Grid style={{padding: '1vh'}} item xs={6}><Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handlePeruuta}>Peruuta</Button></Grid>
                    </Grid>
                    : <Grid xs={6}>< Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleLisays}>Lisää</Button></Grid>}
            </Paper>
        </Grid>

        </Grid>
        <DialogLomake
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            varattavaMokki={varattavaMokki}
            setVarausDialog={setVarausDialog}
            varausDialog={varausDialog}
            setPoistaDialog={setPoistaDialog}
            poistaDialog={poistaDialog}
            mokkiId={mokkiId}
        />

    </Grid>

    );

}

const TableRows = (props) => {

    const { onChange, setOpenDialog, setVarausDialog , setPoistaDialog, setMokkiId } = props;
    
    const x = props.mokit;
    console.log("Mökit: ", x)

    const data = x.map((n, index) => {

        return <TableRow key={index}>
            <TableCell>{n.nimi}</TableCell>
            <TableCell>{n.mokkinimi}</TableCell>
            <TableCell>{n.katuosoite}</TableCell>
            <TableCell>{n.henkilomaara}</TableCell>
            <TableCell>{n.hinta}</TableCell>
            <TableCell>{n.kuvaus}</TableCell>
            <TableCell>{n.varustelu}</TableCell>
            <TableCell><IconButton onClick={() => {setMokkiId(n.mokki_id); setOpenDialog(true); setPoistaDialog(true)}} ><Delete/></IconButton></TableCell>
            <TableCell><IconButton value={n.mokki_id} onClick={props.handleMuokkaus} ><Edit/></IconButton></TableCell>
        </TableRow>
    });

    return <TableBody>{data}</TableBody>

}

const AlueHaku = (props) => {
    const x = props.alueet;

    const items = x.map((n, index) => {
        return <MenuItem value={n.alue_id}>{n.nimi}</MenuItem>
    })

    return <FormControl style={{padding: '1vh'}} variant="outlined" fullWidth><InputLabel id="demo-simple-select-label">Alue</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={props.alueid} onChange={props.valueSelected} label='Alue' ><MenuItem value='0'>Kaikki</MenuItem>{items}</Select></FormControl>
}

const Alue = (props) => {
    const x = props.alueet;

    const items = x.map((n, index) => {
        return <MenuItem value={n.alue_id}>{n.nimi}</MenuItem>
    })

    return <FormControl style={{padding: '1vh'}} variant="outlined" fullWidth><InputLabel id="demo-simple-select-label">Alue</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={props.alueid} onChange={props.valueSelected} label='Alue' >{items}</Select></FormControl>
}

const Postinumero = (props) => {
    const x = props.postinumerot;

    const items = x.map((n, index) => {
        return <MenuItem value={n.postinro}>{n.toimipaikka}</MenuItem>
    })

    return <FormControl style={{padding: '1vh'}} variant="outlined" fullWidth><InputLabel id="demo-simple-select-label">Postinumero</InputLabel><Select labelId="demo-simple-select-label" id="demo-simple-select" value={props.postinumero} onChange={props.valueSelected} label='Postinumero' >{items}</Select></FormControl>
}


export default Cottage;