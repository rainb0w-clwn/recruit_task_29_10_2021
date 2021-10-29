'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Cards", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2021-10-29T12:58:57.252Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Cards",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true
            },
            "title": {
                "type": Sequelize.TEXT,
                "field": "title",
                "allowNull": false
            },
            "description": {
                "type": Sequelize.TEXT,
                "field": "description",
                "allowNull": false
            },
            "short_description": {
                "type": Sequelize.TEXT,
                "field": "short_description",
                "allowNull": false
            },
            "image": {
                "type": Sequelize.TEXT,
                "field": "image"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "defaultValue": Sequelize.fn("NOW")
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "onUpdate": {
                    "val": "CURRENT_TIMESTAMP"
                },
                "defaultValue": Sequelize.fn("NOW")
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
