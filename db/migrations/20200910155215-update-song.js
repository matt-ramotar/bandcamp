'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Songs', 'albumId');
    return await queryInterface.removeColumn('Songs', 'artistId');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('Songs');
  },
};
