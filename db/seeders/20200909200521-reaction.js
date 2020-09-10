'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ReactionTypes', [
      { type: 'Happy', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Scared', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Sad', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Energetic', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ReactionTypes', null, {});
  }
};
