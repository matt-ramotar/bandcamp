'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserReactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reactionTypeId: {
        type: Sequelize.INTEGER,
        references: { model: 'ReactionTypes' },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
      },
      songId: {
        type: Sequelize.INTEGER,
        references: { model: 'Songs' },
      },
      artistId: {
        type: Sequelize.INTEGER,
        references: { model: 'Artists' },
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: { model: 'Albums' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserReactions');
  },
};
