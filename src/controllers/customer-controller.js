'use strict';

const repository = require('../repositories/customer-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get() //dessa forma ele soh vai trazer os produtos ativos no sistema e esses listados.
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    try {
        await repository.create(req);
        res.status(201).send({ message: 'Usuario cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).send({ message: 'Falha ao cadastrar usuário' });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({message: 'Usuário deletado com sucesso!'});
    } catch (error) {
        res.stauts(400).send({ message: 'Falha ao deletar usuário'})
    }
}