'use strict';

const mongoose = require('mongoose');
const ValidationContract = require('../validators/fluent-validator');
const Product = mongoose.model('Product');
const repository = require('../repositories/product-repository');

exports.get = (req, res, next) => {

    repository.get() //dessa forma ele soh vai trazer os produtos ativos no sistema e esses listados.
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
};

exports.getBySlug = (req, res, next) => {

    repository.getBySlug(req.params.slug)//dessa forma ele soh vai trazer os produtos ativos no sistema e esses listados.
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
};

exports.getById = (req, res, next) => {
    repository.getById(req.params.id)
        .then(data => {
            if (data.id)
                res.status(200).send(data);
        }).catch(error => {
            if (req.body.id) {
                res.status(400).send(error);
            } else {
                res.status(401).send({ message: 'Não existe usuario' });
            }
        });
}

exports.getByTag = (req, res, next) => {
    repository.getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        })
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');


    if (!contract.isValid()) {
        res.status(400).send(contract.error({})).end();
    }

    let product = new Product(req.body);
    product.save()
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
        })
        .catch(error => {
            res.status(400).send({ message: 'Falha ao cadastrar o produto', data: error });
        });
};

exports.put = (req, res, next) => {
    repository.put(req)
        .then(x => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: error
            });
        })
};

exports.delete = (req, res, next) => {
    repository.delete(id)// com o params, eu preciso passar um :id na rota com o body n.
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao remover produto',
                data: error
            });
        })
};