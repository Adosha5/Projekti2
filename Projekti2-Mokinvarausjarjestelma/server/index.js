const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

const cors = function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

const routes = require('./routes/routes');
app.use(routes);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;