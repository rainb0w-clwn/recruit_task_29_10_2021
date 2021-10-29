const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require('../api');
const config = require('../config');
const {errors, isCelebrateError} = require('celebrate'); // handle celebrate joi errors
const {Logger} = require('../utlis');
const cors = require('cors');
const swagger = require("../_helper/swagger");

module.exports = async ({app}) => {
    app.enable('trust proxy');

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());


    app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
    app.use(config.api.full, routes());

    app.use(errors());

    app.use((err, req, res, next) => {
        Logger.error('error: %o', err);
        let error = err.name;
        let message = err.message;
        let status = res.statusCode;
        if (isCelebrateError(err)) {
            return next(err);
        }
        switch (status) {
            case 400:
                error = 'Input Validation Error';
                break;
            case 401:
                error = 'Unauthorized';
                break;
            case 403:
                error = 'Forbidden';
                break;
            case 404:
                error = "Not Found";
                break;
            case 500:
                error = 'Internal Error';
                break;
        }
        switch (error) {
            case 'Unauthorized':
            case 'UnauthorizedError':
            case 'AuthorizeError':
                status = 401;
                break;
            case 'SequelizeForeignKeyConstraintError':
                status = 400;
                break;
            case 'NotFoundError':
            case 'Not Found':
                status = 404;
                break;
            case 'SequelizeDatabaseError':
                status = 500;
                break;
        }
        res.status(status).json({
            statusCode: status,
            message: message,
            error: error,
        });
    });

    app.use(function(req, res, next) {
        return res.status(404).json({
            statusCode: 404,
            message: 'Not Found',
            error: 'Not Found',
        });
    });

    app.use(function(err, req, res, next) {
        return res.status(500).json({
            statusCode: 505,
            message: 'Internal Error',
            error: err,
        });
    });

    // Return the express app
    return app;
};
