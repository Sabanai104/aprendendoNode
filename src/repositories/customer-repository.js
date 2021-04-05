'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    const res = await Customer.find({}, 'name password email');
    return res;
}

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async (id) => {
    const res = await Customer.findById()
}

exports.create = async (req) => {
    let customer = new Customer(req);
    await customer.save();
}

exports.delete = async (id) => {
    await Customer
        .findOneAndRemove(id);
}
