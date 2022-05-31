import React, { useEffect, useState, useContext } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow,
    Paper, Box,
    Grid, Typography,
    IconButton,
    TextField,
    Button
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons'
import * as api from '../../api';
import { Context } from "../../context/dataContext";
import { makeStyles } from "@material-ui/styles";
import DialogLomake from "../dialog";

const useStyles = makeStyles({
    tausta: {
        backgroundColor: 'AliceBlue'
    },

    PaperTausta: {
        backgroundColor: 'Azure'
    }
});

const Locations = () => {

    const classes = useStyles();
    const [alue, setAlue] = useState({ alue_id: '', nimi: '' });
    const [alueet, setAlueet] = useState([]);
    const [nimi, setNimi] = useState('');
    const [alue_id, setAlue_id] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [poistaDialog, setPoistaDialog] = useState(false);
    const [muokkaus, setMuokkaus] = useState(false);
    const d = useContext(Context);

    const handleLisays = () => {
        console.log(alue);
        api.addAlue(alue);
        setNimi('');

        d.setCount(d.count + 1);

    }

    useEffect(() => {
        async function HaeAlueet() {
            let vastaus = await api.getAlueet();
            console.log("vastaus", vastaus)

            setAlueet(vastaus);
        }

        HaeAlueet();

        console.log("Alueet: ", alueet);

    }, [d.count])

    const handleMuokkaus = (e) => {

        console.log("Alue_id muokkausta varten:", e.currentTarget.value)

        const muokattavaAlue = alueet.filter(o => o.alue_id == e.currentTarget.value)

        muokattavaAlue.map((n, index) => {
            setAlue_id(n.alue_id);
            setNimi(n.nimi)         
            setAlue({ alue_id: n.alue_id, nimi: n.nimi })
        })

        setMuokkaus(true);        

    }

    const handleTallenna = () => {

        console.log("muokattava alue", alue)
        api.updateAlue(alue);
    
        setMuokkaus(false);
        setAlue_id('');
        setNimi('');    
    
        d.setCount(d.count + 1);
    }
    
    const handlePeruuta = () => {
    
        setMuokkaus(false);
        setAlue_id('');
        setNimi('');     
        
    }

    return (

        <Grid container spacing={3} alignItems="stretch" justify="space-between" style={{ padding: "5vh" }} className={classes.tausta}>

            <Grid item xs={12} sm={7} >
                <TableContainer component={Paper} className={classes.PaperTausta}>
                    <Box sx={{ fontSize: '5vh' }} textAlign='center'>Toimipaikat</Box>
                    <Table sx={{ minWidth: 650, maxWidth: 700 }} style={{ padding: "5vh" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Alue</TableCell>
                                <TableCell>Poista</TableCell>
                                <TableCell>Muokkaa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableRows alueet={alueet} alue_id={alue_id} setAlue_id={setAlue_id} setOpenDialog={setOpenDialog} setPoistaDialog={setPoistaDialog} handleMuokkaus={handleMuokkaus}/>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
                <Paper style={{ padding: "5vh" }} className={classes.PaperTausta} >
                    <form style={{ padding: '1vh' }}>
                        {muokkaus ? <Typography>Muokkaa toimipaikka</Typography>
                        : <Typography variant="h6">Lisää toimipaikka</Typography>}                        
                        <TextField style={{ padding: '1vh' }}
                            name="toimipaikan nimi"
                            variant="outlined"
                            label="Toimipaikan nimi"
                            fullWidth value={nimi}
                            onChange={(e) => { setNimi(e.target.value); setAlue({ ...alue, nimi: e.target.value }) }} />
                    </form>

                    {muokkaus ?
                    <Grid container xs={12}>
                    <Grid style={{padding: '1vh'}} item xs={6}><Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleTallenna}>Tallenna</Button></Grid>
                    <Grid style={{padding: '1vh'}} item xs={6}><Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handlePeruuta}>Peruuta</Button></Grid>
                    </Grid>
                    : <Grid xs={6}>< Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleLisays}>Lisää</Button></Grid>}
              

                </Paper>
            </Grid>
            <DialogLomake
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            poistaDialog={poistaDialog}
            setPoistaDialog={setPoistaDialog}
            alue_id={alue_id}

            />            

        </Grid>

    );
}

const TableRows = (props) => {

    const { alue_id, setAlue_id, setOpenDialog, setPoistaDialog, handleMuokkaus } = props;
    const x = props.alueet;
    console.log("Alueet: ", x);

    const data = x.map((n, index) => {

        return <TableRow key={index}>
            <TableCell>{n.nimi}</TableCell>
            <TableCell><IconButton onClick={() => { setAlue_id(n.alue_id); setOpenDialog(true); setPoistaDialog(true) }}><Delete /></IconButton></TableCell>
            <TableCell><IconButton value={n.alue_id} onClick={handleMuokkaus} ><Edit /></IconButton></TableCell>
        </TableRow>
    });

    return <TableBody>{data}</TableBody>

}

export default Locations;