const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const DB = require('./db');
const route = require('./routes');
const expressHbs = require('express-handlebars');
const path = require('path');
const mongo_watch = require('./mongodb_watch');
const { events } = require('./app/models/user.model');
require('dotenv').config()
const { createServer } = require("http");
const { Server } = require("socket.io");

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connect", (socket) => {
    console.log("User connected to socket.io in PORT: " + process.env.PORT_SOCKET);

    socket.on("connect user", function () {
        console.log("Connected");
        io.emit('connect user', user);
    })

    socket.on("payment_success", (data) => {
        console.log("Nhan du lieu tu server:", data);
    });

    socket.on('disconnect', function () {
        console.log("Disconnected");
    });

});

app.engine('.hbs', expressHbs.engine({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.static(__dirname, { type: 'text/css' }))
app.use(express.static(path.join(__dirname, 'public')));// trỏ tới thư mục chứa ảnh

DB.connect();
// mongo_watch._client();

route(app);

app.listen(process.env.PORT, () => { console.log("localhost:" + process.env.PORT) });

httpServer.listen(process.env.PORT_SOCKET);