'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReactionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReactionType.belongsToMany(models.User, { through: models.UserReactions, foreignKey: 'reactionTypeId', otherKey: 'userId' });
    }
  }
  ReactionType.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ReactionType',
    }
  );
  return ReactionType;
};
