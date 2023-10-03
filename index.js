const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const DB = require('./src/db');
const route = require('./src/routes');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
DB.connect();

route(app);



app.listen(process.env.PORT, () => { console.log("locohost:" + process.env.PORT) })
