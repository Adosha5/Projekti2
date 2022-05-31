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
    },

    Buttoni: {
        margin: '5px'
    }

})

const CustomersReservation = () => {

    const classes = useStyles();
    const [varausid, setVarausid] = useState('');
    //const [asiakkaanvaraus, setAsiakkaanvaraus] = useState({ varaus_id: '', sukunimi: '', etunimi: '', mokkinimi: '', alue: '', varattu_alkupvm: '', varattu_loppupvm: '', palvelu_id: '', lisapalvelu: '', lkm: '' });
    const [asiakkaanvaraus, setAsiakkaanVaraus] = useState([]);
    const [haenappi, setHaeNappi] = useState(0);
    const [showTable, setShowTable] = useState(false);


    useEffect(() => {

        console.log("Haettavan varauksen id: ", varausid)

        async function HaeAsiakkaanVarausIdlla(){
           let vastaus = await api.getAsiakkaanVaraus(varausid);
           console.log("vastaus: ", vastaus);

           setAsiakkaanVaraus(vastaus);
        }

        HaeAsiakkaanVarausIdlla();

    }, [haenappi])


    return (

        <Grid container spacing={3} alignItems="stretch" justify="space-between" style={{ padding: "5vh" }} className={classes.tausta}>
            <Grid xs={12} sm={5} padding={{ padding: "5vh" }}>
                <Grid item xs={12} sm={12} padding={{ padding: "5vh" }}>
                    <Paper style={{ padding: "5vh" }} className={classes.PaperTausta}>
                        <Typography variant="h6">Anna varauksesi numero</Typography>
                        <TextField id="outlined-basic" variant="outlined" value={varausid} onChange={(e) => { setVarausid(e.target.value) }} />
                        <Button className={classes.Buttoni} variant="contained" color="primary" size="large" type="submit" onClick={() => {setHaeNappi(haenappi +1); setShowTable(true)}} >Hae</Button>
                    </Paper>
                </Grid>
            </Grid>

            {showTable && (asiakkaanvaraus.length != 0) ?
            
            <Grid item xs={12} sm={10}>
                <TableContainer component={Paper}>
                    <Typography variant='h4'>Varauksesi</Typography>
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
                                <TableCell>Lisäpalvelun id</TableCell>
                                <TableCell>Lisäpalvelu</TableCell>
                                <TableCell>Lisäpalveluiden lkm</TableCell>                                
                            </TableRow>
                        </TableHead>
                        <TableRows asiakkaanvaraus={asiakkaanvaraus} />
                    </Table>
                </TableContainer>
            </Grid> 
            : null }

            {showTable && (asiakkaanvaraus.length == 0) ?
            <Grid item xs={12} sm={10}>                
                <Typography variant="h3">Varausta ei löytynyt.</Typography>
                <Typography variant="h5">Tarkista varausid:si numero.</Typography>                
            </Grid> : null }        

        </Grid>
    )
}

const TableRows = (props) => {

    const x = props.asiakkaanvaraus;
    console.log("Asiakkaan varaus: ", x)

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
        </TableRow>
    });

    return <TableBody>{data}</TableBody>

}


export default CustomersReservation;












