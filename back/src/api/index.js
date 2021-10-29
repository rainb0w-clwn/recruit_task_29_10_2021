const express = require('express');
const card = require('./routes/card');
const swagger = require("../_helper/swagger");

const app = express.Router();

app.get('/health', (req, res) => {
    res.status(200).json({message: "OK"});
});

module.exports = () => {
    card(app);
    if (process.env.NODE_ENV === 'development') {
        app.use(
            '/',
            swagger,
        );
    }
    return app;
};
