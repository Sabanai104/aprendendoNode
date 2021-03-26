'use strict'

const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');

// Connecta ao banco
mongoose.connect('mongodb+srv://sabanai:sabanai@cluster0.wfblr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser:true, useUnifiedTopology: true });


const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const product = require('./routes/product');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use('/', index);
app.use('/products', product);


module.exports = app;