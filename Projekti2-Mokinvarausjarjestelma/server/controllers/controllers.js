const sql = require('../db/sql');
const { post } = require('../routes/routes');

module.exports = {

    fetchMokit: async (req, res) => {
        console.log("Aloitetaan fetchMokit");
        try {
            let x = [];
            x = await sql.getMokit();

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchMokit")
            res.status = 400;
            res.json({ status: "Error in fetchMokit", msg: err });
        }
    },

    fetchMokitAlueella: async (req, res) => {
        console.log("Aloitetaan fetchMokitAlueella");
        try {
            let x = [];

            let alueid = req.params.alueid;

            if(alueid != 0) x = await sql.getMokitAlueella(alueid);
            else x = await sql.getMokit(); 
                        

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchMokit")
            res.status = 400;
            res.json({ status: "Error in fetchMokit", msg: err });
        }
    },

    insertMokki: async (req, res) => {
        try {
            console.log("Aloitetaam insertMokki")
            console.log("req.body", req.body)
            let { alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu } = req.body;
            let resultMokki = await sql.insertMokki({ alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu })
            console.log("resultMokki", resultMokki)
            res.json(resultMokki)
            res.statusCode = 201;
        } catch (err) {
            console.log("Error in addMokki")
            res.status = 400;
            res.json({ status: "Error in addMokki", msg: err });
        }

    },

    updateMokki: async (req, res) => {
        try {
            console.log("Aloitetaam updateMokki")
            console.log("req.body", req.body)
            let { alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu, mokki_id } = req.body;
            let resultMokki = await sql.updateMokki({ alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu, mokki_id })
            console.log("resultMokki", resultMokki)
            res.json(resultMokki)
            res.statusCode = 201;
        } catch (err) {
            console.log("Error in updateMokki")
            res.status = 400;
            res.json({ status: "Error in updateMokki", msg: err });
        }

    },

    deleteMokki: async (req, res) => {
        try {
            console.log("Aloitetaan deleteMokki")
            
            let mokkiId = req.params.mokkiId || '';

            await sql.deleteMokki(mokkiId);
            res.statusCode = 204;
            res.json({ message: `Mökki id:llä ${mokkiId} poistettu` });

        } catch (err) {
            console.log("Error in deleteMokki")
            res.status = 400;
            res.json({ status: "Error in deleteMokki", msg: err });
        }

    },

    fetchPalvelut: async (req, res) => {
        console.log("Aloitetaan fetchPalvelut");
        try {
            let x = [];
            x = await sql.getPalvelut();

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchPalvelut")
            res.status = 400;
            res.json({ status: "Error in fetchPalvelut", msg: err });
        }
    },

    fetchPalvelutAlueella: async (req, res) => {
        console.log("Aloitetaan fetchPalvelutAlueella");
        try {
            let x = [];

            let alueid = req.params.alueid;

            if(alueid != 0) x = await sql.getPalvelutAlueella(alueid);
            else x = await sql.getPalvelut();                         

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchPalvelutAlueella")
            res.status = 400;
            res.json({ status: "Error in fetchPalvelutAlueella", msg: err });
        }
    },

    fetchPalvelutTyypinMukaan: async (req, res) => {
        console.log("Aloitetaan fetchPalvelutTyypinMukaan");
        try {
            let x = [];

            let tyyppiId = req.params.tyyppiId;

            if(tyyppiId != 0) x = await sql.getPalvelutTyypinMukaan(tyyppiId);
            else x = await sql.getPalvelut();                         

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchPalvelutTyypinMukaan")
            res.status = 400;
            res.json({ status: "Error in fetchPalvelutTyypinMukaan", msg: err });
        }
    },

    insertPalvelu: async (req, res) => {
        try {
            console.log("Aloitetaam insertPalvelu")
            console.log("req.body", req.body)
            let { alue_id, nimi, tyyppi, kuvaus, hinta, alv } = req.body;
            let resultPalvelu = await sql.insertPalvelu({ alue_id, nimi, tyyppi, kuvaus, hinta, alv })
            console.log("resultPalvelu", resultPalvelu)
            res.json(resultPalvelu)
            res.statusCode = 201;

        } catch (err) {
            console.log("Error in addPalvelu")
            res.status = 400;
            res.json({ status: "Error in addPalvelu", msg: err });
        }
    },

    deletePalvelu: async (req, res) => {
        try {
            console.log("Aloitetaan deletePalvelu")
            
            let palvelu_id = req.params.palveluid || '';

            await sql.deletePalvelu(palvelu_id);
            res.statusCode = 204;
            res.json({ message: `Palvelu id:llä ${palvelu_id} poistettu` });

        } catch (err) {
            console.log("Error in deletePalvelu")
            res.status = 400;
            res.json({ status: "Error in deletePalvelu", msg: err });
        }

    },

    updatePalvelu: async (req, res) => {
        try {
            console.log("Aloitetaam updatePalvelu")
            console.log("req.body", req.body)
            let { palvelu_id, alue_id, nimi, tyyppi, kuvaus, hinta, alv } = req.body;
            let resultPalvelu = await sql.updatePalvelu({ palvelu_id, alue_id, nimi, tyyppi, kuvaus, hinta, alv })
            console.log("resultPalvelu", resultPalvelu)
            res.json(resultPalvelu)
            res.statusCode = 201;
        } catch (err) {
            console.log("Error in updatePalvelu")
            res.status = 400;
            res.json({ status: "Error in updatePalvelu", msg: err });
        }

    },

    fetchAsiakkaat: async (req, res) => {
        console.log("Aloitetaan fetchAsiakkaat");
        try {
            let x = [];
            x = await sql.getAsiakkaat();

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetcAsiakkaat")
            res.status = 400;
            res.json({ status: "Error in fetchAsiakkat", msg: err });
        }
    },

    fetchAsiakkaatNimella: async (req, res) => {
        console.log("Aloitetaan fetchAsiakkaatNimella");
        try {
            let x = [];

            let asiakasid = req.params.asiakasid;

            if(asiakasid != 0) x = await sql.getAsiakkaatNimella(asiakasid);
            else x = await sql.getAsiakkaat();                         

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchAsiakkaatNimella")
            res.status = 400;
            res.json({ status: "Error in fetchAsiakkaatNimella", msg: err });
        }
    },

    fetchAsiakkaatPostinumerolla: async (req, res) => {
        console.log("Aloitetaan fetchAsiakkaatPostinumerolla");
        try {
            let x = [];

            let postinro = req.params.postinro;

            if(postinro != 0) x = await sql.getAsiakkaatPostinumerolla(postinro);
            else x = await sql.getAsiakkaat();                         

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchAsiakkaatPostinumerolla")
            res.status = 400;
            res.json({ status: "Error in fetchAsiakkaatPostinumerolla", msg: err });
        }
    },

    insertAsiakas: async (req, res) => {
        try {
            console.log("Aloitetaam insertAsiakas")
            console.log("req.body", req.body)
            let { sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro } = req.body;
            let resultAsiakas = await sql.insertAsiakas({sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro })
            console.log("resultAsiakas", resultAsiakas)
            res.json(resultAsiakas)
            res.statusCode = 201;

        } catch (err) {
            console.log("Error in addAsiakas")
            res.status = 400;
            res.json({ status: "Error in addAsiakas", msg: err });
        }
    },
    
    deleteAsiakas: async (req, res) => {
        try {
            console.log("Aloitetaan deleteAsiakas")
            
            let asiakas_id = req.params.asiakasid || '';

            await sql.deleteAsiakas(asiakas_id);
            res.statusCode = 204;
            res.json({ message: `Asiakas id:llä ${asiakas_id} poistettu` });

        } catch (err) {
            console.log("Error in deleteAsiakas")
            res.status = 400;
            res.json({ status: "Error in deleteAsiakas", msg: err });
        }

    },

    updateAsiakas: async (req, res) => {
        try {
            console.log("Aloitetaam updateAsiakas")
            console.log("req.body", req.body)
            let { asiakas_id, sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro } = req.body;
            let resultAsiakas = await sql.updateAsiakas({ asiakas_id, sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro })
            console.log("resultAsiakas", resultAsiakas)
            res.json(resultAsiakas)
            res.statusCode = 201;
        } catch (err) {
            console.log("Error in updateAsiakas")
            res.status = 400;
            res.json({ status: "Error in updateAsiakas", msg: err });
        }

    },

    fetchVaraukset: async (req, res) => {
        console.log("Aloitetaan fetchVaraukset");
        try {
            let x = [];
            x = await sql.getVaraukset();

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchVaraukset")
            res.status = 400;
            res.json({ status: "Error in fetchVaraukset", msg: err });
        }
    },

    deleteVaraus: async (req, res) => {
        try {
            console.log("Aloitetaan deleteVaraus")
            console.log("varausid: ", req.params.varausid)
            
            let varausid = req.params.varausid || '';

            await sql.deleteVarauksenPalvelut(varausid);

            await sql.deleteVaraus(varausid);
            res.statusCode = 204;
            res.json({ message: `Varaus id:llä ${varausid} poistettu` });

        } catch (err) {
            console.log("Error in deleteVaraus")
            res.status = 400;
            res.json({ status: "Error in deleteVaraus", msg: err });
        }
    },
    
    updateVaraus: async (req, res) => {
        try {
            console.log("Aloitetaam updateVaraus")
            console.log("req.body", req.body)
            let { varaus_id, sukunimi, etunimi, mokkinimi, alue, varauksen_apvm, varauksen_lpvm, lisapalvelu, palvelu_id, palvelulkm } = req.body;

            let epochtimeAlku = new Date(varauksen_apvm).valueOf()/1000;
            let epochtimeLoppu = new Date(varauksen_lpvm).valueOf()/1000;


            let resultVaraus = await sql.updateVaraus({ varaus_id, sukunimi, etunimi, mokkinimi, alue, epochtimeAlku, epochtimeLoppu, lisapalvelu, palvelu_id, palvelulkm })
            console.log("resultVaraus", resultVaraus)
            res.json(resultVaraus)
            res.statusCode = 201;
        } catch (err) {
            console.log("Error in updateVaraus")
            res.status = 400;
            res.json({ status: "Error in updateVaraus", msg: err });
        }

    },

    fetchAsiakkaanVaraus: async (req, res) => {
        console.log("Aloitetaan fetchAsiakkaanVaraus");

        try {
            let x = [];

            let varausid = req.params.varausid;

            x = await sql.getAsiakkaanVaraus(varausid);

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchVaraukset")
            res.status = 400;
            res.json({ status: "Error in fetchVaraukset", msg: err });
        }
    },

    fetchAlueet: async (req, res) => {
        console.log("Aloitetaan fetchAlueet");
        try {
            let x = [];
            x = await sql.getAlueet();

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchAlueet")
            res.status = 400;
            res.json({ status: "Error in fetchAlueet", msg: err });
        }
    },

    insertAlue: async (req, res) => {
        try {
            console.log("Aloitetaan insertAlue")
            console.log("req.body", req.body)
            let { alue_id, nimi } = req.body;
            let resultAlue = await sql.insertAlue({ alue_id, nimi })
            console.log("resultAlue", resultAlue)
            res.json(resultAlue)
            res.statusCode = 201;

        } catch (err) {
            console.log("Error in addAlue")
            res.status = 400;
            res.json({ status: "Error in addAlue", msg: err });
        }
    },

    deleteAlue: async (req, res) => {
        try {
            console.log("Aloitetaan deleteAlue")
            
            let alueId = req.params.alueid || '';            

            await sql.deleteAlue(alueId);
            res.statusCode = 204;
            res.json({ message: `Alue id:llä ${alueId}poistettu` });

        } catch (err) {
            console.log("Error in deleteAlue")
            res.status = 400;
            res.json({ status: "Error in deleteAlue", msg: err });
        }

    },

    updateAlue: async (req, res) => {
        try {
            console.log("Aloitetaam updateAlue")
            console.log("req.body", req.body)
            let { alue_id, nimi } = req.body;
            let resultAlue = await sql.updateAlue({ alue_id, nimi })
            console.log("resultPalvelu", resultAlue)
            res.json(resultAlue)
            res.statusCode = 201;
        } catch (err) {
            console.log("Error in updateAlue")
            res.status = 400;
            res.json({ status: "Error in updateAlue", msg: err });
        }

    },

    fetchPostinumerot: async (req, res) => {
        console.log("Aloitetaan fetchPostinumerot");
        try {
            let x = [];
            x = await sql.getPostinumerot();

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchPostinumerot")
            res.status = 400;
            res.json({ status: "Error in fetchPostinumerot", msg: err });
        }
    },

    fetchPalveluTyypit: async (req, res) => {
        console.log("Aloitetaan fetchPalveluTyypit");
        try {
            let x = [];
            x = await sql.getPalveluTyypit();

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchPalveluTyypit")
            res.status = 400;
            res.json({ status: "Error in fetchPalveluTyypit", msg: err });
        }
    },

    fetchNimet: async (req, res) => {
        console.log("Aloitetaan fetchNimet");
        try {
            let x = [];
            x = await sql.getNimet();

            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchNimet")
            res.status = 400;
            res.json({ status: "Error in fetchNimet", msg: err });
        }
    },

    fetchVapaatMokit: async (req, res) => {
        console.log("Aloitetaan fetchVapaatMokit");
        try {
            let x = [];

            let {alueid, alkupvm, loppupvm} = req.params;

            let epochtimeAlku = new Date(alkupvm).valueOf()/1000;
            let epochtimeLoppu = new Date(loppupvm).valueOf()/1000;
            
            console.log('alkuperäinen alkupvm ', alkupvm)
            console.log("alkuperäinen loppupvm", loppupvm)

            console.log("epochtimeAlku: ", epochtimeAlku)
            console.log("epochtimeLoppu: ", epochtimeLoppu)

            x = await sql.getVapaatMokit({alueid, epochtimeAlku, epochtimeLoppu});
             
            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchMokit")
            res.status = 400;
            res.json({ status: "Error in fetchMokit", msg: err });
        }
    },

    fetchVarauksetAjalla: async (req, res) => {
        console.log("Aloitetaan fetchVarauksetAjalla");
        try {
            let x = [];

            let {alueid, alkupvm, loppupvm} = req.params;

            let epochtimeAlku = new Date(alkupvm).valueOf()/1000;
            let epochtimeLoppu = new Date(loppupvm).valueOf()/1000;
            
            console.log("alkuperäinen alkupvm: ", alkupvm);
            console.log("alkuperäinen loppupvm: ", loppupvm);

            console.log("epochtimeAlku: ", epochtimeAlku);
            console.log("epochtimeLoppu: ", epochtimeLoppu);

            x = await sql.getVarauksetAjalla({alueid, epochtimeAlku, epochtimeLoppu});
             
            res.statusCode = 200;
            res.json(x);

        } catch (err) {
            console.log("Error in fetchVarauksetAjalla")
            res.status = 400;
            res.json({ status: "Error in fetchVarauksetAjalla", msg: err });
        }
    },

    insertVaraus: async (req, res) => {
        try {
            console.log("Aloitetaan insertVaraus")
            console.log("req.body", req.body)

            let { asiakasId, mokinId, startDate, EndDate, lisapalveluId, lisapalveluLkm } = req.body;

            let varattuPvm = new Date().valueOf()/1000;
            let vahvistusPvm = new Date().valueOf()/1000;
            startDate = new Date(startDate).valueOf()/1000;
            EndDate = new Date(EndDate).valueOf()/1000;

            console.log("pvm:t: ", varattuPvm, vahvistusPvm, startDate, EndDate);
            
            // lisätään varaus
            await sql.insertVaraus({ asiakasId, mokinId, varattuPvm, vahvistusPvm, startDate, EndDate });

            // haetaan varauksen id
            let x = await sql.getTehtyVaraus({ asiakasId, mokinId });
            console.log("Varaus: ", x);

            let varausId = x.map((n, index) => {
                return n.varaus_id
            })

            console.log("Varauksen id: ", varausId);

            // lisätään lisäpalvelu
            await sql.insertLisapalvelu({ varausId, lisapalveluId, lisapalveluLkm });

            res.json({ message: `Varaus lisätty asiakkaalle ${asiakasId}` });            
            res.statusCode = 201;

        } catch (err) {
            console.log("Error in addVaraus")
            res.status = 400;
            res.json({ status: "Error in addVaraus", msg: err });
        }
    },
}