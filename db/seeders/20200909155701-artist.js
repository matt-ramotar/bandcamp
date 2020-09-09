'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seeds = require('../../spotify/genArtistSeeds');
    console.log(await seeds);
    return await queryInterface.bulkInsert('Artists', seeds);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Artists', null, {});
  },
};
