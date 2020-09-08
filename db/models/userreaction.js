'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserReaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  UserReaction.init(
    {
      reactionTypeId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      songId: DataTypes.INTEGER,
      artistId: DataTypes.INTEGER,
      albumId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserReaction',
    }
  );
  return UserReaction;
};
