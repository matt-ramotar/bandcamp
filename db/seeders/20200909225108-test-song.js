'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Songs', [
      {
        spotifyId: 'test',
        title: 'Song Title',
        isArtistTopTrack: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotifyId: 'test2',
        title: 'Song Title 2',
        isArtistTopTrack: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Songs', null, {});
  },
};
