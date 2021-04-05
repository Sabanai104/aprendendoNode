'use strict';

const repository = require('../repositories/customer-repository');
const md5 = require('md5');

const emailService = require('../services/email-service');
const authService = require('../services/auth-service');


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
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(
            req.body.email,
            'Abra pra saber oq eu comi hoje',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        );

        res.status(201).send({ message: 'Usuario cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).send({ message: 'Falha ao cadastrar usuário' });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!customer) {
            res.status(404).send({message: "Usuário ou senha inválidos"});
            return
        }

        const token = await authService.generateToken({ email: customer.email, name: customer.name });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        res.status(400).send({ message: 'Falha ao autenticar o usuário' });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        res.stauts(400).send({ message: 'Falha ao deletar usuário' })
    }
}