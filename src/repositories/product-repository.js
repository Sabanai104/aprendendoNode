'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    const res = await Product.find({
        active: true, // Para que serve?
    }, 'title price slug');
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product
        .findOne({ slug: slug, active: true }, 'title description price slug tags');
    return res;
}

exports.getById = async (id) => {
    const res = await Product
        .findById(id, 'title price slug tags');
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.put = async (req) => {
    await Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        });
}

exports.create = async (body) => {
    let product = new Product(body);
    await product.save();
}

exports.delete = async (id) => {
    await Product
        .findOneAndRemove(id);
}