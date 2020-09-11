'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserReactions', [
      { reactionTypeId: 3, userId: 5, songId: 1271, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 3, userId: 5, songId: 1272, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 3, userId: 5, songId: 1273, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 3, userId: 5, songId: 1274, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 3, userId: 5, songId: 1275, createdAt: new Date(), updatedAt: new Date() },
      { reactionTypeId: 3, userId: 5, songId: 1276, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('UserReactions', null, {});
  },
};
