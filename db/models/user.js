'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Song, { through: models.UserReactions, foreignKey: 'userId', otherKey: 'songId' });
      User.belongsToMany(models.Artist, { through: models.UserReactions, foreignKey: 'userId', otherKey: 'artistId' });
      User.belongsToMany(models.Album, { through: models.UserReactions, foreignKey: 'userId', otherKey: 'albumId' });
      User.belongsToMany(models.ReactionTypes, { through: models.UserReactions, foreignKey: 'userId', otherKey: 'reactionTypeId' });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      hashedPassword: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
