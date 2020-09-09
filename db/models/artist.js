'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artist.belongsToMany(models.Album, { through: models.ArtistAlbum, foreignKey: 'artistId', otherKey: 'albumId' });
      Artist.belongsToMany(models.User, { through: models.UserReaction, foreignKey: 'artistId', otherKey: 'userId' });
      Artist.belongsToMany(models.Song, { through: models.ArtistSong, foreignKey: 'artistId', otherKey: 'songId' });
    }
  }
  Artist.init(
    {
      spotifyId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Artist',
    }
  );
  return Artist;
};
