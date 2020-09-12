'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserReactions', [
      { reactionTypeId: 1, userId: 1, songId: 1, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 1, userId: 1, songId: 2, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 1, userId: 1, songId: 3, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 1, userId: 1, songId: 4, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 1, userId: 1, songId: 5, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 1, userId: 1, songId: 6, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('UserReactions', null, {});
  },
};
