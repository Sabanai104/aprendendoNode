'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get() //dessa forma ele soh vai trazer os produtos ativos no sistema e esses listados.
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug)//dessa forma ele soh vai trazer os produtos ativos no sistema e esses listados.
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
};

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id)
        if (data.id) {
            res.status(200).send(data);
        }
    } catch (error) {
        if (req.body.id) {
            res.status(400).send({ message: 'Falha ao processar requisição' });
        } else
            res.status(401).send({ message: 'Não existe usuário' });
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: 'Falha ao processar requisição' });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');


    if (!contract.isValid()) {
        res.status(400).send(contract.error({})).end();
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).send({ message: 'Falha ao cadastrar o produto' });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.put(req);
        if (req.params.id) {
            res.status(200).send({
                message: "Produto atualizado com sucesso!"
            })
        }
    } catch (error) {
        res.status(400).send({ message: 'Falha ao atualizar produto' });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);// com o params, eu preciso passar um :id na rota com o body n.
        res.status(200).send({
            message: 'Produto deletado com sucesso'
        })
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao remover produto',
        });
    }
};