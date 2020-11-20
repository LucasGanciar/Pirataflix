const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const dir = path.join(__dirname , '../files/movies/')

var addSubtitles = function(path, callback) {
    ffmpeg(path + '.mp4')
        .videoCodec('libx264')
        .audioCodec('libmp3lame')
        .outputOptions(
            '-vf subtitles=./jellies.srt'
        )
        .on('error', function(err) {
            callback(true, err)
        })
        .save(path)
        .on('end', function() {
            callback(false, "done")
        })
}

var streaming = function(req, res) {
    const moviePath = path.join(__dirname , "..", "/files/movies/TheGrandBudapestHotel.mp4")
    var stat = fs.statSync(moviePath)
    var total = stat.size
    if (req.headers['range']) {
        var range = req.headers.range
        var parts = range.replace(/bytes=/, "").split("-")
        var partialstart = parts[0]
        var partialend = parts[1]

        var start = parseInt(partialstart, 10)
        var end = partialend ? parseInt(partialend, 10) : total - 1
        var chunksize = (end - start) + 1
        console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize)

        var file = fs.createReadStream(moviePath, {
            start: start,
            end: end
        })
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        })
        file.pipe(res)
    } else {
        console.log('ALL: ' + total)
        res.writeHead(200, {
            'Content-Length': total,
            'Content-Type': 'video/mp4'
        })
        fs.createReadStream(path).pipe(res)
    }
}

const MakeDirIfNotExist = function(file){
    if(!fs.existsSync(dir + file.name)){
        fs.mkdirSync(dir + file.name)
    }
}

const FileInfo = function(file) {
    return { name: movieName(file.name), path: path.join(dir + movieName(file.name), file.name)}
}

const movieName = function(movie){
    return movie.substr(0, movie.lastIndexOf('.')) || input;
}

module.exports = {
    addSubtitles,
    streaming,
    FileInfo,
    MakeDirIfNotExist
}