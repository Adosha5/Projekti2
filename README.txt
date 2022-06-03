Savonia Code Academy -diplomikoulutuksen osana tehty projektityö. Työryhmässä Anni-Maarit Sonninen ja kaksi muuta SCA3-opiskelijaa. Projekti toteutettiin 03-04/2022.

Projektin tavoitteena oli toteuttaa lomamökkien varausjärjestelmä, jonka avulla tilaaja Village People Oy (kuvitteellinen yritys) voi hallinnoida eri toimipisteissä sijaitsevien lomamökkien ja lisäpalvelujen varauksia. Lisäksi järjestelmässä oli tarkoitus hallinnoida asiakastietoja. Projektin tavoitteena oli toteuttaa selainpohjainen järjestelmä, joka tallentaa datan tietokantaan REST-rajapinnan kautta.

Projektissa toteutettiin sovellukseen seuraavat toiminnot:
- toimipisteiden ja mökkien hallinta
- lisäpalveluiden hallinta
- kuluttaja-asiakkaan omien majoitusvarausten selaus
- asiakashallintajärjestelmä
- majoittumisten raportointi aikajaksolla valituissa toimipisteissä
- ostettujen lisäpalvelujen raportointi aikajaksolla valituissa toimipisteissä

Projektin toteuttamisessa käytettiin Visual Studio Code - ja MySQL Workbench -työkaluja. Ohjelma kirjoitettiin JavaScript-ohjelmointikielellä hyödyntäen siihen liittyvää JavaScript-kirjastoa Reactia ja JavaScript-tulkkia Nodea. Ohjelman tyylittelyssä käytettiin Reactiin kehitettyä Material UI -komponettikirjastoa sekä CSS-ohjelmointikieltä. Tietokannan luomiseen ja hallinnointiin käytettiin SQL-ohjelmointikieltä. Versionhallintaan projektin aikana käytettiin Azure DevOps -työkalua, jossa seurattiin myös projektin etenemistä.

Omat vastuualueeni projektin toteuttamisessa:
- Asiakas CRUD
- Lisäpalvelut CRUD
- Varausten raportointi
- Material UI
- tietokannan lisäyslauseet
- projektisuunnitelman ja projektin loppuraportin kirjoittaminen

Sovelluksen käynnistys:
- Asenna npm pääkansiossa sekä client ja server-kansioissa
- Käynnistä serveri server-kansiossa: nodemon start
- Käynnistä client client-kansiossa: npm start
