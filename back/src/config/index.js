const dotenv = require('dotenv');
const {resolve} = require('path');
const envFound = dotenv.config({path: resolve(__dirname, "../../../.env")});
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const normalizePort = require('normalize-port');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const dbURI = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DB}`;
module.exports = {
    port: normalizePort(process.env.SERVER_PORT),
    dbURI: dbURI,
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_DB,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "postgres",
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_DB,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "postgres",
        "logging": false,
    },

    api: {
        prefix: process.env.API_PREFIX,
        version: process.env.API_VERSION,
        full: '/' + process.env.API_PREFIX + '/' + process.env.API_VERSION
    },

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
};
