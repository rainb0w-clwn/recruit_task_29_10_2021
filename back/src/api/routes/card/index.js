const express = require('express');
const router = express.Router();
const {Joi, celebrate} = require("celebrate");
const {Card} = require('../../../services');
const {HostNotFoundError} = require("sequelize");
const createError = require('http-errors')

module.exports = (app) => {
    app.use('/card', router);

    router.get('/',
        celebrate({
            query: Joi.object({
                page: Joi.number().integer().positive().optional().default('1'),
                size: Joi.number().integer().positive().optional().default('10'),
            }),
        }),
        async function (req, res, next) {
            try {
                let cardInstance = new Card();
                let result = await cardInstance.getCards(req);
                return res.status(200).json(result);
            } catch (e) {
                next(e);
            }
        });
    router.get('/:cardId',
        celebrate({
            params: Joi.object({
                cardId: Joi.number().integer().required(),
            }),
        }),
        async function (req, res, next) {
            try {
                let cardInstance = new Card();
                let result = await cardInstance.getCard(req.params.cardId);
                if (result == null) {
                    next(createError(404, 'Not found'))
                    return
                }
                return res.status(200).json(result);
            } catch (e) {
                next(e);
            }
        });
};
