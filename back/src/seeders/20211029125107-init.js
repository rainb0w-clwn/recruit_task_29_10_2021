'use strict';
const CSVToJSON = require('csvtojson');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = await CSVToJSON().fromFile(__dirname + '/sample.csv');
    await queryInterface.bulkInsert('Cards', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('TRUNCATE "Cards" CASCADE');
  },
};
