var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/controllers');

router.route('/api/mokit').
    get(ctrl.fetchMokit);

router.route('/api/mokit/:alueid').
    get(ctrl.fetchMokitAlueella);

router.route('/api/mokit').
    post(ctrl.insertMokki);

router.route('/api/mokit/:mokkiId').
    delete(ctrl.deleteMokki);

router.route('/api/mokit').
    put(ctrl.updateMokki);

router.route('/api/palvelut').
    get(ctrl.fetchPalvelut);

router.route('/api/palvelut/:alueid').
    get(ctrl.fetchPalvelutAlueella);

router.route('/api/palveluttyypilla/:tyyppiId').
    get(ctrl.fetchPalvelutTyypinMukaan);

router.route('/api/palvelut').
    post(ctrl.insertPalvelu);

router.route('/api/palvelut/:palveluid').
    delete(ctrl.deletePalvelu);

router.route('/api/palvelut').
    put(ctrl.updatePalvelu);

router.route('/api/asiakkaat').
    get(ctrl.fetchAsiakkaat);

router.route('/api/asiakkaat/:asiakasid').
    get(ctrl.fetchAsiakkaatNimella);

router.route('/api/asiakkaatpostinumerolla/:postinro').
    get(ctrl.fetchAsiakkaatPostinumerolla);

router.route('/api/asiakkaanvaraus/:varausid').
    get(ctrl.fetchAsiakkaanVaraus);

router.route('/api/asiakkaat').
    post(ctrl.insertAsiakas);

router.route('/api/asiakkaat/:asiakasid').
    delete(ctrl.deleteAsiakas);

router.route('/api/asiakkaat').
    put(ctrl.updateAsiakas);

router.route('/api/varaukset/:varausid').
    delete(ctrl.deleteVaraus);

router.route('/api/varaukset').
    get(ctrl.fetchVaraukset);

router.route('/api/varaukset').
    put(ctrl.updateVaraus);

router.route('/api/alueet').
    get(ctrl.fetchAlueet);

router.route('/api/alueet').
    post(ctrl.insertAlue);

router.route('/api/alueet/:alueid').
    delete(ctrl.deleteAlue);

router.route('/api/alueet').
    put(ctrl.updateAlue)

router.route('/api/postinumerot').
    get(ctrl.fetchPostinumerot);

router.route('/api/palvelutyypit').
    get(ctrl.fetchPalveluTyypit);

router.route('/api/nimet').
    get(ctrl.fetchNimet);

router.route('/api/vapaatmokit/:alueid/:alkupvm/:loppupvm').
    get(ctrl.fetchVapaatMokit);

router.route('/api/varauksetajalla/:alueid/:alkupvm/:loppupvm').
    get(ctrl.fetchVarauksetAjalla);

router.route('/api/varaus').
    post(ctrl.insertVaraus);


module.exports = router;