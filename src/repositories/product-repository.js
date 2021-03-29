'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product
        .find({
            active: true,
        }, 'title price slug');
}

exports.getBySlug = (slug) => {
    return Product
        .findOne({ slug: slug, active: true }, 'title description price slug tags');
}

exports.getById = (id) => {
    return Product
        .findById(id, 'title price slug tags');

}

exports.getByTag = (tag) => {
    return Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags');
}

exports.put = (req) => {
    return Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        });
}

exports.delete = (id) => {
    return Product
        .findOneAndRemove(id);
}