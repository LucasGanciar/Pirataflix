const express = require('express')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy')
const cors = require('cors');
const path = require('path');

require('./db/mongoose')

const moviesRouter = require('./routes/movies')
const imageRouter = require('./routes/image')

var app = express()

app.use(fileUpload({
    createParentPath: true
}));
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/media-server/dist/media-server'));
app.use(express.static(path.join(__dirname, '/files')));
app.use(busboy({
    highWaterMark: 10 * 1024 * 1024,
    limits: {
        fileSize: 5 * 1024 * 1024 * 1024
      }
}));

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(moviesRouter)
app.use(imageRouter)


app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname ,'/public/media-server/dist/media-server/index.html'))
});

module.exports = app