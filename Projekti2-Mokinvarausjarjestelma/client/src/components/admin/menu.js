import React, {useContext} from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
    Grid,
    useMediaQuery,
    useTheme,
    ListItem,
    List,
    Drawer
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Login from "../login";
import { Hidden } from "@material-ui/core";
import { IconButton, Box, Avatar } from "@material-ui/core";
import { useState } from "react";
import { Menu } from "@material-ui/icons";
import { MenuItem } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { Context } from "../../context/dataContext";


const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(5),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white"
        },
       
        drawer: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%',
            color: 'black'
        }
    },
}));

function Navbar() {

    const d = useContext(Context);

    const classes = useStyles();

    const [openHamb, setOpenHamb] = useState(false);

    const themebp = useTheme();

    const isMatch = useMediaQuery(themebp.breakpoints.down('md'));

    return (
        <Grid container>
            <AppBar direction="column" justify="stretch" position="sticky">
                <CssBaseline />
                <Toolbar>
                    <Typography variant="h5" className={classes.logo}>
                    <Link to='/' className={classes.link}>
                        Village People Oy
                        </Link>
                    </Typography>

                    {isMatch ? (
                        <>
                            <Drawer
                                anchor="right"
                                onClose={() => setOpenHamb(false)}
                                open={openHamb}
                            >
                                {d.admin ?
                                <List>
                                    
                                    <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                        <Link to="/locations">
                                            Toimipaikat
                                        </Link>
                                    </ListItem>
                                    <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                        <Link to="/cottages">
                                            Mökit
                                        </Link>
                                    </ListItem>
                                    <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                        <Link to="/activities">
                                            Lisäpalvelut
                                        </Link>
                                    </ListItem>
                                    <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                        <Link to="/customers">
                                            Asiakkaat
                                        </Link>
                                    </ListItem>
                                    <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                        <Link to="/reservations">
                                            Varaukset
                                        </Link>
                                    </ListItem>
                                    
                                    <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                        <Link to="/reservation">
                                            Tee varaus
                                        </Link>
                                    </ListItem>
                                    <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                        <Link to="/myreservation">
                                            Varaukseni
                                        </Link>
                                    </ListItem>
                                    <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                        <Link to="/login" element={<Login />}>
                                            Kirjaudu
                                        </Link>
                                    </ListItem>
                                    </List>
                                   : 
                                   <List>
                                   <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                   <Link to="/reservation">
                                       Tee varaus
                                   </Link>
                               </ListItem>
                               <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                   <Link to="/myreservation">
                                       Varaukseni
                                   </Link>
                               </ListItem>
                               <ListItem divider button onClick={() => setOpenHamb(!openHamb)}>
                                   <Link to="/login" element={<Login />}>
                                       Kirjaudu
                                   </Link>
                               </ListItem>
                               
                                </List>
                                }
                            </Drawer>
                            <IconButton onClick={() => setOpenHamb(!openHamb)}>
                                <Menu />
                            </IconButton>
                        </>)
                        : (<div className={classes.navlinks}>
                            {d.admin ? 
                                <div>
                            <Link to="/locations" className={classes.link}>
                                Toimipaikat
                            </Link>
                            <Link to="/cottages" className={classes.link}>
                                Mökit
                            </Link>
                            <Link to="/activities" className={classes.link}>
                                Lisäpalvelut
                            </Link>
                            <Link to="/customers" className={classes.link}>
                                Asiakkaat
                            </Link>
                            <Link to="/reservations" className={classes.link}>
                                Varaukset
                            </Link>
                            <Link to="/reservation" className={classes.link}>
                                Tee varaus
                            </Link>
                            <Link to="/myreservation" className={classes.link}>
                                Varaukseni
                            </Link>
                            <Link to="/login" className={classes.link} element={<Login />}>
                                Kirjaudu
                            </Link>
                            </div>
                            :
                            <div>
                            <Link to="/reservation" className={classes.link}>
                                Tee varaus
                            </Link>
                            <Link to="/myreservation" className={classes.link}>
                                Varaukseni
                            </Link>
                            <Link to="/login" className={classes.link} element={<Login />}>
                                Kirjaudu
                            </Link>
                            </div>
                            }
                        </div>)}
                </Toolbar>
            </AppBar>
        </Grid>

    );
}
export default Navbar;