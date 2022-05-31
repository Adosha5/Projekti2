import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'block',
        margin: 'auto',
      }    
}));

const Home = () => {

    const classes = useStyles();

    return (
        <div>

        <img src={require('../../images/mokkikuva_1.png')} height={1000} className={classes.center} />

        </div>
    );
}

export default Home;