var { Router } = require('express')
var { streaming, addSubtitles, FileInfo, MakeDirIfNotExist } = require('../utils/movieStreaming')
var fs = require('fs');
const Movie = require('../model/movies.model')
const route = new Router()

route.get('/api/streaming', (req, res) => {
    try {
        //get movie path in db
        streaming(req, res);
    } catch (error) {
        console.log(error)
    }
})

route.get('/api/movies', async (req, res) => {
    try {
        res.send(await Movie.find({}))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
route.post('/upload', async function (req, res) {
    console.log(req.files)
    const file = FileInfo(req.files.file)
    MakeDirIfNotExist(file)
    var writeStream = fs.createWriteStream(`./src/files/movies/${file.name}/${req.files.file.name}`)
    req.pipe(writeStream)
    writeStream.on('finish', async () => {
        const movie = new Movie(file)
        await movie.save()
        res.status(200).send(movie)
    })
})

route.get('/api/movies/sub/:id', function(req, res) {
    addSubtitles("movie", function(error, newpath) {
        if (error) {
            res.send("error : " + error)
        } else {
            console.log("done");
            res.end();
        }
    })
})

module.exports = route