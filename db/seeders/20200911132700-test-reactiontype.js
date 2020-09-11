'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('ReactionTypes', [{ type: 'favorite', createdAt: new Date(), updatedAt: new Date() }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('ReactionTypes', null, {});
  },
};
