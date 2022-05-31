var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root',
    database: 'mokkivarausdb'
});

const executeSQL = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, function (error, results, fields) {
            console.log("query: ", query)
            error ? reject(error) : resolve(results);
            console.log("error:", error);
        });
    })
}

module.exports = {

    getMokit: () => {
        console.log("getMokit alkaa");
        let query = 'SELECT m.mokki_id, m.alue_id, a.nimi, m.postinro, p.toimipaikka, m.mokkinimi, m.katuosoite, m.hinta, m.kuvaus, m.henkilomaara, m.varustelu FROM mokki m, posti p, alue a WHERE m.postinro=p.postinro AND m.alue_id=a.alue_id'
        let vars = [];

        return executeSQL(query, vars)
    },

    getMokitAlueella: (alueid) => {
        console.log("getMokitAlueella alkaa", alueid);
        let query = `SELECT m.mokki_id, m.alue_id, a.nimi, m.postinro, p.toimipaikka, m.mokkinimi, m.katuosoite, m.hinta, m.kuvaus, m.henkilomaara, m.varustelu FROM mokki m, posti p, alue a WHERE m.postinro=p.postinro AND m.alue_id=a.alue_id AND m.alue_id=${alueid}`
        let vars = [];

        return executeSQL(query, vars)
    },

    insertMokki: ({ alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu }) => {

        console.log("insertMokki alkaa")
        console.log("data", alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu)
        let query = `INSERT INTO mokki (alue_id, postinro, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu) VALUES (?,?,?,?,?,?,?,?)`
        return executeSQL(query, [alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu])
    },

    updateMokki: ({ alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu, mokki_id }) => {

        console.log("updateMokki alkaa")
        console.log("data", alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu)
        let query = `UPDATE mokki SET alue_id=?, postinro=?, mokkinimi=?, katuosoite=?, henkilomaara=?, hinta=?, kuvaus=?, varustelu=? WHERE mokki_id=${mokki_id}`
        return executeSQL(query, [alueid, postinumero, mokkinimi, katuosoite, henkilomaara, hinta, kuvaus, varustelu, mokki_id])
    },

    deleteMokki: (mokkiId) => {
        console.log("deleteMokki alkaa");
        let query = 'DELETE FROM mokki WHERE mokki_id=?'
        return executeSQL(query, [mokkiId])
    },

    getPalvelut: () => {
        console.log("getPalvelut alkaa");
        let query = `SELECT p.palvelu_id, p.alue_id, a.nimi as alue, p.nimi, p.tyyppi, p.kuvaus, p.hinta, p.alv FROM palvelu p JOIN alue a ON p.alue_id=a.alue_id`;
        let vars = [];

        return executeSQL(query, vars)
    },

    getPalvelutAlueella: (alueid) => {
        console.log("getPalvelutAlueella alkaa", alueid);
        let query = `SELECT p.palvelu_id, a.nimi as alue, p.nimi, p.tyyppi, p.kuvaus, p.hinta, p.alv FROM palvelu p JOIN alue a ON p.alue_id=a.alue_id WHERE p.alue_id=${alueid}`
        let vars = [];

        return executeSQL(query, vars)
    },

    getPalvelutTyypinMukaan: (tyyppiId) => {
        console.log("getPalvelutTyypinMukaan alkaa", tyyppiId);
        let query = `SELECT p.palvelu_id, a.nimi as alue, p.nimi, p.tyyppi, p.kuvaus, p.hinta, p.alv FROM palvelu p JOIN alue a ON p.alue_id=a.alue_id WHERE p.tyyppi=${tyyppiId}`
        let vars = [];

        return executeSQL(query, vars)
    },

    insertPalvelu: ({ alue_id, nimi, tyyppi, kuvaus, hinta, alv }) => {

        console.log("insertPalvelu alkaa")
        console.log("data:", alue_id, nimi, tyyppi, kuvaus, hinta, alv)
        let query = `INSERT INTO palvelu (alue_id, nimi, tyyppi, kuvaus, hinta, alv) VALUES (?,?,?,?,?,?)`
        return executeSQL(query, [alue_id, nimi, tyyppi, kuvaus, hinta, alv])
    },

    deletePalvelu: (palveluid) => {
        console.log("deletePalvelu alkaa");
        let query = 'DELETE FROM palvelu WHERE palvelu_id=?'
        return executeSQL(query, [palveluid])
    },

    updatePalvelu: ({ palvelu_id, alue_id, nimi, tyyppi, kuvaus, hinta, alv }) => {

        console.log("updatePalvelu alkaa")
        console.log("data:", palvelu_id, alue_id, nimi, tyyppi, kuvaus, hinta, alv)
        let query = `UPDATE palvelu SET alue_id=?, nimi=?, tyyppi=?, kuvaus=?, hinta=?, alv=? WHERE palvelu_id=${palvelu_id}`
        return executeSQL(query, [alue_id, nimi, tyyppi, kuvaus, hinta, alv])
    },

    getAsiakkaat: () => {
        console.log("getAsiakkaat alkaa");
        let query = `SELECT a.asiakas_id, a.sukunimi, a.etunimi, a.lahiosoite, a.postinro, p.toimipaikka, a.email, a.puhelinnro FROM asiakas a JOIN posti p ON a.postinro=p.postinro ORDER BY a.sukunimi, a.etunimi`;
        let vars = [];

        return executeSQL(query, vars)
    },

    getAsiakkaatNimella: (asiakasid) => {
        console.log("getPalvelutAlueella alkaa", asiakasid);
        let query = `SELECT a.asiakas_id, a.sukunimi, a.etunimi, a.lahiosoite, a.postinro, p.toimipaikka, a.email, a.puhelinnro FROM asiakas a JOIN posti p ON a.postinro=p.postinro WHERE a.asiakas_id=${asiakasid}`
        let vars = [];

        return executeSQL(query, vars)
    },

    getAsiakkaatPostinumerolla: (postinro) => {
        console.log("getAsiakkaatPostinumerolla alkaa", postinro);
        let query = `SELECT a.asiakas_id, a.sukunimi, a.etunimi, a.lahiosoite, a.postinro, p.toimipaikka, a.email, a.puhelinnro FROM asiakas a JOIN posti p ON a.postinro=p.postinro WHERE a.postinro=${postinro}`
        let vars = [];

        return executeSQL(query, vars)
    },

    insertAsiakas: ({ sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro }) => {

        console.log("insertAsiakas alkaa")
        console.log("data:", sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro)
        let query = `INSERT INTO asiakas (sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro) VALUES (?,?,?,?,?,?)`
        return executeSQL(query, [sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro])
    },

    deleteAsiakas: (asiakasid) => {
        console.log("deleteAsiakas alkaa");
        let query = 'DELETE FROM asiakas WHERE asiakas_id=?'
        return executeSQL(query, [asiakasid])
    },

    updateAsiakas: ({ asiakas_id, sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro }) => {

        console.log("updateAsiakas alkaa")
        console.log("data:", asiakas_id, sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro)
        let query = `UPDATE asiakas SET sukunimi=?, etunimi=?, lahiosoite=?, postinro=?, email=?, puhelinnro=? WHERE asiakas_id=${asiakas_id}`
        return executeSQL(query, [sukunimi, etunimi, lahiosoite, postinro, email, puhelinnro])
    },

    getVaraukset: () => {
        console.log("getVaraukset alkaa");
        let query = "SELECT v.varaus_id, ak.sukunimi, ak.etunimi, v.mokki_mokki_id, m.mokkinimi, a.nimi as alue, v.varattu_alkupvm, v.varattu_loppupvm, p.palvelu_id, p.nimi as lisapalvelu, l.lkm, SUM((p.hinta*l.lkm)+m.hinta) as 'khinta' FROM varaus v" +
            " JOIN asiakas ak ON v.asiakas_id = ak.asiakas_id JOIN mokki m ON v.mokki_mokki_id = m.mokki_id" +
            " JOIN alue a ON m.alue_id = a.alue_id LEFT JOIN varauksen_palvelut l ON v.varaus_id = l.varaus_id" +
            " LEFT JOIN palvelu p ON l.palvelu_id = p.palvelu_id GROUP BY v.varaus_id";
        let vars = [];

        return executeSQL(query, vars)
    },

    deleteVaraus: (varaus_id) => {
        console.log("deleteVaraus alkaa..");
        let query = `DELETE FROM varaus where varaus_id=${varaus_id}`;
        let vars = [];
        return executeSQL(query, vars)
    },

    deleteVarauksenPalvelut: (varaus_id) => {
        console.log("deleteVarauksenPalvelut alkaa..");
        let query = `DELETE FROM varauksen_palvelut where varaus_id=${varaus_id}`
        let vars = [];
        return executeSQL(query, vars);
    },

    updateVaraus: ({ varaus_id, sukunimi, etunimi, mokkinimi, alue, epochtimeAlku, epochtimeLoppu, lisapalvelu, palvelu_id, palvelulkm }) => {

        console.log("updateVaraus alkaa")
        console.log("data", varaus_id, sukunimi, etunimi, mokkinimi, alue, epochtimeAlku, epochtimeLoppu, lisapalvelu, palvelu_id, palvelulkm)
        let query = `UPDATE varaus SET asiakas_id=?, mokki_mokki_id=?,  WHERE varaus_id=${varaus_id}`
        return executeSQL(query, [sukunimi, etunimi, mokkinimi, alue, epochtimeAlku, epochtimeLoppu, lisapalvelu, palvelu_id, palvelulkm])
    },

    getAsiakkaanVaraus: (varausid) => {
        console.log("getAsiakkaanVaraus alkaa");
        let query = "SELECT v.varaus_id, ak.sukunimi, ak.etunimi, m.mokkinimi, a.nimi as alue, v.varattu_alkupvm, v.varattu_loppupvm, p.palvelu_id, p.nimi as lisapalvelu, l.lkm FROM varaus v" +
            " JOIN asiakas ak ON v.asiakas_id = ak.asiakas_id JOIN mokki m ON v.mokki_mokki_id = m.mokki_id" +
            " JOIN alue a ON m.alue_id = a.alue_id LEFT JOIN varauksen_palvelut l ON v.varaus_id = l.varaus_id" +
            ` LEFT JOIN palvelu p ON l.palvelu_id = p.palvelu_id WHERE v.varaus_id=${varausid}`;
        let vars = [];

        return executeSQL(query, vars)
    },

    getAlueet: () => {
        console.log("getAlueet alkaa");
        let query = 'SELECT * FROM alue'
        let vars = [];

        return executeSQL(query, vars)
    },

    insertAlue: ({ alue_id, nimi }) => {

        console.log("insertAlue alkaa")
        console.log("data", alue_id, nimi)
        let query = `INSERT INTO alue (nimi) VALUES (?)`
        return executeSQL(query, [nimi])
    },

    deleteAlue: (alueId) => {
        console.log("deleteAlue alkaa");
        let query = 'DELETE FROM alue WHERE alue_id=?'
        return executeSQL(query, [alueId])
    },

    updateAlue: ({ alue_id, nimi }) => {

        console.log("updateAlue alkaa")
        console.log("data:", alue_id, nimi)
        let query = `UPDATE alue SET alue_id=?, nimi=? WHERE alue_id=${alue_id}`
        return executeSQL(query, [alue_id, nimi])
    },

    getPostinumerot: () => {
        console.log("getPostinumerot alkaa");
        let query = 'SELECT * FROM posti'
        let vars = [];

        return executeSQL(query, vars)
    },

    getPalveluTyypit: () => {
        console.log("getPalveluTyypit alkaa");
        let query = 'SELECT nimi, tyyppi FROM palvelu GROUP BY nimi;'
        let vars = [];

        return executeSQL(query, vars)
    },

    getNimet: () => {
        console.log("getNimet alkaa");
        let query = 'SELECT asiakas_id, etunimi, sukunimi FROM asiakas ORDER BY sukunimi, etunimi;'
        let vars = [];

        return executeSQL(query, vars)
    },

    getVapaatMokit: ({ alueid, epochtimeAlku, epochtimeLoppu }) => {
        console.log("getVapaatMokit alkaa", epochtimeAlku);
        let query = `select m.mokki_id, m.alue_id, a.nimi, m.postinro, p.toimipaikka, m.mokkinimi, m.katuosoite, m.hinta, m.kuvaus, m.henkilomaara, m.varustelu FROM mokki m, posti p, alue a where m.alue_id=a.alue_id and m.alue_id=${alueid} and not exists (select 1 from varaus where mokki_mokki_id = m.mokki_id and ((FROM_UNIXTIME(${epochtimeAlku}) BETWEEN varattu_alkupvm AND varattu_loppupvm) OR (FROM_UNIXTIME(${epochtimeLoppu}) BETWEEN varattu_alkupvm AND varattu_loppupvm))) group by m.mokki_id`
        let vars = [];

        return executeSQL(query, vars)
    },

    getVarauksetAjalla: ({ alueid, epochtimeAlku, epochtimeLoppu }) => {
        console.log("getVarauksetAjalla alkaa", epochtimeAlku);
        let query = `SELECT v.varaus_id, ak.sukunimi, ak.etunimi, m.mokkinimi, a.nimi as alue, v.varattu_alkupvm, v.varattu_loppupvm, p.palvelu_id, p.nimi as lisapalvelu, l.lkm, SUM((p.hinta*l.lkm)+m.hinta) as khinta FROM varaus v INNER JOIN asiakas ak ON v.asiakas_id = ak.asiakas_id INNER JOIN mokki m ON v.mokki_mokki_id = m.mokki_id INNER JOIN alue a ON m.alue_id = a.alue_id LEFT JOIN varauksen_palvelut l ON v.varaus_id = l.varaus_id LEFT JOIN palvelu p ON l.palvelu_id = p.palvelu_id WHERE m.alue_id=${alueid} AND ((v.varattu_alkupvm BETWEEN FROM_UNIXTIME(${epochtimeAlku}) AND FROM_UNIXTIME(${epochtimeLoppu})) OR (varattu_loppupvm BETWEEN FROM_UNIXTIME(${epochtimeAlku}) AND FROM_UNIXTIME(${epochtimeLoppu}))) GROUP BY v.varaus_id`;
        let vars = [];

        return executeSQL(query, vars)
    },

    insertVaraus: ({ asiakasId, mokinId, varattuPvm, vahvistusPvm, startDate, EndDate }) => {

        console.log("insertVaraus alkaa")
        console.log("data", asiakasId, mokinId, varattuPvm, vahvistusPvm, startDate, EndDate)
        let query = `INSERT INTO varaus (asiakas_id, mokki_mokki_id, varattu_pvm, vahvistus_pvm, varattu_alkupvm, varattu_loppupvm) VALUES (?, ?, FROM_UNIXTIME(?), FROM_UNIXTIME(?), FROM_UNIXTIME(?), FROM_UNIXTIME(?))`
        return executeSQL(query, [asiakasId, mokinId, varattuPvm, vahvistusPvm, startDate, EndDate])
    },

    insertLisapalvelu: ({ varausId, lisapalveluId, lisapalveluLkm }) => {

        console.log("insertLisapalvelu alkaa")
        console.log("data", varausId, lisapalveluId, lisapalveluLkm )
        let query = `INSERT INTO varauksen_palvelut (varaus_id, palvelu_id, lkm) VALUES (?, ?, ?)`
        return executeSQL(query, [varausId, lisapalveluId, lisapalveluLkm])
    },

    getTehtyVaraus: ({ asiakasId, mokinId }) => {
        console.log("getTehtyVaraus alkaa");
        let query = `SELECT varaus_id, asiakas_id, mokki_mokki_id FROM varaus WHERE asiakas_id=${asiakasId} AND mokki_mokki_id=${mokinId}`;
        let vars = [];

        return executeSQL(query, vars)
    },
}