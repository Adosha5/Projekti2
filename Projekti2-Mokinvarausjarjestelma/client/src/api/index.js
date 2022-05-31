module.exports = {

getMokit: async () => {
    console.log("Ollaan clientin fetchMokit");

    let url = 'http://localhost:3001/api/mokit';

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

getMokitAlueella: async (alueid) => {
    console.log("Ollaan clientin fetchMokitAlueella");

    let url = 'http://localhost:3001/api/mokit/' + alueid;

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

addMokki: async (mokki) => {

    console.log("Ollaan clientin addMokki", mokki);

    let url = 'http://localhost:3001/api/mokit';

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mokki)
    });
},

deleteMokki: async (id) => {
    console.log("ollaan clientin deleteMokki")

    let url = 'http://localhost:3001/api/mokit/' + id;

    await fetch(url, {
        method: "DELETE"
    });
},

updateMokki: async (mokki) => {
    console.log("ollaan clientin updateMokki");

    let url = 'http://localhost:3001/api/mokit'

    await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mokki)
    });
},

getPalvelut: async () => {
    console.log("Ollaan clientin fetchPalvelut");

    let url = 'http://localhost:3001/api/palvelut';

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

getPalvelutAlueella: async (alueid) => {
    console.log("Ollaan clientin fetchPalvelutAlueella");

    let url = 'http://localhost:3001/api/palvelut/' + alueid;

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

getPalvelutTyypinMukaan: async (tyyppiId) => {
    console.log("Ollaan clientin fetchPalvelutTyypinMukaan");

    let url = 'http://localhost:3001/api/palveluttyypilla/' + tyyppiId;

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

addPalvelu: async (palvelu) => {

    console.log("Ollaan clientin addPalvelu", palvelu);

    let url = 'http://localhost:3001/api/palvelut';

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(palvelu)
    });
},

deletePalvelu: async (palvelu_id) => {
    console.log("ollaan clientin deletePalvelu")

    let url = 'http://localhost:3001/api/palvelut/' + palvelu_id;

    await fetch(url, {
        method: "DELETE"
    });
},

updatePalvelu: async (palvelu) => {
    console.log("ollaan clientin updatePalvelu");

    let url = 'http://localhost:3001/api/palvelut'

    await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(palvelu)
    });
},

getAsiakkaat: async () => {
    console.log("Ollaan clientin fetchAsiakkaat");

    let url = 'http://localhost:3001/api/asiakkaat';

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

getAsiakkaatNimella: async (asiakasid) => {
    console.log("Ollaan clientin fetchAsiakkaatNimella");

    let url = 'http://localhost:3001/api/asiakkaat/' + asiakasid;

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

getAsiakkaatPostinumerolla: async (postinro) => {
    console.log("Ollaan clientin fetchAsiakkaatPostinumerolla");

    let url = 'http://localhost:3001/api/asiakkaatpostinumerolla/' + postinro;

    console.log(url);

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

addAsiakas: async (asiakas) => {

    console.log("Ollaan clientin addAsiakas", asiakas);

    let url = 'http://localhost:3001/api/asiakkaat';

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(asiakas)
    });
},

deleteAsiakas: async (asiakas_id) => {
    console.log("ollaan clientin deleteAsiakas")

    let url = 'http://localhost:3001/api/asiakkaat/' + asiakas_id;

    await fetch(url, {
        method: "DELETE"
    });
},

updateAsiakas: async (asiakas) => {
    console.log("ollaan clientin updateAsiakas");

    let url = 'http://localhost:3001/api/asiakkaat'

    await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(asiakas)
    });
},

getAsiakkaanVaraus: async (varausid) => {
    console.log("Ollaan clientin fetchAsiakkaanVaraus");

    let url = 'http://localhost:3001/api/asiakkaanvaraus/' + varausid;

    console.log(url);

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

getVaraukset: async () => {
    console.log("Ollaan clientin fetchVaraukset");

    let url = 'http://localhost:3001/api/varaukset';

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

deleteVaraus: async (varaus_id) => {
    console.log("Ollaan clientin deleteVaraus");

    let url = 'http://localhost:3001/api/varaukset/' + varaus_id;

    console.log(url);

    await fetch(url, {
        method: "DELETE"
    });
},

updateVaraus: async (varaus) => {
    console.log("ollaan clientin updateVaraus");

    let url = 'http://localhost:3001/api/varaukset'

    await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(varaus)
    });
},

getAlueet: async () => {
    console.log("Ollaan clientin fetchAlueet");

    let url = 'http://localhost:3001/api/alueet';

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;

},

deleteAlue: async (alue_id) => {
    console.log("ollaan clientin deleteAlue")  

    let url = 'http://localhost:3001/api/alueet/' + alue_id;

    await fetch(url, {
        method: "DELETE"
    });
},

updateAlue: async (alue) => {
    console.log("ollaan clientin updateAlue");

    let url = 'http://localhost:3001/api/alueet'

    await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alue)
    });
},

addAlue: async (alue) => {

    console.log("Ollaan clientin addAlue", alue);

    let url = 'http://localhost:3001/api/alueet';

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alue)
    });
},

getPostinumerot: async () => {
    console.log("Ollaan clientin fetchPostinumerot");

    let url = 'http://localhost:3001/api/postinumerot';

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;

},

getPalveluTyypit: async () => {
    console.log("Ollaan clientin fetchPalveluTyypit");

    let url = 'http://localhost:3001/api/palvelutyypit';

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;

},


getNimet: async () => {
    console.log("Ollaan clientin fetchNimet");

    let url = 'http://localhost:3001/api/nimet';

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;

},

getVapaatMokit: async (o) => {
    console.log("Ollaan clientin fetchVapaatMökit");

    let url = 'http://localhost:3001/api/vapaatmokit/' + o.alueid + '/' + o.alkupvm + '/' + o.loppupvm;

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;


},

getVarauksetAjalla: async (o) => {
    console.log("Ollaan clientin fetchVarauksetAjalla");

    let url = 'http://localhost:3001/api/varauksetajalla/' + o.alueid + '/' + o.alkupvm + '/' + o.loppupvm;

    console.log(url)

    const x = await fetch(url);
    const c = await x.json();

    console.log("response: ", c)

    return c;
},

addVaraus: async (varaus) => {

    console.log("Ollaan clientin addVaraus", varaus);

    let url = 'http://localhost:3001/api/varaus';

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(varaus)
    });
},


}
