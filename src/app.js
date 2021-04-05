'use strict'

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
// Connecta ao banco
mongoose.connect(config.connectionString, { useNewUrlParser:true, useUnifiedTopology: true });


const app = express();

// Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Carrega as Rotas
const index = require('./routes/index');
const product = require('./routes/product');
const customer = require('./routes/customer');
const order = require('./routes/order');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', index);
app.use('/products', product);
app.use('/customers', customer);
app.use('/orders', order);


module.exports = app;