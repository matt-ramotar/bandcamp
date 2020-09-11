'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Users', [
      {
        email: 'email-1@email.com',
        firstName: 'first-1',
        lastName: 'last-1',
        hashedPassword: 'hashed-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email-2@email.com',
        firstName: 'first-2',
        lastName: 'last-2',
        hashedPassword: 'hashed-2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email-3@email.com',
        firstName: 'first-3',
        lastName: 'last-3',
        hashedPassword: 'hashed-3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email-4@email.com',
        firstName: 'first-4',
        lastName: 'last-4',
        hashedPassword: 'hashed-4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email-5@email.com',
        firstName: 'first-5',
        lastName: 'last-5',
        hashedPassword: 'hashed-5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email-6@email.com',
        firstName: 'first-6',
        lastName: 'last-6',
        hashedPassword: 'hashed-6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email-7@email.com',
        firstName: 'first-7',
        lastName: 'last-7',
        hashedPassword: 'hashed-7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email-8@email.com',
        firstName: 'first-8',
        lastName: 'last-8',
        hashedPassword: 'hashed-8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email-9@email.com',
        firstName: 'first-9',
        lastName: 'last-9',
        hashedPassword: 'hashed-9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
