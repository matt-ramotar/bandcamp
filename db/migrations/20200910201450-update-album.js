'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('Albums', 'artistId');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
