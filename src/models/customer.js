'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // Schema cria um _id automaticamente.
    name: {
        type: String,
        required: true, //precisa enviar
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//O Json da tags ficaria assim:
// 'tags' : [
// 'teste', '123', 'pessoas'
// ]

module.exports = mongoose.model('Customer', schema);