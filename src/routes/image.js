var { Router } = require('express')
const path = require('path')
const fs = require('fs')
const route = new Router()

route.all('/files/*', (req, res) => {
    fs.readFile(path.join(__dirname, '..', req.url), (error, data) => {
        if(error) {
            res.status(404).send({message: 'error'})
        } else {
            res.set('Content-Type', 'image/jpeg')
            res.send(data)
        }
    })
})

module.exports = route