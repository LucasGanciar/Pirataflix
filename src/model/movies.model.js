const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    path: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    imagePath: {
        type: String,
        required: false,
        trim: true
    },
    trailer: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie