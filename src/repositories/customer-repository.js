'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    const res = await Customer.find({}, 'name');
    return res;
}

exports.getById = async (id) => {
    const res = await Customer.findById()
}

exports.create = async (req) => {
    let customer = new Customer(req.body);
    await customer.save();
}

exports.delete = async (id) => {
    await Customer
        .findOneAndRemove(id);
}
