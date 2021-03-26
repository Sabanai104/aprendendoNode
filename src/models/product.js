'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // Schema cria um _id automaticamente.
    title: {
        type: String,
        required: true, //precisa enviar
        trim: true //remove os espaços antes e depois
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true, //cria um index  
        unique: true //Torna o unico
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }]
});

//O Json da tags ficaria assim:
// 'tags' : [
// 'teste', '123', 'pessoas'
// ]

module.exports = mongoose.model('Product', schema);