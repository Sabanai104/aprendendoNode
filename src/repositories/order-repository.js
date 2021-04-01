'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async (data) => {
    const res = await Order.find({}, 'number status')
    .populate('customer', 'name')
    .populate('items.product', 'title');
    return res;
}

exports.create = async (req) => {
    let order = new Order(req);
    await order.save();
}



