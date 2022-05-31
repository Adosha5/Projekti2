import * as React from 'react';
import {
    Dialog,    
    DialogContent,
} from '@material-ui/core';
import VarausD from './Dialogpages/varausd';
import PoistaD from './Dialogpages/poistad';
import MuokkausD from './Dialogpages/muokkausd';
import { useEffect } from 'react';


export default function DialogLomake(props) {

    const { title,
        children,
        openDialog,
        setOpenDialog,
        varausDialog,
        setVarausDialog, 
        poistaDialog, 
        setPoistaDialog, 
        mokkiId,
        mokinId, 
        palvelu_id,
        alue_id, 
        asiakas_id,
        varaus_id,
        muokkausDialog,
        setMuokkausDialog,
        varaus,
        setVaraus,
        startDate,
        EndDate
        } = props;

         useEffect(() => {

            console.log("propsit: ", mokinId, startDate, EndDate)

    }, [])

    return (
        <Dialog open={openDialog} maxWidth='xl' fullWidth={true}>            
            <DialogContent>
                {varausDialog ?
                
                    <VarausD
                        setOpenDialog={setOpenDialog}
                        setVarausDialog={setVarausDialog}
                        mokinId={mokinId}
                        startDate={startDate}
                        EndDate={EndDate}
                        

                    />
                    : poistaDialog ?
                        <PoistaD
                            setOpenDialog={setOpenDialog}
                            setPoistaDialog={setPoistaDialog}
                            poistaDialog={poistaDialog}
                            mokkiId={mokkiId}
                            palvelu_id={palvelu_id}
                            alue_id={alue_id}
                            asiakas_id={asiakas_id}
                            varaus_id={varaus_id}
                        /> 
                        : muokkausDialog ?
                        <MuokkausD
                        setOpenDialog={setOpenDialog}
                        setMuokkausDialog={setMuokkausDialog}
                        varaus={varaus}
                        setVaraus={setVaraus}                       
                        
                        />
                        :  console.log("muokkausd", muokkausDialog)
                }

                    
            </DialogContent>
        </Dialog>
    );
}